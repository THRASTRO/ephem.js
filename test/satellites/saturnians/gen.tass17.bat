
@echo off

cd gen-tass17

echo var saturian_tass17_results = > ../results.tass17.js
echo var saturian_tass17_results_xyz = > ../results.tass17.xyz.js

gcc elliptic_to_rectangular.c tass17.c gen-cases-tass17.c -o gen-cases-tass17
gcc elliptic_to_rectangular.c tass17.c gen-cases-tass17-xyz.c -o gen-cases-tass17-xyz

gen-cases-tass17 >> ../results.tass17.js
gen-cases-tass17-xyz >> ../results.tass17.xyz.js

cd ..

pause