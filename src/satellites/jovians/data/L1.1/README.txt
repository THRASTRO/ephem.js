==========================                         ============================
                         IMCCE - Observatoire de Paris

		   Containt of the directory:  /pub/ephem/satel/galilean

===========================                         ============================


CONTENTS: These files give the ephemeris of the four Galilean moons.


AUTHOR  : V. Lainey


ADDRESS : IMCCE - Observatoire de Paris
          77 av. Denfert Rochereau, F-75014 PARIS
          Phone: (1) 40 51 22 72   
          Fax:   (1) 46 33 28 34 
          e-mail: lainey@imcce.fr


README FILE:       (07/05/2007)
------------

Subroutine V1_1 delivers the ephemerides of the Galilean moons.
It is based on a numerical model fitted to observations dispatched 
from 1891 to 2003. The expected accuracy of these ephemerides is few hundreds of kilometers
for the period [1970:2010]. 

There are no explicit time limit in the use of this subroutine. For request outside the period [1150:2750], the computation of the Solar long period must be
desactivated (set the input argument "is" to 0).

V1_1 is the only subroutine that the user should call.


Input:
------

ET=Time in Julian days (TDB) starting at the epoch 2433282.5 (01/01/1950 a 0H00 (TDB))

nsat=satellite number (1 Io, 2 Europa, 3 Ganymede, 4 Callisto)

is=computation of the Solar long periods (0=no, 1=yes)

iv=type of the output (0 are elliptical elements (a, L, k, h, q, p) in Jovian mean equator of the date,
                       1 are Jovian centered Cartesian coordinates in J2000 Earth mean equatorial frame)


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

2451545.d0

Io
  2.671999370920431E-003  7.644018403387422E-004  4.087344808808269E-004
 -3.116203340625001E-003  8.645679572984422E-003  4.066210333795641E-003
 
Europa
 -3.751373844521062E-003 -2.136179970327756E-003 -1.056765216826830E-003
  4.310591732986133E-003 -6.143199976514738E-003 -2.800434328620005E-003

Ganymede
 -5.490036250442612E-003 -4.112229247907583E-003 -2.033821277493470E-003
  4.036147912130572E-003 -4.364866691392988E-003 -2.037111499364415E-003

Callisto
  2.172082907229073E-003  1.118792302205555E-002  5.322275059416266E-003
 -4.662583658656747E-003  7.976685330152526E-004  3.092058747362411E-004


REFERENCES:

Lainey, V., Duriez, L. and Vienne, A. "Synthetic representation of the Galilean satellites' orbital motions from L1
ephemerides", Astron. Astrophys., vol 456 pp.783-788 (2007).


Lainey, V., Arlot, J.E. and Vienne, A. "New accurate ephemerides for the Galilean satellites of Jupiter. II. Fitting the
observations", Astron. Astrophys., vol 427 pp.371-376 (2004).


Lainey, V., Duriez, L. and Vienne, A. "New accurate ephemerides for the Galilean satellites of Jupiter. I. Numerical integration
of elaborated equations of motion", Astron. Astrophys., vol 420 pp.1171-1183 (2004).



Technical comments:
-------------------

1 - ephemeris construction: frequency analysis and synthetic representation

2 - software used: EQVARSOL++



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

