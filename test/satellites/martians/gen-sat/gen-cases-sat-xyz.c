#include <stdio.h>
#include "marssat.h"

int main()
{

	int body;
	double jd;
	double start = - 20000.0;
	double end = + 20000.0;
	double step = 133.333;
	double xyz[3];

	printf("{\n");
	for (body = 0; body < 2; body ++) {
		printf("\t\"%d\": [\n", body);
		for (jd = start; jd < end; jd += step) {
			GetMarsSatOsculatingCoor(jd + 2451545.0 + 6491.5, 0, body, xyz);
			printf(
				"\t\t[%.13f, %.13f, %.13f, %.13f],\n",
				jd, xyz[0], xyz[1], xyz[2]
			);
		}
		printf("\t],\n");
	}
	printf("}\n");

	return 0;

}