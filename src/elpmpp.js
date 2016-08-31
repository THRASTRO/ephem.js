//***********************************************************
// (c) 2016 by Marcel Greter
// AstroJS ELP2000-MPP utility lib
// https://github.com/mgreter/ephem.js
//***********************************************************
// Direct conversion of ELPMPP02.for (fortran sample)
//***********************************************************
(function (window) {
	'use strict';

	// Constant parameters
	var cpi = 3.141592653589793,
	    rad = 648000 / cpi,
	    deg = cpi / 180,
	    a405 = 384747.9613701725,
	    aelp = 384747.980674318,
	    rad = 648000 / cpi, sc = 36525,
	    pis2 = cpi/2, dpi = 2*cpi;

	var bp = [
		[+0.311079095, -0.103837907],
		[-0.4482398e-2, +0.6682870e-3],
		[-0.110248500e-2, -0.129807200e-2],
		[+0.1056062e-2, -0.1780280e-3],
		[+0.50928e-4, -0.37342e-4]
	];

	// Value of the correction to the constant of precession
	var Dprec = -0.29965; // IAU 2000A

	// Constants for the evaluation of the partial derivatives
	var am = 0.074801329,
	    alpha = 0.002571881,
	    dtasm = (2*alpha)/(3*am),
	    xa = (2*alpha)/3;

	// Precession coefficients for P and Q (Laskar, 1986)
	var p1 =  0.10180391e-04;
	var p2 =  0.47020439e-06;
	var p3 = -0.5417367e-09;
	var p4 = -0.2507948e-11;
	var p5 =  0.463486e-14;
	var q1 = -0.113469002e-03;
	var q2 =  0.12372674e-06;
	var q3 =  0.1265417e-08;
	var q4 = -0.1371808e-11;
	var q5 = -0.320334e-14;

	// Function for the conversion : sexagesimal degrees -> radians
	function DMS(ideg, imin, sec) {
		return (ideg+imin/60+sec/3600)*(3.141592653589793/180);
	}

	var corr = [];

	function elpmpp_init(coeffs, icor) {

		if (corr[icor]) return corr[icor];

		// Corrections to constants
		var k = icor;
		if (k != 1) k = 0;

		// Values of the corrections to the constants fitted to LLR.
		// Fit 13-05-02 (2 iterations) except Phi and eps w2_1 et w3_1
		if (k == 0) {
			var Dw1_0   = -0.10525,
			    Dw2_0   =  0.16826,
			    Dw3_0   = -0.10760,
			    Deart_0 = -0.04012,
			    Dperi   = -0.04854,
			    Dw1_1   = -0.32311,
			    Dgam    =  0.00069,
			    De      = +0.00005,
			    Deart_1 =  0.01442,
			    Dep     =  0.00226,
			    Dw2_1   =  0.08017,
			    Dw3_1   = -0.04317,
			    Dw1_2   = -0.03794;
		}
		// Values of the corrections to the constants fitted to DE405
		// over the time interval (1950-2060)
		else {
			var Dw1_0   = -0.07008,
			    Dw2_0   =  0.20794,
			    Dw3_0   = -0.07215,
			    Deart_0 = -0.00033,
			    Dperi   = -0.00749,
			    Dw1_1   = -0.35106,
			    Dgam    =  0.00085,
			    De      = -0.00006,
			    Deart_1 =  0.00732,
			    Dep     =  0.00224,
			    Dw2_1   =  0.08017,
			    Dw3_1   = -0.04317,
			    Dw1_2   = -0.03743;
		}

		// Fundamental arguments (Moon and EMB)
		var w = [
			[
				DMS(218,18,59.95571+Dw1_0),              //***** ELP
				(1732559343.73604+Dw1_1)/rad,            //***** ELP
				(        -6.8084 +Dw1_2)/rad,            //***** DE405
				         0.66040e-2/rad,                 //***** ELP
				        -0.31690e-4/rad,                 //***** ELP
			],
			[
				DMS( 83,21,11.67475+Dw2_0),              //***** ELP
				(  14643420.3171 +Dw2_1)/rad,            //***** DE405
				(       -38.2631)/rad,                   //***** DE405
				        -0.45047e-1/rad,                 //***** ELP
				         0.21301e-3/rad,                 //***** ELP
			],
			[
				DMS(125, 2,40.39816+Dw3_0),              //***** ELP
				(  -6967919.5383 +Dw3_1)/rad,            //***** DE405
				(         6.3590)/rad,                   //***** DE405
				         0.76250e-2/rad,                 //***** ELP
				        -0.35860e-4/rad,                 //***** ELP
			]
		];
		var eart = [
			DMS(100,27,59.13885+Deart_0),              //***** VSOP2000
			(129597742.29300 +Deart_1)/rad,            //***** VSOP2000
			        -0.020200/rad,                     //***** ELP
			         0.90000e-5/rad,                   //***** ELP
			         0.15000e-6/rad,                   //***** ELP
		];
		var peri = [
			DMS(102,56,14.45766+Dperi),                //***** VSOP2000
			      1161.24342/rad,                      //***** VSOP2000
			         0.529265/rad,                     //***** VSOP2000
			        -0.11814e-3/rad,                   //***** VSOP2000
			         0.11379e-4/rad,                   //***** VSOP2000
		];

		// Corrections to the secular terms of Moon angles
		if (icor == 1) {
			w[0][3] += -0.00018865/rad,
			w[0][4] += -0.00001024/rad,
			w[1][2] += +0.00470602/rad,
			w[1][3] += -0.00025213/rad,
			w[2][2] += -0.00261070/rad,
			w[2][3] += -0.00010712/rad;
		}

		// Corrections to the mean motions of the Moon angles W2 and W3 -----
		// infered from the modifications of the constants
		var x2     =   w[1][1]/w[0][1],
		    x3     =   w[2][1]/w[0][1],
		    y2     =   am*bp[0][0]+xa*bp[4][0],
		    y3     =   am*bp[0][1]+xa*bp[4][1],

		    d21    =   x2-y2,
		    d22    =   w[0][1]*bp[1][0],
		    d23    =   w[0][1]*bp[2][0],
		    d24    =   w[0][1]*bp[3][0],
		    d25    =   y2/am,

		    d31    =   x3-y3,
		    d32    =   w[0][1]*bp[1][1],
		    d33    =   w[0][1]*bp[2][1],
		    d34    =   w[0][1]*bp[3][1],
		    d35    =   y3/am,

		    Cw2_1  =  d21*Dw1_1+d25*Deart_1+d22*Dgam+d23*De+d24*Dep,
		    Cw3_1  =  d31*Dw1_1+d35*Deart_1+d32*Dgam+d33*De+d34*Dep;

		w[1][1] +=  Cw2_1/rad;
		w[2][1] +=  Cw3_1/rad;

		// Arguments of Delaunay
		var del = [ [], [], [], [] ];
		for (var i = 0; i < 5; i ++) {
			del[0][i] = w[0][i]-eart[i]                            //***** D
			del[1][i] = w[0][i]-w[2][i]                            //***** F
			del[2][i] = w[0][i]-w[1][i]                            //***** l
			del[3][i] = eart[i]-peri[i]                            //***** l'
		}
		del[0][0] += cpi


		// Planetary arguments (mean longitudes and mean motions)
		var p = [ [],[],[],[],[],[],[],[] ]
		p[0][0] = DMS(252,15, 3.216919);                   //***** VSOP2000
		p[1][0] = DMS(181,58,44.758419);                   //***** VSOP2000
		p[2][0] = DMS(100,27,59.138850);                   //***** VSOP2000
		p[3][0] = DMS(355,26, 3.642778);                   //***** VSOP2000
		p[4][0] = DMS( 34,21, 5.379392);                   //***** VSOP2000
		p[5][0] = DMS( 50, 4,38.902495);                   //***** VSOP2000
		p[6][0] = DMS(314, 3, 4.354234);                   //***** VSOP2000
		p[7][0] = DMS(304,20,56.808371);                   //***** VSOP2000
		p[0][1] = 538101628.66888/rad;                     //***** VSOP2000
		p[1][1] = 210664136.45777/rad;                     //***** VSOP2000
		p[2][1] = 129597742.29300/rad;                     //***** VSOP2000
		p[3][1] =  68905077.65936/rad;                     //***** VSOP2000
		p[4][1] =  10925660.57335/rad;                     //***** VSOP2000
		p[5][1] =   4399609.33632/rad;                     //***** VSOP2000
		p[6][1] =   1542482.57845/rad;                     //***** VSOP2000
		p[7][1] =    786547.89700/rad;                     //***** VSOP2000

		for (var i = 0; i < 8; i ++) {
			for (var j = 2; j < 5; j ++) {
				p[i][j] = 0;
			}
		}

		// Zeta : Mean longitude W1 + Rate of the precession
		var zeta = [
			w[0][0],
			w[0][1] + (5029.0966+Dprec)/rad,
			w[0][2],
			w[0][3],
			w[0][4],
		];

		// Corrections to the parameters: Nu, E, Gamma, n' et e'

		var delnu  = (+0.55604+Dw1_1)/rad/w[0][1];                 //***** ELP
		var dele   = (+0.01789+De)/rad;                            //***** ELP
		var delg   = (-0.08066+Dgam)/rad;                          //***** ELP
		var delnp  = (-0.06424+Deart_1)/rad/w[0][1];               //***** ELP
		var delep  = (-0.12879+Dep)/rad;                           //***** ELP

		var i = 0;
		// convert the coefficients
		var CMPB = [], FMPB = []; //, NMPB = [];
		for (var iv = 0; iv < 3; iv ++) {
			var cmpb = [], fmpb = []; //, nmpb = [];
			for (var it = 0; it < coeffs[iv].length; it++) {
				for (var n = 0; n < coeffs[iv][it].length; n++) {
					var ilu = [
						coeffs[iv][it][n][0] || 0,
						coeffs[iv][it][n][1] || 0,
						coeffs[iv][it][n][2] || 0,
						coeffs[iv][it][n][3] || 0
					];
					var a = coeffs[iv][it][n][4] || 0;
					var b = [
						coeffs[iv][it][n][5] || 0,
						coeffs[iv][it][n][6] || 0,
						coeffs[iv][it][n][7] || 0,
						coeffs[iv][it][n][8] || 0,
						coeffs[iv][it][n][9] || 0
					];
					var tgv = b[0]+dtasm*b[4];
					if (iv == 2) a=a-2*a*delnu/3;
					cmpb[n] = a + tgv * (delnp - am * delnu)
					+ b[1] * delg + b[2] * dele + b[3] * delep;
					fmpb[n] = [iv == 2 ? pis2 : 0, 0, 0, 0, 0];
					for (var k = 0; k < 5; k++) {
						for (var i = 0; i < 4; i++) {
							fmpb[n][k] += ilu[i]*del[i][k];
						}
					}
				}
			}
			CMPB.push(cmpb);
			FMPB.push(fmpb);
		}

		var CPER = [], FPER = []; //, NPER = [];
		for (var iv = 3; iv < 6; iv ++) {
			var cpers = [], fpers = []; //, nper = [];
			for (var it = 0; it < coeffs[iv].length; it++) {
				var cper = [], fper = []; //, nper = [];
				for (var n = 0; n < coeffs[iv][it].length; n++) {
					var s = coeffs[iv][it][n][1] || 0;
					var c = coeffs[iv][it][n][2] || 0;
					var ifi = [
						coeffs[iv][it][n][3] || 0, coeffs[iv][it][n][4] || 0, coeffs[iv][it][n][5] || 0, coeffs[iv][it][n][6] || 0,
						coeffs[iv][it][n][7] || 0, coeffs[iv][it][n][8] || 0, coeffs[iv][it][n][9] || 0, coeffs[iv][it][n][10] || 0,
						coeffs[iv][it][n][11] || 0, coeffs[iv][it][n][12] || 0, coeffs[iv][it][n][13] || 0, coeffs[iv][it][n][14] || 0,
						coeffs[iv][it][n][15] || 0, coeffs[iv][it][n][16] || 0, coeffs[iv][it][n][17] || 0, coeffs[iv][it][n][18] || 0,
					];

					cper[n] = Math.sqrt(c*c+s*s);
					var pha = Math.atan2(c, s);
					if (pha < 0) pha += cpi * 2;

					fper[n] = [];
					for (var k = 0; k < 5; k++) {
						fper[n][k] = k == 0 ? pha : 0;
						for (var i = 0; i < 4; i++) {
							fper[n][k] += ifi[i] * del[i][k];
						}
						for (var i = 4; i < 12; i++) {
							fper[n][k] += ifi[i] * p[i - 4][k];
						}
						fper[n][k] += ifi[12] * zeta[k];
					}

				}
				cpers.push(cper);
				fpers.push(fper);
			}
			CPER.push(cpers);
			FPER.push(fpers);
		}

		return corr[icor] = {
			CMPB: CMPB,
			FMPB: FMPB,
			CPER: CPER,
			FPER: FPER,
			w: w
		};

	}

	if (typeof window.elpmpp == "undefined") {
		window.elpmpp = function elpmpp(coeffs, tj, icor)
		{
			// initialize correction factors (cached)
			var corr = elpmpp_init(coeffs, icor || 0);
			// fundamental corrections
			var w = corr.w, w0 = w[0];

			//********************************************************
			// End init
			//********************************************************

			// Initialization of time powers
			var t = [1, tj/sc]
			t[2] = t[1] * t[1];
			t[3] = t[2] * t[1];
			t[4] = t[3] * t[1];

			// Evaluation of the series: substitution of time in the series
			var v = [];
			// Variable iv=1 : Longitude
			// Variable iv=2 : Latitude
			// Variable iv=3 : Distance

			var x, xp, y, yp, f;
			for (var iv = 0; iv < 3; iv ++) {
				v[iv] = v[iv+3] = 0;

				var cmpb = corr.CMPB[iv],
				    fmpb = corr.FMPB[iv];
				// Main Problem series
				var fours = coeffs[iv][0][0][4]
				for (var n = 0, nL = cmpb.length; n < nL; n ++) {
					x = cmpb[n], y = fmpb[n][0], yp = 0;
					for (var k = 1; k < 5; k ++) {
						f = fmpb[n][k] * t[k-1];
						y += f * t[1], yp += k * f;
					}
					v[iv] += x * Math.sin(y);
					v[iv+3] += x * yp * Math.cos(y);
				}

				var cpers = corr.CPER[iv],
				    fpers = corr.FPER[iv];
				// Perturbations series
				for (var it = 0; it < 4; it ++) {
					var cper = cpers[it], // n numbers
					    fper = fpers[it]; // 5 arrs with n
					for (var n = 0, nL = cper.length; n < nL; n ++) {
						x = cper[n], y = fper[n][0], xp = 0, yp = 0;
						if (it != 0) xp = it * x * t[it-1];
						for (var k = 1; k < 5; k ++) {
							f = fper[n][k] * t[k-1];
							y += f * t[1], yp += k * f
						}
						var siny = Math.sin(y);
						v[iv] += x * t[it] * siny;
						v[iv+3] += xp * siny + x * t[it] * yp * Math.cos(y);
					}
				}
			}

			// Computation of the rectangular coordinates (Epoch J2000)
			v[0] = v[0] / rad + w0[0] + w0[1]*t[1] + w0[2]*t[2] + w0[3]*t[3] + w0[4]*t[4];
			v[1] = v[1] / rad;
			v[2] = v[2] * a405 / aelp;
			v[3] = v[3] / rad + w0[1] + 2*w0[2]*t[1] + 3*w0[3]*t[2] + 4*w0[4]*t[3];
			v[4] = v[4] / rad;

			var clamb  = Math.cos(v[0]),
			    slamb  = Math.sin(v[0]),
			    cbeta  = Math.cos(v[1]),
			    sbeta  = Math.sin(v[1]),
			    cw     = v[2]*cbeta,
			    sw     = v[2]*sbeta,

			    x1     = cw*clamb,
			    x2     = cw*slamb,
			    x3     = sw,
			    xp1    = (v[5]*cbeta-v[4]*sw)*clamb-v[3]*x2,
			    xp2    = (v[5]*cbeta-v[4]*sw)*slamb+v[3]*x1,
			    xp3    = v[5]*sbeta+v[4]*cw,

			    pw     = (p1+p2*t[1]+p3*t[2]+p4*t[3]+p5*t[4])*t[1],
			    qw     = (q1+q2*t[1]+q3*t[2]+q4*t[3]+q5*t[4])*t[1],
			    pwSqr  = pw*pw,
			    qwSqr  = qw*qw,
			    ra     = 2*Math.sqrt(1-pwSqr-qwSqr),
			    pwqw   = 2*pw*qw,
			    pw2    = 1-2*pwSqr,
			    qw2    = 1-2*qwSqr,
			    pwra   = pw*ra,
			    qwra   = qw*ra,

			    ppw    = p1+(2*p2+3*p3*t[1]+4*p4*t[2]+5*p5*t[3])*t[1],
			    qpw    = q1+(2*q2+3*q3*t[1]+4*q4*t[2]+5*q5*t[3])*t[1],
			    ppw2   = -4*pw*ppw,
			    qpw2   = -4*qw*qpw,
			    ppwqpw = 2*(ppw*qw+pw*qpw),
			    rap    = (ppw2+qpw2)/ra,
			    ppwra  = ppw*ra+pw*rap,
			    qpwra  = qpw*ra+qw*rap;

			return {
				x: (pw2*x1+pwqw*x2+pwra*x3)*KM2AU,
				y: (pwqw*x1+qw2*x2-qwra*x3)*KM2AU,
				z: (-pwra*x1+qwra*x2+(pw2+qw2-1)*x3)*KM2AU,
				vx: (pw2*xp1+pwqw*xp2+pwra*xp3 + ppw2*x1+ppwqpw*x2+ppwra*x3)*KM2AU/sc,
				vy: (pwqw*xp1+qw2*xp2-qwra*xp3 + ppwqpw*x1+qpw2*x2-qpwra*x3)*KM2AU/sc,
				vz: (-pwra*xp1+qwra*xp2+(pw2+qw2-1)*xp3 - ppwra*x1+qpwra*x2+(ppw2+qpw2)*x3)*KM2AU/sc
			};

		};
		// EO elpmpp

		// create actual functions to call
		elpmpp.llr = function elpmpp_llr(coeffs, tj)
		{ return elpmpp(coeffs, tj, 0); }
		elpmpp.jpl = function elpmpp_jpl(coeffs, tj)
		{ return elpmpp(coeffs, tj, 1); }

	}

})(window);