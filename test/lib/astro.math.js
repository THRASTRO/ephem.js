/*############################################################################*/
// AstroJS Base Math Module (c) 2016 by Marcel Greter
// https://www.github.com/mgreter/astrojs/LICENSE
/*############################################################################*/

// global constants for math operations

// JDs in one JY
var JY2JD = 365.25;
// J2000 epoch in JD
var JD2000 = 2451545.0;

// use TAU, PI is wrong ;)
var PI = 1 * Math.PI;
var TAU = 2 * Math.PI;

// create namespace for constants
// we still define local variables
// wrap anonymous function around!
var AstroJS = this.AstroJS = {

	// astronomical units to meters
	AU2M: 1.495978707e+11,
	// astronomical units to kilometers
	AU2KM: 1.495978707e+8,
	// parsecs to meters
	PC2M: 30856776e9,
	// parsecs to AUs
	PC2AU: 206265,
	PC2LY: 3.26156,
	// metric conversion
	KM2M: 1000,
	// julian day conversion
	JY2JD: JY2JD,
	// time conversion
	JD2SEC: 24 * 60 * 60,
	// solar mass conversion
	MSOL2KG: 1.98855e30,
	// trig conversion factors
	DEG2RAD: TAU / 360,
	// not very useful!
	// HMS2RAD: TAU / 24,
	// HMS2DEG: 360 / 24,
}

// JulianYear    = 365.25      // days
// JulianCentury = 36525       // days
// BesselianYear = 365.2421988 // days

// create inverted functions
for (var name in AstroJS) {
	var units = name.split('2', 2);
	var inv = units.reverse().join('2');
	AstroJS[inv] = 1 / AstroJS[name];
}

AstroJS.exportConstants =
	// export function might be handy
	function exportAstroConstants(base)
	{
		for (var name in AstroJS) {
			base[name] = AstroJS[name];
		}
	}

AstroJS.DMS2RAD =
	// degrees, minutes, seconds to rad
	function DMS2RAD(d, m, s)
	{
		var dms = Math.abs(d);
		var sigma = d < 0 ? -1 : 1;
		dms += m / 60 + s / 60 / 60;
		return sigma * dms * DEG2RAD;
	}

AstroJS.HMS2RAD =
	// hours, minutes, seconds to rad
	function HMS2RAD(h, m, s)
	{
		return DMS2RAD(h, m, s) * 15;
	}

// additional exports
AstroJS.PI = PI;
AstroJS.TAU = TAU;
AstroJS.JD2000 = JD2000;

// Gravitational parameters for astronomic scale
// time in days, distance in AU, mass in sun-mass
// http://astronomy.stackexchange.com/a/7981
// GM * M2AU^3 * JD2SEC^2 * MSOL2KG
var GMJD = AstroJS.GMJD = {
	// VSOP2013 Masses system (INPOP10A)
	sun: 2.9591220836841438269e-04, // sun
	mer: 4.9125474514508118699e-11, // mer
	ven: 7.2434524861627027000e-10, // ven
	ear: 8.9970116036316091182e-10, // ear
	emb: 8.9970116036316091182e-10, // emb
	mar: 9.5495351057792580598e-11, // mar
	jup: 2.8253458420837780000e-07, // jup
	sat: 8.4597151856806587398e-08, // sat
	ura: 1.2920249167819693900e-08, // ura
	nep: 1.5243589007842762800e-08, // nep
	plu: 2.1886997654259696800e-12, // plu
	moon: 1.0936508975881017456e-11 // moon
};

// covert to a different time factor
// time in julian years, distance in AU
var GMJY = AstroJS.GMJY = {};
for (var name in GMJD) {
	GMJY[name] = GMJD[name];
	GMJY[name] *= 133407.5625;
	// => Math.pow(365.25, 2)
}

// covert to a different time factor
// time in julian seconds, distance in AU
// https://www.aanda.org/articles/aa/full_html/2013/09/aa21843-13/T1.html
/*
var GMJS = AstroJS.GMJS = {};
for (var name in GMJD) {
	GMJS[name] = GMJD[name];
	GMJS[name] /= 746496e4;
	// => Math.pow(86400, 2)
}
*/

AstroJS.CYCLE =
	// from 0 to TAU
	// one full cycle
	function CYCLE(rad)
	{
		rad %= TAU;
		if (rad < 0)
			rad += TAU;
		return rad;
	}

AstroJS.TURN =
	// from -PI to +PI
	// turn left/right
	function TURN(rad)
	{
		rad %= TAU;
		if (rad > PI)
			rad -= TAU;
		return rad;
	}

AstroJS.JDtoJY2K =
	// Julian Days to J2000
	function JDtoJY2K(JD)
	{
		// offset epoch and add ratio
		return (JD - JD2000) / JY2JD;
	}

AstroJS.JY2KtoJD =
	// J2000 to Julian Days
	function JY2KtoJD(J2K)
	{
		// add ratio and offset epoch
		return J2K * JY2JD + JD2000;
	}

// export into global scope
AstroJS.exportConstants(this);

// internal constants for math operations

// exponential factors
var KM2AU2 = Math.pow(AstroJS.KM2AU, 2);
var KM2AU3 = Math.pow(AstroJS.KM2AU, 3);

// maximum iterations to find
// a value in range for epsilon
// used in Newton-Raphson solver
var MAXLOOP = 12;
var EPSILON = 1e-12;

// polyfill for cube root function
// from https://developer.mozilla.org
Math.cbrt = Math.cbrt || function (x)
{
	var y = Math.pow(Math.abs(x), 1 / 3);
	return x < 0 ? -y : y;
};

// makes it easier to port C code
Math.fmod = Math.fmod || function (a, b)
{
	return a % b;
}
// THREEJS compatible implementation
if (typeof THREE != "undefined") {
	var Vector3 = this.Vector3 = THREE.Vector3;
	var Matrix3 = this.Matrix3 = THREE.Matrix3;
	var Matrix4 = this.Matrix4 = THREE.Matrix4;
	var Quaternion = this.Quaternion = THREE.Quaternion;
}
