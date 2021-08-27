(function (tests) {

	QUnit.module( "PLUTO95", function ()
	{
		QUnit.test( "state", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var test = tests[i],
				    jy2k = JDtoJY2K(test[0]),
					state = pluto95.raw(jy2k),
				    vars = ["t", "x", "y", "z", "vx", "vy", "vz"];

				for (var n = 1; n < vars.length; n += 1)
				{
					assert.close(
						state[n-1], test[n], 1e-4,
						test[0] + ": VSOP Parameter " +vars[n]
					);
				}
			}
		});
	});

})(pluto95_results);

