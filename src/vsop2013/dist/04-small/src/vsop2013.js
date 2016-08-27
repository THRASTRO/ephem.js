/* autogenerated by webmerge (join context) */
;
(function(window) {;
window.vsop2013 = {};;
(function() {

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
	if (typeof window.vsop2k !== "function") {
		// only define once in global scope
		// otherwise we overwrite loaded data
		window.vsop2k = function vsop2k(coeffs, j2ky)
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
	if (typeof window.vsop2k.xyz !== "function") {
		// only define once in global scope
		// otherwise we overwrite loaded data
		window.vsop2k.xyz = function vsop2k_xyz(coeffs, j2ky)
		{
			// call main theory
			var orb = vsop2k(coeffs, j2ky);
			// create orbit object
			var orbit = new Orbit(orb);
			// query state vector
			var state = orbit.state();
			// return object
			return {
				x: state.r.x, y: state.r.y, z: state.r.z,
				vx: state.v.x, vy: state.v.y, vz: state.v.z,
			};
		}
	}
	// EO fn vsop2k.xyz

})();;
// generated by vsop2013.pl
function vsop2013_mer(tj) { return vsop2k(vsop2013_mer.coeffs, tj); }
function vsop2013_mer_xyz(tj) { return vsop2k.xyz(vsop2013_mer.coeffs, tj); }
vsop2013_mer.xyz = vsop2013_mer_xyz; // assign
vsop2013.mer = vsop2013_mer; // export
vsop2013_mer.coeffs = {
	L: [[0,4.402608631669,[],-2.64201510547113e-005,-2.38270747280894e-005,[1,2,2,-5],3.94031227204977e-006,1.68698854273669e-005,[1,1,2,-2]],[0,26087.9031406855,[]]],
	a: [[0,0.387098309884,[],7.13402040140914e-007,-1.65207278540128e-007,[1,1,2,-2],-2.43928339505339e-007,2.70920226701764e-007,[1,2,2,-5]]],
	h: [[0,0.200723308731,[],1.46247498744885e-006,-7.07670146252083e-006,[10,2],3.00433394958519e-006,-1.85000579683909e-006,[1,2,2,-5]],[0,0.00143755075703721,[]]],
	k: [[0,0.044660629417,[],7.05228200003398e-006,1.49541239574951e-006,[10,2],-1.71581143672001e-006,-2.90474601259122e-006,[1,2,2,-5]],[0,-0.00552145512776339,[]]],
	p: [[0,0.045635493308,[],3.72456558359801e-007,-2.87633393077938e-007,[10,2],-1.67950164335416e-008,-1.99423696797858e-007,[1,2,2,-5]],[0,-0.00127636555246526,[]]],
	q: [[0,0.040615640596,[],2.66404005645022e-007,2.94193091838155e-007,[10,2],-1.11822395889423e-007,-2.39875696291645e-008,[1,2,2,-5]],[0,0.000654315054446061,[]]]
}; // assign
;
// generated by vsop2013.pl
function vsop2013_ven(tj) { return vsop2k(vsop2013_ven.coeffs, tj); }
function vsop2013_ven_xyz(tj) { return vsop2k.xyz(vsop2013_ven.coeffs, tj); }
vsop2013_ven.xyz = vsop2013_ven_xyz; // assign
vsop2013.ven = vsop2013_ven; // export
vsop2013_ven.coeffs = {
	L: [[0,3.176134461576,[],-8.46240143006899e-006,1.38117115866901e-005,[2,2,4,-7,10,8,11,-6],-2.00389761567184e-005,-3.91666190285054e-009,[2,2,3,-2]],[0,10213.2855474345,[]]],
	a: [[0,0.723329819945,[],-7.57621007994627e-010,4.32265701301435e-006,[2,2,3,-2],-2.07964337102651e-009,2.93979825880255e-006,[2,2,10,-2]]],
	h: [[0,0.005066851475,[],-2.2306600601243e-005,-3.67117331614278e-008,[2,2,3,-3],1.69019496240294e-005,3.97002296377586e-008,[2,1,3,-2]],[0,-0.00036121931392156,[]]],
	k: [[0,-0.004492821048,[],2.55941691370281e-008,2.2474862866452e-005,[2,2,3,-3],-3.29894880831982e-008,-1.70585586765891e-005,[2,1,3,-2]],[0,0.000312600230410845,[]]],
	p: [[0,0.02882281923,[],-1.69237193160802e-007,-6.92583235329188e-007,[2,3,3,-5],1.67848361967255e-007,-3.36675578181574e-007,[10,2]],[0,-0.000403907883690782,[]]],
	q: [[0,0.006824113928,[],-6.68927877125373e-007,1.5424001125855e-007,[2,3,3,-5],3.41175266713452e-007,1.68082501916137e-007,[10,2]],[0,0.0013813393132888,[]]]
}; // assign
;
// generated by vsop2013.pl
function vsop2013_emb(tj) { return vsop2k(vsop2013_emb.coeffs, tj); }
function vsop2013_emb_xyz(tj) { return vsop2k.xyz(vsop2013_emb.coeffs, tj); }
vsop2013_emb.xyz = vsop2013_emb_xyz; // assign
vsop2013.emb = vsop2013_emb; // export
vsop2013_emb.coeffs = {
	L: [[0,1.753470369433,[],-9.52880232652368e-006,3.22544756191703e-005,[3,4,4,-8,10,3],-2.05639600394634e-005,-1.71630674001416e-008,[3,2,10,-2]],[0,6283.07585035321,[]]],
	a: [[0,1.000001017641,[],-7.73623606396365e-009,1.12049565335755e-005,[3,2,10,-2],5.48709811880914e-010,7.60860006258569e-006,[2,1,3,-1]]],
	h: [[0,0.01628448918,[],1.98701374528987e-005,7.52684631316272e-009,[2,2,3,-3],-1.8640576961788e-005,-2.45293668960439e-008,[3,1,10,-2]],[0,-0.000620301546366306,[]]],
	k: [[0,-0.003740818074,[],5.39117622023673e-009,-1.98894819107988e-005,[2,2,3,-3],-4.57790064492791e-009,1.85926022136086e-005,[3,1,10,-2]],[0,-0.000822686608338102,[]]],
	p: [[1.14305124894666e-007,4.7021367794192e-007,[2,3,3,-5],6.68445976458009e-008,3.60317800223394e-007,[10,2],2.38375772852068e-008,9.86174970745443e-008,[2,2,3,-4]],[0,0.000101789189822705,[]]],
	q: [[4.57512732935583e-007,-1.06488903835686e-007,[2,3,3,-5],-3.63902851148984e-007,6.80744605654306e-008,[10,2],-2.37906960826515e-007,1.28823777138285e-008,[2,1,3,-1]],[0,-0.00113473132207217,[]]]
}; // assign
;
// generated by vsop2013.pl
function vsop2013_mar(tj) { return vsop2k(vsop2013_mar.coeffs, tj); }
function vsop2013_mar_xyz(tj) { return vsop2k.xyz(vsop2013_mar.coeffs, tj); }
vsop2013_mar.xyz = vsop2013_mar_xyz; // assign
vsop2013.mar = vsop2013_mar; // export
vsop2013_mar.coeffs = {
	L: [[0,6.203500014141,[],7.74226442511148e-005,-0.000261783269737478,[3,4,4,-8,10,3],5.34524186153185e-005,-7.80488663170154e-005,[2,2,4,-7,10,8,11,-6]],[0,3340.61243414546,[]]],
	a: [[0,1.523679340234,[],2.10177537333173e-007,6.60170427846137e-005,[4,2,10,-2],-9.97760498098323e-006,-1.96269515718286e-005,[4,1,10,-2]]],
	h: [[0,-0.037899709162,[],-8.15830080347651e-005,-1.63133322577743e-007,[4,1,10,-2],-4.51462167164009e-005,-1.33856005180842e-006,[10,1]],[0,0.00624674588336648,[]],[0,0.000155169216123976,[]]],
	k: [[0,0.085365593164,[],7.5923424053874e-007,8.22828165672222e-005,[4,1,10,-2],1.32864651729855e-006,-4.6299966034315e-005,[10,1]],[0,0.00376336793842187,[]],[0,-0.000246461621011564,[]]],
	p: [[0,0.012284486457,[],8.45182476840896e-007,-7.45419237323267e-008,[10,2],-1.46410716642413e-007,2.82737644897297e-007,[10,1]],[0,-0.00108024344012144,[]]],
	q: [[0,0.010470428021,[],5.24681330274117e-008,8.59427436162037e-007,[10,2],-2.44990400897291e-007,1.14143053443839e-007,[3,1,4,-2]],[0,0.000171320920925576,[]]]
}; // assign
;
// generated by vsop2013.pl
function vsop2013_jup(tj) { return vsop2k(vsop2013_jup.coeffs, tj); }
function vsop2013_jup_xyz(tj) { return vsop2k.xyz(vsop2013_jup.coeffs, tj); }
vsop2013_jup.xyz = vsop2013_jup_xyz; // assign
vsop2013.jup = vsop2013_jup; // export
vsop2013_jup.coeffs = {
	L: [[0,0.599546107035,[],-0.00566625683418009,-0.000892514475215568,[10,2,11,-5],0.000616623284320103,-9.02526061446375e-005,[10,1,11,-2],-0.000322556030277826,2.6680518581314e-006,[10,2,11,-2],-0.00023790499051921,4.78342346690294e-006,[10,1,11,-1],7.63491548644742e-005,-0.000110045608466856,[10,2,11,-3],-0.000117326004417488,1.14314070751528e-007,[10,3,11,-3]],[0,529.690961562325,[],0.000646317436875705,-0.00219610638310457,[10,2,11,-5]],[0.000431231853190148,0.000192879066175314,[10,2,11,-5],0,-0.000148339297282345,[]]],
	a: [[0,5.202603206345,[],5.10073137608823e-006,0.000690804351056146,[10,2,11,-2],-2.87828738537348e-005,-0.000321490464594591,[10,1,11,-2],-1.58345347320294e-006,0.000311439558421393,[10,3,11,-3],-0.000185728036691609,-0.000114488204054084,[10,2,11,-3],3.89489207106335e-005,-0.000252650057333383,[10,2,11,-5],5.64027034255473e-006,0.000205811618141947,[10,1,11,-1],-0.000101445798363939,-6.10301598155493e-005,[10,3,11,-4],-2.50355358196412e-006,0.000146335580464555,[10,4,11,-4]],[9.77986065088572e-005,2.82474697195385e-005,[10,2,11,-5]]],
	h: [[0,0.012003719726,[],-0.000642719873733828,1.479851653241e-005,[10,1,11,-2],-0.000160443913831529,-0.000341117655890013,[10,2,11,-5],-6.0918097749904e-005,0.000111307215000134,[10,1,11,-3],-0.000104697884535553,3.86902393293891e-007,[10,2,11,-3]],[0,0.00217184376124413,[],9.6835598701295e-005,-3.0973328480744e-005,[10,2,11,-5]]],
	k: [[0,0.046985847005,[],-4.34754594830865e-006,0.000652966387169899,[10,1,11,-2],-0.000344420534520134,0.000160872409455138,[10,2,11,-5],0.000108041024652353,8.12992145622112e-005,[10,1,11,-3],9.83728270434155e-007,0.000107422137958944,[10,2,11,-3]],[0,0.0011303137834786,[],-3.07645441870896e-005,-9.83761654576111e-005,[10,2,11,-5]],[0,-0.00010936216807284,[]]],
	p: [[0,0.01118386458,[],-3.33992313710715e-006,-7.83506890214899e-006,[10,2,11,-5],-1.37865441865821e-006,1.69801625112118e-006,[10,1,11,-3]],[0,-0.000234321119083433,[]]],
	q: [[0,-0.002065622731,[],-7.51006482364563e-006,4.12750504201726e-006,[10,2,11,-5],1.89550929058217e-006,1.12970775000631e-006,[10,1,11,-3]],[0,-0.000313504828346821,[]]]
}; // assign
;
// generated by vsop2013.pl
function vsop2013_sat(tj) { return vsop2k(vsop2013_sat.coeffs, tj); }
function vsop2013_sat_xyz(tj) { return vsop2k.xyz(vsop2013_sat.coeffs, tj); }
vsop2013_sat.xyz = vsop2013_sat_xyz; // assign
vsop2013.sat = vsop2013_sat; // export
vsop2013_sat.coeffs = {
	L: [[0,0.874018510107,[],0.0139448524795837,0.00219682237703802,[10,2,11,-5],0.00259783521557205,-1.16600357373602e-005,[10,1,11,-1],-0.00148093966547763,0.000229582896445634,[10,1,11,-2],0.000711785574972105,-5.00640802692013e-006,[10,2,11,-2],-0.000177749248309202,0.000259487173097659,[10,2,11,-3],0.000265482118436596,-3.7346331212472e-007,[10,3,11,-3],-6.1720498129746e-005,-0.000154945523510392,[10,2,11,-4],8.32016121432597e-005,-9.29966694225192e-005,[10,1,11,-3],-2.98689626889114e-005,0.000143403272640695,[10,1],-6.83895822949126e-005,0.000101627779424006,[10,3,11,-4],-0.000143758331552843,-2.3551230271163e-005,[10,2,11,-6,12,3],-0.000123915782522774,-4.15300798746143e-005,[10,4,11,-10],-0.000111580019507672,-4.86501693795966e-005,[11,1],2.12967216507348e-005,-0.000127975517463186,[11,1,12,-3],9.88791952900437e-005,-2.26443758500374e-005,[10,2,11,-1],0.000110537410471999,8.10624086541869e-007,[10,4,11,-4]],[0,213.299086108488,[],-0.0015907341551704,0.00540468269042612,[10,2,11,-5],-9.23693002013126e-005,-0.000107491634708511,[10,1,11,-2],4.56422603941673e-005,-9.38912837792348e-005,[10,4,11,-10]],[-0.00106126891574573,-0.00047470837717684,[10,2,11,-5],0,0.000366191115252574,[]],[8.70098818749883e-005,-0.000134592796972819,[10,2,11,-5]]],
	a: [[0,9.554910386039,[],-3.4372664690557e-005,0.0336346748120207,[10,1,11,-1],-0.0022293855186355,0.00275617197670516,[10,1,11,-2],-0.000440040675527466,0.00285696971853569,[10,2,11,-5],-0.000116481425664692,-0.00308243660466796,[10,2,11,-2],0.00125946989876576,0.00081310369870267,[10,2,11,-3],0.00107277759491406,-0.000954693672560471,[11,1],0.000364219889059516,0.00142228484324233,[10,2,11,-1],6.46718510926462e-006,-0.00142074156961473,[10,3,11,-3],0.000628345370555199,0.000379642540305604,[10,3,11,-4],0.000809839967048359,0.000116803224733498,[10,1,11,-3],-0.000493006202644176,0.000227202552560623,[10,2,11,-4],1.19170385251779e-005,-0.000671503070518685,[10,4,11,-4],0.000329676671731303,0.000197889065042711,[10,4,11,-5],5.79596642066454e-005,-0.000399565024242749,[10,3,11,-6],-6.9939694012856e-005,0.000372121711256958,[10,1,11,-4],1.093093571587e-005,-0.000321780887408532,[10,5,11,-5],-0.000218098160754873,0.000110993017967477,[10,3,11,-5],0.000178459823561655,0.00010801172008991,[10,5,11,-6],6.56784538730982e-010,0.000185489565591272,[3,1,11,-1],-0.000129765352066708,4.83982496790368e-005,[10,4,11,-6],-1.33713708743399e-007,0.000173420926497108,[2,1,11,-1],8.86081744158408e-006,-0.000155799985772236,[10,6,11,-6],9.8424925993046e-005,6.01637301332378e-005,[10,6,11,-7],8.76350592089203e-007,0.000132582324898864,[11,2,12,-2]],[-0.0011059703941039,-0.000319327157709117,[10,2,11,-5],-0.000130138355154406,0.000158112522923082,[10,2,11,-3],-0.000126556386223685,-0.000147013562906434,[11,1],-2.96799925406148e-005,0.000177172861818825,[10,1,11,-3],0.000155231454133133,4.40052122052749e-005,[10,3,11,-6],-0.000142402749815134,-4.53941283963373e-005,[10,1,11,-4],-4.38546871580121e-005,-0.000138648741425017,[10,2,11,-4]],[9.54323280673722e-005,-0.000217565870376719,[10,2,11,-5]]],
	h: [[0,0.055429636102,[],0.000635129860363602,0.00140901985337072,[10,2,11,-5],0.00196887696972844,6.60369782670219e-006,[10,1],0.00124522179465379,2.06100844948552e-005,[11,1],-0.000686577386440929,-3.1369851615849e-005,[10,1,11,-2],0.000446816002207394,-1.12641937127287e-005,[10,2,11,-3],0.000283221112229084,-0.00016900824521551,[10,1,11,-3],-0.000136024785977538,0.000227660596703771,[10,2,11,-4],0.000162561958478113,1.63761245760014e-006,[10,3,11,-4]],[0,-0.00375607819788462,[],-0.00039632430477799,0.000123194823050533,[10,2,11,-5]],[0,-0.000319881934038972,[]]],
	k: [[0,-0.002959913416,[],0.00141686641362994,-0.0006365432862294,[10,2,11,-5],6.66644424044003e-006,0.001972688473832,[10,1],1.47942507419641e-005,0.00126315488143125,[11,1],-7.71679520837778e-006,0.000650459585030773,[10,1,11,-2],-8.76335272781558e-006,-0.000451728481068651,[10,2,11,-3],-0.000173779720086617,-0.000260243231617887,[10,1,11,-3],0.000226087169791005,0.000152525788246142,[10,2,11,-4],-2.62414573544769e-006,-0.000162234290870225,[10,3,11,-4],-0.000122174450958838,2.51824119702142e-005,[10,1,11,-1]],[0,-0.00529593534842157,[],0.000122766067439733,0.000399851743343489,[10,2,11,-5]],[0,0.000309328717381039,[]]],
	p: [[0,0.019891436236,[],8.69842146851722e-006,1.87074111159286e-005,[10,2,11,-5],-3.50559744644866e-006,-7.68122509116786e-006,[10,1,11,-1]],[0,0.000594389244487805,[]]],
	q: [[0,-0.008717455856,[],1.8147187106274e-005,-9.70888214768663e-006,[10,2,11,-5],-4.4775348263207e-006,5.74727861695624e-006,[10,1,11,-1]],[0,0.000801691608254598,[]]]
}; // assign
;
// generated by vsop2013.pl
function vsop2013_ura(tj) { return vsop2k(vsop2013_ura.coeffs, tj); }
function vsop2013_ura_xyz(tj) { return vsop2k.xyz(vsop2013_ura.coeffs, tj); }
vsop2013_ura.xyz = vsop2013_ura_xyz; // assign
vsop2013.ura = vsop2013_ura; // export
vsop2013_ura.coeffs = {
	L: [[0,5.481225395663,[],-0.0149449950730489,0.000834844473590201,[12,1,13,-2],0.00341047621755124,-1.91057710127704e-007,[10,1,12,-1],0.000755843950644003,-1.93967416824379e-006,[11,1,12,-1],-0.000608427235503114,-9.86798808037679e-005,[12,2,13,-4],-9.43893555612881e-005,0.000589762085534299,[11,1,12,-3],0.000187202618564785,2.35931802224745e-005,[10,1],0.000166005316501062,-4.22353294043329e-005,[10,2,12,-1],-4.11061866649421e-005,-0.000159491698354855,[11,1,12,-2],0.000142805300186067,2.77810537127611e-005,[10,2,11,-6,12,3],-0.000143634734018947,-5.8491942527996e-007,[12,2,13,-2],-0.000129794743954817,-4.95858134974517e-007,[12,1,13,-1],0.000129326000801253,-5.54728127883352e-007,[11,2,12,-2]],[0,74.781659030778,[],6.75298262900203e-005,-0.000234738642772923,[12,1,13,-2]]],
	a: [[0,19.218438555474,[],2.27856970378006e-006,0.0803052568869785,[10,1,12,-1],-7.30491609037666e-006,0.0206873102632775,[11,1,12,-1],-0.000535378947421032,-0.00402900835432449,[10,1,12,-2],0.000904700164962495,0.0035380961101644,[10,2,12,-1],-0.000228652298743457,-0.00389218061745344,[12,1,13,-2],-0.000440938824477242,-0.00310654653779584,[12,1],-0.0010326856743462,-0.00106105892552249,[11,1,12,-2],-0.00123826508084192,-0.00011353920361132,[11,1,12,-3],-6.12952281699469e-005,-0.00120301075338855,[11,2,12,-2],0.00102405215710592,-8.68538360635664e-005,[11,2,12,-1],2.65715852024853e-006,0.000896146270110914,[12,2,13,-2],3.45768076547325e-005,-0.00061530703426238,[10,1,12,-2,13,2],-0.000215786127027574,0.000405566897083832,[11,2,12,-3],3.24110539191308e-005,0.000584736340458859,[10,1,13,-2],-9.1762468904812e-007,0.000530213134153768,[12,3,13,-3],8.97667636959168e-010,0.000518441817575509,[3,1,12,-1],4.06325004833273e-006,-0.000504775720901819,[11,3,12,-3],9.94075382963041e-009,0.000488377287782668,[2,1,12,-1],-6.60365516552497e-005,-0.000342623775406433,[10,2,12,-2],5.05288680836408e-005,-0.000323647154148728,[12,2,13,-4],-1.96145397470018e-006,0.00036775778545027,[12,1,13,-1],-2.28481417384965e-005,0.00028466098891358,[12,2,13,-3],-4.11717201177668e-007,0.00029544715589081,[12,4,13,-4],-9.91404211475374e-005,0.000189585222435814,[11,3,12,-4],9.3403349159867e-005,0.000170929258482143,[10,3,12,-1],3.64175577271788e-005,-0.000227118882300403,[10,3,11,-5,12,-1],-3.5068385448687e-005,0.000227703684200461,[10,1,11,-5,12,1],6.50074793520735e-005,0.000190668114007866,[10,1,12,-3],4.56449733894446e-005,0.000182052908475474,[12,2],5.01690306860825e-006,-0.000215583437593627,[11,4,12,-4],0.000111884662704721,-6.61783581723367e-005,[11,2,12,-4],2.25251219974222e-005,-0.000145917836224506,[10,2,11,-6,12,1],-1.56779644241097e-007,0.000167931256207186,[12,5,13,-5],8.68002561761632e-006,-0.000158328143099206,[11,1,12,-2,13,2],-2.33189379661729e-005,0.000142921667353266,[10,2,11,-4,12,-1],8.21048712494486e-006,0.000150677513398103,[11,1,13,-2],-4.86079250681436e-005,9.32586538694053e-005,[11,4,12,-5],-1.35551183852985e-005,0.0001255794413598,[12,3,13,-4],4.23115531867637e-006,-0.000130033645325842,[10,1,12,-3,13,2],2.36505185425228e-005,-0.000107661031782052,[10,2,11,-6,12,3],6.81151984418553e-006,0.000109927947741502,[10,2,12,-3],3.29603840734778e-006,0.000113314889384527,[10,1,11,-1]],[0.00015931589373032,-0.00010153816154481,[11,1,12,-3],0.000163612617980771,8.48838714468248e-005,[10,2,12,-1],-7.06659820723061e-005,-9.8933188590395e-005,[11,2,12,-1],7.73478733832631e-005,-8.39035210126599e-005,[11,1,12,-2]]],
	h: [[0,0.005648340159,[],0.00274677765640599,-4.04116199877446e-007,[10,1],0.00209355702962403,5.55479382439183e-006,[12,1,13,-2],0.00136146018233582,1.18168707593208e-006,[12,1],-0.00116289117084983,-2.52274501792398e-007,[10,1,12,-2],0.000613193961969537,-6.86139782637298e-008,[11,1],8.86310449130555e-005,0.000244098839025066,[11,1,12,-3],-0.000282179304439622,-2.61364954237191e-006,[11,1,12,-2],0.00014854023299908,1.39988018125554e-005,[12,2,13,-4],0.000129026321962054,-3.29141047236141e-005,[10,2]],[0,-0.000748754609625263,[]]],
	k: [[0,-0.045953074838,[],-1.72793094161794e-007,0.0027453436203276,[10,1],3.65735313605478e-006,-0.00208562132364666,[12,1,13,-2],-8.20490239433786e-007,0.00136026890430401,[12,1],1.29262164194181e-007,0.00116380736228167,[10,1,12,-2],1.48615345252337e-007,0.00061378219667211,[11,1],0.000244510660722676,-8.71411342717813e-005,[11,1,12,-3],-1.9147736030206e-006,0.000283879419145449,[11,1,12,-2],1.40278047897916e-005,-0.000148846486366174,[12,2,13,-4],3.28885019511566e-005,0.000128987979833324,[10,2]],[0,0.000183326266324195,[]]],
	p: [[0,0.006486018467,[],-3.81845253809257e-006,5.32915473528968e-006,[11,1,12,-3],4.06482649231472e-006,4.90360484510344e-006,[10,1,12,-1]],[0,-0.000117370228366917,[]]],
	q: [[0,0.001859240754,[],5.18112789501957e-006,4.1548457762982e-006,[11,1,12,-3],4.86984206974084e-006,-4.09476001250862e-006,[10,1,12,-1]],[0,-0.00012447819877719,[]]]
}; // assign
;
// generated by vsop2013.pl
function vsop2013_nep(tj) { return vsop2k(vsop2013_nep.coeffs, tj); }
function vsop2013_nep_xyz(tj) { return vsop2k.xyz(vsop2013_nep.coeffs, tj); }
vsop2013_nep.xyz = vsop2013_nep_xyz; // assign
vsop2013.nep = vsop2013_nep; // export
vsop2013_nep.coeffs = {
	L: [[0,5.311897933164,[],0.0101469046279758,-0.00056880414013645,[12,1,13,-2],0.00441713216417606,7.04519591120121e-007,[10,1,13,-1],0.000929356582374869,1.72728834898285e-007,[11,1,13,-1],0.000411170488260979,6.68274820217293e-005,[12,2,13,-4],0.000211291411334639,-5.39225161635344e-005,[10,2,13,-1],0.000162716121846677,4.23884620150265e-007,[12,1,13,-1]],[0,38.132972226125,[],-4.56527307895413e-005,0.0001584873111604,[12,1,13,-2]]],
	a: [[0,30.110415987017,[],-3.16688453816727e-005,0.148182835507509,[10,1,13,-1],-7.59625666080917e-006,0.0359789774926939,[11,1,13,-1],0.000440552132099022,0.00830003078786158,[12,1,13,-2],0.00171617844970017,0.0067276636371183,[10,2,13,-1],8.78619868603556e-007,0.00461644061870503,[12,1,13,-1],-0.0010652883820492,0.000979053536678081,[10,1,13,-2],0.00185146386982005,-0.000143075641082526,[11,2,13,-1],4.29277250257975e-006,-0.00105522361462959,[12,2,13,-2],1.52344190553089e-010,0.00101173876032832,[3,1,13,-1],-7.17088109383658e-007,0.000955294507124649,[2,1,13,-1],-4.41137698531035e-005,0.000781633912531386,[10,1,12,-1,13,1],-0.000106493742870645,0.000686664561892246,[12,2,13,-4],-4.03288198170217e-005,-0.000723464564978597,[10,1,12,1,13,-3],-0.000402924399160384,0.000239640968600516,[11,1,13,-2],9.98926491604699e-007,-0.000568839987048425,[12,3,13,-3],3.19094800260301e-005,-0.000505806830652278,[12,2,13,-3],0.000179265937725814,0.000328437732852741,[10,3,13,-1],6.7265250497546e-005,-0.000418866183620827,[10,3,11,-5,13,-1],-6.4666189960306e-005,0.000420529671490109,[10,1,11,-5,13,1],-3.60388750205684e-005,0.000315869027958498,[10,2,13,-2],6.15133761216537e-007,-0.000313765737920449,[12,4,13,-4],3.89796203775798e-005,-0.000253788686072964,[10,2,11,-6,13,1],-3.99269718365881e-005,0.000248159848008069,[10,2,11,-4,13,-1],1.33095737793894e-005,-0.000260273106852038,[11,2,13,-2],-1.09480349954045e-008,0.000246538795345758,[10,1,11,-1],2.49286558506879e-005,-0.00021610260598066,[12,2,13,-1],1.99532998272528e-005,-0.000197643384255296,[12,3,13,-4],-1.06896775320371e-005,0.000189209415737068,[11,1,12,-1,13,1],-1.00229422138727e-005,-0.000176216402724068,[11,1,12,1,13,-3],2.38826934956077e-007,-0.000179098142285943,[12,5,13,-5],-1.13243264197301e-007,0.000175296754155399,[10,1,11,1,13,-2],-0.000138938534088951,2.88115180363483e-005,[13,1],-1.10629273451884e-005,0.000131760556927978,[10,1,12,-1],-1.40190050979541e-005,-0.000109483303088537,[11,3,13,-1],1.23352916868706e-005,-0.000110802893006457,[12,4,13,-5],4.72028285091408e-008,-0.000103796385266907,[12,6,13,-6]],[0.000310922464237674,0.000161213668844168,[10,2,13,-1],-0.000127628584742442,-0.000179020415026371,[11,2,13,-1],-0.000163089571541707,-4.75320457990084e-005,[10,1,11,-5,13,1],0.000162298440554541,4.81843008783905e-005,[10,3,11,-5,13,-1],-0.000131596432322418,-3.40716012387603e-005,[12,1,13,-2],9.83812044788949e-005,2.85992772912932e-005,[10,2,11,-6,13,1],-9.61732233699252e-005,-2.85155450302741e-005,[10,2,11,-4,13,-1]]],
	h: [[0,0.006691809982,[],0.00344037123410276,2.60037089689158e-007,[10,1],0.00136274559681672,-7.31683642143236e-008,[13,1],-0.00131043998502159,-2.55348296968866e-007,[10,1,13,-2],0.000760815906803363,1.83219556169007e-007,[11,1],-0.000596406846487912,-4.11778774735681e-006,[12,1,13,-2],-0.000340766470835985,-2.78874942261049e-008,[11,1,13,-2],0.000161543474274358,-4.12011346243526e-005,[10,2],-0.000157625562435383,-1.2647980126913e-005,[12,2,13,-4]]],
	k: [[0,0.005998838194,[],-1.19590818920499e-006,0.00343812701387651,[10,1],-2.34014011757408e-008,0.00136228851875839,[13,1],-3.11811452378667e-007,0.00131043024155144,[10,1,13,-2],-1.52906316457174e-007,0.000761507963870143,[11,1],-3.00366574716962e-006,0.00059866344517569,[12,1,13,-2],-6.72968162177077e-008,0.000340808513613787,[11,1,13,-2],4.11525235466369e-005,0.000161473053324809,[10,2],-1.2658581400711e-005,0.000158216128370744,[12,2,13,-4]]],
	p: [[0,0.011516766659,[],-1.00851792138856e-005,-4.10456052892944e-007,[10,1,13,-1],8.73365050781177e-006,3.5758669468006e-007,[10,1,13,1]]],
	q: [[0,-0.010291475138,[],-4.12822331979157e-007,1.00922848608511e-005,[10,1,13,-1],-3.55340973333777e-007,8.7339646391212e-006,[10,1,13,1]]]
}; // assign
;
// generated by vsop2013.pl
function vsop2013_plu(tj) { return vsop2k(vsop2013_plu.coeffs, tj); }
function vsop2013_plu_xyz(tj) { return vsop2k.xyz(vsop2013_plu.coeffs, tj); }
vsop2013_plu.xyz = vsop2013_plu_xyz; // assign
vsop2013.plu = vsop2013_plu; // export
vsop2013_plu.coeffs = {
	L: [[0,4.165471124826,[],-0.00456721639374337,0.00206105169349723,[14,1402],0.00222149312802085,0.00349013706591797,[14,4],0.0014438005411012,-0.000252741215590556,[14,1473],0.000562942406461721,0.00118114067012902,[14,8],-0.0010623010008064,0.000161077178214331,[14,522],-0.000342878606610048,0.000276512171712421,[14,1331],0.000322815741757412,3.30643424915743e-005,[14,593],-0.000243710461979938,1.73918596318809e-005,[14,2875],-0.000233243506386659,4.35401426731039e-005,[14,71],0.000164582932578304,-1.47337403905421e-005,[14,12],-0.000123734536634531,-7.73661588407805e-005,[14,35],2.96421062395025e-005,0.000108749814205824,[14,137]],[0,25.33566020437,[],0.00177419558642902,-0.000218979168244425,[14,4],-0.000589871714102106,-0.00130295270672772,[14,1402],0.000627665725900631,-5.78574661081135e-005,[14,8],-4.67872363335512e-005,-0.00030338218770459,[14,522],-0.000132266503768353,-0.000162343127562621,[14,1331],5.14743377337001e-005,-0.000168465785742127,[14,35],2.76051654437753e-005,0.000137166723338294,[14,1473],1.70626213762879e-005,-0.00011426985570985,[14,12]],[0,-0.0182722188391639,[],6.09512251396272e-005,-0.000423822055145354,[14,4],0.000135554988669997,-0.000242149501615203,[14,8],0.000148775903609926,-0.00016731953542355,[14,1402]],[0,0.00194099316670716,[]]],
	a: [[0,39.54461714403,[],-0.0852581976354701,-0.188913735334341,[14,1402],-0.0333874152748863,-0.0414958778338123,[14,1331],-0.00734554122725473,-0.0485024749192498,[14,522],-0.00534684376601522,0.0281021329189482,[14,71],-0.0123092045544314,-0.0091600251304609,[14,1261],-0.00525198563299829,-0.012202161344832,[14,452],-0.00072968560644719,-0.00978452294754672,[14,2875],-0.00689189703744251,0.0048494518209586,[14,35],-0.00319467786534364,0.00582713754882349,[14,141],-0.0060327729791526,0.00153000595095762,[14,137],0.00457171307399947,-0.00194948974084124,[14,4],-0.00429806835029115,-0.00175242206726642,[14,1190],-0.00247286675515423,-0.00310627758037027,[14,381],0.00297562700771581,-0.00171886634334111,[14,8],0.00265146267827777,-0.000774726531281848,[14,1543],-0.00207783905489942,-0.00154057221251118,[14,1115],-0.000419579511791891,-0.00200483972098692,[14,2804],-0.00158119137149698,0.000968507621921489,[14,67],-0.000968366549948342,0.00154667158210835,[14,212],-0.00142938344793791,-0.000188203674638911,[14,1119],0.000959850109979434,-0.00107388451995997,[14,17405],0.00114162139403895,0.000758212110837861,[14,28337],-0.00100246677623642,-0.00069650370158154,[14,310],-0.000649471401553971,-0.000328017714546506,[14,1044],0.000573158863553251,0.000404247670751583,[14,63],0.000679494922293691,-0.000132384484985871,[14,1614],-0.000104300210746971,-0.000650484804048742,[14,12],-0.000515736788402634,0.000339297680098786,[14,283],0.000452846277127703,0.000401381972546133,[14,133],0.000310106225772706,0.000508237177851175,[14,1421],-0.000172251473271781,-0.000568139061648916,[14,1383],0.000144165131321784,-0.000510944691011001,[14,4348],-0.000186317094448925,-0.000481923078671557,[14,2733],0.000504297563225377,6.36959488324366e-005,[14,664],0.000402265353496755,-0.000305327449958213,[14,177],0.000325880643634961,0.000346778342469708,[14,204],-0.000451450447153731,5.62190365693832e-005,[14,1048],-0.000247933261618766,0.000367645653602986,[14,1406],-0.000403680848562258,-6.13993356689969e-005,[14,1398],0.000107278677376519,0.000382061238419647,[14,880],-0.000363577606423224,-9.24829843341767e-005,[14,239],-7.26966642622521e-005,-0.000354929358809881,[14,541],0.000162825677665358,-0.000316084200860336,[14,17334],6.98002613613896e-006,0.000342046242701039,[14,503],0.000319289118073941,0.00011026801272881,[14,28266],-0.000269088836457862,-0.000154034360328394,[14,974],0.000155637978622693,-0.000217384147474949,[14,345],0.0001405802484936,0.000213982795187201,[14,1924],0.000175331748721857,0.000176826403458862,[14,275],-0.000129656260916781,0.000205415556972065,[14,106],-0.000104990617658979,0.000214934444146722,[14,1335],-9.66475262719736e-005,0.000210590707524968,[14,271],-3.45750078659106e-005,0.00022168201292914,[14,59],-6.34376556195174e-005,0.000210112906062088,[14,200],-0.000204060057081347,2.05908084286722e-005,[14,1327],-3.98581133738944e-005,0.000198625164536574,[14,129],-0.000105757732191346,0.000163407119355068,[14,341],0.000190421449399432,-2.24609344167842e-006,[14,1685],0.000181768323094392,3.68100579145402e-005,[14,75],-0.000154804637038984,-9.84521682271278e-005,[14,903],-0.000153858795630001,1.54461293629166e-005,[14,1708],0.000110050179745087,0.000106342487885446,[14,1351],-7.95014330519943e-005,-0.000130288344846624,[14,1312],-8.78617240477827e-005,-0.000123436780847904,[14,2663],-9.27649570968551e-005,0.000113436736838358,[14,1410],-0.000135727118257115,5.43359575978971e-005,[14,978],-0.000140756906767889,-2.01587815360252e-005,[14,16],4.57591513704065e-005,0.000133486491812673,[14,247],0.000134807996034135,1.10390069371504e-005,[14,3016],9.9587671686603e-005,9.0442445182479e-005,[14,1854],-0.000129886049375512,-1.22029877989591e-006,[14,1394],-6.61532682819139e-005,0.000109659145609161,[14,1265],-0.000110502337351417,-5.63057764419131e-005,[14,9220],-3.10729084233217e-005,0.000120020313234098,[14,72490],9.80365010121947e-005,-7.30879626783599e-005,[14,79],-0.000112540149729189,3.61083306602783e-005,[14,169],-0.00010210967812908,-5.5390855536896e-005,[14,832],0.000110937608615437,2.05981001050297e-005,[14,734],9.15734875270396e-005,6.54593719972684e-005,[14,809],-0.000109740961767008,-1.76357815225636e-005,[14,408],-0.000109624433193807,-6.03646199498375e-007,[14,337],-7.22656357086988e-005,-8.1729143448408e-005,[14,1473],9.81338763509176e-005,4.08194450688092e-005,[14,1096],-3.04286468607035e-005,-9.98020227403315e-005,[14,471],-7.8511523890052e-005,6.77413403170134e-005,[14,526],4.73213681042608e-005,9.020966833347e-005,[14,27],-9.36304084737508e-005,4.01108172709861e-005,[14,354]],[0.0538225296756512,-0.024541007710854,[14,1402],0,0.03789,[],0.0196235717652556,-0.0159817339293649,[14,1331],0.0138515233201363,-0.00216678462854011,[14,522],0.00472419670945094,0.000867230200436216,[14,71],0.00273927802672712,-0.00380088044537908,[14,1261],0.0033190792202712,-0.000590154412597696,[14,2875],-0.00262217467760365,-0.00206468447129706,[14,35],0.000847116551966886,-0.00273411770707245,[14,4],0.000838298441787177,-0.00214273613711023,[14,1190],0.00139624779098254,-0.000651914574424254,[14,452],-0.000488006095260628,-0.00141743532663901,[14,8],0.000931057640524374,-0.000778740174023586,[14,381],-0.000295688429909896,-0.00114951196557197,[14,137],0.00102456915294928,-0.000293203398002195,[14,2804],0.000121224400129276,-0.000983440080477029,[14,1119],0.000223806328793291,0.000726625314375591,[14,1543],0.000541252695062515,-0.00049059020449035,[14,1115],0.000330718928122213,-0.000508583149981903,[14,310],-0.000437315709741999,1.81111886443337e-005,[14,12],-5.10176977459902e-005,-0.000397669608100555,[14,1048],0.000330059711333647,-0.000148668522354712,[14,2733],0.000210595004325067,0.000294225751037988,[14,212],0.000193077164486187,-0.000292631623860709,[14,1044],0.000173939117196183,-0.0002594668959479,[14,28337],-3.75285623095533e-005,-0.000284154691437766,[14,1398],5.29481660895141e-005,-0.000254731223256692,[14,239],0.000235039929375319,-4.00606417665232e-005,[14,1383],-0.000157277653357587,0.000169994883109759,[14,133],-0.000168190400017888,-0.000147290411051208,[14,106],0.00021335940464682,2.24116319433279e-005,[14,4348],0.000127437901906597,0.000150121919698731,[14,283],-6.09544356409465e-005,-0.000173703098963884,[14,1327],-0.000100480857361438,0.000122240745917371,[14,63],-0.000122203989775145,8.03584657873012e-005,[14,1924],-0.000137440426578555,-1.42191998929617e-005,[14,503],0.000121561973490251,5.13078325770271e-005,[14,141],-2.76270419939114e-005,0.000126412086986152,[14,16],-0.000119745752039647,-2.55051073894755e-005,[14,129],6.90064666500592e-005,-8.5742329042474e-005,[14,974],-0.000103026872536388,2.78142210118717e-005,[14,1421],6.28688550362626e-005,-8.48180010912789e-005,[14,903],-3.81203350412657e-005,-9.68117150982707e-005,[14,978],3.05455540195513e-005,9.68577472090256e-005,[14,354],-9.1963688288913e-005,4.02454297255833e-005,[14,27],-1.35191434945968e-005,9.92187052380173e-005,[14,1406]],[0.00697275443987064,0.00615647341839869,[14,1402],0.00535474581627489,0.00344737186869919,[14,1331],0,-0.00601990597444089,[],0.00122555270899332,0.00185060175718072,[14,522],-0.00105974641354974,-0.000907911969550799,[14,4],0.00110062538763923,-0.000253607053021502,[14,1261],0.000667129714712161,-0.000109433999943657,[14,1190],0.000323452825103362,0.000561821005450467,[14,2875],0.000541324143354791,-0.000322992134760929,[14,71],-0.000555511169686194,-0.000246912610200519,[14,8],0.000494277825269215,-0.000107053957509271,[14,452],9.30205748334501e-005,-0.000423428578027621,[14,35],0.000357586252262823,-9.22850452722992e-005,[14,1119],0.000167065390575644,0.00025012280179087,[14,2804],0.000296701510822288,6.35382786121743e-006,[14,381],0.000228583678602527,0.000114850267558374,[14,141],-0.000117586429397561,0.000172201849299036,[14,12],0.000168702527831119,-7.36195868449343e-005,[14,1048],0.000181419528314822,5.78589159488163e-006,[14,310],8.22592563807845e-005,-0.00013870462139811,[14,137],8.4705982794838e-005,0.000103827309490672,[14,2733],-0.000114727152470329,-1.63677869135789e-005,[14,1543],0.000103191524973939,3.57394523311622e-005,[14,212],0.000101159159559147,-4.00003469968714e-005,[14,1398],8.70224977640412e-005,5.06754884778105e-005,[14,1115]],[-0.000660658448870074,0.00147899372410779,[14,1402],-0.000317529288197464,0.00145131620931031,[14,1331],-0.000244157408572124,0.000303088476832553,[14,522],0,-0.000360994607607288,[],-0.000349199475461992,9.84264663528554e-007,[14,4],0.000115773811717149,0.000279542638072548,[14,1261],0.000111752837656491,0.00018662094899078,[14,1190],-0.000113031206578927,0.000173230813572863,[14,8],0.000194302046943078,4.21424409983518e-005,[14,35],8.02133049426249e-005,0.000107080252534189,[14,1119],-7.54537570506556e-005,8.24143258151279e-005,[14,2875]],[-0.000291047955468972,9.11380474928133e-006,[14,1331],-0.000214794231647714,-5.47759436810434e-005,[14,1402],-0.000179600536926573,0.000113008786790063,[14,4],0,0.000170598011155125,[]]],
	h: [[0,-0.1734047186423,[],0.0030130058621335,0.00212348131150762,[14,1473],-0.000708496491526814,-0.00105054992003594,[14,71],-0.000124675145555632,0.00119261396850207,[14,1331],0.000518382459485308,0.000633288188225523,[14,593],0.00034879411820834,-0.000401989027054383,[14,1402],6.57993334400313e-005,0.000467546148717258,[14,1261],-0.000110579176967177,-0.000315745450291127,[14,141],-0.000110765314340372,0.000278425728403149,[14,452],0.000103166002563896,0.000147276527773899,[14,2945],6.15447514684064e-005,0.000149747264462813,[14,1190],-9.81595563447479e-005,-0.000114180088983865,[14,1543],0.000105006489971192,-6.94320112554293e-005,[14,522],-1.57249589718469e-005,0.000121683466155404,[14,381],-0.00011563400718698,3.56948682796069e-005,[14,4],-5.37927701941593e-005,0.000106014952326765,[14,8]],[-0.000568418141150668,-6.00441749326949e-005,[14,1331],-0.000198996831179342,0.000282990011113288,[14,1473],-0.000196455470296079,0.000131098478923469,[14,71],0.000116241418307845,9.87535037464411e-005,[14,1402],-0.000143334078984314,2.08573934936934e-005,[14,1261]],[-2.90068798791816e-005,-0.000139939008056012,[14,1331]]],
	k: [[0,-0.1787389594035,[],-0.00209858702949421,0.0031629832749993,[14,1473],0.00111135191639409,-0.000681803576638604,[14,71],0.00118851252589696,0.000169117812667437,[14,1331],-0.000638441585591718,0.000547741665420179,[14,593],-0.000520269298301404,-2.14384736093297e-005,[14,1402],0.000468884450100583,-5.73688498793582e-005,[14,1261],0.000304152865636849,-9.60401574521986e-005,[14,141],0.000274703518293308,0.00012124121714193,[14,452],-0.000148675454781658,0.000110356932393748,[14,2945],0.000150524508174292,-5.97674195035651e-005,[14,1190],0.000118742537755823,-0.000100818416487108,[14,1543],-0.000117109230386333,-3.79986912364725e-005,[14,522],0.000121657665085538,1.79395343335699e-005,[14,381],-0.000103801786187725,-5.10658265315991e-005,[14,8],-3.74099671371454e-005,-9.61010124576932e-005,[14,4]],[0,-0.000613396638020079,[],-8.11331287017133e-005,0.000566641101723139,[14,1331],-0.000298431208440694,-0.000196328056541716,[14,1473],-0.000129802462219695,-0.000197218318842653,[14,71],5.5470899732069e-006,-0.000149095256320225,[14,1402],1.83012476975206e-005,0.000143793989818822,[14,1261]],[-0.00014117217046583,2.38206579568757e-005,[14,1331]]],
	p: [[0,0.1397799251564,[],0.000134711564336948,0.000128832005723724,[14,1402],0.000161808960422928,-4.99793100988791e-005,[14,1543]]],
	q: [[0,-0.05170230782278,[],0.000135237840998234,-0.000132967871573853,[14,1402],5.59277554218395e-005,0.000163008996403526,[14,1543],-9.81846220983441e-005,-2.31799757651772e-005,[14,1473]],[0,0.000191668440471832,[]]]
}; // assign
;
})(window)
/* crc: 3F54A53EC758D2F204E8807A767F658C */
