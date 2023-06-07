@echo off

REM if %1.==. ( echo No precision provided && exit )
REM if %2.==. ( echo No location provided && exit )

REM echo compiling %1 to %2
REM perl script\mgsat23.pl %1 src\%2\src

echo invoking webmerge
if not exist src\%2\conf mkdir src\%2\conf
copy conf\webmerge.conf.xml src\%2\conf

call webmerge

echo moving results
if not exist dist mkdir dist
if not exist dist\%2 mkdir dist\%2
if not exist dist\%2\min mkdir dist\%2\min
if not exist dist\%2\src mkdir dist\%2\src
if exist src\%2\dist\min xcopy /Y src\%2\dist\min\* dist\%2\min\
if exist src\%2\dist\src xcopy /Y src\%2\dist\src\* dist\%2\src\
