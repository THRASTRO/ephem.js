(function (tests, precs)
{
	var theory = [
			'mer',
			'ven',
			'emb',
			'mar',
			'jup',
			'sat',
			'nep',
			'ura',
			'plu'
	];
	QUnit.module( "Theory", function ()
	{
		for (var m in theory)
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
						var vars = ["t", "a", "L", "k", "h", "q", "p"];
						for (var n = 1; n < vars.length; n += 1)
						{
							assert.close(
								orb[vars[n]], test[n], vsop2013tst.eps * prec[vars[n]],
								test[0] + ": VSOP Parameter " + vars[n]
							);
						}
					}
				});
			})(theory[m]);
		}
	});
})(vsop2013_results, vsop2013_prec);
