#include <stdio.h>
#include "gust86.h"

int main()
{

	int body;
	double jd;
	double start = - 20000.0;
	double end = + 20000.0;
	double step = 133.333;
	double elems[5*6];

	printf("{\n");
	// inefficient due to gust86 returning
	// element for all bodies (don't care)
	for (body = 0; body < 5; body ++) {
		printf("\t\"%d\": [\n", body);
		for (jd = start; jd < end; jd += step) {
			CalcGust86Elem(jd, elems);
			double *elem = elems + 6 * body;
			printf(
				"\t\t[%.13f, %.13f, %.13f, %.13f, %.13f, %.13f, %.13f],\n",
				jd, elem[0], elem[1], elem[2], elem[3], elem[4], elem[5]
			);
		}
		printf("\t],\n");
	}
	printf("}\n");

	return 0;

}