(function (tests, precs)
{
	QUnit.module( "Equatorial", function ()
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
						var orbit = top2013[body].orbit(jy2k);

						// rotate from ecliptic to equatorial
						var e = 23 + 26/60 + 21.41136/3600;
						var r_ecl = orbit.r(), v_ecl = orbit.v(jy2k);
						var r_equ = (new Coord(r_ecl)).ecl2equ(e * DEG2RAD);
						var v_equ = (new Coord(v_ecl)).ecl2equ(e * DEG2RAD);

						assert.equal(orbit._t, jy2k, "Orbital epoch time");
						assert.equal(orbit._GM, top2013[body].GM, "Gravitational Parameter");

						// position state vector
						assert.close(
							r_equ.x, test[13], top2013tst.eps * prec.r,
							test[0] + ": Equatorial position x"
						);
						assert.close(
							r_equ.y, test[14], top2013tst.eps * prec.r,
							test[0] + ": Equatorial position y"
						);
						assert.close(
							r_equ.z, test[15], top2013tst.eps * prec.r,
							test[0] + ": Equatorial position z"
						);

						// velocity state vector
						assert.close(
							v_equ.x / 365.25, test[16], top2013tst.eps * prec.r,
							test[0] + ": Equatorial velocity x"
						);
						assert.close(
							v_equ.y / 365.25, test[17], top2013tst.eps * prec.r,
							test[0] + ": Equatorial velocity y"
						);
						assert.close(
							v_equ.z / 365.25, test[18], top2013tst.eps * prec.r,
							test[0] + ": Equatorial velocity z"
						);

					}
				});
			})(body);
		}
	});

})(top2013_results, top2013_prec);