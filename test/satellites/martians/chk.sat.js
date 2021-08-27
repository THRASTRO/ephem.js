(function (tests, QUnit)
{

	var names = [
		'phobos',
		'deimos',
	];

	function testBody(body)
	{

		QUnit.module("Satellite " + body, function ()
		{

			QUnit.test("VSOP Elements", function (assert)
			{

				for (var i = 0; i < tests[body].length; i += 1) {
					var name = names[body];
					var test = tests[body][i], elem;
					var jy2k = test[0] / 365.25;

					martian[name].raw(jy2k, elem = []);

					// elem[0] .. a/n,  elem[1] .. L
					// elem[2] .. K=e*cos(Omega+omega)
					// elem[3] .. H=e*sin(Omega+omega)
					// elem[4] .. Q=sin(i/2)*cos(Omega)
					// elem[5] .. P=sin(i/2)*sin(Omega)
					var vars = ["a", "L", "k", "h", "q", "p"];

					for (var n = 0; n < 6; n += 1) {
						assert.close(
							elem[n], test[n + 1], 1e-10,
							test[0] + ": Orbital Parameter " + vars[n]
						);
					}

				}

			})

		});

	}

	QUnit.module("Martian MARSSAT", function ()
	{

		for (var body in tests) testBody(body);

	});

})(martian_sat_results, QUnit);
