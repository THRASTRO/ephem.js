(function (results)
{
	// removes test dependency
	var TAU = Math.PI * 2,
	    T2K = 2451545.0,
	    JY2JD = 365.25;

	// load the actual test files
	document.write('<script src="../../src/vsop87/dist/'+vsop87tst.name+'/min/vsop87.js"></scr'+'ipt>');
	document.write('<script src="../../src/vsop87/dist/'+vsop87tst.name+'/min/vsop87a.js"></scr'+'ipt>');
	document.write('<script src="../../src/vsop87/dist/'+vsop87tst.name+'/min/vsop87b.js"></scr'+'ipt>');
	document.write('<script src="../../src/vsop87/dist/'+vsop87tst.name+'/min/vsop87c.js"></scr'+'ipt>');
	document.write('<script src="../../src/vsop87/dist/'+vsop87tst.name+'/min/vsop87d.js"></scr'+'ipt>');
	document.write('<script src="../../src/vsop87/dist/'+vsop87tst.name+'/min/vsop87e.js"></scr'+'ipt>');

	// test one theory resultset
	function test_theory(theory)
	{
		QUnit.module( theory, function ()
		{
			for (var body in results[theory])
			{
				(function(theory, body)
				{
					// get variables to test from theory
					var vars = theory.match(/vsop87$/) ?
					  ["t", "a", "k", "q", "L", "h", "p"]
					  : theory.match(/vsop87[bd]$/) ?
					    ["t", "l", "b", "r", "vl", "vb", "vr" ]
					    : ["t", "x", "y", "z", "vx", "vy", "vz"];
					// test each body in the theory
					QUnit.test( body, function( assert )
					{
						for (var i = 0; i < results[theory][body].length; i += 1)
						{
							var test = results[theory][body][i],
							    time = (test[0] - T2K) / JY2JD,
							    elems = window[theory][body].raw(time);
							// test each computed variable for time
							for (var n = 1; n < vars.length; n += 1)
							{
								// normalize angle values
								// compensate overflow at TAU
								if (vars[n].match(/^[lb]/)) {
									if (Math.abs(test[n] - elems[vars[n]] - TAU) < (vsop87tst.eps)) elems[vars[n]] += TAU;
									else if (Math.abs(elems[vars[n]] - test[n] - TAU) < (TAU - vsop87tst.eps)) test[n] += TAU;
								}
								// qunit assertion
								assert.close(
									elems[vars[n]], test[n], vsop87tst.eps,
									test[0] + ": VSOP Parameter " +vars[n]
								);
							}
						}
						// EO each date
					});
					// EO QUnit test
				})(theory, body);
			}
			// EO each test
		});
		// EO Module theory
	}
	// EO test_theory

	// test all resultsets
	for (var theory in results)
	{
		test_theory(theory);
	}

})(vsop87_results);

