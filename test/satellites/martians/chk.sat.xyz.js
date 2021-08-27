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

			QUnit.test("Coordinatess", function (assert)
			{

				for (var i = 0; i < tests[body].length; i += 1) {
					var name = names[body];
					var test = tests[body][i], elem;
					var jy2k = test[0] / 365.25;

					martian[name].state(jy2k, elem = []);

					// elem[0] .. a/n,  elem[1] .. L
					// elem[2] .. K=e*cos(Omega+omega)
					// elem[3] .. H=e*sin(Omega+omega)
					// elem[4] .. Q=sin(i/2)*cos(Omega)
					// elem[5] .. P=sin(i/2)*sin(Omega)
					var vars = ["x", "y", "z", "vx", "vy", "vz"];

					for (var n = 0; n < 6; n += 1) {
						if (n > 2) elem[n] /= 365.25;
						assert.close(
							elem[n], test[n + 1], 1e-12,
							test[0] + ": Coordinate " + vars[n]
						);
					}

					var orb = martian[name].orbit(jy2k);
					var state = orb.state(jy2k);
					var vars = ["x", "y", "z"];

					for (var n = 0; n < 3; n += 1) {
						assert.close(
							state.r[vars[n]], test[n + 1], 1e-12,
							test[0] + ": Coordinate " + vars[n]
						);
					}
					for (var n = 0; n < 3; n += 1) {
						assert.close(
							state.v[vars[n]] / 365.25, test[n + 4], 1e-12,
							test[0] + ": Velocity " + vars[n]
						);
					}

					assert.equal(orb._GM, martian[name].GM, "Orbit has GM");
					assert.equal(orb._t, jy2k, "Orbit has epoch");

				}

			})

		});

	}

	QUnit.module("Marsian SAT XYZ", function ()
	{

		for (var body in tests) testBody(body);

	});

})(martian_sat_results_xyz, QUnit);


		// var mat4 = new THREE.Matrix4();
// 
		// mat4.set(
		// 	9.994327815023905713e-01, 3.039550993390781261e-02,-1.449924943755843383e-02, 0,
		// 	-3.089770442223671880e-02, 9.988822846893227815e-01,-3.577028369016394015e-02, 0,
		// 	1.339578739122566807e-02, 3.619798764705610479e-02, 9.992548516622136737e-01, 0,
		// 	0, 0, 0, 1
		// );

		// var eul = new THREE.Euler();
		// eul.setFromRotationMatrix(mat4);
		// this.laplace.rotation.x = - eul._x;
		// this.laplace.rotation.y = - eul._y;
		// this.laplace.rotation.z = - eul._z;
