//***********************************************************
// (c) 2016-2021 by Marcel Greter
// AstroJS VSOP2010/13 utility lib
// https://github.com/mgreter/ephem.js
//***********************************************************
(function(exports) {

	// factors for the angles (sin/cos phi)
	function vsop2k_time_factors(jm2k) {
		return [
			4.402608631669 + 26087.9031406856 * jm2k,
			3.176134461576 + 10213.2855474345 * jm2k,
			1.753470369433 + 6283.07585035322 * jm2k,
			6.203500014141 + 3340.61243414546 * jm2k,
			4.09136000305 + 1731.17045272186 * jm2k,
			1.713740719173 + 1704.4508550272 * jm2k,
			5.598641292287 + 1428.94891784427 * jm2k,
			2.805136360408 + 1364.75651362999 * jm2k,
			2.32698973462 + 1361.92320763284 * jm2k,
			0.599546107035 + 529.690961562325 * jm2k,
			0.874018510107 + 213.299086108488 * jm2k,
			5.481225395663 + 74.781659030778 * jm2k,
			5.311897933164 + 38.132972226125 * jm2k,
			0.359536228504931 * jm2k,
			5.19846640063 + 77713.7714481804 * jm2k,
			1.62790513602 + 84334.6615717837 * jm2k,
			2.35555563875 + 83286.9142477147 * jm2k,
		];
	}
	// EO vsop2k_time_factors

	// evaluate coefficients for one parameter
	function vsop2k_coeffs_eval(coeffs, jm2k, F)
	{
		var rv = 0;
		for (var n = 0; n < coeffs.length; n += 1) {
			var sum = 0, c = coeffs[n], iL = c.length;
			for (var i = 0; i < iL; i += 3) {
				var S = c[i+0], C = c[i+1], phis = c[i+2];
				for (var p = 0, phi = 0; p < phis.length; p += 2) {
					phi += F[phis[p+0]-1] * phis[p+1];
				}
				sum += S * Math.sin(phi) + C * Math.cos(phi);
			}
			rv += sum * Math.pow(jm2k, n);
		}
		return rv;
	}
	// EO vsop2k_coeffs_eval

	// generic vsop2010/2013 solver (pass coefficients and time)
	// time is julian years from j2000 (delta JD2451545.0 in JY)
	function vsop2k_theory(theory, jy2k, elems, addGM, addEpoch, off)
	{
		off = off || 0;
		jy2k = jy2k || 0;
		elems = elems || [];
		// want in thousand years
		var jm2k = jy2k / 1000;
		// get the coefficients
		var coeffs = theory.coeffs;
		// calculate the time factor
		var F = vsop2k_time_factors(jm2k);
		// compute all parameters and update elements
		elems[off++] = vsop2k_coeffs_eval(coeffs.a, jm2k, F),
		elems[off++] = CYCLE(vsop2k_coeffs_eval(coeffs.L, jm2k, F)),
		elems[off++] = vsop2k_coeffs_eval(coeffs.k, jm2k, F),
		elems[off++] = vsop2k_coeffs_eval(coeffs.h, jm2k, F),
		elems[off++] = vsop2k_coeffs_eval(coeffs.q, jm2k, F),
		elems[off++] = vsop2k_coeffs_eval(coeffs.p, jm2k, F);
		// update optional elements
		if (addGM) elems[off++] = theory.GM;
		if (addEpoch) elems[off++] = jy2k;
		// return array
		return elems;
	}
	// EO vsop2k_theory

	// Export the main export function
	// Call this function for each theory
	exports.VSOP2K = function(name, GM, coeffs)
	{
		// export generic VSOP theory with solver attached
		return exports.VSOP(vsop2k_theory, name, GM, coeffs);
	}
	// EO exports.VSOP2K

})(this);