(function (tests) {

	// load the actual test files
	document.write('<script src="../../src/ephaster/dist/'+ephastertst.name+'/min/ephaster.js"></scr'+'ipt>');

	QUnit.module( "EPHASTER", function ()
	{
		for (var body in tests)
		{

			(function (body) {

			QUnit.test( body, function( assert )
			{
				for (var i = 0; i < tests[body].length; i += 1) {

					var test = tests[body][i], time = test[0];
					var pos = ephaster(ephaster[body].coeffs, time);

					assert.close(
						pos.x, test[1], ephastertst.eps,
						body +' JD'+time+': Position x'
					);
					assert.close(
						pos.y, test[2], ephastertst.eps,
						body +' JD'+time+': Position y'
					);
					assert.close(
						pos.z, test[3], ephastertst.eps,
						body +' JD'+time+': Position z'
					);

				}


			});
			})(body);

		}
	});

})(ephaster_results);
