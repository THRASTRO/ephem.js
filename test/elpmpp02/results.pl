#!/usr/bin/perl

use strict;
use warnings;
use JSON qw(to_json);

use File::Slurp qw(read_file);
use File::Slurp qw(write_file);
my $KM2AU = 1000 / 1.495978707e+11;

sub gen_results {

	my $tests = [];
	my ($file) = @_;

	my $data = read_file("../../src/elpmpp02/data/ELPMPP02.${file}.ctl");

	my $re_entry = qr/
		\s*JD\s+(-?[0-9\.]+)
		\s*X\s*=\s*([0-9\.e\-\+]+)
		\s*Y\s*=\s*([0-9\.e\-\+]+)
		\s*Z\s*=\s*([0-9\.e\-\+]+)
		\s*km
		\s*X\'\s*=\s*([0-9\.e\-\+]+)
		\s*Y\'\s*=\s*([0-9\.e\-\+]+)
		\s*Z\'\s*=\s*([0-9\.e\-\+]+)
		\s*km\/day
	/xs;

	while ($data=~s/$re_entry//) {
		push @{$tests}, [ $1, # idx
			$2*$KM2AU, $3*$KM2AU, $4*$KM2AU,
			$5*$KM2AU, $6*$KM2AU, $7*$KM2AU
		];
	}

	die "not fully parsed" unless $data =~ m/^\s*$/m;

	write_file("results.$file.js", "var elpmpp02_${file}_results = " . to_json($tests, { pretty => 1 }));

}

gen_results("llr");
gen_results("jpl");