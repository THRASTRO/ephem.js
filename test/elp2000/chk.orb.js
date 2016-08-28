(function (tests) {

	var A1000 = 365.250;
	var T2000 = 2451545;

	function JD2J2000 (JDE)
	{
		return (JDE - T2000) / A1000;
	}

	QUnit.module( "Moon", function () {

		QUnit.test( "orb (1e-3)", function( assert )
		{

			for (var i = 0; i < tests.length; i += 25)
			{

				var test = tests[i],
				    time = JD2J2000(test[0]);

				var orb = elp2000orb(time);
				var orbital = new Orbital(orb);

				var vars = ["t", "x", "y", "z"];

				for (var n = 1; n < vars.length; n += 1)
				{
					assert.close(
						orbital.r()[vars[n]], test[n] * KM2AU, 1e-3,
						test[0] + ": VSOP Parameter " +vars[n]
					);
				}

			}
		});

	});

})(elp2000_results);

