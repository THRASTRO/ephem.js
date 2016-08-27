*     -----------------
*     PROGRAMME EXAMPLE
*     -----------------
*
*     Reference : Bureau des Longitudes - MCTJCGF9502.
*
*     ------
*     Object
*     ------
*     This program is an example of use of ELP82B subroutine.
*     It computes the rectangular geocentric lunar coordinates referred
*     to the inertial mean ecliptic and equinox J2000 (Time TDB).
*
*     -----
*     Files
*     -----
*     The program reads the ELP2000-82B files.
*     Organization : 36 sequential ascii files.
*     Record length : 100 bytes.
*     Names : ELP82xx (xx = 1 to 36).
*     Longitude files : 1, 4, 10, 16, 22, 28, 31, 7, 13, 19, 25, 34.
*     Latitude  files : 2, 5, 11, 17, 23, 29, 32, 8, 14, 20, 26, 35.
*     Distance  files : 3, 6, 12, 18, 24, 30, 33, 9, 15, 21, 27, 36.
*
*     ------------
*     Declarations
*     ------------
      implicit double precision (a-h,o-z)
      logical fexist
      integer day,month,year,d0,h0,dt,datmod,trklev
      character rep,num1
      character*2 num2
      character*10 fich
      dimension r(3)
      pi=datan(1.d0)*4.d0
      sdrad=pi/180.d0/3600.d0
      nulog=10
      menu=3
*
*     -----------------
*     ELP2000-82B files
*     -----------------
      call CLRSCR
      print 1000
      nfile=0
      do i=1,36
         if (i.lt.10) then
            write (num1,'(i1)') i
            fich='ELP'//num1
         else
            write (num2,'(i2)') i
            fich='ELP'//num2
         endif
         inquire (file=fich,exist=fexist)
         if (.not.fexist) nfile=nfile+1
      end do
      if (nfile.ne.0) goto 500
*
*     -------------
*     Datation mode
*     -------------
100   continue
      if (menu.eq.2) goto 200
      call CLRSCR
      print 1000
      print 2001
      read (*,3001,iostat=nerr) datmod
      if (nerr.ne.0) goto 100
      if (datmod.lt.1.or.datmod.gt.2) goto 100
      if (datmod.eq.1) then
         print 2002
         read (*,3002,iostat=nerr) t0
         if (nerr.ne.0) goto 100
         if (t0.lt.1.d0) goto 100
      else
         print 2003
         read (*,3003,iostat=nerr) d0
         if (nerr.ne.0) goto 100
         call DATEJD (d0,0,td)
         if (td.eq.0.d0) goto 100
         print 2004
         read (*,3004,iostat=nerr) h0
         if (nerr.ne.0) goto 100
         call DATEJD (d0,h0,t0)
         if (t0.eq.0.d0) goto 100
      endif
      t=t0
      print 2005
      read (*,3005,iostat=nerr) dt
      if (nerr.ne.0.or.dt.lt.0) goto 100
      nh=dt/10000
      nm=mod(dt,10000)/100
      ns=mod(dt,100)
      if (nh.gt.24.or.nm.gt.60.or.ns.gt.60) goto 100
      pas=((nh+nm/60.d0)+ns/3600.d0)/24.d0
      print 1001
      read 3000, rep
      if (rep.eq.'N'.or.rep.eq.'n') goto 100
      if (menu.eq.1) goto 300
*
*     ----------------
*     Truncation level
*     ----------------
200   continue
      call CLRSCR
      print 1000
      print 2006
      read (*,3006,iostat=nerr) trklev
      if (nerr.ne.0) goto 200
      if (trklev.lt.1.or.trklev.gt.2) goto 200
      precas=0.d0
      if (trklev.eq.2) then
         print 2007
         read (*,3007,iostat=nerr) precas
         if (nerr.ne.0) goto 200
         if (precas.lt.0.d0.or.precas.gt.1.d0) goto 200
         print 1001
         read 3000, rep
         if (rep.eq.'N'.or.rep.eq.'n') goto 200
      endif
      precrd=precas*sdrad
      x=precas+0.5d-5
      ls1=x
      ls2=(x-ls1)*100000
      precm=precrd*384747981.d0
      x=precm+0.5d-2
      lm1=x
      lm2=(x-lm1)*100
*
*     ----------------------------
*     Computation of the ephemeris
*     ----------------------------
300   continue
      print 2008
*
*
      call ELP82B (t,precrd,nulog,r,ierr)
*
*
      if (ierr.ne.0) goto 500
      call JDDATE (t,idate,iheur)
      jdate=abs(idate)
      day=mod(jdate,100)
      month=mod(jdate/100,100)
      year=idate/10000
      nh=iheur/10000
      nm=mod(iheur/100,100)
      ns=mod(iheur,100)
310   continue
      call CLRSCR
      print 1000
      print 2009, day,month,year,nh,nm,ns,t,r
      if (precas.lt.1.d-5) print 2010
      if (precas.ge.1.d-5) print 2011, ls1,ls2,lm1,lm2
      print 2012
      read 3000, rep
      if (rep.ne.'+'.and.rep.ne.'-') goto 400
      if (dt.eq.0) goto 310
      if (rep.eq.'+') t=t+pas
      if (rep.eq.'-') t=t-pas
      goto 300
*
*     -------------------
*     Another computation
*     -------------------
400   continue
      call CLRSCR
      print 1000
      print 2013
      read (*,3013,iostat=nerr) menu
      if (nerr.ne.0) goto 400
      if (menu.lt.0.or.menu.gt.3) goto 400
      if (menu.ne.0) goto 100
      call CLRSCR
      print 1000
      print 2014
      pause ' Program terminated : Hit Enter'
      stop
*
*     -----------
*     File Errors
*     -----------
500   continue
      call CLRSCR
      print 1000
      if (nfile.ne.0) print 4001, nfile
      if (ierr.eq.1) print 4002
      if (ierr.eq.2) print 4003
      pause ' Program terminated : Hit Enter'
      stop
*
*     -------
*     Formats
*     -------
1000  format (2x,'MOON ELP2000-82B'/
     .        2x,'----------------')
1001  format (/2x,'Confirm your choice (y/n) ? ',$)
2001  format (/2x,'Datation mode'/
     .        /2x,'1 : computation with julian dates'
     .        /2x,'2 : computation with calendar dates'/
     .        /2x,'Enter your choice ? ',$)
2002  format (/2x,'Enter the initial julian date'
     .        /2x,'don''t forget the decimal point ---> ',$)
2003  format (/2x,'Enter the initial date'
     .        /2x,'format : +/-yyyymmdd -------------> ',$)
2004  format (/2x,'Enter the initial time'
     .        /2x,'format : hhmmss ------------------> ',$)
2005  format (/2x,'Enter the time step (<=24h)'
     .        /2x,'format : hhmmss ------------------> ',$)
2006  format (/2x,'Truncation level'/
     .        /2x,'1 : computation with the complete solution'
     .        /2x,'2 : computation with a truncated solution'/
     .        /2x,'Enter your choice ? ',$)
2007  format (/2x,'Enter the truncation level'
     .        /2x,'between 0.00000 and 1.00000 arcsecond'
     .        /2x,'don''t forget the decimal point -----> ',$)
2008  format (/2x,'Wait Please . . .')
2009  format (/2x,'Rectangular coordinates   - ',
     .         2x,'Dynamical ecliptic and equinox J2000'/
     .        /2x,'Date : ',i2.2,' / ',i2.2,' / ',i5
     .        /2x,'Time : ',i2.2,'h ',i2.2,'m ',i2.2,'s TDB'/
     .        /2x,'Julian date : ',f14.6/
     .        /2x,'X : ',f13.5,' km'
     .        /2x,'Y : ',f13.5,' km',
     .        /2x,'Z : ',f13.5,' km')
2010  format (/2x,'Truncation level : complete solution')
2011  format (/2x,'Truncation level : ',i1,'.',i5.5,'"',i5,'.',i2.2,'m')
2012  format (/2x,69('-')//2x,'Choice of time :    next time -> +',
     .        '    previous time -> -    stop -> 0'/
     .        /2x,'Enter your choice ? ',$)
2013  format (/2x,'Another computation'/
     .        /2x,'0 : stop'/
     .        /2x,'1 : with new datation mode'
     .        /2x,'2 : with new truncation level'
     .        /2x,'3 : with new datation mode and truncation level'/
     .        /2x,'Enter your choice ? ',$)
2014  format (///)
3000  format (a)
3001  format (i2)
3002  format (f14.6)
3003  format (i10)
3004  format (i7)
3005  format (i7)
3006  format (i2)
3007  format (f7.5)
3013  format (i2)
4001  format (/2x,'***** File Error *****'/
     .        /2x,'ELP files are missing in the current directory'
     .        /2x,'Number of missing files : ',i2/)
4002  format (/2x,'***** File Error *****'/
     .        /2x,'Wrong ELP File : fatal end of file'/)
4003  format (/2x,'***** File Error *****'/
     .        /2x,'Wrong ELP file : fatal reading error'/)
*
      end
*
*
*
      subroutine JDDATE (tjd,idate,ihour)
*-----------------------------------------------------------------------
*
*     Object :
*     Conversion   Julian date ---> Calendar date   (Meeus formular).
*
*     Input :
*     tjd         julian date (real double precision).
*
*     Ouput :
*     idate       calendar date (integer).
*                 julian calendar before 1582 october 15
*                 gregorian calendar after.
*                 code: *yyyymmdd (* sign).
*     ihour       hour (integer).
*                 code: hhmmss.
*
*-----------------------------------------------------------------------
      implicit double precision (a-h,o-z)
      integer day,month,year
      idate=0
      ihour=0
      if (tjd.lt.0.d0) return
      t=tjd+0.5d0/86400.d0+0.5d0
      z=dint(t)
      f=t-z
      if (z.lt.2299161.d0) then
         a=z
      else
         x=dint((z-1867216.25d0)/36524.25d0)
         a=z+1.d0+x-dint(x/4.d0)
      endif
      b=a+1524.d0
      c=dint((b-122.1d0)/365.25d0)
      d=dint(365.25d0*c)
      e=dint((b-d)/30.6001d0)
      day=b-d-dint(30.6001d0*e)
      month=e-1.d0
      if (e.lt.13.5d0) then
         month=e-1.d0
      else
         month=e-13.d0
      endif
      if (month.lt.3) then
         year=c-4715.d0
      else
         year=c-4716.d0
      endif
      is=+1
      if (year.lt.0) is=-1
      idate=((iabs(year)*100+month)*100+day)*is
      f=f*24.d0
      ih=f
      f=(f-ih)*60.d0
      im=f
      f=(f-im)*60.d0
      is=f
      ihour=(ih*100+im)*100+is
      return
      end
*
*
*
      subroutine DATEJD (idate,ihour,tjd)
*-----------------------------------------------------------------------
*
*     Object :
*     Conversion   Calendar date -> Julian date   (Meeus formular).
*
*     Input :
*     idate       calendar date gregorian/julian (integer).
*                 julian calendar before 1582 october 15
*                 gregorian calendar after.
*                 code: *yyyymmdd (* sign).
*     ihour       hour (integer).
*                 code: hhmmss.
*
*     Output
*     tjd         julian date (real double precision).
*
*-----------------------------------------------------------------------
      implicit double precision (a-h,o-z)
      integer day,month,year
      dimension lm(12)
      data lm/31,28,31,30,31,30,31,31,30,31,30,31/
      tjd=0.d0
      year=idate/10000
      if (year.lt.-4713.or.year.gt.5000) return
      kdate=iabs(idate)-iabs(year)*10000
      month=kdate/100
      if (month.lt.1.or.month.gt.12) return
      day=kdate-month*100
      lm(2)=28
      if (mod(year,4).eq.0) then
         lm(2)=29
         if (year.gt.1582) then
            ncent=year/100
            if (mod(year,100).eq.0.and.mod(ncent,4).ne.0) lm(2)=28
         endif
      endif
      if (day.lt.1.or.day.gt.lm(month)) return
      is=ihour
      ih=ihour/10000
      if (ih.lt.0.or.ih.gt.24) return
      is=is-ih*10000
      im=is/100
      if (im.lt.0.or.im.gt.60) return
      is=is-im*100
      if (is.lt.0.or.is.gt.60) return
      a=0.d0
      b=0.d0
      c=0.d0
      if (month.gt.2) then
         y=year
         m=month
      else
         y=year-1
         m=month+12
      endif
      if (y.lt.0.d0) then
         c=-0.75d0
      else
         if (idate.ge.15821015) then
            a=dint(y/100.d0)
            b=2.d0-a+dint(a/4.d0)
         endif
      endif
      tjd=dint(365.25d0*y+c)+dint(30.6001d0*(m+1))+day+
     .    dfloat(ih)/24.d0+dfloat(im)/1440.d0+dfloat(is)/86400.d0+
     .    1720994.5d0+b
      return
      end
*
*
*
      subroutine CLRSCR
*-----------------------------------------------------------------------
*
*     ref : bdl-gf9412
*
*     Object :
*     Clear the screen.
*
*     Remark :
*     *DOS  for DOS system.
*     *UNX  for UNIX system.
*
*-----------------------------------------------------------------------
*
*DOS  character*7 escscr
*DOS  escscr=char(27)//char(91)//'2J'//char(27)//char(91)//'H'
*DOS  write (*,'(2x,a)') escscr
*
*UNX  call system ('clear')
*
      call system ('clear')
*
      return
      end
*
*
*
      subroutine ELP82B (tjj,prec,nulog,r,ierr)
*-----------------------------------------------------------------------
*
*     Reference : Bureau des Logitudes - MCTJCGF9502.
*
*     Object :
*     Computation of geocentric lunar coordinates from ELP 2000-82 and
*     ELP2000-85 theories (M. Chapront-Touze and J. Chapront).
*     Constants fitted to JPL's ephemerides DE200/LE200.
*
*     Input :
*     tjj    julian date TDB (real double precision).
*     prec   truncation level in radian (real double precision).
*     nulog  number of logical unit for reading the files (integer).
*
*     Output :
*     r(3)   table of rectangular coordinates (real double precision).
*            reference frame : mean dynamical ecliptic and inertial
*            equinox of J2000 (JD 2451545.0).
*            r(1) : X (kilometer).
*            r(2) : Y (kilometer).
*            r(3) : Z (kilometer).
*     ierr   error index (integer).
*            ierr=0 : no error.
*            ierr=1 : error in elp 2000-82 files (end of file).
*            ierr=2 : error in elp 2000-82 files (reading error).
*
*     Remarks :
*     36 data files include the series related to various components of
*     the theory for the 3 spherical coordinates : longitude, latitude
*     and distance.
*     Files, series, constants and coordinate systems are described in
*     the notice LUNAR SOLUTION ELP 2000-82B.
*
*-----------------------------------------------------------------------
*
*     Declarations.
*
      implicit double precision (a-h,o-z)
      character a*50,fic*5
      dimension w(3,5),eart(5),peri(5),p(8,2),del(4,5),zeta(2)
      dimension r(3),t(5),pre(3),coef(7),ilu(4),ipla(11)
      data ideb/0/
*
*     Initialisation.
*
      r(1)=0.d0
      r(2)=0.d0
      r(3)=0.d0
*
      if (ideb.eq.0) then
*
         cpi=3.141592653589793d0
         cpi2=2.d0*cpi
         pis2=cpi/2.d0
         rad=648000.d0/cpi
         deg=cpi/180.d0
         c1=60.d0
         c2=3600.d0
         ath=384747.9806743165d0
         a0=384747.9806448954d0
         am=0.074801329518d0
         alfa=0.002571881335d0
         dtasm=2.d0*alfa/(3.d0*am)
*
*     Lunar arguments.
*
         w(1,1)=(218+18/c1+59.95571d0/c2)*deg
         w(2,1)=(83+21/c1+11.67475d0/c2)*deg
         w(3,1)=(125+2/c1+40.39816d0/c2)*deg
         eart(1)=(100+27/c1+59.22059d0/c2)*deg
         peri(1)=(102+56/c1+14.42753d0/c2)*deg
         w(1,2)=1732559343.73604d0/rad
         w(2,2)=14643420.2632d0/rad
         w(3,2)=-6967919.3622d0/rad
         eart(2)=129597742.2758d0/rad
         peri(2)=1161.2283d0/rad
         w(1,3)=-5.8883d0/rad
         w(2,3)=-38.2776d0/rad
         w(3,3)=6.3622d0/rad
         eart(3)=-0.0202d0/rad
         peri(3)=0.5327d0/rad
         w(1,4)=0.6604d-2/rad
         w(2,4)=-0.45047d-1/rad
         w(3,4)=0.7625d-2/rad
         eart(4)=0.9d-5/rad
         peri(4)=-0.138d-3/rad
         w(1,5)=-0.3169d-4/rad
         w(2,5)=0.21301d-3/rad
         w(3,5)=-0.3586d-4/rad
         eart(5)=0.15d-6/rad
         peri(5)=0.d0
*
*     Planetary arguments.
*
         preces=5029.0966d0/rad
         p(1,1)=(252+15/c1+3.25986d0/c2)*deg
         p(2,1)=(181+58/c1+47.28305d0/c2)*deg
         p(3,1)=eart(1)
         p(4,1)=(355+25/c1+59.78866d0/c2)*deg
         p(5,1)=(34+21/c1+5.34212d0/c2)*deg
         p(6,1)=(50+4/c1+38.89694d0/c2)*deg
         p(7,1)=(314+3/c1+18.01841d0/c2)*deg
         p(8,1)=(304+20/c1+55.19575d0/c2)*deg
         p(1,2)=538101628.68898d0/rad
         p(2,2)=210664136.43355d0/rad
         p(3,2)=eart(2)
         p(4,2)=68905077.59284d0/rad
         p(5,2)=10925660.42861d0/rad
         p(6,2)=4399609.65932d0/rad
         p(7,2)=1542481.19393d0/rad
         p(8,2)=786550.32074d0/rad
*
*     Corrections of the constants (fit to DE200/LE200).
*
         delnu=+0.55604d0/rad/w(1,2)
         dele=+0.01789d0/rad
         delg=-0.08066d0/rad
         delnp=-0.06424d0/rad/w(1,2)
         delep=-0.12879d0/rad
*
*     Delaunay's arguments.
*
         do i=1,5
            del(1,i)=w(1,i)-eart(i)
            del(4,i)=w(1,i)-w(3,i)
            del(3,i)=w(1,i)-w(2,i)
            del(2,i)=eart(i)-peri(i)
         enddo
         del(1,1)=del(1,1)+cpi
         zeta(1)=w(1,1)
         zeta(2)=w(1,2)+preces
*
*     Precession matrix.
*
         p1=0.10180391d-4
         p2=0.47020439d-6
         p3=-0.5417367d-9
         p4=-0.2507948d-11
         p5=0.463486d-14
         q1=-0.113469002d-3
         q2=0.12372674d-6
         q3=0.1265417d-8
         q4=-0.1371808d-11
         q5=-0.320334d-14
*
         ideb=1
         t(1)=1.d0
      endif
*
      t(2)=(tjj-2451545.0d0)/36525.d0
      t(3)=t(2)*t(2)
      t(4)=t(3)*t(2)
      t(5)=t(4)*t(2)
      pre(1)=prec*rad
      pre(2)=prec*rad
      pre(3)=prec*ath
      ific=1
      ierr=0
*
*     Distribution of files.
*
100   continue
      if (ific.gt.36) go to 500
      if (ific.ge.1.and.ific.le.3) go to 200
      if (ific.ge.4.and.ific.le.9) go to 300
      if (ific.ge.10.and.ific.le.21) go to 400
      if (ific.ge.22.and.ific.le.36) go to 300
*
*     Main problem.
*
200   write(fic,2000)ific
      open(nulog,file=fic)
      read (nulog,1000,end=600,err=700) a
      iv=mod(ific-1,3)+1
210   read (nulog,1001,end=230,err=700) ilu,coef
      x=coef(1)
      if (dabs(x).lt.pre(iv)) go to 210
      tgv=coef(2)+dtasm*coef(6)
      if (ific.eq.3) coef(1)=coef(1)-2.d0*coef(1)*delnu/3.d0
      x=coef(1)+tgv*(delnp-am*delnu)+coef(3)*delg+coef(4)*dele+
     .coef(5)*delep
      y=0.d0
      do 220 k=1,5
      do 220 i=1,4
      y=y+ilu(i)*del(i,k)*t(k)
220   continue
      if (iv.eq.3) y=y+pis2
      y=dmod(y,cpi2)
      r(iv)=r(iv)+x*dsin(y)
      go to 210
230   ific=ific+1
      close(nulog)
      go to 100
*
*     Figures - Tides - Relativity - Solar eccentricity.
*
300   if(ific.le.9) then
      write(fic,2000)ific
      else
      write(fic,2001)ific
      endif
      open(nulog,file=fic)
      read (nulog,1000,end=600,err=700) a
      iv=mod(ific-1,3)+1
310   read (nulog,1002,end=330,err=700) iz,ilu,pha,x,per
      if (x.lt.pre(iv)) go to 310
      if (ific.ge.7.and.ific.le.9) x=x*t(2)
      if (ific.ge.25.and.ific.le.27) x=x*t(2)
      if (ific.ge.34.and.ific.le.36) x=x*t(3)
      y=pha*deg
      do 320 k=1,2
      y=y+iz*zeta(k)*t(k)
      do 320 i=1,4
      y=y+ilu(i)*del(i,k)*t(k)
320   continue
      y=dmod(y,cpi2)
      r(iv)=r(iv)+x*dsin(y)
      go to 310
330   ific=ific+1
      close(nulog)
      go to 100
*
*     Planetary perturbations.
*
400   write(fic,2001)ific
      open(nulog,file=fic)
      read (nulog,1000,end=600,err=700) a
      iv=mod(ific-1,3)+1
410   read (nulog,1003,end=480,err=700) ipla,pha,x,per
      if (x.lt.pre(iv)) go to 410
      if (ific.ge.13.and.ific.le.15) x=x*t(2)
      if (ific.ge.19.and.ific.le.21) x=x*t(2)
      y=pha*deg
      if (ific.ge.16) go to 430
      do 420 k=1,2
      y=y+(ipla(9)*del(1,k)+ipla(10)*del(3,k)+ipla(11)*del(4,k))*t(k)
      do 420 i=1,8
      y=y+ipla(i)*p(i,k)*t(k)
420   continue
      go to 470
430   do 460 k=1,2
      do 440 i=1,4
440   y=y+ipla(i+7)*del(i,k)*t(k)
      do 450 i=1,7
450   y=y+ipla(i)*p(i,k)*t(k)
460   continue
470   y=dmod(y,cpi2)
      r(iv)=r(iv)+x*dsin(y)
      go to 410
480   ific=ific+1
      close(nulog)
      go to 100
*
*     Change of coordinates.
*
500   r(1)=r(1)/rad+w(1,1)+w(1,2)*t(2)+w(1,3)*t(3)+w(1,4)*t(4)
     .+w(1,5)*t(5)
      r(2)=r(2)/rad
      r(3)=r(3)*a0/ath
      x1=r(3)*dcos(r(2))
      x2=x1*dsin(r(1))
      x1=x1*dcos(r(1))
      x3=r(3)*dsin(r(2))
      pw=(p1+p2*t(2)+p3*t(3)+p4*t(4)+p5*t(5))*t(2)
      qw=(q1+q2*t(2)+q3*t(3)+q4*t(4)+q5*t(5))*t(2)
      ra=2.d0*dsqrt(1-pw*pw-qw*qw)
      pwqw=2.d0*pw*qw
      pw2=1-2.d0*pw*pw
      qw2=1-2.d0*qw*qw
      pw=pw*ra
      qw=qw*ra
      r(1)=pw2*x1+pwqw*x2+pw*x3
      r(2)=pwqw*x1+qw2*x2-qw*x3
      r(3)=-pw*x1+qw*x2+(pw2+qw2-1)*x3
      return
*
*     Errors.
*
600   ierr=1
      return
700   ierr=2
      return
*
*     Formats.
*
1000  format (a50)
1001  format (4i3,2x,f13.5,6(2x,f10.2))
1002  format (5i3,1x,f9.5,1x,f9.5,1x,f9.3)
1003  format (11i3,1x,f9.5,1x,f9.5,1x,f9.3)
2000  format('ELP',i1,1x)
2001  format('ELP',i2)
*
      end


