## Planetary positions from VSOP87 analytic theories

Create JS implementations for all (truncated) [VSOP87] [1] theories.
Call `script/vsop87.pl 10e-6` to generate with default precision.
I use [webmerge] [2] to join and minify the different versions.

[1]: ftp://ftp.imcce.fr/pub/ephem/planets/vsop87
[2]: https://github.com/mgreter/webmerge

I have added a few batch files for the most common scenarios. But you
can probably just use one of the solutions in the dist folder.

