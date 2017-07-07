#include <stdio.h>
#include "marssat.h"

int main()
{

	int body;
	double jd;
	double start = - 20000.0;
	double end = + 20000.0;
	double step = 133.333;
	double elem[6];

	printf("{\n");
	for (body = 0; body < 2; body ++) {
		printf("\t\"%d\": [\n", body);
		for (jd = start; jd < end; jd += step) {
			CalcMarsSatElem(jd, body, elem);
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