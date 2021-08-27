#include <stdio.h>
#include "marssat.h"

int main()
{

	int body;
	double jd2k;
	double start = - 20000.0;
	double end = + 20000.0;
	double step = 225.0;
	double elem[6];

	printf("{\n");
	for (body = 0; body < 2; body ++) {
		printf("\t\"%d\": [\n", body);
		for (jd2k = start; jd2k <= end; jd2k += step) {
			// This function requires t0 as argument
			float time = jd2k + 6491.5; // Add epoch
			CalcMarsSatElem(time, body, elem);
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