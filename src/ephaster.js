//***********************************************************
// (c) 2016 by Marcel Greter
// AstroJS EPHASTER utility lib
// https://github.com/mgreter/ephem.js
//***********************************************************
(function(window) {

	// generic asteroid series solver (pass coefficients and time)
	if (typeof window.ephaster !== "function") {
		// only define once in global scope
		// otherwise we overwrite loaded data
		window.ephaster = function ephaster(coeffss, jd)
		{

			var nser = 0;
			// ToDo: which series to use?
			// seems to be time dependent
			if (jd >= 2415020.5) nser = 0;
			if (jd >= 2436620.5) nser = 1;
			if (jd >= 2452820.5) nser = 2;

			// barycenter only has one
			if (nser >= coeffss.length) {
				nser = coeffss.length - 1;
			}

			// calculate all position parameters
			for (var iv = 0, v = []; iv < 3; iv += 1) {

				// init position parameter
				v[iv] = 0

				// get parameters of series
				var coeffs = coeffss[nser][iv],
				    tzero = coeffs[0],
				    dt = coeffs[1],
				    hcoeffs = coeffs[3],
				    mcoeffs = coeffs[4],
				    wx = 1, wxx = 1;

				// initialize vars (avoid division by zero)
				var x = dt ? 2 * (jd - tzero) / dt - 1 : 0,
				    fx = dt ? dt / 2 * x : jd - tzero;

				// Evaluation of the constant and purely
				// secular part of the series
				for (var i = 0, hL = hcoeffs.length; i < hL; i += 1) {
					v[iv] += hcoeffs[i][0] * wx, wx *= x;
					v[iv] += hcoeffs[i][1] * wx, wx *= x;
				}

				// Evaluation of Poisson terms in the series
				for (var m = 0, mL = mcoeffs.length; m < mL; m += 1) {
					var ws = 0; // calculate one factor first
					for (var i = 0, iL = mcoeffs[m].length; i < iL; i += 1) {
						var coeffs = mcoeffs[m][i];
						// coefficients of the cosine (AU)
						var ct = coeffs[0];
						// coefficients of the sine (AU)
						var st = coeffs[1];
						// frequencies (radian/day)
						var fq = coeffs[2];
						// angular argument
						var f = fq * fx;
						// sum up the series
						ws += ct * Math.cos(f)
						    + st * Math.sin(f);
					}
					// sum up the position
					v[iv] += ws * wxx;
					// next power
					wxx *= x;
				}

			}
			// EO each iv

			// return object
			return {
				x: v[0],
				y: v[1],
				z: v[2]
			}
		}
	}
	// EO fn ephaster

})(window);