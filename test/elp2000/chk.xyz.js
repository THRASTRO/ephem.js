(function (tests) {

	var A1000 = 365.250;
	var T2000 = 2451545;

	QUnit.module( "Moon", function () {

		QUnit.test( "xyz (1e-5)", function( assert )
		{

			for (var i = 0; i < tests.length; i += 25)
			{

				var test = tests[i];
				var jy2k = JDtoJY2K(test[0]);

				var orb = elp2000xyz(jy2k);

				var vars = ["t", "x", "y", "z"];

				assert.equal(orb.epoch, jy2k, "Result has epoch");

				for (var n = 1; n < vars.length; n += 1)
				{
					assert.close(
						orb[vars[n]], test[n] * KM2AU, 1e-5,
						test[0] + ": VSOP Parameter " +vars[n]
					);
				}

			}

			var jy2k = 42;
			var xyz = new THREE.Vector3().copy(elp2000xyz(jy2k));

			// closest distance from earth: 363104km
			// farthest distance from earth: 405696km
			var minDist = 0.0045;

			// Check for known rotation speed
			for (var i = 42; i < 568; i += 32) {
				var xyz2 = new THREE.Vector3().copy(elp2000xyz(
					jy2k + 27.321661547 * (i + 0.5) / 365.25));
				var dist2 = xyz2.sub(xyz).length();
				// Check that opposition has minimal distance
				// Meaning it should be very far away every time
				assert.ok(dist2 > minDist, "Opposition");
				var xyz3 = new THREE.Vector3().copy(elp2000xyz(
					jy2k + 27.321661547 * i / 365.25));
				var dist3 = xyz3.sub(xyz).length();
				// Check that after full rotation we are back close
				assert.ok(dist3 < minDist * 0.12, "Full rotation");
			}

		});

	});

})(elp2000_results);

