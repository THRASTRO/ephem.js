!
!     ----------
!     TOP2013LBR 
!     ----------
!
!     COMPUTATION OF PLANETARY EPHEMERIDES TOP2013
!     HELIOCENTRIC SPHERICAL COORDINATES
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
      open (20,file='TOP2013LBR.out')
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
      fich='TOP2013LBR.dat'
!
! --- Computation ------------------------------------------------------
!
      do ip = 5,8
         write (20,1001) body(ip-4)
         do n = 1,ndat
            t  = t0+(n-1)*step
            tj = t-t2000
            call TOP2013LBR (tj,ip,fich,nul,r,ierr)
            if (ierr.ne.0) stop
            write (20,1002) t,r
         enddo
      enddo
!
      stop
!
1001  format (/2x,'PLANETARY EPHEMERIS TOP2013',2x,a/
     &        /2x,'Spherical Heliocentric Coordinates:',
     &         1x,'Longitude & Latitude (rad) Distance (au)'/
     &         2x,'Dynamical Frame J2000'/)
!
1002  format (2x,'Julian Date (TDB)',f10.1,3f16.10)
!
      end
!
!
!
      subroutine TOP2013LBR (tdj,ipla,nfile,ifile,r,ierr)
! ----------------------------------------------------------------------
!
!     Reference : GF-JLS-2013
!
! --- Object -----------------------------------------------------------
!
!     Substitution of time in TOP2013 planetary solutions.
!     Variables :  Spherical Heliocentric Coordinates.
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
!              r(1): L, Heliocentric longitude (radian)
!              r(2): B, Heliocentric latitude (radian)
!              r(3): R, Distance Sun-Planet (au)
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
      real*8                          :: dmu,date,arg,xl
      character*26                    :: ca,sa
!
! --- File parameters  -------------------------------------------------
!
      real*8,        dimension(232762) :: c,s
      integer,       dimension(232762) :: m
      real*8,        dimension(0:12)   :: time
!
! --- Initialization ---------------------------------------------------
!
      real*8, parameter :: dpi = 6.283185307179586476925287d0
!
      integer, dimension(4) :: nbterm
      data nbterm/0,32701,108482,196339/
!
      integer, dimension(0:12,3,4) :: id
      data id/
     & 5218, 3508,1830, 446, 349, 252, 181, 131,  84,  54,  39,  21,  4,
     & 2189, 1258, 591, 126,  91,  65,  55,  32,  19,  12,   6,   4,  4,
     & 7127, 4478,2366, 639, 497, 357, 254, 159, 113,  63,  46,  20, 13,
     & 8139, 6096,3829,1153,1016, 895, 717, 592, 443, 341, 252, 192, 74,
     & 4101, 2913,1664, 367, 314, 248, 190, 131,  99,  62,  44,  20,  8,
     &12870, 9174,5901,2606,2312,2030,1742,1468,1245, 963, 829, 544,197,
     & 7830, 5813,3825,1390,1337,1215,1087, 905, 804, 583, 514, 235, 17,
     & 3250, 2139,1124, 233, 172, 122,  83,  44,  25,   8,   3,   0,  0,
     &15330,10840,7264,3349,3162,2982,2816,2441,2288,1805,1650, 996,176,
     & 3952, 2521,1374, 278, 182, 110,  67,  39,  20,  15,  11,   6,  1,
     & 1302,  769, 355,  56,  29,  16,   9,   9,   4,   4,   4,   1,  0,
     &10967, 6965,3734,1136, 885, 637, 402, 238, 134, 100,  68,  19,  4/
!
      real*8, dimension(4) ::  freq
      data freq/
     & 0.5296909622723741d+03,
     & 0.2132990809732973d+03,
     & 0.7478166167358461d+02,
     & 0.3813297236551104d+02/
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
               if (iv.eq.1.and.it.eq.1.and.m(nn).eq.0) cycle
               arg=m(nn)*dmu*time(1)
               r(iv)=r(iv)
     &              +time(it)*(c(nn)*cos(arg)+s(nn)*sin(arg)) 
            enddo
         enddo
      enddo
!
      xl=r(1)+freq(ipla-4)*time(1)
      xl=mod(xl,dpi)
      if (xl.lt.0.d0) xl=xl+dpi
      r(1)=xl
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
