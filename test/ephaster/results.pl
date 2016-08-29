#!/usr/bin/perl

use strict;
use warnings;
use JSON qw(to_json);

use File::Slurp qw(read_file);
use File::Slurp qw(write_file);
my $KM2AU = 1000 / 1.495978707e+11;

sub read_results {

	my $tests = [];
	my ($file) = @_;

	my $data = read_file("../../src/ephaster/data/${file}");

	$data =~ s/^(?:\w| |\d|\#)+//i;

	$data =~ s/D(?=[+-])/e/g;

	my $re_entry = qr/\s*
		(-?[0-9\.]+(?:e[\+\-]\d+)?)\s+
		(-?[0-9\.]+(?:e[\+\-]\d+)?)\s+
		(-?[0-9\.]+(?:e[\+\-]\d+)?)\s+
		(-?[0-9\.]+(?:e[\+\-]\d+)?)\s+
		(-?[0-9\.]+(?:e[\+\-]\d+)?)\s+
	/xs;

	while ($data=~s/^$re_entry//) {
		# force all items to numbers (json export)
		push @{$tests}, [ $2+0, $3+0, $4+0, $5+0 ];
	}

	die "not fully parsed $data" unless $data =~ m/^\s*$/;

	# return array
	return $tests;
}

############################################################
# Main program to generate expected results
############################################################

# list all bodies
my @jobs = (
	['0001.CTL', 'cer'],
	['0002.CTL', 'pal'],
	['0003.CTL', 'jun'],
	['0004.CTL', 'ves'],
	['0005.CTL', 'ast'],
	['0006.CTL', 'heb'],
	['0007.CTL', 'iri'],
	['0324.CTL', 'bam'],
	['EMB.CTL', 'emb'],
	['BARYCENT.CTL', 'bar'],
);

my $tests = {};
# read in all results
foreach my $job (@jobs) {
	$tests->{$job->[1]} =
		read_results(@{$job});
}

# create json exporter
my $json = new JSON;
# sort keys in objects
$json->canonical(1);
# pretty print tests
$json->pretty(1);
# convert tests to json
my $js = $json->encode($tests);

# write the javascript file with expected test results
write_file("results.js", "var ephaster_results = $js;");
