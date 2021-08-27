#include <stdio.h>
#include "gust86.h"

int main()
{

	int body;
	double jd2k;
	double start = - 20000.0;
	double end = + 20000.0;
	double step = 225.0;
	double xyz[5*6];

	printf("{\n");
	// inefficient due to gust86 returning
	// element for all bodies (don't care)
	for (body = 0; body < 5; body ++) {
		printf("\t\"%d\": [\n", body);
		for (jd2k = start; jd2k <= end; jd2k += step) {
			float jd = jd2k + 2451545;
			GetGust86OsculatingCoor(jd, jd, body, xyz);
			printf(
				"\t\t[%.13f, %.13f, %.13f, %.13f, %.13f, %.13f, %.13f],\n",
				jd2k, xyz[0], xyz[1], xyz[2], xyz[3], xyz[4], xyz[5]
			);
		}
		printf("\t],\n");
	}
	printf("}\n");

	return 0;

}