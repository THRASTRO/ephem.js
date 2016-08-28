(function (tests) {

	var A1000 = 365.250;
	var T2000 = 2451545;

	function JD2J2000 (JDE)
	{
		return (JDE - T2000) / A1000;
	}

	QUnit.module( "Moon", function () {

		QUnit.test( "xyz (1e-5)", function( assert )
		{

			for (var i = 0; i < tests.length; i += 25)
			{

				var test = tests[i],
				    time = JD2J2000(test[0]);

				var orb = elp2000xyz(time);

				var vars = ["t", "x", "y", "z"];

				for (var n = 1; n < vars.length; n += 1)
				{
					assert.close(
						orb[vars[n]], test[n] * KM2AU, 1e-5,
						test[0] + ": VSOP Parameter " +vars[n]
					);
				}

			}
		});

	});

})(elp2000_results);

