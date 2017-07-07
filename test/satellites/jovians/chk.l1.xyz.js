(function (tests, QUnit)
{

	function testBody(body)
	{

		QUnit.module("Satellite " + body, function ()
		{

			QUnit.test("Coordinatess", function (assert)
			{

				for (var i = 0; i < tests[body].length; i += 1) {
					var test = tests[body][i],
						time = test[0], elem = [];

					// time wanted is julian years from j2000 (delta JD2451545.0 in JY)
					// time given is julian days from B1950 (delta JD2433282.5 in JY)
					jovian.xyz((time - 18262.5) / 365.25, body, elem);

					// elem[0] .. a/n,  elem[1] .. L
					// elem[2] .. K=e*cos(Omega+omega)
					// elem[3] .. H=e*sin(Omega+omega)
					// elem[4] .. Q=sin(i/2)*cos(Omega)
					// elem[5] .. P=sin(i/2)*sin(Omega)
					var vars = ["x", "y", "z"];

					for (var n = 0; n < 3; n += 1) {
						assert.close(
							elem[vars[n]], test[n + 1], 1e-8,
							test[0] + ": Orbital Parameter " + vars[n]
						);
					}

				}

			})

		});

	}

	QUnit.module("Jovian LC1 XYZ", function ()
	{

		for (var body in tests) testBody(body);

	});

})(jovians_l1_results_xyz, QUnit);
