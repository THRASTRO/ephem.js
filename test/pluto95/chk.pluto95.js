(function (tests) {

	QUnit.module( "PLUTO95", function ()
	{
		QUnit.test( "state", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var test = tests[i],
				    time = (test[0] - 2451545) / 365.25,
				    state = pluto95(time),
				    vars = ["t", "x", "y", "z", "vx", "vy", "vz"];

				for (var n = 1; n < vars.length; n += 1)
				{
					assert.close(
						state[vars[n]], test[n], 1e-4,
						test[0] + ": VSOP Parameter " +vars[n]
					);
				}
			}
		});
	});

})(pluto95_results);

