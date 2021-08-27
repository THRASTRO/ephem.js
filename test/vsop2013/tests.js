// something seems fishy with the precision
var vsop2013_tests = [
	{ name: '02-tiny', eps: 4e-2 },
	{ name: '04-small', eps: 2e-3 },
	{ name: '06-normal', eps: 1e-4 },
	{ name: '08-big', eps: 1e-5 },
	{ name: '10-extreme', eps: 1e-6 },
	{ name: '12-full', eps: 1e-5 }
];

var vsop2013_prec = { // value for a is in km here (not au!)
	mer: { a:   0.012, L:    0.05, k:    1.0, h:    1.2, q:    0.1, p:    0.1, l:    0.06, b:   0.01, r:   0.229 },
	ven: { a:   0.013, L:    0.05, k:    0.3, h:    0.2, q:    0.1, p:    1.1, l:    0.02, b:   0.05, r:   0.320 },
	emb: { a:   0.029, L:    0.06, k:    0.8, h:    0.5, q:    0.1, p:    1.9, l:    0.02, b:   0.08, r:   0.423 },
	mar: { a:   0.078, L:    0.74, k:    4.6, h:    5.4, q:    0.3, p:    1.1, l:    0.93, b:   0.06, r:   0.692 },
	jup: { a:   0.419, L:    0.21, k:    2.9, h:    3.3, q:    0.5, p:    0.4, l:    0.20, b:   0.02, r:   2.264 },
	sat: { a:   0.850, L:    0.21, k:    4.8, h:    4.3, q:    0.9, p:    0.9, l:    0.24, b:   0.05, r:   6.092 },
	ura: { a:  15.120, L:    0.76, k:   40.0, h:   39.1, q:    3.0, p:    2.3, l:    2.19, b:   0.13, r:  12.762 },
	nep: { a:   3.432, L:    0.21, k:    9.1, h:    3.8, q:    1.5, p:    1.0, l:    0.38, b:   0.05, r:  13.507 },
	plu: { a: 124.710, L:    2.85, k:  198.1, h:  185.8, q:   56.9, p:   23.3, l:   10.83, b:   3.19, r: 118.419 }
};
