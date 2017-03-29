/* this is a one to one conversion from libnova lunar.c: */
/* Copyright (C) 2000 - 2005 Liam Girdwood <lgirdwood@gmail.com> */
/* Converted 2016 by Marcel Greter (https://www.github.com/mgreter) */

var M_PI = Math.PI;
var RAD = (648000.0 / M_PI);
var DEG = (M_PI / 180.0);

var ATH = 384747.9806743165;
var A0 = 384747.9806448954;
var AM = 0.074801329518;
var ALPHA = 0.002571881335;
var DTASM = (2.0 * ALPHA / (3.0 * AM));
var W12 = (1732559343.73604 / RAD);
var PRECES = (5029.0966 / RAD);
var C1 = 60.0;
var C2 = 3600.0;

var DELNU = ((0.55604 / RAD) / W12);
var DELNP = ((-0.06424 / RAD) / W12);

var DELG = (-0.08066 / RAD);
var DELE = (0.01789 / RAD);
var DELEP = (-0.12879 / RAD);

/* Precession matrix */
var P1 = 0.10180391e-4;
var P2 = 0.47020439e-6;
var P3 = -0.5417367e-9;
var P4 = -0.2507948e-11;
var P5 = 0.463486e-14;
var Q1 = -0.113469002e-3;
var Q2 = 0.12372674e-6;
var Q3 = 0.1265417e-8;
var Q4 = -0.1371808e-11;
var Q5 = -0.320334e-14;

/* constants with corrections for DE200 / LE200 */
var W1 =
[
	((218.0 + (18.0 / 60.0) + (59.95571 / 3600.0))) * DEG,
	1732559343.73604 / RAD,
	-5.8883 / RAD,
	0.006604 / RAD,
	-0.00003169 / RAD
];

/* Delaunay's arguments.*/
var del = [
	[ 5.198466741027443, 7771.377146811758394, -0.000028449351621, 0.000000031973462, -0.000000000154365 ],
	[ -0.043125180208125, 628.301955168488007, -0.000002680534843, 0.000000000712676, 0.000000000000727 ],
	[ 2.355555898265799, 8328.691426955554562, 0.000157027757616, 0.000000250411114, -0.000000001186339 ],
	[ 1.627905233371468, 8433.466158130539043, -0.000059392100004, -0.000000004949948, 0.000000000020217 ]
];

var zeta =
[
	(218.0 + (18.0 / 60.0) + (59.95571 / 3600.0)) * DEG,
	((1732559343.73604 / RAD) + PRECES)
];

/* Planetary arguments */
var p =
[
	[(252.0 + 15.0 / C1 + 3.25986 / C2 ) * DEG, 538101628.68898 / RAD],
	[(181.0 + 58.0 / C1 + 47.28305 / C2) * DEG, 210664136.43355 / RAD],
	[(100.0 + (27.0 / 60.0) + (59.22059 / 3600.0)) * DEG, 129597742.2758 / RAD],
	[(355.0 + 25.0 / C1 + 59.78866 / C2) * DEG, 68905077.59284 / RAD],
	[(34.0 + 21.0 / C1 + 5.34212 / C2) * DEG, 10925660.42861 / RAD],
	[(50.0 + 4.0 / C1 + 38.89694 / C2) * DEG, 4399609.65932 / RAD],
	[(314.0 + 3.0 / C1 + 18.01841 / C2) * DEG, 1542481.19393 / RAD],
	[(304.0 + 20.0 / C1 + 55.19575 / C2) * DEG, 786550.32074 / RAD]
];


function ln_range_radians2(rad) {
	return rad % (Math.PI * 2);
}

function doElp1(t, coeff) {

	var result = 0;
	var x,y;
	var tgv;
	var i,j,k;

	for (j = 0; j < coeff.length; j++) {

		tgv = coeff[j][5] + DTASM * coeff[j][9];
		x = coeff[j][4] + tgv * (DELNP - AM * DELNU) +
			coeff[j][6] * DELG + coeff[j][7] *
			DELE + coeff[j][8] * DELEP;

		y = 0;
		for (k = 0; k < 5; k++) {
			for (i = 0; i < 4; i++)
				y += coeff[j][i] * del[i][k] * t[k];
		}

		/* y in correct quad */
		// y = ln_range_radians2(y);
		result += x * Math.sin(y);
	}
	return result;

}


function doElp3(t, coeff)
{
	var result = 0;
	var x,y;
	var tgv;
	var i,j,k;

	for (j = 0; j < coeff.length; j++) {
		tgv = coeff[j][5] + DTASM * coeff[j][9];
		x = coeff[j][4] + tgv * (DELNP - AM * DELNU) +
			coeff[j][6] * DELG + coeff[j][7] *
			DELE + coeff[j][8] * DELEP;
		y = 0;
		for (k = 0; k < 5; k++) {
			for (i = 0; i < 4; i++)
				y += coeff[j][i] * del[i][k] * t[k];
		}
		y += (M_PI / 2);
		/* y in correct quad */
		// y = ln_range_radians2(y);
		result += x * Math.sin(y);
	}

	return result;
}

function doElp4(t, coeff)
{
	var result = 0;
	var i,j,k;
	var y;

	for (j = 0; j < coeff.length; j++) {
		y = coeff[j][5] * DEG;
		for (k = 0; k < 2; k++) {
			y += coeff[j][0] * zeta[k] * t[k];
			for (i = 0; i < 4; i++)
				y += coeff[j][i+1] * del[i][k] * t[k];
		}
		/* put y in correct quad */
		y = ln_range_radians2(y);
		result += coeff[j][6] * Math.sin(y);
	}

	return result;
}

function doElp7(t, coeff)
{
	var result = 0;
	var i,j,k;
	var y, A;

/*
	- earth_pert
	double iz; // 0
	double ilu[4]; // 1-4
	double O; // 5
	double A; // 6
	double P; // 7
*/

	for (j = 0; j < coeff.length; j++) {
		y = coeff[j][5] * DEG;
		A = coeff[j][6] * t[1];
		for (k = 0; k < 2; k++) {
			y += coeff[j][0] * zeta[k] * t[k];
			for (i = 0; i < 4; i++)
				y += coeff[j][i+1] * del[i][k] * t[k];
		}
		/* put y in correct quad */
		y = ln_range_radians2(y);
		result += A * Math.sin(y);
	}

	return result;
}

function doElp10(t, coeff)
{
	var result = 0;
	var i,j,k;
	var y;

/*
	double ipla[11]; // 0-10
	double theta; // 11
	double O; // 12
	double P; // 13
*/

	for (j = 0; j < coeff.length; j++) {
		y = coeff[j][11] * DEG;
		for (k = 0; k < 2; k++) {
			y += (coeff[j][8] * del[0][k]
			+ coeff[j][9] * del[2][k]
			+ coeff[j][10] * del [3][k]) * t[k];
			for (i = 0; i < 8; i++)
				y += coeff[j][i] * p[i][k] * t[k];
		}
		/* put y in correct quad */
		// y = ln_range_radians2(y);
		result += coeff[j][12] * Math.sin(y);
	}

	return result;
}

function doElp13(t, coeff)
{
	var result = 0;
	var i,j,k;
	var y,x;

	for (j = 0; j < coeff.length; j++) {
		y = coeff[j][11] * DEG;
		for (k = 0; k < 2; k++) {
			y += (coeff[j][8] * del[0][k]
			+ coeff[j][9] * del[2][k]
			+ coeff[j][10] * del [3][k]) * t[k];
			for (i = 0; i < 8; i++)
				y += coeff[j][i] * p[i][k] * t[k];
		}
		/* put y in correct quad */
		// y = ln_range_radians2(y);
		x = coeff[j][12] * t[1];
		result += x * Math.sin(y);
	}

	return result;
}

function doElp16(t, coeff) {

	var result = 0;
	var i,j,k;
	var y;
/*
	double ipla[11]; // 0-10
	double theta; // 11
	double O; // 12
	double P; // 13
*/

	for (j = 0; j < coeff.length; j++) {
		y = coeff[j][11] * DEG;
		for (k = 0; k < 2; k++) {
			for (i = 0; i < 4; i++)
				y += coeff[j][i + 7] * del[i][k] * t[k];
			for (i = 0; i < 7; i++)
				y += coeff[j][i] * p[i][k] * t[k];
		}
		/* put y in correct quad */
		// y = ln_range_radians2(y);
		result += coeff[j][12] * Math.sin(y);
	}
	return result;

}

function doElp19(t, coeff) {

	var result = 0;
	var i,j,k;
	var y,x;

	for (j = 0; j < coeff.length; j++) {
		y = coeff[j][11] * DEG;
		for (k = 0; k < 2; k++) {
			for (i = 0; i < 4; i++)
				y += coeff[j][i + 7] * del[i][k] * t[k];
			for (i = 0; i < 7; i++)
				y += coeff[j][i] * p[i][k] * t[k];
		}
		/* put y in correct quad */
		// y = ln_range_radians2(y);
		x = coeff[j][12] * t[1];
		result += x * Math.sin(y);
	}
	return result;

}

function doElp34(t, coeff) {

	var result = 0;
	var i,j,k;
	var y, A;

/*
	- earth_pert
	double iz; // 0
	double ilu[4]; // 1-4
	double O; // 5
	double A; // 6
	double P; // 7
*/

	for (j = 0; j < coeff.length; j++) {
		y = coeff[j][5] * DEG;
		A = coeff[j][6] * t[2];
		for (k = 0; k < 2; k++) {
			y += coeff[j][0] * zeta[k] * t[k];
			for (i = 0; i < 4; i++)
				y += coeff[j][i+1] * del[i][k] * t[k];
		}
		/* put y in correct quad */
		// y = ln_range_radians2(y);
		result += A * Math.sin(y);
	}
	return result;
}


// Calculate the rectangular geocentric lunar coordinates
// to the inertial mean ecliptic and equinox of J2000.
function elp2000nova(T) {

	var t = []

	/* calc julian centuries */
	t[0] = 1.0;
	t[1] = T / 100;
	t[2] = t[1] * t[1];
	t[3] = t[2] * t[1];
	t[4] = t[3] * t[1];

	/* sum elp series */
	var a = doElp1(t, elp1) + doElp4(t, elp4) + doElp7(t, elp7) + doElp10(t, elp10) + doElp13(t, elp13) +
		doElp16(t, elp16) + doElp19(t, elp19) + doElp4(t, elp22) + doElp7(t, elp25) +
		doElp4(t, elp28) + doElp4(t, elp31) + doElp34(t, elp34);
	var b = doElp1(t, elp2) + doElp4(t, elp5) + doElp7(t, elp8) + doElp10(t, elp11) + doElp13(t, elp14) +
		doElp16(t, elp17) + doElp19(t, elp20) + doElp4(t, elp23) + doElp7(t, elp26) +
		doElp4(t, elp29) + doElp4(t, elp32) + doElp34(t, elp35);
	var c = doElp3(t, elp3) + doElp4(t, elp6) + doElp7(t, elp9) + doElp10(t, elp12) + doElp13(t, elp15) +
		doElp16(t, elp18) + doElp19(t, elp21) + doElp4(t, elp24) + doElp7(t, elp27) +
		doElp4(t, elp30) + doElp4(t, elp33) + doElp34(t, elp36);

	/* calculate geocentric coords */
	a = a / RAD + W1[0] + W1[1] * t[1] + W1[2] * t[2] + W1[3] * t[3]
	    + W1[4] * t[4];
	b = b / RAD;
	c = c * A0 / ATH;

	/* calculate coords */
	var x = c * Math.cos(b);
	var y = x * Math.sin(a);
	x = x * Math.cos(a);
	var z = c * Math.sin(b);

	/* Laskars series */
	var pw = (P1 + P2 * t[1] + P3 * t[2] + P4 * t[3] + P5 * t[4]) * t[1];
	var qw = (Q1 + Q2 * t[1] + Q3 * t[2] + Q4 * t[3] + Q5 * t[4]) * t[1];
	var ra = 2.0 * Math.sqrt(1.0 - pw * pw - qw * qw);
	var pwqw = 2.0 * pw * qw;
	var pw2 = 1.0 - 2.0 * pw * pw;
	var qw2 = 1.0 - 2.0 * qw * qw;
	pw = pw * ra;
	qw = qw * ra;
	a = pw2 * x + pwqw * y + pw * z;
	b = pwqw * x + qw2 * y - qw * z;
	c = -pw * x + qw * y + (pw2 + qw2 - 1.0) * z;

	/* return coords */
	return {
		x: a * KM2AU,
		y: b * KM2AU,
		z: c * KM2AU
	}
}

function elp2000nova_ecl(J)
{
	var geo = get_lunar_geo_posn(J);
	var lng = Math.atan2(geo.y, geo.x);
	var lat = Math.atan2(geo.z, Math.sqrt(
		geo.x * geo.x + geo.y * geo.y
	));
	return { lng: lng, lat: lat };
}
