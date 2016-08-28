(function (tests) {

	QUnit.module( "ELPMPP02", function ()
	{
		QUnit.test( "LLR fitted", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var test = tests[i],
				    time = test[0] - 2451545,
				    elp = elpmpp02.llr(time),
				    vars = ["t", "x", "y", "z", "vx", "vy", "vz"];
				for (var n = 1; n < vars.length; n += 1)
				{
					assert.close(
						elp[vars[n]], test[n], elpmpp02tst.eps,
						test[0] + ": VSOP Parameter " +vars[n]
					);
				}
			}
		});
	});

})(elpmpp02_llr_results);

