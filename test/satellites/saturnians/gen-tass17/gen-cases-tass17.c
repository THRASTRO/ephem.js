#include <stdio.h>
#include "tass17.h"

int main()
{

	int body;
	double jd2k;
	double start = -20000.0;
	double end = + 20000.0;
	double step = 225.0;
	double elem[7];
	double lon[7];

	printf("{\n");
	for (body = 0; body < 8; body ++) {
		printf("\t\"%d\": [\n", body);
		for (jd2k = start; jd2k < end; jd2k += step) {
			// Both expect an offset
			float time = jd2k + 7305.0;
			CalcLon(time, lon); // cacheable per time
			CalcTass17Elem(time, lon, body, elem);
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