
@echo off

cd gen-l1

echo var jovians_l1_results = > ../results.l1.js
echo var jovians_l1_results_xyz = > ../results.l1.xyz.js

gcc elliptic_to_rectangular.c l1.c gen-cases-l1.c -o gen-cases-l1
gcc elliptic_to_rectangular.c l1.c gen-cases-l1-xyz.c -o gen-cases-l1-xyz

gen-cases-l1 >> ../results.l1.js
gen-cases-l1-xyz >> ../results.l1.xyz.js

cd ..

pause