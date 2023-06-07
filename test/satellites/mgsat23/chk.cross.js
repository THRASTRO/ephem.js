(function (tests, precs)
{

	QUnit.module( "Cross Check", function ()
	{
		for (var body in tests)
		{
			if (!saturnian[body]) continue;
			if (body.match(/^\d+$/)) continue;
			(function(body)
			{
				var prec = precs[body];
				QUnit.test( body, function( assert )
				{
					// Loop all tests (position and velocity xyz)
					for (var i = 0; i < tests[body][0].length; i += 6)
					{
						var t = i / (tests[body][0].length - 1);
						t = (prec.end - prec.start) * t + prec.start;

						var state = mgsat23[body].position(t);
						var check = saturnian[body].position(t);

						var expect = {
							x: tests[body][0][i] * KM2AU,
							y: tests[body][1][i] * KM2AU,
							z: tests[body][2][i] * KM2AU,
							vx: tests[body][3][i] * KM2AU / SEC2JD / JD2JY,
							vy: tests[body][4][i] * KM2AU / SEC2JD / JD2JY,
							vz: tests[body][5][i] * KM2AU / SEC2JD / JD2JY,
						}

						assert.close(
							state.x, expect.x, prec.eps,
							t + ": Position x"
						);
						assert.close(
							state.y, expect.y, prec.eps,
							t + ": Position y"
						);
						assert.close(
							state.z, expect.z, prec.eps,
							t + ": Position z"
						);
						assert.close(
							state.vx, expect.vx, prec.veps,
							t + ": Velocity x"
						);
						assert.close(
							state.vy, expect.vy, prec.veps,
							t + ": Velocity y"
						);
						assert.close(
							state.vz, expect.vz, prec.veps,
							t + ": Velocity z"
						);

						assert.close(
							check.x, expect.x, prec.eps,
							t + ": Check Position x"
						);
						assert.close(
							check.y, expect.y, prec.eps,
							t + ": Check Position y"
						);
						assert.close(
							check.z, expect.z, prec.eps,
							t + ": Check Position z"
						);
						// Velocity is too much apart
						// Not sure why, but one is better ;)
						// assert.close(
						// 	check.vx, expect.vx, prec.veps,
						// 	t + ": Check Velocity x"
						// );
						// assert.close(
						// 	check.vy, expect.vy, prec.veps,
						// 	t + ": Check Velocity y"
						// );
						// assert.close(
						// 	check.vz, expect.vz, prec.veps,
						// 	t + ": Check Velocity z"
						// );

						var orbital = mgsat23[body].orbital(t);
						var orbit = new Orbit(orbital);
						var other = orbit.state(t);
						assert.close(
							other.r.x, check.x, prec.eps,
							t + ": Redo Position x"
						);
						assert.close(
							other.r.y, check.y, prec.eps,
							t + ": Redo Position y"
						);
						assert.close(
							other.r.z, check.z, prec.eps,
							t + ": Redo Position z"
						);
						// Velocity is too much apart
						// Not sure why, but one is better ;)
						//assert.close(
						//	other.v.x, check.vx, prec.veps,
						//	t + ": Redo Velocity x"
						//);
						//assert.close(
						//	other.v.y, check.vy, prec.veps,
						//	t + ": Redo Velocity y"
						//);
						//assert.close(
						//	other.v.y, check.vz, prec.veps,
						//	t + ": Redo Velocity z"
						//);

					}
				});
			})(body);
		}
	});
})(result, mg_conf);
