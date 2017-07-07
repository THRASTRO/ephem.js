
@echo off

cd gen-sat

echo var martian_sat_results = > ../results.sat.js
echo var martian_sat_results_xyz = > ../results.sat.xyz.js

gcc elliptic_to_rectangular.c marssat.c gen-cases-sat.c -o gen-cases-sat
gcc elliptic_to_rectangular.c marssat.c gen-cases-sat-xyz.c -o gen-cases-sat-xyz

gen-cases-sat >> ../results.sat.js
gen-cases-sat-xyz >> ../results.sat.xyz.js

cd ..

pause