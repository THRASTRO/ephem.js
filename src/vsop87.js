//***********************************************************
// (c) 2016-2021 by Marcel Greter
// AstroJS VSOP87 utility lib
// https://github.com/mgreter/ephem.js
//***********************************************************
(function(exports) {

	// generic vsop87 solver (pass coefficients and time)
	// this is basically a one to one translation from the official
	// fortran code in vsop87.f at around line 185. Only change is
	// that I took out the multiplication for the summands and apply
	// it after the sum has been calculated. IMO this should be a bit
	// faster than the original implementation, but not sure if the
	// precision will suffer from that change.
	function vsop87_theory(theory, jy2k, elems, addGM, addEpoch, off)
	{
		off = off || 0;
		jy2k = jy2k || 0;
		elems = elems || [];
		// get the coefficients
		var coeffs = theory.coeffs;
		// want in thousand years
		var t = jy2k / 1000, orb = {},
			u, cu, tt = [0, 1, t, t*t];
		// reuse old multiplications
		// fortran t(x) array starts at -1!
		// therefore t(it) = tt[it+1] (js)
		tt[4] = tt[3] * t, tt[5] = tt[4] * t, tt[6] = tt[5] * t;
		// do a cheap test if coefficients are from the main vsop87
		// theories. All other [a-e] only need 3 to calculate the
		// full 6 elements (velocity is calculated from position).
		var main = 'a' in coeffs;
		// calculate poisson series
		for (var v in coeffs) {
			// init result holders
			orb[v] = 0;
			if (!main) orb['v'+v] = 0;
			// loop all coefficients for all powers (t^0, t^1, t^2, etc.)
			for (var it = 0; it < coeffs[v].length; it += 1) {
				var pow_sum = 0, dpow_sum = 0, coeff = coeffs[v][it];
				for (var i = 0, cl = coeff.length; i < cl; i += 3) {
					// assign coefficients as in fortran code
					// `read (lu,1002,err=500) a,b,c` (line 187)
					var a = coeff[i+0], b = coeff[i+1], c = coeff[i+2];
					// `u=b+c*t(1)` and `cu=dcos(u)`
					u = b + c * t, cu = Math.cos(u);
					// `r(ic)=r(ic)+a*cu*t(it)`
					pow_sum += a * cu * tt[it+1];
					// condition for `if (iv.eq.0) goto 200`
					// calculation for `t(it)*a*c*su` (line 194)
					// note to myself: tt[it]*it != tt[it+1]
					if (!main) dpow_sum += tt[it]*it*a*cu - tt[it+1]*a*c*Math.sin(u);
				}
				// this is the step for r(ic)=r(ic)+(...) (line 191)
				orb[v] += pow_sum; /*t(it)*/;
				if (!main) orb['v'+v] += dpow_sum / 365250;
			}
		}
		// normalize angles
		if ('L' in orb) {
			orb.L = orb.L % (Math.PI * 2);
			if (orb.L < 0) orb.L += (Math.PI * 2);
		}
		if ('l' in orb) {
			orb.l = orb.l % (Math.PI * 2);
			if (orb.l < 0) orb.l += (Math.PI * 2);
		}
		if ('b' in orb) {
			orb.n = orb.n % (Math.PI * 2);
			if (orb.n < 0) orb.n += (Math.PI * 2);
		}
		// set orbital epoch
		orb.epoch = jy2k;
		// return orbital
		return orb;
	}
	// EO vsop87_theory

	// Export the main export function
	// Call this function for each theory
	exports.VSOP87 = exports.VSOP87 || function(name, GM, coeffs)
	{
		// export generic VSOP theory with solver attached
		return exports.VSOP(vsop87_theory, name, GM, coeffs);
	}
	// EO exports.VSOP87

})(this);