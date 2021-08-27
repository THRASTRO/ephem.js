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
						var state = vsop2013[body].position(jy2k);

						assert.equal(state.epoch, jy2k, "Orbital epoch time");
						assert.equal(state.GM, vsop2013[body].GM, "Gravitational Parameter");

						// position state vector
						assert.close(
							state.x, test[7], vsop2013tst.eps * prec.r,
							test[0] + ": Ecliptic position x"
						);
						assert.close(
							state.y, test[8], vsop2013tst.eps * prec.r,
							test[0] + ": Ecliptic position y"
						);
						assert.close(
							state.z, test[9], vsop2013tst.eps * prec.r,
							test[0] + ": Ecliptic position z"
						);

						// velocity state vector
						assert.close(
							state.vx / 365.25, test[10], vsop2013tst.eps * prec.r,
							test[0] + ": Ecliptic velocity x"
						);
						assert.close(
							state.vy / 365.25, test[11], vsop2013tst.eps * prec.r,
							test[0] + ": Ecliptic velocity y"
						);
						assert.close(
							state.vz / 365.25, test[12], vsop2013tst.eps * prec.r,
							test[0] + ": Ecliptic velocity z"
						);

					}
				});
			})(body);
		}
	});
})(vsop2013_results, vsop2013_prec);
