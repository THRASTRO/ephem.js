==========================                         ============================
                         IMCCE - Observatoire de Paris

		    Content of the directory:  /pub/ephem/satel/martian

                                 2007, May 14
===========================                         ============================


CONTENTS: These files give the ephemeris of the two Martian moons, Phobos and Deimos.


AUTHOR  : V. Lainey


ADDRESS : IMCCE - Observatoire de Paris
          77 av. Denfert Rochereau, F-75014 PARIS
          Phone: (1) 40 51 22 72   
          Fax:   (1) 46 33 28 34 
          e-mail: lainey@imcce.fr



README FILE:       (03/05/2007)
------------


Subroutine MarsSatV1_0 delivers the ephemerides of the Martian moons.
It is based on a numerical model fitted to observations dispatched 
from 1877 to 2005. The expected accuracy of these ephemerides is around 500 meters
for the period [1998:2010], and few kilometers for the period [1967:2020]. 

There are no explicit time limit in the use of this subroutine. 
However we DO NOT recommend its use outside the period [1877-2025].
More details are available in (Lainey, Dehant, Patzold, 2007).


MarsSatV1_0 is the only subroutine that the user should call.

Input:
------

ET=Time in Julian days (TDB) starting at the epoch 2451545.0 (01/01/2000 at 12am)

nsat=satellite number (1 Phobos, 2 Deimos)

iv=type of the output (0 are elliptical elements (a, L, k, h, q, p) in Martian mean equator of the date,
                       1 are Mars centered Cartesian coordinates in J2000 Earth mean equatorial frame)


Output:
-------

ELEM(6)=(a, L, k, h, q, p) or (x, y, z, vx, vy, vz)


Units:
------

Positions, velocities and semi-major axis are in au and au/day. 
To convert it in kilometers, one should multiply by the astronomical value: 149597870.691
The angles are in radian.


Examples:
---------

Phobos

DJJ           ET          x               y             z                 vx             vy               vz
2451545.00    0.00 -0.000013308157 -0.000058444725 -0.000021266023  0.001064512701 -0.000025102894 -0.000588113378
2451555.00   10.00  0.000050907508  0.000033574979 -0.000011296402 -0.000467868433  0.000919831725  0.000700973156
2451565.00   20.00 -0.000051052809  0.000012426617  0.000033811410 -0.000476738966 -0.001108423072 -0.000278536649
2451575.00   30.00  0.000011455883 -0.000053566072 -0.000032215644  0.001069186433  0.000455089432 -0.000363041735
2451585.00   40.00  0.000035899752  0.000050192828  0.000004641808 -0.000861422609  0.000535375287  0.000730961432
2451595.00   50.00 -0.000056181406 -0.000012965245  0.000024600096  0.000000153132 -0.001111108324 -0.000537637730
2451605.00   60.00  0.000033910062 -0.000038516526 -0.000037325256  0.000870900873  0.000850538844 -0.000068951380


------------------------------------------------------------------------------------------------------------------

Deimos

DJJ           ET          x               y             z                 vx             vy               vz
2451545.00    0.00  0.000069313218 -0.000105248430 -0.000093221981  0.000601144991  0.000487226467 -0.000103180111
2451555.00   10.00  0.000003554238 -0.000139120094 -0.000072183842  0.000692893922  0.000179388498 -0.000311490283
2451565.00   20.00 -0.000063012999 -0.000139517199 -0.000033799655  0.000618066420 -0.000171235463 -0.000444920254
2451575.00   30.00 -0.000114484040 -0.000106353638  0.000012773591  0.000394438236 -0.000480928892 -0.000471513359
2451585.00   40.00 -0.000138399541 -0.000047650734  0.000056274718  0.000076110898 -0.000674666674 -0.000384698527
2451595.00   50.00 -0.000129040645  0.000022457606  0.000086250692 -0.000260176438 -0.000706323166 -0.000205603777
2451605.00   60.00 -0.000088636495  0.000087252940  0.000095540292 -0.000534197094 -0.000568224917  0.000023172689


REFERENCE:

Lainey, V., Dehant, V. and Paetzold, M. "First numerical ephemerides of the Martian moons", Astron. Astrophys., vol 465 pp.1075-1084
(2007).



Technical comments:
-------------------

1 - ephemeris construction: frequency analysis

2 - software used: NOE version 1.0


		
================================================================================
		 
		 THE USE OF THESE DATA IS SUBJECTED TO CONDITIONS. 
		 MORE INFORMATIONS ARE AVAILABLE ON THE WEB PAGE BELOW:
		 
		http://www.imcce.fr/page.php?nav=fr/site/copyright.php?top=1
  
--------------------------------------------------------------------------------  
User feed-back is encouraged. Unless otherwise specified, send comments and bug 
reports to:                    E-mail     : comments@imcce.fr
                               Fax        : (33) 01 46 33 28 34 
                               Postal mail: IMCCE - Observatoire de Paris
                                            77 avenue Denfert Rochereau
                                            F-75014 PARIS
================================================================================
