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
