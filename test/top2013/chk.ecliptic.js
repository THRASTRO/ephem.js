(function (tests, precs)
{
	QUnit.module( "Ecliptic", function ()
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
						var state = top2013[body].position(jy2k);

						assert.equal(state.epoch, jy2k, "Orbital epoch time");
						assert.equal(state.GM, top2013[body].GM, "Gravitational Parameter");

						// position state vector
						assert.close(
							state.x, test[7], top2013tst.eps * prec.r,
							test[0] + ": Ecliptic position x"
						);
						assert.close(
							state.y, test[8], top2013tst.eps * prec.r,
							test[0] + ": Ecliptic position y"
						);
						assert.close(
							state.z, test[9], top2013tst.eps * prec.r,
							test[0] + ": Ecliptic position z"
						);

						// velocity state vector
						assert.close(
							state.vx / 365.25, test[10], top2013tst.eps * prec.r,
							test[0] + ": Ecliptic velocity x"
						);
						assert.close(
							state.vy / 365.25, test[11], top2013tst.eps * prec.r,
							test[0] + ": Ecliptic velocity y"
						);
						assert.close(
							state.vz / 365.25, test[12], top2013tst.eps * prec.r,
							test[0] + ": Ecliptic velocity z"
						);

					}
				});
			})(body);
		}
	});
})(top2013_results, top2013_prec);
