################################################################################
# AstroJS VSOP87 converter script (c) 2016 by Marcel Greter
################################################################################
# Very quick and dirty perl script to get the job done.
################################################################################
use strict;
use warnings;

use JSON qw();
use File::Path;
use File::Slurp;

our $accuracy = 10e-6;
unless(defined $ARGV[0]) {
	warn "using default precision of 10e-6\n";
} else {
	$accuracy = $ARGV[0];
}

our $target = 'src';
if(defined $ARGV[1]) {
	$target = $ARGV[1];
	if (!-d $target && !File::Path::make_path($target)) {
		warn "could not create $target\n";
	}
}

# return minified number for js
# optimize exponents and more
sub num
{
	# to string with maximum precision
	my $nr = sprintf("%0.14f", $_[0]);
	# minify exponential number
	if ($nr =~ m/(\d+)(?:\.(\d+))(?:e(-?\d+))?/)
	{
		my $ipart = $1;
		my $fpart = $2 || 0;
		my $exponent = $3 || 0;
		# remove trailing zeros from fpart
		$fpart =~ s/0+$//;
		# check how many zeros we can remove
		# from the left (by decreasing eX)
		if ($ipart =~ m/^0*$/) {
			$fpart =~ s/^(0*)//;
			$exponent -= length($1) + 1;
			$ipart = substr($fpart, 0, 1, '');
		}
		# output number now
		if ($fpart =~ m/^0*$/) {
			if ($exponent == 0) { $nr = sprintf("%d", $ipart); }
			else { $nr = sprintf("%de%d", $ipart || 0, $exponent); }
		}
		# has fpart
		else {
			if ($exponent == 0) { $nr = sprintf("%d.%s", $ipart, $fpart); }
			else { $nr = sprintf("%d.%se%d", $ipart || 0, $fpart, $exponent); }
		}
	}
	# more cleanup
	$nr =~ s/^\0+\.//;
	$nr =~ s/\.0*$//;
	# unchanged
	return $nr;
}

# filter coefficients
# apply precision
sub filter_vsop87_coeff
{
	my ($coeff, $pow) = @_;
	my $first = $pow == 0;
	my @coeffs;
	# process all coefficients
	# has raw data from data file
	foreach my $factors (@{$coeff})
	{
		# p=prec/10.d0/(q-2)/(dabs(t(it))+it*dabs(t(it-1))*1.d-4+1.d-50)
		# if (k.eq.0.or.(k.ne.0.and.ic.eq.5-2*k)) p=p*a0(ibody)
		my ($A, $B, $C) = @{$factors}[16..18];
		if (abs($A) > $accuracy || $first)
		{
			# add coefficients
			push @coeffs, $A, $B, $C;
			# update first flag
			$first = 0;
		}
	}
	# filtered by precision
	return \@coeffs;
}

# generate theory file
# export coefficients
sub gen_vsop87
{

	my ($body, $version) = @_;

	# open input data file and read by line
	$body = lc $body; $version = uc $version;
	my $theory = sprintf "vsop87%s", lc($version);
	my $name = sprintf "%s_%s", $theory, $body;
	my $file = sprintf "data/VSOP87%s.%s", uc($version), $body;
	open(my $fh, "<", $file) or die "could not open $file\n$!";

	# vsop87 coefficients for body
	my (@vsop87, $factors);
	# various variables for parsing
	my ($v, $obj, $var, $vars, $pow);

	# parse vsop87 data file by lines
	while (defined(my $line = <$fh>))
	{
		if ($line =~ m/^\s*VSOP87 VERSION\s+\w?(\d+)\s+(\w+)\s+VARIABLE\s+(\d+)\s+\((\w+)\)\s+\*T\*\*(\d+)\s+(\d+)\s+TERMS?\s+(.*)/) {
			($v, $obj, $var, $vars, $pow) = ($1, $2, $3, $4, $5);
			$vsop87[$var - 1][$pow] = $factors = [];
		} elsif ($line =~ m/^\s*VSOP87/) {
			warn "unrecocnised line:\n$line\n";
		} else {
			$line =~ s/\A\s+//;
			$line =~ s/\s+\z//;
			my @coeffs = map { $_ + 0 } split /(?:\s+|(?=-))/, $line;
			warn "invalid factors?" if scalar @coeffs != 19;
			push @{$factors}, \@coeffs;
		}
	}

	# normalize vars
	$vars = lc $vars;
	$vars = "aLkhqp"
		if $vars eq "alkhqp";
	my @vars = split(//, $vars);
	$version = lc $version;

	# collect coeffs for precision
	my (%coeffs, @coeffs, $coeffs);
	for (my $n = 0; $n < length($vars); $n ++)
	{
		my $v = $vars[$n]; $#coeffs = -1;
		for (my $i = 0; $i < scalar(@{$vsop87[$n]}); $i ++) {
			push @coeffs, filter_vsop87_coeff($vsop87[$n]->[$i], $i);
		}
		# remove trailing arrays that have no coefficients
		pop @coeffs while(scalar(@coeffs) && scalar(@{$coeffs[-1]}) == 0);
		# put all powers to the array
		$coeffs{$v} = [ @coeffs ];
	}

	# create json exporter
	my $json = new JSON;
	# sort object keys
	$json->canonical(1);
	# export coefficients to javascript
	$coeffs = "{\n" . join(",\n", map {
		my $js = $json->encode($coeffs{$_});
		sprintf("	%s: %s", $_, $js);
	} @vars) . "\n}";

	# write the final javascript file
	write_file "$target/$name.js", "
function $name(jy) { return vsop87(${name}.coeffs, jy); }
${name}.coeffs = ${coeffs}; // assign to function
${theory}.${body} = ${name}; // export function
";

}
# EO gen_vsop87

############################################################
# Main program to generate all theories starts here
############################################################

my @planets = (
	"mercury",
	"venus",
	"mars",
	"jupiter",
	"saturn",
	"uranus",
	"neptune"
);

foreach my $body (@planets, "emb") {
	gen_vsop87(substr($body, 0, 3), "");
}

foreach my $body (@planets, "emb", "earth") {
	gen_vsop87(substr($body, 0, 3), "a");
}

foreach my $body (@planets, "earth") {
	gen_vsop87(substr($body, 0, 3), "b");
}

foreach my $body (@planets, "earth") {
	gen_vsop87(substr($body, 0, 3), "c");
}

foreach my $body (@planets, "earth") {
	gen_vsop87(substr($body, 0, 3), "d");
}

foreach my $body (@planets, "earth", "sun") {
	gen_vsop87(substr($body, 0, 3), "e");
}

############################################################
# Create the unit test file
############################################################
my %qidmap = (2 => 0, 4 => 1, 6 => 2, 8 => 3, 12 => 4);
if ($target =~ m/^src[\/\\](\d+)-(\w+)/) {
	my ($id, $qid, $qname) = ($1, $qidmap{$1+0}, $2);
	my $config = { binmode => ':raw' };
	my $tmpl = read_file( 'conf/unit-test.thtml', $config);
	die "could not read unit test template" unless $tmpl;
	my $path = sprintf('../../test/vsop87/%02d-%s.html', $id, $qname);
	$tmpl =~ s/%%id%%/$qid/g; write_file($path, $config, $tmpl);
}
