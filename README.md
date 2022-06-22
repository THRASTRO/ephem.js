## JavaScript libs to get Positions for Astronomical Bodies

Various planetary theories to compute positions of astronomical
bodies; mostly from the [Bureau des Longitudes][1] in [Paris][2].

[1]: https://en.wikipedia.org/wiki/Bureau_des_Longitudes
[2]: http://www.bureau-des-longitudes.fr/

### Main JavaScript API

Most theories share the same unified JS API. The main goal of the API is to
allow the best performance possible. To achieve this we try to avoid allocating
new memory (objects). Therefore the low-level APIs allow you to pass an existing
array plus an optional offset. The results are then written into the array.
If you don't pass an array, one will be newly allocated and returned.

Every API function accepts the following parameters:
`theory(jy2k, elems, addGM, addEpoch, offset)`

- `jy2k`: the time in julian years since JY2000
- `elems`: optional array where results are stored
- `addGM`: optionally write GM parameter into array
- `addEpoch`: optionally write epoch time into array
- `off`: optional offset where to write into the array

Base API will return the passed or a newly created `elems` array. If `addGM` and/or
`addEpoch` is set, the function will also write `GM` and `epoch` into the array
(in that order). So in total 6 to 8 parameters are written into the array. Make
sure you calculate the `offset` correctly for the configured stride size. The API
was mainly designed to work together with e.g. web-workers or WebGL shaders.

### Basic definitions

I tried to follow some naming standards to make it more clear with what we are
dealing with. This may not be the case in each and every source file though.

- `theory`: A specific implementation for a given body (e.g. planet or moon),
    backed by one main function/algorithm to drive all other API functions.
- `orbital`: An orbital is a regular JavaScript object, containing the needed
    orbital elements to create a `new Orbit`. This normally consists of 6 independent
    orbital parameters, like `aLkhqp`, `nLkhqp`, or a `position` plus `velocity` vector.
    Additionally we need the standard gravitational parameter (`GM`) and the `epoch`.
- `orbit`: An orbit is a `new Orbit(orbital)` object. See [AstroJS][1] documentation.
- `state`: A regular JavaScript object with either `x`, `y`, `z`, `vx`, `vy`, `vz`
    parameters defined or alternatively as [AstroJS][1] normally prefers it, with
	two 3D vectors `r` and `v` (easily interchangeable and Orbit accepts both).
- `jd2k`: time in julian `days` since `JD2000`
- `jy2k`: time in julian `years` since `JY2000`
- `jm2k`: time in julian `millenniums` since `JM2000`

### Available JavaScript function

Every theory has multiple functions with the mentioned parameters. They
only differ by what they return. Depending on the theory, it can be more
expensive to calculate the orbital VSOP elements or the state vectors.
The reason for this lies within the base algorithms, as some will directly
return orbital elements while others return state vectors. Some even return
orbital elements with the mean motion `n` instead of `L`, but we can easily
convert this parameter via the standard gravitation parameter `GM`. Even
further most satellites return orbital elements in another reference frame.
In order to get proper VSOP ecliptic orbital parameters, we need to convert
the acquired orbital to state vectors, rotate those, and create another
orbit from the rotated state vectors. Given that most theories involve
very complex calculations, those conversion are mostly negligible.

- `raw(jy2k, ...)` -> update `raw` elements in elems at offset and return `elems` array
- `vsop(jy2k, ...)` -> update `vsop` elements in elems at offset and return `elems` array
- `state(jy2k, ...)` -> // update `state` elements in elems at offset and return `elems` array
- `position(jy2k, ...)` -> update `state` elements in elems at offset and return `state` object
- `orbital(jy2k, ...)` -> update `vsop` elements in elems at offset and return `orbital` object
- `orbit(jy2k, ...)` -> update `vsop` elements in elems at offset and return `orbit` object

### Available theories

Most theories live under a certain namespace, e.g. all moons of saturn can be accessed via
`saturnian.body`. Alternatively they can be accessed via string keys, as in `saturnian['body']`.

#### Some older (deprecated) implementations:

- `pluto95` -> use VSOP2K instead
- `elp2000orb` -> use elpmpp02 instead

#### Moon theories with different fittings:

- `elpmpp02.llr`
- `elpmpp02.jpl`

#### Moons of Mars (marssat):

- `martian.phobos`
- `martian.deimos`

#### Moons of Jupiter (l1):

- `jovian.io`
- `jovian.europa`
- `jovian.ganymede`
- `jovian.callisto`

#### Moons of Saturn (tass17):

- `saturnian.mimas`
- `saturnian.enceladus`
- `saturnian.tethys`
- `saturnian.dione`
- `saturnian.rhea`
- `saturnian.titan`
- `saturnian.iapetus`
- `saturnian.hyperion`

#### Moons of Uranus (gust86):

- `uranian.miranda`
- `uranian.ariel`
- `uranian.umbriel`
- `uranian.titania`
- `uranian.oberon`

#### VSOP87 planets (Mercury to Uranus)

VSOP87 has 5 different main theories with different reference frames.
Every theory supports all 8 main planets. All support some form of
earth, either helio- or barycenteric (or both). Note that this
theory is kinda superseded by the VSOP2010/2013 theories.

- `vsop87.bdy` -> Heliocentric elliptic (elements J2000) (emb)
- `vsop87a.bdy` -> Heliocentric rectangular (variables J2000) (emb and earth)
- `vsop87b.bdy` -> Heliocentric spherical (variables J2000) (earth)
- `vsop87c.bdy` -> Heliocentric rectangular (variables of date) (earth)
- `vsop87d.bdy` -> Heliocentric spherical (variables of date) (earth)
- `vsop87e.bdy` -> Barycentric rectangular (variables J2000) (earth and sun)

To access the specific bodies use the first three letters of its name, e.g.:
- `mer`, `ven`, `emb` or `ear`, `mar`, `jup`, `sat`, `ura`, `nep` (`sun`)

#### VSOP2010/2013 planets (Mercury to Pluto)

These are the most modern theories for all planets (including Pluto).

- `vsop2010.bdy`
- `vsop2013.bdy`

To access the specific bodies use the first three letters of its name, e.g.:
- `mer`, `ven`, `emb`, `mar`, `jup`, `sat`, `ura`, `nep`, `plu`

#### TOP2010/2013 outer planets (Jupiter to Pluto)

These are the most modern theories for all outer planets.

- `top2010.bdy`
- `top2013.bdy`

To access the specific bodies use the first three letters of its name, e.g.:
- `jup`, `sat`, `ura`, `nep`, `plu`

### JavaScript Examples

```js
var state = vsop2013.emb.position(42);
var orbital = elpmpp02.llr.orbital(0);
var orbit = saturnian.rhea.orbit(21);
```

## Implemented theories

All the ground functionality to calculate the ephemerids has been collected and
converted in the best intention and to my best knowledge. Below I'll give a short
introduction for each theory that I've ported into this framework. I don't take
any ownership of the derived work and hope everything is properly attributed.

### Planets (VSOP)

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
Representation of planetary Ephemerides by frequency analysis.
Application to the five outer planets (Pluto95).

- ftp://ftp.imcce.fr/pub/ephem/planets/vsop87
- ftp://ftp.imcce.fr/pub/ephem/planets/vsop2010
- ftp://ftp.imcce.fr/pub/ephem/planets/vsop2013

### Outer Planets (TOP)

The TOP2010 solution is fitted to the Ephemeris DE405 over the time
interval +1890...+2000. The reference system in the solution TOP2010
is defined by the dynamical equinox and ecliptic J2000.0.

The TOP2013 solution is fitted to the numerical integration INPOP10a
built at IMCCE (Paris Observatory) over the time interval +1890...+2000.
The reference system in the solution TOP2013 is defined by the dynamical
equinox and ecliptic of J2000.0.

The TOP2013 solution is the best for the motion over the time interval
−4000...+8000. Its precision is of a few 0.1″ for the four planets,
i.e. a gain of a factor between 1.5 and 15, depending on the planet,
compared to VSOP2013. The precision of the theory of Pluto remains
valid up to the time span from 0 to +4000.

- ftp://ftp.imcce.fr/pub/ephem/planets/top2010
- ftp://ftp.imcce.fr/pub/ephem/planets/top2013

### Lunar/Moon (ELP)

ELP gives a series expansion of the orbital elements and the coordinates of the
Moon. The authors refer to it as a "semi-analytical" theory because they
developed their expressions not purely symbolically, but introduced numerical
values for orbital constants from the outset; but they also constructed partial
derivatives of all terms with respect to these constants, so they could make
corrections afterwards to reach the final solution.

ELP/MPP02, proposes two ways for computing the lunar coordinates:

- to use corrections obtained by the fit to Laser Lunar Ranging data (LLR);
- to use corrections obtained by the fit to the numerical integration DE405
  of the Jet Propulsion Laboratory (Standish, 1998)) used as an observing
  model; in that case some additive corrections are also applied to secular
  values of the lunar angles for approaching closer the JPL Ephemeris over
  6000 years.

ELP has been fitted not directly to observations, but to the numerical
integrations known as the Jet Propulsion Laboratory Development Ephemeris (which
includes the Lunar Ephemerides), that in their turn have been fitted to actual
astronomical observations. ELP was fitted initially to the DE200, but
improved parameters have been published up to DE405.

- ftp://ftp.imcce.fr/pub/ephem/moon/elp82b
- https://github.com/ytliu0/ElpMpp02

### Minor/Dwarf Planets (EPHASTER)

The observations of minor planets have been collected from Minor
Planets Center. Numerical integrations have been performed and
fitted to observations. Ephemerides of the equatorial heliocentric
rectangular coordinates of the minor planets are presented under
the form of Poisson series, covering 150 years from 1900.
The list is presently limited to planets number: 1, 2, 3, 4, 5, 6,
7, and 324 (Ceres, Pallas, Juno, Vesta, Astrae, Hebe, Iris and
Bamberga).

- ftp://ftp.imcce.fr/pub/ephem/asteroids/series

### Planetary Moons

I have ported the code for L1 (Jupiter), TASS17 (Saturn), GUST86 (Uranus)
and MARSSAT (Mars) directly from Stellarium, which is in turn a port
of the original Fortran code given in each of these theories:

- ftp://ftp.imcce.fr/pub/ephem/satel/galilean
- ftp://ftp.imcce.fr/pub/ephem/satel/tass17
- ftp://ftp.imcce.fr/pub/ephem/satel/gust86
- ftp://ftp.imcce.fr/pub/ephem/satel/martian

### ToDos

- ftp://ftp.imcce.fr/pub/ephem/satel/neptuno
- ftp://ftp.imcce.fr/pub/ephem/satel/faintsat

## Distribution files

- [VSOP87](src/vsop87/data) - [tiny](src/vsop87/dist/02-tiny/min) | [small](src/vsop87/dist/04-small/min) | [normal](src/vsop87/dist/06-normal/min) | [big](src/vsop87/dist/08-big/min) | [full](src/vsop87/dist/12-full/min) - [Unit tests](https://www.ocbnet.ch/thrastro/ephem.js/test/vsop87/06-normal.html)
- [VSOP2010](src/vsop2010/data) - [tiny](src/vsop2010/dist/02-tiny/min) | [small](src/vsop2010/dist/04-small/min) | [normal](src/vsop2010/dist/06-normal/min) | [big](src/vsop2010/dist/08-big/min) | [extreme](src/vsop2010/dist/10-extreme/min) - [Unit tests](https://www.ocbnet.ch/thrastro/ephem.js/test/vsop2010/06-normal.html)
- [VSOP2013](src/vsop2013/data) - [tiny](src/vsop2013/dist/02-tiny/min) | [small](src/vsop2013/dist/04-small/min) | [normal](src/vsop2013/dist/06-normal/min) | [big](src/vsop2013/dist/08-big/min) | [extreme](src/vsop2013/dist/10-extreme/min) - [Unit tests](https://www.ocbnet.ch/thrastro/ephem.js/test/vsop2013/06-normal.html)
- [TOP2010](src/top2010/data) - [tiny](src/top2010/dist/02-tiny/min) | [small](src/top2010/dist/04-small/min) | [normal](src/top2010/dist/06-normal/min) | [big](src/top2010/dist/08-big/min) | [extreme](src/top2010/dist/10-extreme/min) - [Unit tests](https://www.ocbnet.ch/thrastro/ephem.js/test/top2010/06-normal.html)
- [TOP2013](src/top2013/data) - [tiny](src/top2013/dist/02-tiny/min) | [small](src/top2013/dist/04-small/min) | [normal](src/top2013/dist/06-normal/min) | [big](src/top2013/dist/08-big/min) | [extreme](src/top2013/dist/10-extreme/min) - [Unit tests](https://www.ocbnet.ch/thrastro/ephem.js/test/top2013/06-normal.html)
- [EPHASTER](src/ephaster/data) - [tiny](src/ephaster/dist/02-tiny/min) | [small](src/ephaster/dist/04-small/min) | [normal](src/ephaster/dist/06-normal/min) | [big](src/ephaster/dist/08-big/min) | [extreme](src/ephaster/dist/12-full/min) - [Unit tests](https://www.ocbnet.ch/thrastro/ephem.js/test/ephaster/06-normal.html)
- [ELP2000-MPP02](src/elpmpp02/data) - [tiny](src/elpmpp02/dist/02-tiny/min) | [small](src/elpmpp02/dist/04-small/min) | [normal](src/elpmpp02/dist/06-normal/min) | [big](src/elpmpp02/dist/08-big/min) | [full](src/elpmpp02/dist/12-full/min) - [Unit tests](https://www.ocbnet.ch/thrastro/ephem.js/test/elpmpp02/06-normal.html)
- [ELP2000-82b](src/elp2000/data) - [libnova](src/elp2000/nova/dist) | [orb](src/elp2000/elp2000orb.js) | [xyz](src/elp2000/elp2000xyz.js)  - [Unit tests](https://www.ocbnet.ch/thrastro/ephem.js/test/elp2000/test.html)
- [Satellites](src/satellites/dist/min) -  [Martians](src/satellites/martians/dist/min) [tests](https://www.ocbnet.ch/thrastro/ephem.js/test/satellites/martians/test.html) | [Jovians](src/satellites/jovians/dist/min) [tests](https://www.ocbnet.ch/thrastro/ephem.js/test/satellites/jovians/test.html) | [Saturnians](src/satellites/saturnians/dist/min) [tests](https://www.ocbnet.ch/thrastro/ephem.js/test/satellites/saturnians/test.html) | [Uranians](src/satellites/uranians/dist/min) [tests](https://www.ocbnet.ch/thrastro/ephem.js/test/satellites/uranians/test.html) |

[1]: https://github.com/mgreter/astro.js