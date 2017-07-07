(function (tests, QUnit)
{

	function testBody(body)
	{

		var mat4 = new THREE.Matrix4();

		mat4.set(
			9.994327815023905713e-01, 3.039550993390781261e-02,-1.449924943755843383e-02, 0,
			-3.089770442223671880e-02, 9.988822846893227815e-01,-3.577028369016394015e-02, 0,
			1.339578739122566807e-02, 3.619798764705610479e-02, 9.992548516622136737e-01, 0,
			0, 0, 0, 1
		);

		var eul = new THREE.Euler();

//  {_x: -0.05, _y: 0.034, _z: -1.4, _or
eul.setFromRotationMatrix(mat4);

// this.laplace.rotation.x = - eul._x;
// this.laplace.rotation.y = - eul._y;
// this.laplace.rotation.z = - eul._z;



		QUnit.module("Satellite " + body, function ()
		{

			QUnit.test("Coordinatess", function (assert)
			{

				for (var i = 0; i < tests[body].length; i += 1) {
					var test = tests[body][i],
						time = test[0], elem = [];

					// time wanted is julian years from j2000 (delta JD2451545.0 in JY)
					// time given is julian days from 1980 (delta JD2444239.5 in JY)
					martian.xyz((time + 6491.5) / 365.25, body, elem);

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

	QUnit.module("Marsian SAT XYZ", function ()
	{

		for (var body in tests) testBody(body);

	});

})(martian_sat_results_xyz, QUnit);
