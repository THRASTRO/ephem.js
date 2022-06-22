//***********************************************************
// (c) 2016-2021 by Marcel Greter
// AstroJS TOP2010/13 utility lib
// https://github.com/mgreter/ephem.js
//***********************************************************
(function(exports) {

	// Re-use array
	var time = [];

	// generic top2010/2013 solver (pass coefficients and time)
	// time is julian years from j2000 (delta JD2451545.0 in JY)
	function top2k_theory(theory, jy2k, elems, addGM, addEpoch, off)
	{
		off = off || 0;
		jy2k = jy2k || 0;
		elems = elems || [];

		var jm2k = jy2k/1000;
		var dmu = theory.dmu;
		var freq = theory.freq;

		time[0] = 1.0;
		for (var i = 1; i <= 12; i += 1) {
			time[i] = time[i-1] * jm2k;
		}
		
		for (var iv = 0; iv < 6; iv += 1) {
			elems[off+iv] = 0;
			var coeffss = theory.coeffs[iv];
			for (var it = 0; it < coeffss.length; it += 1) {
				var coeffs = coeffss[it];
				for (var nt = 0; nt < coeffs.length; nt += 4) {
					var arg = coeffs[nt+0] * dmu * time[1];
					if (iv == 1 && it == 1 && coeffs[nt+0] == 0) continue;
					elems[off+iv] += time[it] * (coeffs[nt+1]*Math.cos(arg)+coeffs[nt+2]*Math.sin(arg))
				}
			}
		}
		
		var ipla = theory.ipla - 4;
		var xl=elems[off+1]+freq[ipla]*time[1];
		xl = xl % (Math.PI * 2);
		if (xl < 0) xl += Math.PI * 2;
		elems[off+1]=xl;
	
		off += 6;
		// update optional elements
		if (addGM) elems[off++] = theory.GM;
		if (addEpoch) elems[off++] = jy2k;
		// return array
		return elems;
	}
	// EO top2k_theory

	// Export the main export function
	// Call this function for each theory
	exports.TOP2K = exports.TOP2K || function(name, GM, coeffs, ipla, freq)
	{
		// export generic VSOP theory with solver attached
		var theory = exports.VSOP(top2k_theory, name, GM, coeffs);
		theory.dmu = (freq[0]-freq[1])/880;
		theory.ipla = ipla;
		theory.freq = freq;
		return theory;
	}
	// EO exports.TOP2K

})(this);