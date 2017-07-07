#include <stdio.h>
#include "gust86.h"

int main()
{

	int body;
	double jd;
	double start = - 20000.0;
	double end = + 20000.0;
	double step = 133.333;
	double xyz[5*6];

	printf("{\n");
	// inefficient due to gust86 returning
	// element for all bodies (don't care)
	for (body = 0; body < 5; body ++) {
		printf("\t\"%d\": [\n", body);
		for (jd = start; jd < end; jd += step) {
			GetGust86OsculatingCoor(jd + 2444239.5, 0, body, xyz);
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