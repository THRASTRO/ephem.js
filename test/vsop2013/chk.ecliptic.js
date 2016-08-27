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
						var test = tests[body][i],
						    time = JD2J2K(test[0]);
						var orbital = vsop2013[body].xyz(time);
						// position state vector
						assert.close(
							orbital.x, test[7], vsop2013tst.eps * prec.r,
							test[0] + ": VSOP to position x"
						);
						assert.close(
							orbital.y, test[8], vsop2013tst.eps * prec.r,
							test[0] + ": VSOP to position y"
						);
						assert.close(
							orbital.z, test[9], vsop2013tst.eps * prec.r,
							test[0] + ": VSOP to position z"
						);
						// velocity state vector
						assert.close(
							orbital.vx, test[10], vsop2013tst.eps * prec.r,
							test[0] + ": VSOP to velocity x"
						);
						assert.close(
							orbital.vy, test[11], vsop2013tst.eps * prec.r,
							test[0] + ": VSOP to velocity y"
						);
						assert.close(
							orbital.vz, test[12], vsop2013tst.eps * prec.r,
							test[0] + ": VSOP to velocity z"
						);
					}
				});
			})(body);
		}
	});
})(vsop2013_results, vsop2013_prec);
