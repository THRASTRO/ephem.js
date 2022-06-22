//***********************************************************
// (c) 2016-2021 by Marcel Greter
// AstroJS VSOP87 utility lib
// https://github.com/mgreter/ephem.js
//***********************************************************
(function(exports) {

	// update state elements in elems at offset and return state object
	function position(solver, theory, jy2k, elems, addGM, addEpoch, off)
	{
		off = off || 0;
		jy2k = jy2k || 0;
		elems = elems || [];
		// call main theory to fill elements
		solver(theory, jy2k, elems, addGM, addEpoch, off);
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

	// update vsop elements in elems at offset and return array
	function vsop(solver, theory, jy2k, elems, addGM, addEpoch, off)
	{
		off = off || 0;
		jy2k = jy2k || 0;
		elems = elems || [];
		// call main theory to fill elements
		solver(theory, jy2k, elems, addGM, addEpoch, off);
		// create orbit object from vsop array
		var orbit = new Orbit({
			x: elems[off+0],
			y: elems[off+1],
			z: elems[off+2],
			vx: elems[off+3],
			vy: elems[off+4],
			vz: elems[off+5],
			GM: theory.GM,
			epoch: jy2k
		});
		// update state elements
		elems[off++] = orbit._a;
		elems[off++] = orbit.L();
		elems[off++] = orbit.k();
		elems[off++] = orbit.h();
		elems[off++] = orbit.q();
		elems[off++] = orbit.p();
		// return array
		return elems;
	}
	// EO vsop

	// update state elements in elems at offset and return orbital object
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

	// Export the main export function
	// Call this function for each theory
	exports.STATE = exports.STATE || function(solver, name, GM, coeffs)
	{
		var theory = {};
		// update vsop elements in elems at offset and return elems array
		theory.vsop = function vsop_theory(jy2k, elems, addGM, addEpoch, off) {
			return vsop(solver, theory, jy2k, elems, addGM, addEpoch, off);
		}
		// update state elements in elems at offset and return elems array
		theory.state = function vsop_state(jy2k, elems, addGM, addEpoch, off) {
			return solver(theory, jy2k, elems, addGM, addEpoch, off);
		}
		// update state elements in elems at offset and return state object
		theory.position = function vsop_state(jy2k, elems, addGM, addEpoch, off) {
			return position(solver, theory, jy2k, elems, addGM, addEpoch, off);
		}
		// update state elements in elems at offset and return orbital object
		theory.orbital = function vsop_orbital(jy2k, elems, addGM, addEpoch, off) {
			return orbital(solver, theory, jy2k, elems, addGM, addEpoch, off);
		}
		// update state elements in elems at offset and return orbit object
		theory.orbit = function vsop_orbit(jy2k, elems, addGM, addEpoch, off) {
			return new Orbit(orbital(solver, theory, jy2k, elems, addGM, addEpoch, off));
		}
		// Attach static properties
		theory.coeffs = coeffs;
		theory.GM = GM;
		// short name only
		theory.name = name;
		// Return theory
		return theory;
	}
	// EO export STATE

})(this);