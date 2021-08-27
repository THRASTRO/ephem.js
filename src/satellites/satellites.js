//***********************************************************
// (c) 2016 by Marcel Greter
// AstroJS utility lib for moons
// https://github.com/mgreter/ephem.js
// pretty much only inspired by Stellarium
//***********************************************************
(function(exports)
{

	/*************************************************************************/
	/*************************************************************************/

	// update vsop elements in elems at offset and return elems array
	function vsop(solver, theory, jy2k, elems, addGM, addEpoch, off)
	{
		off = off || 0;
		jy2k = jy2k || 0;
		elems = elems || [];
		// call main theory to fill elements
		solver(theory, jy2k, elems, addGM, addEpoch, off);
		// a bit expensive to get as we need to
		// convert into cartesian to apply rotation
		// we then reconstruct the kepler elements
		// ToDo: can this be implemented directly?
		// Note: doesn't seem to be too obvious!?
		if (toVSOP = theory.toVSOP) {
			// translate via cartesian coords
			// there might be an easier way?
			// do we really need to convert?
			var orbit = new Orbit({
				a: elems[off+0],
				L: elems[off+1],
				k: elems[off+2],
				h: elems[off+3],
				q: elems[off+4],
				p: elems[off+5],
				GM: theory.GM,
				epoch: jy2k
			});
			// get state vectors
			var state = orbit.state(jy2k);
			// check for dynamic rotations
			if (typeof toVSOP == "function") {
				// get dynamic matrix
				toVSOP(jy2k, mat3);
				toVSOP = mat3;
			}
			// rotate cartesian vectors
			state.r.applyMatrix3(toVSOP);
			state.v.applyMatrix3(toVSOP);
			// create via rotated state
			orbit = new Orbit(state);
			// update state elements
			elems[off++] = orbit._a;
			elems[off++] = orbit.L();
			elems[off++] = orbit.k();
			elems[off++] = orbit.h();
			elems[off++] = orbit.q();
			elems[off++] = orbit.p();
		}
		// return state object
		return elems;
	}
	// EO vsop

	// Return an orbital object suitable to create new Orbit
	function orbital(solver, theory, jy2k, elems, addGM, addEpoch, off)
	{
		off = off || 0;
		jy2k = jy2k || 0;
		elems = elems || [];
		// call main theory to fill elements
		vsop(solver, theory, jy2k, elems, addGM, addEpoch, off);
		// return orbital object
		return {
			a: elems[off++],
			L: elems[off++],
			k: elems[off++],
			h: elems[off++],
			q: elems[off++],
			p: elems[off++],
			GM: theory.GM,
			epoch: jy2k
		};
	}
	// EO orbital

	// update state elements in elems at offset and return array
	function state(solver, theory, jy2k, elems, addGM, addEpoch, off)
	{
		off = off || 0;
		jy2k = jy2k || 0;
		elems = elems || [];
		// call main theory to fill elements
		vsop(solver, theory, jy2k, elems, addGM, addEpoch, off);
		// create orbit object from vsop array
		var orbit = new Orbit({
			a: elems[off+0],
			L: elems[off+1],
			k: elems[off+2],
			h: elems[off+3],
			q: elems[off+4],
			p: elems[off+5],
			GM: theory.GM,
			epoch: jy2k
		});
		// calculate state vector
		var state = orbit.state(jy2k);
		// update state elements
		elems[off++] = state.r.x;
		elems[off++] = state.r.y;
		elems[off++] = state.r.z;
		elems[off++] = state.v.x;
		elems[off++] = state.v.y;
		elems[off++] = state.v.z;
		// return state object
		return elems;
	}
	// EO state

	// update state elements in elems at offset and return state object
	function position(solver, theory, jy2k, elems, addGM, addEpoch, off)
	{
		off = off || 0;
		jy2k = jy2k || 0;
		elems = elems || [];
		// call main theory to fill elements
		state(solver, theory, jy2k, elems, addGM, addEpoch, off);
		// return state object
		return {
			x: elems[off++],
			y: elems[off++],
			z: elems[off++],
			vx: elems[off++],
			vy: elems[off++],
			vz: elems[off++],
			GM: theory.GM,
			epoch: jy2k
		};
	}
	// EO position

	// Export the main exporter function
	// Call this function for every theory
	exports.SATELLITE = function(solver, name, GM, coeffs, matrix)
	{
		var theory = {};
		// update raw elements in elems at offset and return elems array
		theory.raw = function satellite_raw(jy2k, elems, addGM, addEpoch, off) {
			return solver(theory, jy2k, elems, addGM, addEpoch, off);
		}
		// update vsop elements in elems at offset and return elems array
		theory.vsop = function satellite_theory(jy2k, elems, addGM, addEpoch, off) {
			return vsop(solver, theory, jy2k, elems, addGM, addEpoch, off);
		}
		// update state elements in elems at offset and return elems array
		theory.state = function satellite_state(jy2k, elems, addGM, addEpoch, off) {
			return state(solver, theory, jy2k, elems, addGM, addEpoch, off);
		}
		// update state elements in elems at offset and return state object
		theory.position = function satellite_position(jy2k, elems, addGM, addEpoch, off) {
			return position(solver, theory, jy2k, elems, addGM, addEpoch, off);
		}
		// update vsop elements in elems at offset and return orbital object
		theory.orbital = function satellite_orbital(jy2k, elems, addGM, addEpoch, off) {
			return orbital(solver, theory, jy2k, elems, addGM, addEpoch, off);
		}
		// update vsop elements in elems at offset and return orbit object
		theory.orbit = function satellite_orbit(jy2k, elems, addGM, addEpoch, off) {
			return new Orbit(orbital(solver, theory, jy2k, elems, addGM, addEpoch, off));
		}
		// Attach static properties
		theory.toVSOP = matrix;
		theory.coeffs = coeffs;
		theory.GM = GM;
		// short name only
		theory.name = name;
		// Return theory
		return theory;
	}
	// EO export vsop2k

	/*************************************************************************/
	/*************************************************************************/

})(this);