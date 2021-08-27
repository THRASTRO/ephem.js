#include <stdio.h>
#include "marssat.h"

int main()
{

	int body;
	double jd2k;
	double start = - 20000.0;
	double end = + 20000.0;
	double step = 225.0;
	double xyzdot[3];
	double xyz[3];

	printf("{\n");
	for (body = 0; body < 2; body ++) {
		printf("\t\"%d\": [\n", body);
		for (jd2k = start; jd2k < end; jd2k += step) {
			float jd = jd2k + 2451545.0;
			GetMarsSatCoor(jd, body, xyz, xyzdot);
			printf(
				"\t\t[%.13f, %.13f, %.13f, %.13f, %.13f, %.13f, %.13f],\n",
				jd2k, xyz[0], xyz[1], xyz[2], xyzdot[0], xyzdot[1], xyzdot[2]
			);
		}
		printf("\t],\n");
	}
	printf("}\n");

	return 0;

}