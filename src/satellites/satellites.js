//***********************************************************
// (c) 2016 by Marcel Greter
// AstroJS utility lib for moons
// https://github.com/mgreter/ephem.js
// pretty much only inspired by Stellarium
//***********************************************************
(function (exports)
{

	/*************************************************************************/
	/*************************************************************************/

	// re-used below
	// allocate once
	var elem = [];

	// import math functions
	var cbrt = Math.cbrt;

	/*************************************************************************/
	/*************************************************************************/

	// calculate VSOP orbital elements in local frame
	function getOrbital(t, body, orbital)
	{
		// js is funky :)
		var fn = this;
		// re-use or create
		orbital = orbital || {};
		// call function with adjusted epoch
		if (!fn || typeof fn != "function") debugger;
		fn(t * 365.25 + fn.epoch, body, elem);
		// get semi-major-axis from via `n` parameter
		// here the first parameter gives the mean motion
		// directly related to period and semi-major-axis
		if (fn.type == 'n') elem[0] =
			cbrt(fn.rmu[body] / (elem[0] * elem[0]));
		// move over to result object
		orbital.a = elem[0]; orbital.L = elem[1];
		orbital.k = elem[2]; orbital.h = elem[3];
		orbital.q = elem[4]; orbital.p = elem[5];
		// set the epoch
		orbital.t = t;
		// return object
		return orbital;
	}
	// EO getOrbital

	/*************************************************************************/
	/*************************************************************************/

	// re-use rotation matrix
	var mat3 = new THREE.Matrix3();

	// get VSOP reference frame elements
	// corrections applied for VSOP87 frame
	function getOrbitalVSOP87(t, body, orbital)
	{
		// js is funky :)
		var fn = this;
		// get uncorrected VSOP elements from function
		orbital = getOrbital.call(fn, t, body, orbital);
		// a bit expensive to get as we need to
		// convert into cartesian to apply rotation
		// we then reconstruct the kepler elements
		// ToDo: can the be implemented directly?
		// Note: doesn't seem to be too obvious!?
		if (matrix = fn.VSOP87mat3) {
			// translate via cartesian coords
			// there might be an easier way?
			// do we really need to convert?
			var orb = new Orbital(orbital);
			// get state vectors
			var state = orb.state(t);
			// check for dynamic rotations
			if (typeof matrix == "function") {
				// get dynamic matrix
				matrix(t, mat3);
				matrix = mat3;
			}
			// rotate cartesian vectors
			state.r.applyMatrix3(matrix);
			state.v.applyMatrix3(matrix);
			// create via rotated state
			orb = new Orbital(state);
			// store results on original object
			orbital.a = orb.a(); orbital.L = orb.L();
			orbital.k = orb.k(); orbital.h = orb.h();
			orbital.q = orb.q(); orbital.p = orb.p();
			orbital.r = orb.r(); orbital.v = orb.v();
		}
		// return object
		return orbital;
	}
	// EO getOrbitalVSOP87

	/*************************************************************************/
	/*************************************************************************/

	// calculate VSOP and state vectors
	function getCartesian(t, body, state)
	{
		// re-use or create
		state = state || {};
		// call main theory
		getOrbitalVSOP87.call(this, t, body, state);
		// attach state vectors (already calculated)
		state.x = state.r.x; state.vx = state.v.x;
		state.y = state.r.y; state.vy = state.v.y;
		state.z = state.r.z; state.vz = state.v.z;
		// return object
		return state;
	}
	// EO getCartesian

	/*************************************************************************/
	/*************************************************************************/

	// helper function to setup satellite
	function setupSatellite(fn, body, name)
	{
		fn[name] = function (t, orbital) { return getOrbitalVSOP87.call(fn, t, body, orbital); }
		fn[name].orb = function (t, coords) { return getOrbital.call(fn, t, body, orbital); }
		fn[name].xyz = function (t, coords) { return getCartesian.call(fn, t, body, coords); }
	}
	// EO setupSatellite

	// helper function to setup satellites
	function setup(type, fn, epoch, matrix3, satellites, rmu)
	{
		fn.type = type, fn.epoch = epoch, fn.VSOP87mat3 = matrix3, fn.rmu = rmu;
		fn.xyz = function xyz(t, body, state) { return getCartesian.call(fn, t, body, state); }
		fn.orb = function orb(t, body, orbital) { return getOrbital.call(fn, t, body, orbital); }
		fn.vsop = function orb(t, body, orbital) { return getOrbital.call(fn, t, body, orbital); }
		for (var i = 0; i < satellites.length; i++) setupSatellite(fn, i, satellites[i]);
		return fn; // return for assignment
	}
	// EO setupSatellites

	/*************************************************************************/
	/*************************************************************************/

	// giving credit where credit is due
	// export them under Stellarium namespace
	// functions are pretty much taken one to one
	exports.Stellarium = setup;

	/*************************************************************************/
	/*************************************************************************/

})(this);