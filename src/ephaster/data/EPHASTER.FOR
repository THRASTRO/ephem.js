*==============================================================================
*         FORTRAN PROGRAM: EPHASTER.FOR
*         Author: J. CHAPRONT (Bureau des Longitudes, Paris - FRANCE)
*         Version 1.0 (Oct. 1996)
*==============================================================================

	program EPHASTER
*-----------------------------------------------------------------------
*     EXAMPLE OF USE
*
*     Object:
*     This program computes the geocentric positions of a minor planet
*     for 10 values of the time (dynamical time) with 5400 days step.
*     Presently, the list of minor planets is restricted 8 bodies
*     numbered 1 to 7, and 324.
*
*     Starting Julian date = 2415020.5 (1900/Jan./1 0h).
*
*     Results:
*     The resulting values appear on the screen : geocentric rectangular
*     positions X, Y, Z (AU) of the minor planet (equinox and equator J2000).
*
*     Subroutine:
*     The program uses the subroutine SUBTIME, for the time substitution
*     in the series.
*
*     Files:
*     BARYCENT.XYZ (kbaryc)       Geocentric  Earth-Moon Barycenter
*     EMB.XYZ      (kearth)       Heliocentric Earth-Moon Barycenter
*     nnnn.XYZ     (kMP)          Heliocentric position of the minor
*                                 planet # n
*
*     The symbol of the corresponding UNIT is given in parenthese.
*     Its value is fixed by a PARAMETER (may be changed by the user).
*-----------------------------------------------------------------------

	implicit double precision (a-h,o-z)

	parameter           (kbaryc=1,kearth=2,kMP=3)

*-----------------------------------------------------------------------
*     Position vectors:
*     EB: Earth - Earth-Moon Barycenter
*     SB: Sun - Earth-Moon Barycenter
*     SMP Sun - Minor Planet
*     EMP: Geocentric coordinates of the minor planet

*-----------------------------------------------------------------------

	dimension           EB(3),SB(3),SMP(3),EMP(3)
	character*4         car
	character*8         nameMP
	logical             xq
*-----------------------------------------------------------------------

! Input the minor planet # n and read the series useful for the
! computation of geocentric coordinates
	inquire (FILE='BARYCENT.XYZ',EXIST=xq)
	if (.NOT.xq) stop 'File BARYCENT.XYZ does not exist'
	inquire (FILE='EMB.XYZ',EXIST=xq)
	if (.NOT.xq) stop 'File EMB.XYZ does not exist'

	open (UNIT=kbaryc,FILE='BARYCENT.XYZ')
	open (UNIT=kearth,FILE='EMB.XYZ')

	t0=2415020.5D0          ! Starting date (dynamical time)
	step=5400               ! Time step in days
	ndate=10                ! Number of computed dates

	print *,'Minor planet number ---> '
	read (*,*) n
	write (car,'(i4.4)') n              ! Minor planet # n

	nameMP=car//'.XYZ'
	inquire (FILE=nameMP,EXIST=xq)
	if (.NOT.xq) stop 'File of minor planet does not exist'

	open (UNIT=kMP,FILE=nameMP)         ! Open file nnnn.XYZ

	t=t0                                ! Starting date

	print '(//)'
	print *,'************************************************'
	write (*,'(/1X,''Minor Planet # '',I4/)') n

	do k=1,ndate
						     ! Time substitution in series:
	   call SUBTIME(1,kbaryc,t,EB)     ! File BARYCENTER.XYZ
	   call SUBTIME(2,kearth,t,SB)     ! File EMB.XYZ
	   call SUBTIME(3,kMP,t,SMP)       ! File nnnn.XYZ (minor planet n)

						     ! Computation of the geocentric
	   do i=1,3                        ! Coordinates of minor planet #n
		  EMP(i)=EB(i)-SB(i)+SMP(i)
	   end do
						     ! Output the results

	   write (*,'(1X,I2,F10.1,3(D20.10))') k,t,(EMP(i), i=1,3)
	   t=t+step

	end do

	print '(//)'
	print '(1X,''Hit Enter'')'
	read (*,*)

	print '(//)'
	print *,'************************************************'
	stop '................ End of the job ................'

	END

*-----------------------------------------------------------------------
	subroutine SUBTIME(nser,nulog,t,v)
*-----------------------------------------------------------------------
*        TIME SUBSTITUTION IN THE SERIES
*
*        INPUT
*
* nser:  Serial number of the series (1:3)
*        integer
*
*     1  Table of the coordinates of the Earth-Moon barycenter referred
*        to the Earth (Geocentric equatorial rectangular coordinates)
*     2  Table of the coordinates of the Earth-Moon barycenter referred
*        to the Sun (Heliocentric equatorial rectangular coordinates)
*     3  Table of the coordinates of the minor planet referred to the Sun
*        (Heliocentric equatorial rectangular coordinates)
*
* nulog: Logical unit of the file corresponding to nser
*        integer
*
* t:     Julian date (dynamical time)
*        real (double precision)
*
*        OUTPUT
*
* v:     Position vector of the minor planet X, Y, Z (AU) : Geocentric
*        rectangular coordinates (equinox and equator J2000).
*        real (double precision)
*
*        PARAMETERS, DATAS AND VARIABLES
*
* ivar:  Number of coordinates (always 3)
* nterm: Maximum number of terms in the series
*
* ct:    coefficients of the cosine (AU)
* st:    coefficients of the sine (AU)
* fq:    frequencies (radian/day)
*
* Tables ct, st, fq are dimensioned (I1,I2,I3) with:
*        I1=nterm, maximum number of terms
*        I2=3, number of coordinates
*        I3=3, number of series
*
* Length of validity:
* tinit: time origin of the series
* tend:  final time of the series
*
*        For the meaning of the variables:
*        ndeg, nsec, mx, nf, tzero, dt,
*        see comments in the subroutine LECSER
*
*        ERROR MESSAGE
*
* The subroutine stops if the time t is outside the complete interval of
* approximation (t <= tinit or t >= tend)
*-----------------------------------------------------------------------
	implicit double precision (a-h,o-z)

	parameter           (ivar=3,nsec=3,mixt=nsec-1,nterm=250)

	logical*1           xlec(3)

	dimension           ndeg(3,3),sec(0:nsec,3,3)
	dimension           ct(nterm,3,3),st(nterm,3,3)
	dimension           nf(0:mixt,3,3),fq(nterm,3,3)
	dimension           mx(3),tzero(3),dt(3)

	dimension           v(3)
	dimension           tinit(3),tend(3),mem(3)

	data xlec           /3*.TRUE./

	data    tinit
     &      /0.D0,2*2415020.5D0/
	data    tend
     &      /2500000.D0,2469380.5D0,2469740.5D0/

*-----------------------------------------------------------------------
*
	if (t.lt.tinit(nser).or.t.gt.tend(nser))
     &   stop 'Time outside the interval of validity'   ! ERROR

! Reading the series numbered: nser on UNIT: nlog

	if (xlec(nser)) then
	   call LECSER(nser,nulog,ndeg,sec,mx,ct,st,nf,fq,tzero,dt)
	   xlec(nser)=.FALSE.
	   mem(nser)=0
	end if
	if (nser.eq.1) goto 100
	irang=(t-tinit(nser))/dt(nser)
	kbloc=irang-mem(nser)
	if (kbloc.eq.0) goto 100
	if (kbloc.lt.0) then
	   rewind (UNIT=nulog)
	   kbloc=irang
	   mem(nser)=kbloc
	else
	   mem(nser)=irang
	end if
	if (kbloc.gt.1) then
	   do k=1,kbloc-1
		call LECSER(nser,nulog,ndeg,sec,mx,ct,st,nf,fq,tzero,dt)
	   end do
	end if
	call LECSER(nser,nulog,ndeg,sec,mx,ct,st,nf,fq,tzero,dt)

100   continue

! Time substitution in the series

! Evaluation of the constant and purely secular part of the series

	if (dt(nser).eq.0) then
	   x=0
	   fx=(t-tzero(nser))
	else
	   x=2*(t-tzero(nser))/dt(nser)-1
	   fx=dt(nser)/2*x
	end if

	do iv=1,ivar
	   v(iv)=0
	   wx=1
	   do i=0,ndeg(iv,nser)
		v(iv)=v(iv)+sec(i,iv,nser)*wx
		wx=wx*x
	   end do

! Evaluation of Poisson terms in the series
	   is=0
	   wx=1
	   do m=0,mx(nser)
		nw=nf(m,iv,nser)
		ws=0
		do i=1,nw
		   j=i+is
		   f=fq(j,iv,nser)*fx
		   ws=ws+ct(j,iv,nser)*cos(f)+st(j,iv,nser)*sin(f)
		end do
		v(iv)=v(iv)+ws*wx
		wx=wx*x
		is=is+nw
	   end do

	end do

	return
	END

*-----------------------------------------------------------------------
	subroutine LECSER(nser,nulog,ndeg,sec,mx,ct,st,nf,fq,tzero,dt)
*-----------------------------------------------------------------------
*        READING A SERIE
*
*        INPUT
*
* nser:  Serial number of the series (1:3)
*        integer
* nulog: Logical unit of the file corresponding to nser
*        integer
*
*        OUTPUT
*
* ndeg:  Degree of the polynomial for purely secular terms
*        integer
*        We must have: ndeg <= nsec, where nsec is the maximum degree
*        (always 3)
* sec:   Table of purely secular terms (radian)
*        real (double precision)
* mx:    Degree of Poisson terms
*        We must have mx <= mixt (always 2)
*        integer
* ct:    coefficients of the cosine (AU)
*        real (double precision)
* st:    coefficients of the sine (AU)
*        real (double precision)
* nf:    Number of frequencies for Poisson terms of degree 0, 1 ou 2
*        integer
* fq:    frequencies (radian/day)
*        real (double precision)
* tzero: Julian date of the time origin of the sub-interval
*        real (double precision)
* dt:    Length in days of the sub-interval
*        real (double precision)
*
* Tables ct, st, fq are dimensioned (I1,I2,I3) with:
*        I1=nterm, maximum number of terms
*        I2=3, number of coordinates
*        I3=3, number of series
*-----------------------------------------------------------------------
	implicit double precision (a-h,o-z)

	parameter           (ivar=3,nsec=3,mixt=nsec-1,nterm=250)

	dimension           ndeg(3,3),sec(0:nsec,3,3)
	dimension           ct(nterm,3,3),st(nterm,3,3)
	dimension           nf(0:mixt,3,3),fq(nterm,3,3)
	dimension           mx(3),tzero(3),dt(3)

*-----------------------------------------------------------------------

	do iv=1,ivar

	   read (nulog,FMT='(A12)')        ! Reading internal name (useless)

	   read (nulog,FMT='(F10.2,F8.0,I4)')
     &        tzero(nser),dt(nser),mx(nser)
	   read (nulog,'(I4)') imax
	   is=0
	   ndeg(iv,nser)=2*imax-1

	   do i=1,imax
		read (nulog,FMT='(10P,2F14.0)')
     &           sec(i+is-1,iv,nser),sec(i+is,iv,nser)
		is=is+1
	   end do

	   is=0
	   do m=0,mx(nser)
		read (nulog,FMT='(I4)') nw
		nf(m,iv,nser)=nw
		ip=mod(m,2)
		do i=1,nw
		   j=i+is
		   if (ip.eq.0) then
			read (nulog,FMT='(10P,2F14.0,0P,F20.16)')
     &                 ct(j,iv,nser),st(j,iv,nser),fq(j,iv,nser)
		   else
			read (nulog,FMT='(10P,2F14.0,0P,F20.16)')
     &                 st(j,iv,nser),ct(j,iv,nser),fq(j,iv,nser)
		   end if
		end do
		is=is+nw
	   end do

	end do

	return
	END

*-----------------------------------------------------------------------
