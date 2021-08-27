#include <stdio.h>
#include "l1.h"

int main()
{

	int body;
	double jd;
	double start = - 20000.0;
	double end = + 20000.0;
	double step = 225.0;
	double xyz[6];

	printf("{\n");
	for (body = 0; body < 4; body ++) {
		printf("\t\"%d\": [\n", body);
		for (jd = start; jd < end; jd += step) {
			GetL1Coor(jd + 2451545.0, body, xyz);
			printf(
				"\t\t[%.13f, %.13f, %.13f, %.13f, %.13f, %.13f, %.13f],\n",
				jd, xyz[0], xyz[1], xyz[2], xyz[3], xyz[4], xyz[5]
			);
		}
		printf("\t],\n");
	}
	printf("}\n");

	return 0;

}