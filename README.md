## JavaScript libs to get Positions for Astronomical Bodies

Various planetary theories to compute positions of astronomical
bodies; mostly from the [Bureau des Longitudes] [1] in [Paris] [2].

[1]: https://en.wikipedia.org/wiki/Bureau_des_Longitudes
[2]: http://www.bureau-des-longitudes.fr/

## Planets (VSOP)

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

The tables of Pluto have been constructed by J. Chapront (BDL) with a new
method of approximation using frequency analysis as described in the paper :
Representation of planetary ephemerides by frequency analysis.
Application to the five outer planets (Pluto95).

## Lunar/Moon (ELP)

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

ELP/MPP02, proposes two ways for computing the lunar coordinates:
- to use corrections obtained by the fit to Laser Lunar Ranging data (LLR);
- to use corrections obtained by the fit to the numerical integration DE405
  of the Jet Propulsion Laboratory (Standish, 1998)) used as an observing
  model; in that case some additive corrections are also applied to secular
  values of the lunar angles for approaching closer the JPL Ephemeris over
  6000 years.

## Minor/Dwarf Planets (EPHASTER)

The observations of minor planets have been collected from Minor
Planets Center. Numerical integrations have been performed and
fitted to observations. Ephemerides of the equatorial heliocentric
rectangular coordinates of the minor planets are presented under
the form of Poisson series, covering 150 years from 1900.
The list is presently limited to planets number: 1, 2, 3, 4, 5, 6,
7, and 324 (Ceres, Pallas, Juno, Vesta, Astrae, Hebe, Iris and
Bamberga).

## Distribution files

- [VSOP87](src/vsop87/data) - [tiny](src/vsop87/dist/02-tiny/min) | [small](src/vsop87/dist/04-small/min) | [normal](src/vsop87/dist/06-normal/min) | [big](src/vsop87/dist/08-big/min) | [full](src/vsop87/dist/12-full/min)
- [VSOP2010](src/vsop2010/data) - [tiny](src/vsop2010/dist/02-tiny/min) | [small](src/vsop2010/dist/04-small/min) | [normal](src/vsop2010/dist/06-normal/min) | [big](src/vsop2010/dist/08-big/min) | [extreme](src/vsop2010/dist/10-extreme/min)
- [VSOP2013](src/vsop2013/data) - [tiny](src/vsop2013/dist/02-tiny/min) | [small](src/vsop2013/dist/04-small/min) | [normal](src/vsop2013/dist/06-normal/min) | [big](src/vsop2013/dist/08-big/min) | [extreme](src/vsop2013/dist/10-extreme/min)
- [EPHASTER](src/ephaster/data) - [tiny](src/ephaster/dist/02-tiny/min) | [small](src/ephaster/dist/04-small/min) | [normal](src/ephaster/dist/06-normal/min) | [big](src/ephaster/dist/08-big/min) | [extreme](src/ephaster/dist/12-full/min)
- [ELP2000-MPP02](src/elpmpp02/data) - [tiny](src/elpmpp02/dist/02-tiny/min) | [small](src/elpmpp02/dist/04-small/min) | [normal](src/elpmpp02/dist/06-normal/min) | [big](src/elpmpp02/dist/08-big/min) | [full](src/elpmpp02/dist/12-full/min)
- [ELP2000-82b](src/elp2000/data) - [libnova](src/elp2000/nova/dist) | [orb](src/elp2000/elp2000orb.js) | [xyz](src/elp2000/elp2000xyz.js)
