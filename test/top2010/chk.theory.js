(function (tests, precs)
{
	QUnit.module( "Theory", function ()
	{
		for (var body in tests)
		{
			(function(body)
			{
				var prec = precs[body];
				QUnit.test( body, function( assert )
				{
					for (var i = 0; i < tests[body].length; i += 1)
					{

						var test = tests[body][i];
						var jy2k = JDtoJY2K(test[0]);
						var orb = top2010[body].orbital(jy2k);

						var vars = ["t", "a", "L", "k", "h", "q", "p"];
						for (var n = 1; n < vars.length; n += 1)
						{
							assert.close(
								orb[vars[n]], test[n], top2010tst.eps * prec[vars[n]],
								test[0] + ": VSOP Parameter " + vars[n]
							);
						}

						// Check after 2 days
						var off = 2 / 365.25;

						// get via theory and via older orbit
						var orbit = top2010[body].orbit(jy2k);
						var state1 = top2010[body].position(jy2k + off);
						var state2 = orbit.state(jy2k + off);

						assert.close(
							state2.r.x, state1.x, 1e-3,
							test[0] + ": Moved coordinate x"
						);
						assert.close(
							state2.r.y, state1.y, 1e-3,
							test[0] + ": Moved coordinate x"
						);
						assert.close(
							state2.r.z, state1.z, 1e-3,
							test[0] + ": Moved coordinate x"
						);

						assert.close(
							state2.v.x, state1.vx, 1e-2,
							test[0] + ": Moved velocity vx"
						);
						assert.close(
							state2.v.y, state1.vy, 1e-2,
							test[0] + ": Moved velocity vx"
						);
						assert.close(
							state2.v.z, state1.vz, 1e-3,
							test[0] + ": Moved velocity vx"
						);

					}
				});
			})(body);
		}
	});
})(top2010_results, top2010_prec);
