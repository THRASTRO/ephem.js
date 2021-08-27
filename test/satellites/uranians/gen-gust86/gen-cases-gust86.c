#include <stdio.h>
#include "gust86.h"

int main()
{

	int body;
	double jd2k;
	double start = - 20000.0;
	double end = + 20000.0;
	double step =  225.0;
	double elems[5*6];

	printf("{\n");
	// inefficient due to gust86 returning
	// element for all bodies (don't care)
	for (body = 0; body < 5; body ++) {
		printf("\t\"%d\": [\n", body);
		for (jd2k = start; jd2k < end; jd2k += step) {
			float time = jd2k + 7305.5;
			CalcGust86Elem(time, elems);
			double *elem = elems + 6 * body;
			printf(
				"\t\t[%.13f, %.13f, %.13f, %.13f, %.13f, %.13f, %.13f],\n",
				jd2k, elem[0], elem[1], elem[2], elem[3], elem[4], elem[5]
			);
		}
		printf("\t],\n");
	}
	printf("}\n");

	return 0;

}