## JavaScript Library to get Positions for Astronomical Bodies

This library contains various planetary theories to compute the position of
astronomical bodies. Most of them are from [Bureau des Longitudes] [1] in
[Paris] [2].

[1]: https://en.wikipedia.org/wiki/Bureau_des_Longitudes
[2]: http://www.bureau-des-longitudes.fr/

Currently only a few theories are here on github. Below are a few excerpts from
the main theories to be supported soon(ish).

The first version, VSOP82, computed only the orbital elements at any moment. An
updated version, VSOP87, besides providing improved accuracy, computed the
positions of the planets directly, as well as their orbital elements, at any
moment.

From 1890 to 2000, the precision of VSOP2013 goes from a few 0.01 mas (planets
except Mars and Uranus) up to 0.7 mas (Mars and Uranus). Compared to the
previous solution (VSOP2000), this represents an improvement of a factor of 2 to
24, depending on the planet. From -4000 to 8000, the precision is of a few 0.1?
for the telluric planets (1.6? for Mars), i.e. an improvement of about a factor
of 5 compared to VSOP2000. The TOP2013 solution is the best for the motion of
the major planets from -4000 to 8000. Its precision is of a few 0.1? for the
four planets, i.e. a gain between 1.5 and 15, depending on the planet compared
to VSOP2013. The precision of the theory of Pluto remains valid up to the time
span from 0 to 4000. The VSOP2013 and TOP2013 data are available on the WEB
server of the IMCCE.

ELP gives a series expansion of the orbital elements and the coordinates of the
Moon. The authors refer to it as a "semi-analytical" theory because they
developed their expressions not purely symbolically, but introduced numerical
values for orbital constants from the outset; but they also constructed partial
derivatives of all terms with respect to these constants, so they could make
corrections afterwards to reach the final solution.

ELP has been fitted not directly to observations, but to the numerical
integrations known as the Jet Propulsion Laboratory Development Ephemeris (which
includes the Lunar Ephemerides), that in their turn have been fitted to actual
astronomical observations. ELP was fitted initially to the DE200, but
improved parameters have been published up to DE405.

The tables of Pluto have been constructed by J. Chapront (BDL) with a new
method of approximation using frequency analysis as described in the paper :
Representation of planetary ephemerides by frequency analysis.
Application to the five outer planets (Pluto95).

The observations of minor planets have been collected from Minor
Planets Center. Numerical integrations have been performed and
fitted to observations. Ephemerides of the equatorial heliocentric
rectangular coordinates of the minor planets are presented under
the form of Poisson series, covering 150 years from 1900.
The list is presently limited to planets number: 1, 2, 3, 4, 5, 6,
7, and 324 (Ceres, Pallas,Juno, Vesta, Astrae, Hebe, Iris and
Bamberga).