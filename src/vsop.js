// ***************************************************************
// this file is just for reference. It is the closest
// implementation to convert VSOP orbital elements to
// cartesian coordinates (from original fortran sources)
// ***************************************************************

// ***************************************************************
// complex number functions from fortran
// ***************************************************************

// conjugate complex number
function conjugate(v) {
	return [ v[0],-v[1] ]
}
// complex exponential function
function cdexp(v) {
	return [ Math.cos(v[1]), Math.sin(v[1]) ]
}
// complex number or vector length
function length(v) {
	return Math.sqrt(v[0]*v[0] + v[1]*v[1]);
}
// complex number or vector product
function product(a, b) {
	return [ a[0]*b[0]-a[1]*b[1], a[0]*b[1]+a[1]*b[0] ];
}

// ***************************************************************
// calculate position from elliptic elements (alkhqp)
// this function is directly adapted from VSOP2013.f
// ***************************************************************
function vsop2cart(a, l, k, h, q, p, arc)
{

	if (!arc) arc = 0;

	var fi = Math.sqrt(1.0 - k*k - h*h);
	var ki = Math.sqrt(1.0 - q*q - p*p);
	var u = 1.0 / (1.0 + fi);
	var z = [k, h];

	var ex = length(z);
	var ex2 = ex * ex;
	var ex3 = ex2 * ex;
	var z1 = conjugate(z);

	var gl = (l + arc) % (Math.PI * 2);
	var gm = gl - Math.atan2(h, k);
	var e = gl + (ex - 0.125 * ex3) * Math.sin(gm)
	          + 0.5 * ex2 * Math.sin(2.0 * gm)
	          + 0.375 * ex3 * Math.sin(3.0 * gm);

	var z2;
	var z3;
	var zteta;
	var rsa = 0.0;

	for (var count = 0; count < 10; count ++) {

		z2 = [0, e];
		zteta = cdexp(z2);
		z3 = product(z1, zteta);
		var dl = gl - e + z3[1];
		rsa = 1.0 - z3[0];
		if (Math.abs(dl) < 1e-15) break;
		e += dl / rsa;
	}

	z1 = [
		z[0] * u * z3[1],
		z[1] * u * z3[1]		
	];
	z2 = [z1[1],- z1[0]];

	// vec2 zto = (- z + zteta + z2) / rsa;
	var zto = [
		(- z[0] + zteta[0] + z2[0]) / rsa,
		(- z[1] + zteta[1] + z2[1]) / rsa,
	];

	// complex `zto` from kepler

	var cw = zto[0];
	var sw = zto[1];

	var m = p * cw - q * sw;
	var r = a * rsa;

	return [
		r * (cw - 2.0 * p * m),
		r * (sw + 2.0 * q * m),
		-2.0 * r * ki * m
	];

}
