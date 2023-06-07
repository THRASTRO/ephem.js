//***********************************************************
// (c) 2022-2023 by Marcel Greter
// AstroJS Jovian Orbits utility lib
// https://github.com/mgreter/ephem.js
//***********************************************************

(function(exports)
{

	/*************************************************************************/
	// evaluate sinoid terms
	/*************************************************************************/

	// Directly copied from generator
	function EvalTerms(ts, params) {
		var i = 0, value = 0;
		for (var c = 0; c < params[i++]; c += 1) {
			var terms = params[i++];
			var min = params[i++];
			var max = params[i++];
			var sum = 0;
			for (var d = 0; d < terms; d += 1) {
				var frq = ts * params[i++] + params[i++];
				sum += Math.sin(frq) * params[i++];
			}
			value += min + (sum + 1) / 2 * (max - min)
		}
		return value;
	}

	/*************************************************************************/
	/*************************************************************************/

	function mgsolver(theory, jy2k, elems, addGM, addEpoch, off)
	{
		off = off || 0;
		jy2k = jy2k || 0;
		elems = elems || [];
		// var name = theory.name;
		var coeffs = theory.coeffs;
		// Bring time argument into valid range
		var t = (jy2k * JY2JD * JD2SEC - theory.start) / (theory.range);
		// Update elements directly from theory
		elems[off++] = EvalTerms(t, coeffs[0]) * KM2AU;
		elems[off++] = EvalTerms(t, coeffs[1]) * KM2AU;
		elems[off++] = EvalTerms(t, coeffs[2]) * KM2AU;
		elems[off++] = EvalTerms(t, coeffs[3]) * KM2AU / SEC2JD / JD2JY;
		elems[off++] = EvalTerms(t, coeffs[4]) * KM2AU / SEC2JD / JD2JY;
		elems[off++] = EvalTerms(t, coeffs[5]) * KM2AU / SEC2JD / JD2JY;
		// update optional elements
		if (addGM) elems[off++] = theory.GM;
		if (addEpoch) elems[off++] = jy2k;
		// return array
		return elems;
	}

	/*************************************************************************/
	/*************************************************************************/

	exports.mgsat23 = exports.mgsat23 || {};
	for (var body in data)
	{
		// Skip nummeric entries (duplicates)
		if (body.match(/^\d+$/)) continue;
		// We only want to register named ones
		exports.mgsat23[body] =  STATE(mgsolver, body,
			GMJY.sat, data[body]);
		// Seems all sat441l theories have the same range
		// Otherwise we'd need to define this for each one
		exports.mgsat23[body].start = -7889400000;
		exports.mgsat23[body].range = 15779059200;
	}

	/*************************************************************************/
	/*************************************************************************/

}(this))
