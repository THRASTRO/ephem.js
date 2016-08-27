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
						var test = tests[body][i],
						    time = JD2J2K(test[0]);
						var orb = vsop2013[body](time);
						var orbital = new Orbital(orb);
						var e = 23 + 26/60 + 21.41136/3600;
						var r_ecl = orbital.r(), v_ecl = orbital.v();
						var r_equ = (new Coord(r_ecl)).ecl2equ(e * DEG2RAD);
						var v_equ = (new Coord(v_ecl)).ecl2equ(e * DEG2RAD);
						// hardcoded conversion matrix from vsop ecliptic to ICRF equatorial frame
						// var rx = Math.cos(p) * x - Math.sin(p)*Math.cos(e)*y + Math.sin(p)*Math.sin(e)*z;
						// var ry = Math.sin(p) * x + Math.cos(p)*Math.cos(e)*y - Math.cos(p)*Math.sin(e)*z;
						// var rz = Math.sin(e)*y + Math.cos(e)*z;
						// position state vector
						assert.close(
							r_equ.x, test[13], vsop2013tst.eps * prec.r,
							test[0] + ": VSOP to position x"
						);
						assert.close(
							r_equ.y, test[14], vsop2013tst.eps * prec.r,
							test[0] + ": VSOP to position y"
						);
							assert.close(
							r_equ.z, test[15], vsop2013tst.eps * prec.r,
							test[0] + ": VSOP to position z"
						);
						// velocity state vector
						assert.close(
							v_equ.x, test[16], vsop2013tst.eps * prec.r,
							test[0] + ": VSOP to velocity x"
						);
						assert.close(
							v_equ.y, test[17], vsop2013tst.eps * prec.r,
							test[0] + ": VSOP to velocity y"
						);
						assert.close(
							v_equ.z, test[18], vsop2013tst.eps * prec.r,
							test[0] + ": VSOP to velocity z"
						);
					}
				});
			})(body);
		}
	});

})(vsop2013_results, vsop2013_prec);
