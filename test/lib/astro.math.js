// global constants for math operations
// should probably put into a namespace

// astronomical units to meters
var AU2M = 1.495978707e+11;
var M2AU = 1 / AU2M;

var AU2KM = AU2M / 1000;
var KM2AU = M2AU * 1000;

// metric conversion
var KM2M = 1000;
var M2KM = 1 / KM2M;

// exponential factors
var KM2AU2 = KM2AU * KM2AU;
var KM2AU3 = KM2AU2 * KM2AU;

// J2000 epoch in JD
var T2K = 2451545.0; // TT

// julian day conversion
var JY2JD = 365.25;
var JD2JY = 1 / JY2JD;

// time conversion
var DAY2SEC = 24*60*60;
var SEC2DAY = 1 / DAY2SEC;

// solar mass conversion
var MSOL2KG = 1.98855e30;
var KG2MSOL = 1 / MSOL2KG;

// Julian Days to J2000
function JD2J2K (JD)
{
	// offset epoch and add ratio
	return (JD - T2K) / JY2JD;
}

// J2000 to Julian Days
function J2K2JD (J2K)
{
	// add ratio and offset epoch
	return J2K * JY2JD + T2K;
}

// Gravitational parameters for astronomic scale
// time in days, distance in AU, mass in sun-mass
// http://astronomy.stackexchange.com/a/7981
// GM * M2AU^3 * DAY2SEC^2 * MSOL2KG
var GMP = {
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
	plu: 2.1886997654259696800e-12 // plu
};

// maximum iterations to find
// a value in range for epsilon
// used in Newton-Raphson solver
var MAXLOOP = 12;
var EPSILON = 1e-12;

// use TAU, PI is wrong
var PI = 1 * Math.PI;
var TAU = 2 * Math.PI;

// trig conversion factors
var DEG2RAD = TAU / 360;
var RAD2DEG = 360 / TAU;
var HMS2RAD = TAU / 24;
var RAD2HMS = 24 / TAU;
var HMS2DEG = 360 / 24;
var DEG2HMS = 24 / 360;

// from 0 to TAU
// one full cycle
function CYCLE(rad) {
	rad %= TAU;
	if (rad < 0)
		rad += TAU;
	return rad;
}

// from -PI to +PI
// turn left/right
function TURN(rad) {
	rad %= TAU;
	if (rad > PI)
		rad -= TAU;
	return rad;
}

// polyfill for cube root function
// from https://developer.mozilla.org
Math.cbrt = Math.cbrt || function(x) {
	var y = Math.pow(Math.abs(x), 1/3);
	return x < 0 ? -y : y;
};

// THREE.Vector3 compatible implementation
if (typeof THREE != "undefined") {
	window.Vector3 = THREE.Vector3;
}