//***********************************************************
// (c) 2017 by Marcel Greter
// AstroJS Jovian Position utility lib
// https://github.com/mgreter/ephem.js
//***********************************************************

// this is an implementation of the algorithm laid
// out by Jean Meeus in Astronomical Algorithms
// Chapter 44, Positions of the Satellites of Jupiter.
// Returned coordinates are in units of Jupiter radii.
// This only implements the basic version
// Implementation is not unit tested!

// This implementation is more or less a direct port from MIT licensed
// https://github.com/soniakeys/meeus/blob/master/jupitermoons/jupitermoons.go
// There are other very similar implementations, ie. comments are from
// http://skylook.lamost.org/akklets/Akk/Astro/Jupiter.java

// It is only useful for basic calculations
// It does not predict the orbitals directly
// Could probably be extracted from the math
// Positions are always viewed from earth
// Returned coordinates are in Jupiter radii.

function jovians(jde)
{

	// deg to rad conversion
	var p = Math.PI / 180;
	var d = jde - 2451545.0;

	// Argument for the long-period term in the motion of Jupiter:
	var V = 172.74 * p + .00111588 * p * d;
	// pre-calculate for later
	var sV = Math.sin(V);

	// Mean anomalies of Earth and Jupiter:
	var M = 357.529 * p + .9856003 * p * d;
	var N = 20.02 * p + .0830853 * p * d + .329 * p * sV;

	// Diff between the mean heliocentric longitudes of Earth & Jupiter:
	var J = 66.115 * p + .9025179 * p * d - .329 * p * sV;
	// Equations of the center of Earth and Jupiter:
	var sM = Math.sin(M), cM = Math.cos(M);
	var sN = Math.sin(N), cN = Math.cos(N);
	var s2M = Math.sin(2 * M), c2M = Math.cos(2 * M);
	var s2N = Math.sin(2 * N), c2N = Math.cos(2 * N);
	var A = 1.915 * p * sM + .02 * p * s2M;
	var B = 5.555 * p * sN + .168 * p * s2N;
	var K = J + A - B;

	// pre-calculate for later
	var sK = Math.sin(K), cK = Math.cos(K);

	// Radius vector of the earth (Distances in AU):
	var R = 1.00014 - .01671 * cM - .00014 * c2M;
	// Radius vector of Jupiter (Distances in AU):
	var r = 5.20872 - .25208 * cN - .00611 * c2N;

	// Earth-Jupiter distance in AU:
	var Δ = Math.sqrt(r * r + R * R - 2 * r * R * cK);
	// Phase angle of Jupiter (always btw. -12 and 12 degrees):
	var ψ = Math.asin(R / Δ * sK);

	var dd = d - Δ / 173;

	// calculate the angles of each of the satellites:
	var u1 = 163.8069 * p + 203.4058646 * p * dd + ψ - B
	var u2 = 358.414 * p + 101.2916335 * p * dd + ψ - B
	var u3 = 5.7176 * p + 50.234518 * p * dd + ψ - B
	var u4 = 224.8092 * p + 21.48798 * p * dd + ψ - B

	// and the planetocentric angular distance of
	// the earth from the equator of Jupiter:
	var λ = 34.35 * p + .083091 * p * d + .329 * p * sV + B;
	var DS = 3.12 * p * Math.sin(λ + 42.8 * p);
	var DE = DS - 2.22 * p * Math.sin(ψ) * Math.cos(λ + 22 * p) -
		1.3 * p * (r - Δ) / Δ * Math.sin(λ - 100.5 * p);
	var G = 331.18 * p + 50.310482 * p * dd
	var H = 87.45 * p + 21.569231 * p * dd

	// calculate correction factors:
	var s212 = Math.sin(2 * (u1 - u2)), c212 = Math.cos(2 * (u1 - u2))
	var s223 = Math.sin(2 * (u2 - u3)), c223 = Math.cos(2 * (u2 - u3))
	var sG = Math.sin(G), cG = Math.cos(G)
	var sH = Math.sin(H), cH = Math.cos(H)
	var c1 = .473 * p * s212
	var c2 = 1.065 * p * s223
	var c3 = .165 * p * sG
	var c4 = .843 * p * sH

	// Calculate the distances:
	var r1 = 5.9057 - .0244 * c212
	var r2 = 9.3966 - .0882 * c223
	var r3 = 14.9883 - .0216 * cG
	var r4 = 26.3627 - .1939 * cH
	var sDE = Math.sin(DE)

	// pre-calculate
	var uc1 = u1 + c1;
	var uc2 = u2 + c2;
	var uc3 = u3 + c3;
	var uc4 = u4 + c4;

	// get positions
	return [
		{ x: r1 * Math.sin(uc1), y: -r1 * Math.cos(uc1) * sDE },
		{ x: r2 * Math.sin(uc2), y: -r2 * Math.cos(uc2) * sDE },
		{ x: r3 * Math.sin(uc3), y: -r3 * Math.cos(uc3) * sDE },
		{ x: r4 * Math.sin(uc4), y: -r4 * Math.cos(uc4) * sDE }
	]

}
// EO jovians
