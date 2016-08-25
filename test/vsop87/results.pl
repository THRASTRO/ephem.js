#!/usr/bin/perl

use strict;
use warnings;
use JSON qw(to_json);

use File::Slurp qw(read_file);
use File::Slurp qw(write_file);

my $data = read_file('../../src/vsop87/data/vsop87.chk');

my $re_head = qr/
	VSOP87([A-E]?)
	\s+
	([A-Z\-]+)
	\s+
	JD(\d+\.\d+)
	\s+
	(\d+\/\d+\/\d+\s+\d+h\s+TDB)
/x;

my $re_var = qr/[a-z]\'?/;
my $re_val = qr/\-?\d*\.\d+/;
my $re_unit = qr/(?:au|rad)(?:\/d)?/;

my $json = {};

while ($data =~ s/\A\s*$re_head//m) {
	my ($ver, $name, $date) = ($1, $2, $3);
	$name = "EMB" if ($name eq "EARTH-MOON");
	my $key = substr(lc($name), 0, 3);
	my $theory = sprintf "vsop87%s", lc($ver);
	$json->{$theory} = {} unless (exists $json->{$theory});
	$json->{$theory}->{$key} = [] unless (exists $json->{$theory}->{$key});
	my $test = [$date + 0]; # create object for tests
	push @{$json->{$theory}->{$key}}, $test; # add test to theory
	while ($data =~ s/\A\s*($re_var)\s+($re_val)\s+$re_unit?//m) {
		my ($var, $val) = ($1, $2);
		push @{$test}, $val + 0;
	}
}

die "not fully parsed" unless $data =~ m/^\s*$/m;

write_file("results.js", "var vsop87_results = " . to_json($json, { pretty => 1, canonical => 1 }));