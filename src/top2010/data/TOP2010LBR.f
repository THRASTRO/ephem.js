!
!     ----------
!     TOP2010LBR 
!     ----------
!
!     COMPUTATION OF PLANETARY EPHEMERIDES TOP2010
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
      open (20,file='TOP2010LBR.out')
!
! --- Dates of the ephemerides -----------------------------------------
!
      t0   = 2411545.0d0   !!! 1890 June 26 12h
      ndat = 11
      step = 4000.d0
!
! --- TOP2010 File -----------------------------------------------------
!
      nul=10
      fich='TOP2010LBR.dat'
!
! --- Computation ------------------------------------------------------
!
      do ip = 5,8
         write (20,1001) body(ip-4)
         do n = 1,ndat
            t  = t0+(n-1)*step
            tj = t-t2000
            call TOP2010LBR (tj,ip,fich,nul,r,ierr)
            if (ierr.ne.0) stop
            write (20,1002) t,r
         enddo
      enddo
!
      stop
!
1001  format (/2x,'PLANETARY EPHEMERIS TOP2010',2x,a/
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
      subroutine TOP2010LBR (tdj,ipla,nfile,ifile,r,ierr)
! ----------------------------------------------------------------------
!
!     Reference : GF-JLS-2013
!
! --- Object -----------------------------------------------------------
!
!     Substitution of time in TOP2010 planetary solutions.
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
      real*8,        dimension(220644) :: c,s
      integer,       dimension(220644) :: m
      real*8,        dimension(0:12)   :: time
!
! --- Initialization ---------------------------------------------------
!
      real*8, parameter :: dpi = 6.283185307179586476925287d0
!
      integer, dimension(4) :: nbterm
      data nbterm/0,29732,102290,186995/
!
      integer, dimension(0:12,3,4) :: id
      data id/
     &  4674, 3271,1745, 426, 334, 239, 176, 125,  84,  60,  41, 23,  5,
     &  2138, 1246, 573, 121,  91,  67,  55,  35,  22,  14,   7,  4,  3,
     &  5852, 4061,2167, 595, 463, 333, 243, 158, 112,  76,  49, 33, 11,
     &  7871, 5764,3782,1126, 993, 881, 710, 594, 452, 349, 255,209, 78,
     &  4297, 2959,1708, 397, 330, 264, 207, 165, 120,  90,  64, 41, 13,
     & 11767, 8487,5542,2441,2150,1872,1644,1374,1174, 911, 764,502,211,
     &  7337, 5616,3813,1388,1345,1217,1088, 905, 812, 594, 514,237, 17,
     &  3346, 2174,1130, 230, 179, 122,  89,  45,  26,   8,   1,  0,  0,
     & 13906,10188,6969,3241,3131,2957,2780,2419,2254,1811,1618,990,208,
     &  3857, 2480,1346, 283, 184, 116,  66,  32,  11,   9,   9,  2,  0,
     &  1357,  801, 352,  54,  29,  14,   5,   3,   1,   3,   3,  1,  0,
     &  9433, 6247,3460,1118, 862, 617, 398, 224, 119,  79,  56, 14,  4/
!
      real*8, dimension(4) ::  freq
      data freq/
     & 0.5296909690095173d+03,
     & 0.2132990805067157d+03,
     & 0.7478165814465839d+02,
     & 0.3813292747859727d+02/
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
         dmu=(0.5296909690160131d+03-0.2132990807324141d+03)/880.d0
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
