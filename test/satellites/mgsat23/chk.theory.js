(function (tests, precs)
{

	QUnit.module( "Theory", function ()
	{
		for (var body in tests)
		{
			//if (!saturnian[body]) continue;
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

						if (body == "saturn") continue;

						var orbital = mgsat23[body].orbital(t);
						var orbit = new Orbit(orbital);
						var other = orbit.state(t);
						assert.close(
							other.r.x, state.x, prec.eps,
							t + ": Redo Position x"
						);
						assert.close(
							other.r.y, state.y, prec.eps,
							t + ": Redo Position y"
						);
						assert.close(
							other.r.y, state.z, prec.eps,
							t + ": Redo Position z"
						);
						assert.close(
							other.v.x, state.vx, prec.veps,
							t + ": Redo Velocity x"
						);
						assert.close(
							other.v.y, state.vy, prec.veps,
							t + ": Redo Velocity y"
						);
						assert.close(
							other.v.z, state.vz, prec.veps,
							t + ": Redo Velocity z"
						);

					}
				});
			})(body);
		}
	});
})(result, mg_conf);
