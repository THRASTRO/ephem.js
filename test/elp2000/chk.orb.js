(function (tests) {

	var A1000 = 365.250;
	var T2000 = 2451545;

	function JD2J2000 (JDE)
	{
		return (JDE - T2000) / A1000;
	}

	QUnit.module( "Moon", function () {

		QUnit.test( "orb (1e-3)", function( assert )
		{

			for (var i = 0; i < tests.length; i += 25)
			{

				var test = tests[i],
				    jy2k = JDtoJY2K(test[0]);

				var orbit = elp2000orb.orbit(jy2k);

				var vars = ["t", "x", "y", "z"];

				for (var n = 1; n < vars.length; n += 1)
				{
					assert.close(
						orbit.r()[vars[n]], test[n] * KM2AU, 1e-3,
						test[0] + ": VSOP Parameter " +vars[n]
					);
				}

			}

			var jy2k = 42;
			var orbit = elp2000orb.orbit(jy2k);

			// closest distance from earth: 363104km
			// farthest distance from earth: 405696km
			var minDist = 0.0045;

			// Check for known rotation speed
			for (var i = 42; i < 568; i += 32) {
				var orbit2 = elp2000orb.orbit(jy2k + 27.321661547 * (i + 0.5) / 365.25);
				var dist2 = new THREE.Vector3()
					.copy(orbit.r())
					.sub(orbit2.r())
					.length();
				// Check that opposition has minimal distance
				// Meaning it should be very far away every time
				assert.ok(dist2 > minDist, "Opposition");
				var orbit3 = elp2000orb.orbit(jy2k + 27.321661547 * i / 365.25);
				var dist3 = new THREE.Vector3()
					.copy(orbit.r())
					.sub(orbit3.r())
					.length();
				// Check that after full rotation we are back close
				assert.ok(dist3 < minDist * 0.12, "Full rotation");
			}

		});

	});

})(elp2000_results);

