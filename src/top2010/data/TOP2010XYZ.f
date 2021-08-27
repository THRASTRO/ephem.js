!
!     ----------
!     TOP2010XYZ 
!     ----------
!
!     COMPUTATION OF PLANETARY EPHEMERIDES TOP2010
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
      open (20,file='TOP2010XYZ.out')
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
      fich='TOP2010XYZ.dat'
!
! --- Computation ------------------------------------------------------
!
      do ip = 5,8
         write (20,1001) body(ip-4)
         do n = 1,ndat
            t  = t0+(n-1)*step
            tj = t-t2000
            call TOP2010XYZ (tj,ip,fich,nul,r,ierr)
            if (ierr.ne.0) stop
            write (20,1002) t,r
         enddo
      enddo
!
      stop
!
1001  format (/2x,'PLANETARY EPHEMERIS TOP2010',2x,a/
     &        /2x,'Rectangular Heliocentric Coordinates (au)',
     &         1x,' - Dynamical Frame J2000'/)
!
1002  format (2x,'Julian Date (TDB)',f10.1,3f16.10)
!
      end
!
!
!
      subroutine TOP2010XYZ (tdj,ipla,nfile,ifile,r,ierr)
! ----------------------------------------------------------------------
!
!     Reference : GF-JLS-2013
!
! --- Object -----------------------------------------------------------
!
!     Substitution of time in TOP2010 planetary solutions.
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
      real*8,        dimension(319401) :: c,s
      integer,       dimension(319401) :: m
      real*8,        dimension(0:12)   :: time
!
! --- Initialization ---------------------------------------------------
!
      real*8, parameter :: dpi = 6.283185307179586476925287d0
!
      integer, dimension(4) :: nbterm
      data nbterm/0,43229,139694,253540/
!
      integer, dimension(0:12,3,4) :: id
      data id/
     &  7812, 5674,3477, 353, 301, 222, 167, 129,  87,  77,  54, 45, 27,
     &  7772, 5659,3485, 355, 296, 222, 165, 132,  85,  81,  52, 45, 27,
     &  3197, 2000, 966,  77,  63,  43,  32,  20,  12,   7,   5,  4,  2,
     & 14757,10632,7064,1192,1072, 992, 857, 732, 602, 488, 408,331,147,
     & 14678,10639,7099,1217,1088,1022, 889, 760, 621, 516, 423,298,149,
     &  7153, 5403,3670, 357, 305, 248, 190, 159, 121,  94,  49, 32, 11,
     & 16204,11783,7908,1977,2024,1906,1795,1515,1398,1022, 901,431, 33,
     & 16243,11783,7957,1946,2021,1890,1792,1503,1403,1045, 913,447, 32,
     &  6633, 4960,3256, 301, 247, 196, 153, 102,  81,  25,  19,  1,  0,
     & 12508, 8411,4821, 592, 458, 307, 183,  93,  49,  34,  27, 15,  2,
     & 12501, 8406,4849, 588, 463, 303, 187,  98,  49,  39,  30, 14,  2,
     &  5170, 3512,1950,  89,  50,  32,  11,   5,   3,   4,   5,  1,  0/
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
