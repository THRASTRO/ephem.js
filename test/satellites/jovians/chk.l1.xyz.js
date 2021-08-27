(function (tests, QUnit)
{

	var names = [
		'io',
		'europa',
		'ganymede',
		'callisto',
	];

	function testBody(body)
	{

		QUnit.module("Satellite " + body, function ()
		{

			QUnit.test("Coordinatess", function (assert)
			{

				for (var i = 0; i < tests[body].length; i += 1) {
					var name = names[body];
					var test = tests[body][i], elem;
					var jy2k = test[0] / 365.25;

					jovian[name].state(jy2k, elem = []);

					// elem[0] .. a/n,  elem[1] .. L
					// elem[2] .. K=e*cos(Omega+omega)
					// elem[3] .. H=e*sin(Omega+omega)
					// elem[4] .. Q=sin(i/2)*cos(Omega)
					// elem[5] .. P=sin(i/2)*sin(Omega)
					var vars = ["x", "y", "z", "vx", "vy", "vz"];

					for (var n = 0; n < 6; n += 1) {
						if (n > 2) elem[n] /= 365.25;
						assert.close(
							elem[n], test[n + 1], 1e-11,
							test[0] + ": Coordinate " + vars[n]
						);
					}

					var orb = jovian[name].orbit(jy2k);
					var state = orb.state(jy2k);
					var vars = ["x", "y", "z"];

					for (var n = 0; n < 3; n += 1) {
						assert.close(
							state.r[vars[n]], test[n + 1], 1e-10,
							test[0] + ": Coordinate " + vars[n]
						);
					}
					for (var n = 0; n < 3; n += 1) {
						assert.close(
							state.v[vars[n]] / 365.25, test[n + 4], 1e-10,
							test[0] + ": Velocity " + vars[n]
						);
					}

					assert.equal(orb._GM, jovian[name].GM, "Orbit has GM");
					assert.equal(orb._t, jy2k, "Orbit has epoch");

				}

			})

		});

	}

	QUnit.module("Jovian LC1 XYZ", function ()
	{

		for (var body in tests) testBody(body);

	});

})(jovians_l1_results_xyz, QUnit);
