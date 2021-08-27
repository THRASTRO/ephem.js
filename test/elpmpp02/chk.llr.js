(function (tests) {

	QUnit.module( "ELPMPP02", function ()
	{
		QUnit.test( "LLR fitted", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var test = tests[i],
				    jy2k = JDtoJY2K(test[0]),
				    elp = elpmpp02.llr.position(jy2k),
				    vars = ["t", "x", "y", "z", "vx", "vy", "vz"];

				for (var n = 1; n < vars.length; n += 1)
				{
					if (n > 3) elp[vars[n]] /= 365.25;
					assert.close(
						elp[vars[n]], test[n], elpmpp02tst.eps,
						test[0] + ": Coordinate " +vars[n]
					);
				}

				assert.equal(elp.epoch, jy2k, "Has orbital epoch time");
				assert.equal(elp.GM, elpmpp02.llr.GM, "Has Gravitational Parameter");

				// Check after 2 days
				var off = 2 / 365.25;

				// get via theory and via older orbit
				var orbit = elpmpp02.llr.orbit(jy2k);
				var state1 = elpmpp02.llr.position(jy2k + off);
				var state2 = orbit.state(jy2k + off);

				assert.close(
					state2.r.x, state1.x, 1e-5,
					test[0] + ": Moved coordinate x"
				);
				assert.close(
					state2.r.y, state1.y, 1e-5,
					test[0] + ": Moved coordinate x"
				);
				assert.close(
					state2.r.z, state1.z, 1e-5,
					test[0] + ": Moved coordinate x"
				);

				assert.close(
					state2.v.x, state1.vx, 1e-2,
					test[0] + ": Moved coordinate vx"
				);
				assert.close(
					state2.v.y, state1.vy, 1e-2,
					test[0] + ": Moved coordinate vx"
				);
				assert.close(
					state2.v.z, state1.vz, 1e-3,
					test[0] + ": Moved coordinate vx"
				);

			}
		});
	});

})(elpmpp02_llr_results);

