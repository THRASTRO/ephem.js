!
!     --------
!     VSOP2013  COMPUTATION OF PLANETARY EPHEMERIDES VSOP2013
!     --------
!
! --- Declarations -----------------------------------------------------
!
      implicit none
!
      integer  :: i,j,ndat,ip,nul,n,ierr
      real*8   :: t0,step,t,tj
      real*8   :: eps,phi,ceps,seps,cphi,sphi
      real*8   :: pi,dpi,dgrad,sdrad
!
      character*8,   dimension(9)    :: body
      character*40,  dimension(9)    :: name
      real*8,        dimension(6)    :: el,r1,r2
      real*8,        dimension(3,3)  :: rot(3,3)
      real*8,        parameter       :: t2000=2451545.d0
!
      data body/
     &     'MERCURY','VENUS','EMB','MARS','JUPITER',
     &     'SATURN','URANUS','NEPTUNE','PLUTO'/
!
      data name/
     &     'VSOP2013p1.dat','VSOP2013p2.dat',
     &     'VSOP2013p3.dat','VSOP2013p4.dat',
     &     'VSOP2013p5.dat','VSOP2013p6.dat',
     &     'VSOP2013p7.dat','VSOP2013p8.dat',
     &     'VSOP2013p9.dat'/
!
      open (20,file='VSOP2013.out')
!
! --- Dates of the ephemerides -----------------------------------------
!
      t0   = 2411545.0d0   !!! 1890 June 26 12h
      ndat = 11
      step = 4000.d0
!
! --- Rotation Matrix : Ecliptic -> Equator ----------------------------
!
      pi    = datan(1.d0)*4.d0
      dpi   = 2.d0*pi
      dgrad = pi/180.d0
      sdrad = pi/180.d0/3600.d0
!
      eps  = (23.d0+26.d0/60.d0+21.41136d0/3600.d0)*dgrad
      phi  = -0.05188d0*sdrad
      ceps = cos(eps)
      seps = sin(eps)
      cphi = cos(phi)
      sphi = sin(phi)
!
      rot(1,1) =  cphi
      rot(1,2) = -sphi*ceps
      rot(1,3) =  sphi*seps
      rot(2,1) =  sphi
      rot(2,2) =  cphi*ceps
      rot(2,3) = -cphi*seps
      rot(3,1) =  0.d0
      rot(3,2) =  seps
      rot(3,3) =  ceps
!
! --- Computation ------------------------------------------------------
!
      do ip = 1,9
         write (*,*) ' *** ',body(ip)
         nul = 10+ip
         write (20,1001) body(ip)
         do n = 1,ndat
            t  = t0+(n-1)*step
            tj = t-t2000
            call VSOP2013 (tj,ip,name(ip),nul,el,ierr)
            if (ierr.ne.0) stop1
            call ELLXYZ (ip,el,r1,ierr)
            if (ierr.ne.0) stop2
            do i=1,3
               r2(i)=0.d0
               r2(i+3)=0.d0
               do j=1,3
                  r2(i)=r2(i)+rot(i,j)*r1(j)
                  r2(i+3)=r2(i+3)+rot(i,j)*r1(j+3)
               enddo
            enddo
            write (20,1002) t,el,r1,r2
         enddo
         close (nul)
      enddo
!
      stop
!
1001  format (/2x,'PLANETARY EPHEMERIS VSOP2013',2x,a/
     &        /2x,'1/ Elliptic   Elements:',
     &         4x,'a (au), lambda (radian), k, h, q, p'
     &         7x,' - Dynamical Frame J2000'
     &        /2x,'2/ Ecliptic   Heliocentric Coordinates:',
     &         2x,'X,Y,Z (au)  X'',Y'',Z'' (au/d)',
     &         1x,' - Dynamical Frame J2000'
     &        /2x,'3/ Equatorial Heliocentric Coordinates:',
     &         2x,'X,Y,Z (au)  X'',Y'',Z'' (au/d)',
     &         1x,' - ICRS Frame J2000'/)
!
1002  format (2x,'Julian Date JD',f10.1,' (TDB)',3(/6f16.10))
!
      end
!
!
!
      subroutine VSOP2013 (tdj,ibody,nfile,ifile,r,ierr)
!-----------------------------------------------------------------------
!
!     Reference : GF-JLS-2013
!
! --- Object -----------------------------------------------------------
!
!     Substitution of time in VSOP2013 planetary solutions.
!     Variables :  Elliptic coordinates a, l, k, h, q, p.
!     Frame :      Dynamical equinox and ecliptic J2000.
!     Time scale : TDB, Temps Dynamique Barycentrique.
!
! --- Input ------------------------------------------------------------
!
!     tdj      Julian Date in dynamical time TDB from J2000 (real*8).
!
!     ibody    Body index (integer).
!              1: Mercury
!              2: Venus
!              3: Earth-Moon barycenter
!              4: Mars
!              5: Jupiter
!              6: Saturn
!              7: Uranus
!              8: Neptune
!              9: Pluto
!
!     nfile    Name of the file corresponding to the planet (character*40)
!
!     ifile    Logical unit index of the file (integer).
!
! --- Output -----------------------------------------------------------
!
!     r(6)     Table of variables (real*8).
!              r(1): semi-major axis (au)
!              r(2): mean longitude (rd)
!              r(3): k = e*cos(pi) (rd)
!              r(4): h = e*sin(pi) (rd)
!              r(5): q = sin(i/2)*cos(omega) (rd)
!              r(6): p = sin(i/2)*sin(omega) (rd)
!                    e:     eccentricity
!                    pi:    perihelion longitude
!                    i:     inclination
!                    omega: ascending node longitude
!
!     ierr :   Error index (integer).
!              ierr=0: no error.
!              ierr=1: planet index error.
!              ierr=2: file error (open).
!              ierr=3: file error (read).
!
! --- Declarations -----------------------------------------------------
!
      implicit none
!
      real*8                              :: tdj
      integer                             :: ibody
      character*40                        :: nfile
      integer                             :: ifile
      real*8,      dimension(6)           :: r
      integer                             :: ierr
!
      integer                             :: ibody0,ifile0
      integer                             :: i,j,n,nerr,nn,ip,iv,it,nt
      character*24                        :: ca,sa
      character*40                        :: nfile0
      real*8                              :: tj,aa,bb,arg,xl
!
! --- File parameters  -------------------------------------------------
!
      logical                             :: fexist
      integer,     parameter              :: maxterm=351000
      integer,     dimension(17,maxterm)  :: iphi
      real*8,      dimension(maxterm)     :: cc,ss
!
      integer,     dimension(6,0:20)      :: limit
      real*8,      dimension(0:20)        :: t
      real*8,      dimension(17)          :: ci0,ci1
      real*8,      dimension(9)           :: freqpla
!
! --- Initialization ---------------------------------------------------
!
      real*8,      parameter  :: dpi=6.283185307179586d0
      real*8,      parameter  :: a1000=365250.d0
!
      data ci0/               ! Mean Longitude J2000 (radian)
     & 0.4402608631669000d1,  ! Mercury
     & 0.3176134461576000d1,  ! Venus
     & 0.1753470369433000d1,  ! Earth-Moon Barycenter
     & 0.6203500014141000d1,  ! Mars
     & 0.4091360003050000d1,  ! Vesta
     & 0.1713740719173000d1,  ! Iris
     & 0.5598641292287000d1,  ! Bamberga
     & 0.2805136360408000d1,  ! Ceres
     & 0.2326989734620000d1,  ! Pallas
     & 0.5995461070350000d0,  ! Jupiter
     & 0.8740185101070000d0,  ! Saturn
     & 0.5481225395663000d1,  ! Uranus
     & 0.5311897933164000d1,  ! Neptune
     & 0.d0,                  !
     & 5.19846640063d0,       ! Moon (D)
     & 1.62790513602d0,       ! Moon (F)
     & 2.35555563875d0/       ! Moon (l)
!
      data ci1/               ! Mean Motions in longitude (radian/cy)
     & 0.2608790314068555d5,  ! Mercury
     & 0.1021328554743445d5,  ! Venus
     & 0.6283075850353215d4,  ! Earth-Moon Barycenter
     & 0.3340612434145457d4,  ! Mars
     & 0.1731170452721855d4,  ! Vesta
     & 0.1704450855027201d4,  ! Iris
     & 0.1428948917844273d4,  ! Bamberga
     & 0.1364756513629990d4,  ! Ceres
     & 0.1361923207632842d4,  ! Pallas
     & 0.5296909615623250d3,  ! Jupiter
     & 0.2132990861084880d3,  ! Saturn
     & 0.7478165903077800d2,  ! Uranus
     & 0.3813297222612500d2,  ! Neptune
     & 0.3595362285049309d0,  ! Pluto (Mu from TOP2013)
     &   77713.7714481804d0,  ! Moon (D)
     &   84334.6615717837d0,  ! Moon (F)
     &   83286.9142477147d0/  ! Moon (l)
!
      data freqpla/ 	      ! Planetary frequency in longitude
     & 0.2608790314068555d5,  ! Mecrcury
     & 0.1021328554743445d5,  ! Venus
     & 0.6283075850353215d4,  ! Earth-Moon Barycenter
     & 0.3340612434145457d4,  ! Mars
     & 0.5296909615623250d3,  ! Jupiter
     & 0.2132990861084880d3,  ! Saturn
     & 0.7478165903077800d2,  ! Uranus
     & 0.3813297222612500d2,  ! Neptune
     & 0.2533566020437000d2/  ! Pluto
!
      data ibody0 /0/
      data ifile0 /0/
      data nfile0 /'*'/
!
      save
!
! --- Check planet index -----------------------------------------------
!
      ierr=1
      if (ibody.lt.1.or.ibody.gt.9) return
!
! --- Time -------------------------------------------------------------
!
      tj=tdj/a1000
      t(0)=1.d0
      t(1)=tj
      do it=2,20
         t(it)=t(1)*t(it-1)
      enddo
!
! --- File reading -----------------------------------------------------
!
      if (ibody.ne.ibody0.or.ifile.ne.ifile0.or.nfile.ne.nfile0) then
!
         ierr=2
         inquire (file=nfile,exist=fexist)
         if (.not.fexist) return
         open (ifile,file=nfile,status='old',action='read',iostat=nerr)
         if (nerr.ne.0) return
         ierr=3
!
         nn=0
         do iv=1,6
         do it=0,20
            limit(iv,it)=0
         enddo
         enddo
!
         do
            read (ifile,1001,iostat=nerr) ip,iv,it,nt
            if (nerr.eq.-1) exit
            if (nerr.ne.0.or.ibody.ne.ip) return
            limit(iv,it)=nt
            do n=1,nt
               nn=nn+1
               read  (ifile,1002,iostat=nerr) (iphi(i,nn),i=1,17),sa,ca
               if (nerr.ne.0) return
               sa(21:21)='D'
               ca(21:21)='D'
               read (sa,'(d24.16)') ss(nn)
               read (ca,'(d24.16)') cc(nn)
               if (iv.eq.2.and.it.eq.1.and.n.eq.1) then
                  limit(iv,it)=nt-1
                  nn=nn-1
               endif
            enddo
         enddo
!
         ibody0=ibody
         ifile0=ifile
         nfile0=nfile
         close (ifile)
!
      endif
!
!
! --- Substitution of time ---------------------------------------------
!
      nn=0
      do iv=1,6
         r(iv)=0.d0
         do it=0,20
            if (limit(iv,it).eq.0) cycle
            do n=1,limit(iv,it)
               aa=0.d0
               bb=0.d0
               nn=nn+1
               do j=1,17
                  aa=aa+iphi(j,nn)*ci0(j)
                  bb=bb+iphi(j,nn)*ci1(j)
               enddo
               arg=aa+bb*t(1)
               r(iv)=r(iv)+t(it)*(ss(nn)*sin(arg)+cc(nn)*cos(arg))
            enddo
         enddo
      enddo
!
      xl=r(2)+freqpla(ip)*tj
      xl=mod(xl,dpi)
      if (xl.lt.0.d0) xl=xl+dpi
      r(2)=xl
!
      ierr=0
      return
!
! --- Formats ----------------------------------------------------------
!
1001  format (9x,3i3,i7)
1002  format (6x,4i3,1x,5i3,1x,4i4,1x,i6,1x,3i3,2a24)
!
      end
!
!
!
      subroutine ELLXYZ (ibody,v,w,ierr)
!-----------------------------------------------------------------------
!
!     Reference : GF-JLS-1212
!
! --- Object -----------------------------------------------------------
!
!     Computation of planetary rectangular coordinates from elliptic
!     variables.
!
! --- Input ------------------------------------------------------------
!
!     ibody    Body index (integer).
!              1: Mercury
!              2: Venus
!              3: Earth-Moon barycenter
!              4: Mars
!              5: Jupiter
!              6: Saturn
!              7: Uranus
!              8: Neptune
!              9: Pluto
!
!     v(6)     Elliptic variables reel (real*8).
!              v(1): semi-major axis (au)
!              v(2): mean longitude (rd)
!              v(3): k = e*cos(pi) (rd)
!              v(4): h = e*sin(pi) (rd)
!              v(5): q = sin(i/2)*cos(omega) (rd)
!              v(6): p = sin(i/2)*sin(omega) (rd)
!                    e:     eccentricity
!                    pi:    perihelion longitude
!                    i:     inclination
!                    omega: ascending node longitude
!
! --- Output -----------------------------------------------------------
!
!     w(6)     Rectangular coordinates (real*8)).
!              w(i),i=1,3 Positions  X, Y, Z (au)
!              w(i),i=4,5 Velocities X',Y',Z'(au/d)
!
!     ierr :   Error index (integer).
!              ierr=0: no error.
!              ierr=1: ibody error.
!
! --- Declarations -----------------------------------------------------
!
      implicit none
!
      integer                        :: ibody,ierr
      real*8,      dimension(6)      :: v,w
!
      complex*16                     :: dcmplx
      complex*16                     :: z,z1,z2,z3,zi,zeta,zto,zteta
!
      real*8                         :: rgm,xa,xl,xk,xh,xq,xp,xfi,xki
      real*8                         :: u,ex,ex2,ex3,gl,gm,e,dl,rsa
      real*8                         :: xcw,xsw,xm,xr,xms,xmc,xn
!
      real*8,      parameter         :: dpi=6.283185307179586d0
!
! --- Masses system (INPOP10A) -----------------------------------------
!
      real*8, dimension(9) :: gmp
      data gmp/
     & 4.9125474514508118699d-11,
     & 7.2434524861627027000d-10,
     & 8.9970116036316091182d-10,
     & 9.5495351057792580598d-11,
     & 2.8253458420837780000d-07,
     & 8.4597151856806587398d-08,
     & 1.2920249167819693900d-08,
     & 1.5243589007842762800d-08,
     & 2.1886997654259696800d-12/
      real*8 :: gmsol
      data gmsol /2.9591220836841438269d-04/
!
      save
!
! --- Initialization ---------------------------------------------------
!
      ierr=11
      if (ibody.lt.1.or.ibody.gt.9) return
      ierr=0
!
      rgm=dsqrt(gmp(ibody)+gmsol)
      xa=v(1)
      xl=v(2)
      xk=v(3)
      xh=v(4)
      xq=v(5)
      xp=v(6)
!
! --- Computation ------------------------------------------------------
!
      xfi=dsqrt(1.d0-xk*xk-xh*xh)
      xki=dsqrt(1.d0-xq*xq-xp*xp)
      u=1.d0/(1.d0+xfi)
      z=dcmplx(xk,xh)
      ex=cdabs(z)
      ex2=ex*ex
      ex3=ex2*ex
      z1=dconjg(z)
!
      gl=dmod(xl,dpi)
      gm=gl-datan2(xh,xk)
      e=gl+(ex-0.125d0*ex3)*dsin(gm)
     &    +0.5d0*ex2*dsin(2.d0*gm)
     &    +0.375d0*ex3*dsin(3.d0*gm)
!
      do
         z2=dcmplx(0.d0,e)
         zteta=cdexp(z2)
         z3=z1*zteta
         dl=gl-e+dimag(z3)
         rsa=1.d0-dreal(z3)
         e=e+dl/rsa
         if (dabs(dl).lt.1.d-15) exit
      enddo
!
      z1=u*z*dimag(z3)
      z2=dcmplx(dimag(z1),-dreal(z1))
      zto=(-z+zteta+z2)/rsa
      xcw=dreal(zto)
      xsw=dimag(zto)
      xm=xp*xcw-xq*xsw
      xr=xa*rsa
!
      w(1)=xr*(xcw-2.d0*xp*xm)
      w(2)=xr*(xsw+2.d0*xq*xm)
      w(3)=-2.d0*xr*xki*xm
!
      xms=xa*(xh+xsw)/xfi
      xmc=xa*(xk+xcw)/xfi
      xn=rgm/xa**(1.5d0)
!
      w(4)=xn*((2.d0*xp*xp-1.d0)*xms+2.d0*xp*xq*xmc)
      w(5)=xn*((1.d0-2.d0*xq*xq)*xmc-2.d0*xp*xq*xms)
      w(6)=2.d0*xn*xki*(xp*xms+xq*xmc)
!
      return
      end
