//***********************************************************
// (c) 2016 by Marcel Greter
// AstroJS VSOP2010/13 utility lib
// https://github.com/mgreter/ephem.js
//***********************************************************
(function(self) {

	// factors for the angles (sin/cos phi)
	function vsop2k_time_factors(kj2ky) {
		return [
			4.402608631669 + 26087.9031406856 * kj2ky,
			3.176134461576 + 10213.2855474345 * kj2ky,
			1.753470369433 + 6283.07585035322 * kj2ky,
			6.203500014141 + 3340.61243414546 * kj2ky,
			4.09136000305 + 1731.17045272186 * kj2ky,
			1.713740719173 + 1704.4508550272 * kj2ky,
			5.598641292287 + 1428.94891784427 * kj2ky,
			2.805136360408 + 1364.75651362999 * kj2ky,
			2.32698973462 + 1361.92320763284 * kj2ky,
			0.599546107035 + 529.690961562325 * kj2ky,
			0.874018510107 + 213.299086108488 * kj2ky,
			5.481225395663 + 74.781659030778 * kj2ky,
			5.311897933164 + 38.132972226125 * kj2ky,
			0.359536228504931 * kj2ky,
			5.19846640063 + 77713.7714481804 * kj2ky,
			1.62790513602 + 84334.6615717837 * kj2ky,
			2.35555563875 + 83286.9142477147 * kj2ky,
		];
	}

	// evaluate coefficients for one parameter
	function vsop2k_coeffs_eval(coeffs, kj2ky, F)
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
			rv += sum * Math.pow(kj2ky, n);
		}
		return rv;
	}

	// generic vsop2010/2013 solver (pass coefficients and time)
	// time is julian years from j2000 (delta JD2451545.0 in JY)
	if (typeof self.vsop2k !== "function") {
		// only define once in global scope
		// otherwise we overwrite loaded data
		self.vsop2k = function vsop2k(coeffs, j2ky)
		{
			// want in thousand years
			var kj2ky = j2ky / 1000;
			// first calculate the angle factors
			var F = vsop2k_time_factors(kj2ky),
			    // the compute value for all parameters
			    xa = vsop2k_coeffs_eval(coeffs.a, kj2ky, F),
			    xl = vsop2k_coeffs_eval(coeffs.L, kj2ky, F),
			    xk = vsop2k_coeffs_eval(coeffs.k, kj2ky, F),
			    xh = vsop2k_coeffs_eval(coeffs.h, kj2ky, F),
			    xq = vsop2k_coeffs_eval(coeffs.q, kj2ky, F),
			    xp = vsop2k_coeffs_eval(coeffs.p, kj2ky, F);
			// normalize angle
			xl %= Math.PI * 2;
			if (xl < 0) {
				xl += Math.PI * 2;
			}
			// return object
			return {
				a: xa, L: xl,
				k: xk, h: xh,
				q: xq, p: xp
			};
		}
	}
	// EO fn vsop2k

	// generic vsop2010/2013 solver (pass coefficients and time)
	// time is julian years from j2000 (delta JD2451545.0 in JY)
	if (typeof self.vsop2k.xyz !== "function") {
		// only define once in global scope
		// otherwise we overwrite loaded data
		self.vsop2k.xyz = function vsop2k_xyz(coeffs, j2ky)
		{
			// call main theory
			var orb = self.vsop2k(coeffs, j2ky);
			// create orbit object
			var orbit = new Orbit(orb);
			// query state vector
			var state = orbit.state();
			// return object
			// attach new properties
			orb.x = state.r.x; orb.vx = state.v.x;
			orb.y = state.r.y; orb.vy = state.v.y;
			orb.z = state.r.z; orb.vz = state.v.z;
			// return object
			return orb;
		}
	}
	// EO fn vsop2k.xyz

})(self);