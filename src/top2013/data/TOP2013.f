!
!     -------
!     TOP2013  COMPUTATION OF PLANETARY EPHEMERIDES TOP2013
!     -------
!
! --- Declarations -----------------------------------------------------
!
      implicit none
!
      integer       :: i,j,ndat,ip,nul,n,ierr
      real*8        :: t0,step,t,tj
      real*8        :: eps,phi,ceps,seps,cphi,sphi
      real*8        :: pi,dpi,dgrad,sdrad
      character*40  :: fich
!
      character*8,   dimension(5)    :: body
      real*8,        dimension(6)    :: el,r1,r2
      real*8,        dimension(3,3)  :: rot(3,3)
      real*8,        parameter       :: t2000=2451545.d0
!
      data body /'JUPITER','SATURN','URANUS','NEPTUNE','PLUTO'/
!
      open (20,file='TOP2013.out')
!
! --- Dates of the ephemerides -----------------------------------------
!
      t0   = 2411545.0d0   !!! 1890 June 26 12h
      ndat = 11
      step = 4000.d0
!
! --- TOP2013 File -----------------------------------------------------
!
      nul=10
      fich='TOP2013.dat'
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
      do ip = 5,9
         write (20,1001) body(ip-4)
         do n = 1,ndat
            t  = t0+(n-1)*step
            tj = t-t2000
            call TOP2013 (tj,ip,fich,nul,el,ierr)
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
1001  format (/2x,'PLANETARY EPHEMERIS TOP2013',2x,a/
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
      subroutine TOP2013 (tdj,ipla,nfile,ifile,el,ierr)
! ----------------------------------------------------------------------
!
!     Reference : GF-JLS-2013
!
! --- Object -----------------------------------------------------------
!
!     Substitution of time in TOP2013 planetary solutions.
!     Variables :  Elliptic coordinates a, l, k, h, q, p.
!     Frame :      Dynamical equinox and ecliptic J2000.
!     Time scale : TDB, Temps Dynamique Barycentrique.
!     
! --- Input ------------------------------------------------------------
!
!     tdj      Julian Date in dynamical time TDB from J2000 (real*8).
!
!     ipla     Planet index (integer).
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
!     el(6)    Table of elliptic coordinates (real*8).
!              el(1): semi-major axis (au)
!              el(2): mean longitude (rd)
!              el(3): k = e*cos(pi) (rd)
!              el(4): h = e*sin(pi) (rd)
!              el(5): q = sin(i/2)*cos(omega) (rd)
!              el(6): p = sin(i/2)*sin(omega) (rd)
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
      real*8                             :: tdj
      integer                            :: ipla
      character*40                       :: nfile
      integer                            :: ifile
      real*8,        dimension(6)        :: el
      integer                            :: ierr
! 
      integer                            :: ip,it,iv,nt
      integer                            :: i,j,k,n,io,ifile0
      real*8                             :: dmu,date,arg,xl
      character*26                       :: ca,sa
      character*40                       :: nfile0
!
! --- File parameters  -------------------------------------------------
!
      logical                            :: fexist
      integer,       dimension(5,6,0:12) :: limit
      integer,       dimension(5)        :: nterm
      real*8,        dimension(336428)   :: c,s
      integer,       dimension(336428)   :: m
      real*8,        dimension(0:12)     :: time
!
! --- Initialization ---------------------------------------------------
!
      real*8, parameter :: dpi = 6.283185307179586476925287d0
!
      real*8, dimension(5) ::  freq
      data freq/
     & 0.5296909622785881d+03,
     & 0.2132990811942489d+03,
     & 0.7478166163181234d+02,
     & 0.3813297236217556d+02,
     & 0.2533566020437000d+02/
!
      data ifile0 /0/
      data nfile0 /'*'/
!
      save
!
! --- Check planet index ----------------------------------------------- 
!
      ierr=1
      if (ipla.lt.5.or.ipla.gt.9) return
!
! --- Time ------------------------------------------------------------- 
!
      date=tdj/365250.d0
      time(0)=1.d0
      do i=1,12
         time(i)=time(i-1)*date
      enddo
!
! --- File reading ----------------------------------------------------- 
!
      if (ifile.ne.ifile0.or.nfile.ne.nfile0) then
!
         ierr=2
         inquire (file=nfile,exist=fexist)
         if (.not.fexist) return
         open (ifile,file=nfile,status='old',iostat=io)
         if (io.ne.0) return
         ierr=3
         k=0
         do ip=1,5
            nterm(ip)=0
            do iv=1,6
            do it=0,12
               limit(ip,iv,it)=0
            enddo
            enddo
         enddo
!
         do
            read (ifile,1001,iostat=io) ip,iv,it,nt
            if (io.eq.-1) exit
            if (io.ne.0) return
            if (nt.eq.0) cycle
            limit(ip-4,iv,it)=nt
            do n=1,nt
               k=k+1
               nterm(ip-4)=nterm(ip-4)+1
               read (ifile,1002,iostat=io) m(k),ca,sa
               if (io.ne.0) return
               ca(23:23)='D'
               sa(23:23)='D'
               read (ca,'(d26.16)') c(k)
               read (sa,'(d26.16)') s(k)
            enddo
         enddo
!
         do i=5,2,-1
            nterm(i)=0
            do j=i-1,1,-1
               nterm(i)=nterm(i)+nterm(j)
            enddo
         enddo
         nterm(1)=0
         close (ifile)
         dmu=(freq(1)-freq(2))/880.d0
         ifile0=ifile
         nfile0=nfile
!
      endif
!
! --- Substitution of time ---------------------------------------------                    
!
      k=nterm(ipla-4)
      do iv=1,6
         el(iv)=0.d0
         do it=0,12
            if (limit(ipla-4,iv,it).eq.0) cycle
            do nt=1,limit(ipla-4,iv,it)
               k=k+1
               if (iv.eq.2.and.it.eq.1.and.m(k).eq.0) cycle
               arg=m(k)*dmu*time(1)
               el(iv)=el(iv)
     &               +time(it)*(c(k)*cos(arg)+s(k)*sin(arg))
            enddo
         enddo
      enddo
!
      xl=el(2)+freq(ipla-4)*time(1)
      xl=mod(xl,dpi)
      if (xl.lt.0.d0) xl=xl+dpi
      el(2)=xl
!
      ierr=0
      return
!
! --- Formats ----------------------------------------------------------
!
1001  format (21x,i2,12x,i2,7x,i2,2x,i6)
1002  format (1x,i8,2a26)
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
