#!/usr/bin/perl

use strict;
use warnings;
use JSON qw(to_json);

use File::Slurp qw(read_file);
use File::Slurp qw(write_file);

my $data = read_file('../../src/vsop2013/data/vsop2013.ctl');

my $re_entry = qr/(.*?)
	Julian\s+Date\s+JD\s+(-?[0-9\.]+)\s\(TDB\)\s+
	([0-9\.\- 	]+)\s+([0-9\.\- 	]+)\s+([0-9\.\- 	]+)\s+
/xs;

my $re_head = qr/
	(?:PLANETARY)?\s+EPHEMERIS\s+VSOP2013\s*
	([A-Z\-]+)(.*?)(?=PLANETARY|\z)
/xs;

my $re_var = qr/[a-z]\'?/;
my $re_val = qr/\-?\d*\.\d+/;
my $re_unit = qr/(?:au|rad)(?:\/d)?/;

my $json = {};
# warn substr($data, 0, 800);
while ($data =~ s/\A\s*$re_head//s) {
	my $name = ucfirst lc $1; my $entry = $2;
	my $key = substr(lc($name), 0, 3);
	my $test = $json->{$key} = [];
	warn "Generating $name\n";
	while ($entry =~ s/\A\s*$re_entry//s) {
		my @els_orb = split(/\s+/, $3);
		my @els_ecl = split(/\s+/, $4);
		my @els_equ = split(/\s+/, $5);
		push @{$test}, [$2, @els_orb, @els_ecl, @els_equ];
	}
}

die "not fully parsed" unless $data =~ m/^\s*$/m;

write_file("results.js", "var vsop2013_results = " . to_json($json, { pretty => 1 }));
