
@echo off

cd gen-gust86

echo var uranian_gust86_results = > ../results.gust86.js
echo var uranian_gust86_results_xyz = > ../results.gust86.xyz.js

gcc elliptic_to_rectangular.c gust86.c gen-cases-gust86.c -o gen-cases-gust86
gcc elliptic_to_rectangular.c gust86.c gen-cases-gust86-xyz.c -o gen-cases-gust86-xyz

gen-cases-gust86 >> ../results.gust86.js
gen-cases-gust86-xyz >> ../results.gust86.xyz.js

cd ..

pause