!
!     ----------
!     TOP2013XYZ 
!     ----------
!
!     COMPUTATION OF PLANETARY EPHEMERIDES TOP2013
!     HELIOCENTRIC RECTANGULAR COORDINATES
!
! --- Declarations -----------------------------------------------------
!
      implicit none
!
      integer       :: ndat,ip,nul,n,ierr
      real*8        :: t0,step,t,tj
      character*40  :: fich
!
      character*8,   dimension(4)  :: body
      real*8,        dimension(3)  :: r
      real*8,        parameter     :: t2000=2451545.d0
!
      data body  /'JUPITER','SATURN','URANUS','NEPTUNE'/
!
      open (20,file='TOP2013XYZ.out')
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
      fich='TOP2013XYZ.dat'
!
! --- Computation ------------------------------------------------------
!
      do ip = 5,8
         write (20,1001) body(ip-4)
         do n = 1,ndat
            t  = t0+(n-1)*step
            tj = t-t2000
            call TOP2013XYZ (tj,ip,fich,nul,r,ierr)
            if (ierr.ne.0) stop
            write (20,1002) t,r
         enddo
      enddo
!
      stop
!
1001  format (/2x,'PLANETARY EPHEMERIS TOP2013',2x,a/
     &        /2x,'Rectangular Heliocentric Coordinates (au)',
     &         1x,' - Dynamical Frame J2000'/)
!
1002  format (2x,'Julian Date (TDB)',f10.1,3f16.10)
!
      end
!
!
!
      subroutine TOP2013XYZ (tdj,ipla,nfile,ifile,r,ierr)
! ----------------------------------------------------------------------
!
!     Reference : GF-JLS-2013
!
! --- Object -----------------------------------------------------------
!
!     Substitution of time in TOP2013 planetary solutions.
!     Variables :  Rectangular Heliocentric Coordinates.
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
!
!     nfile    Name of the file corresponding to the planet (character*40)
!
!     ifile    Logical unit index of the file (integer).
!
! --- Output ----------------------------------------------------------- 
!
!     r(3)     Table of elliptic coordinates (real*8).
!              r(1): X (au)
!              r(2): Y (au)
!              r(3): X (au)
!
!     ierr :   Error index (integer).
!              ierr=1: planet index error.
!              ierr=2: file error (open).
!              ierr=3: file error (read).
!
! --- Declarations -----------------------------------------------------
!
      implicit none
!
      integer                         :: ifile,ipla,ierr
      real*8                          :: tdj
      character*40                    :: nfile
      real*8,        dimension(3)     :: r
!
      logical                         :: fexist,prim
      integer                         :: ip,it,iv,nt
      integer                         :: i,io,k,kp,n,nn
      real*8                          :: dmu,date,arg
      character*26                    :: ca,sa
!
! --- File parameters  -------------------------------------------------
!
      real*8,        dimension(401940) :: c,s
      integer,       dimension(401940) :: m
      real*8,        dimension(0:12)   :: time
!
! --- Initialization ---------------------------------------------------
!
      real*8, parameter :: dpi = 6.283185307179586476925287d0
!
      integer, dimension(4) :: nbterm
      data nbterm/0,55195,188616,320661/
!
      integer, dimension(0:12,3,4) :: id
      data id/
     & 9518, 6547,3763,1077, 866, 686, 516, 372, 265, 172, 123,  73, 40,
     & 9450, 6480,3750,1079, 870, 688, 507, 379, 265, 173, 123,  74, 41,
     & 3451, 2085,1011, 208, 154, 119,  95,  73,  43,  29,  17,   9,  4,
     &15809,11864,7815,3389,3179,2827,2460,2088,1780,1343,1198, 880,588,
     &15934,11920,7857,3418,3160,2850,2487,2103,1782,1363,1217, 857,587,
     & 7852, 5785,3705, 974, 872, 774, 707, 581, 507, 335, 308, 149,117,
     &15719,11077,7361,3709,3516,3261,3073,2707,2507,2018,1809,1094,197,
     &15639,11047,7345,3701,3512,3267,3058,2704,2506,2034,1840,1096,190,
     & 5934, 4303,2684, 688, 592, 487, 415, 320, 309, 162, 137,  26,  1,
     &14352, 9466,5251,1620,1296, 949, 653, 407, 247, 176, 111,  58, 19,
     &14396, 9472,5279,1626,1300, 961, 666, 411, 248, 179, 110,  48, 20,
     & 5580, 3610,1959, 309, 202, 117,  74,  36,  22,  21,  16,  11,  1/
!
      data prim/.true./
!
      save
!
! --- Check planet index ----------------------------------------------- 
!
      ierr=1
      if (ipla.lt.5.or.ipla.gt.8) return
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
      if (prim) then
!
         ierr=2
         inquire (file=nfile,exist=fexist)
         if (.not.fexist) return
         open (ifile,file=nfile,status='old',iostat=io)
         if (io.ne.0) return
         ierr=3
         k=0
!
         do
            read (ifile,1001,iostat=io) ip,iv,it,nt
            if (io.eq.-1) exit
            if (io.ne.0) return
            do n=1,nt
               k=k+1
               read (ifile,1002,iostat=io) m(k),ca,sa
               if (io.eq.-1) return
               if (io.ne.0) return
               ca(23:23)='D'
               sa(23:23)='D'
               read (ca,'(d26.16)') c(k)
               read (sa,'(d26.16)') s(k)
            enddo
         enddo
!
         close (ifile)
         dmu=(0.5296909622785881d+03-0.2132990811942489d+03)/880.d0
         prim = .false.
!
      endif
!
! --- Substitution of time ---------------------------------------------                    
!
      kp=ipla-4
      nn=nbterm(kp)
      do iv=1,3
         r(iv)=0.d0
         do it=0,12
            if (id(it,iv,kp).eq.0) cycle
            do nt=1,id(it,iv,kp)
               nn=nn+1
               arg=m(nn)*dmu*time(1)
               r(iv)=r(iv)
     &              +time(it)*(c(nn)*cos(arg)+s(nn)*sin(arg)) 
            enddo
         enddo
      enddo
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
