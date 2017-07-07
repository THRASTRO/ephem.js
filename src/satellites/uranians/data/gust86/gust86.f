      program monit
*-----------------------------------------------------------------------
*     CALCUL DES COORDONNEES DES SATELLITES D'URANUS (GUST86)
*     version 0.0
*     URANIAN satellites theory  Laskar and Jacobson (1987)
*     URANUS position (VSOP85, Bretagnon 1985)
*     several routines from G. Francou
*     (c)  Bureau des Longitudes 1988
*-----------------------------------------------------------------------
* 
*     PARAMETRES.
* 
*     IDATE  : DATE ORIGINE DU CALCUL AAAAMMJJ (ENTIER)
*     IHEURE : HEURE ORIGINE DU CALCUL HHMMSS (ENTIER)
*     PASH   : PAS DU CALCUL EN HEURES ET FRACTIONS D'HEURE (REEL DP)
*     NPT    : NOMBRE DE POINTS  A CALCULER (ENTIER)
*     ICODE  : INDICE-CODE  DES COORDONNEES (ENTIER)
*              1 ELEMENTS ELLIPTIQUES RAPPORTES AU REPERE UME50
*              2 COORDONNEES X Y Z RAPPORTEES AU REPERE UME50
*              3 COORDONNEES X Y Z RAPPORTEES AU REPERE EME50
*              4 COORDONNEES GEOCENTRIQUES RAPPORTEES AU REPERE B1950
*              5 COORDONNEES GEOCENTRIQUES RAPPORTEES AU REPERE J2000
*              6 COORDONNEES GEOCENTRIQUES RAPPORTEES AU REPERE DATE
* 
*---- DECLARATIONS ET INITIALISATIONS ----------------------------------
* 
      IMPLICIT DOUBLE PRECISION (A-H,O-Z)
      CHARACTER*8 SAT(5)
      CHARACTER*50 CD(6)
      DIMENSION R(6,5)
      DATA SAT/'MIRANDA','ARIEL','UMBRIEL','TITANIA','OBERON'/
      DATA CD/'ELLIPTIQUES UME50',
     .        'RECTANGULAIRES URANOCENTRIQUES UME50',
     .        'RECTANGULAIRES URANOCENTRIQUES EME50',
     .        'DIFFERENTIELLES XD YD B1950 (SECONDE DE DEGRE)',
     .        'DIFFERENTIELLES XD YD J2000 (SECONDE DE DEGRE)',
     .        'DIFFERENTIELLES XD YD RDATE (SECONDE DE DEGRE)'/
      DATA SDRAD/0.4848136811095360D-5/
      DATA UA/149597870.0D0/
* 
*---- LECTURE DES PARAMETRES -------------------------------------------
*
1     continue
      write(*,*)'IDATE  : day             AAAAMMJJ (integer)'
      write(*,*)'IHEURE : time of the day HHMMSS (integer)'
      write(*,*)'PASH   : step in hour  (double precision)'
      write(*,*)'NPT    : number of point to compute (integer)'
      write(*,*)'ICODE  : code for the coordinates (integer)'
      write(*,*)'   1 elliptic elements ref. frame  UME50'
      write(*,*)'   2 COORD X Y Z      REF. FRAME UME50'
      write(*,*)'   3 COORD X Y Z      REF. FRAME EME50'
      write(*,*)'   4 COORD GEOCENTRIc REF. FRAME B1950'
      write(*,*)'   5 COORD GEOCENTRIc REF. FRAME J2000'
      write(*,*)'   6 COORD GEOCENTRIc REF. FRAME of the DATE'
      write(*,*)
      write(*,*)  'IDATE,IHEURE,PASH,NPT,ICODE ?'
      write(*,*)
      read(*,*)  IDATE,IHEURE,PASH,NPT,ICODE
      write(*,1000) IDATE,IHEURE,PASH,NPT,ICODE
      IF (NPT.EQ.0) STOP1248
      CALL DATEJJ (IDATE,IHEURE,T0)
      PAS=PASH/24.D0
* 
*---- CALCUL DES COORDONNEES -------------------------------------------
* 
      DO 300 ISAT=1,5
      T=T0
      DO 200 N=1,NPT
      CALL JJDATE (T,JD,JH)
      IH=JH/10000
      IM=MOD(JH,10000)/100
      IS=MOD(JH,100)
      CALL GUST86 (T,ISAT,ICODE,R,IERR)
      IF (IERR.NE.0) GOTO 400
      IF (ICODE.LT.4) GOTO 100
      R(1,ISAT)=R(1,ISAT)/SDRAD
      R(2,ISAT)=R(2,ISAT)/SDRAD
      R(3,ISAT)=R(3,ISAT)/UA
      R(4,ISAT)=R(4,ISAT)/UA
      R(5,ISAT)=R(5,ISAT)/UA
      R(6,ISAT)=R(6,ISAT)/UA
100   CONTINUE
      IF (MOD(N,50).NE.1) GOTO 110
      GOTO (101,102,102,103,103,103),ICODE
101   PRINT 1001, SAT(ISAT),CD(ICODE)
      GOTO 110
102   PRINT 1002, SAT(ISAT),CD(ICODE)
      GOTO 110
103   PRINT 1003, SAT(ISAT),CD(ICODE)
110   CONTINUE
      GOTO (111,112,112,113,113,113),ICODE
111   PRINT 1011, JD,IH,IM,IS,(R(I,ISAT),I=1,6)
      GOTO 120
112   PRINT 1012, JD,IH,IM,IS,(R(I,ISAT),I=1,6)
      GOTO 120
113   PRINT 1013, JD,IH,IM,IS,(R(I,ISAT),I=1,6)
120   CONTINUE
      T=T+PAS
200   CONTINUE
300   CONTINUE
      GOTO 1
* 
*---- ERREUR -----------------------------------------------------------
* 
400   CONTINUE
      GOTO (401,402,403),ICODE
401   PRINT 2001
      GOTO 1
402   PRINT 2002
      GOTO 1
403   PRINT 2003
      GOTO 1
* 
*---- FORMATS ----------------------------------------------------------
* 
1000  FORMAT (1H1,'PARAMETRES : IDATE=',I8,' IHEURE=',I8,'PASH=',
     .        F9.4,' NPT=',I4,' ICODE=',I1)
1001  FORMAT (1H1,A8,' - COORDONNEES ',A50//
     .        1X,'DATE',6X,'H',2X,'M',2X,'S',
     .        6X,'A (KM)',6X,'L (RD)',11X,'K',
     .        11X,'H',11X,'Q',11X,'P'/)
1002  FORMAT (1H1,A8,' - COORDONNEES ',A50//
     .        1X,'DATE',6X,'H',2X,'M',2X,'S',
     .        6X,'X (KM)',6X,'Y (KM)',6X,'Z (KM)',
     .        3X,'XP (KM/S)',3X,'YP (KM/S)',3X,'ZP (KM/S)'/)
1003  FORMAT (1H1,A8,' - COORDONNEES ',A50//
     .        1X,'DATE',6X,'H',2X,'M',2X,'S',
     .        10X,'XD',10X,'YD',6X,'R (UA)',
     .        6X,'X (UA)',6X,'Y (UA)',6X,'Z (UA)'/)
1011  FORMAT (1X,I8,3(1X,I2),F12.4,5F12.8)
1012  FORMAT (1X,I8,3(1X,I2),3F12.3,3F12.8)
1013  FORMAT (1X,I8,3(1X,I2),2F12.4,4F12.7)
2001  FORMAT (1H0,'ERREUR DE DATE OU D''HEURE')
2002  FORMAT (1H0,'ERREUR DANS INDICE SATELLITE')
2003  FORMAT (1H0,'ERREUR DANS INDICE-CODE COORDONNEES')
      END
      SUBROUTINE JJDATE (TJJ,IDATE,IHEURE)
C-----------------------------------------------------------------------
C     CONVERSION D'UNE DATE JULIENNE EN DATE DU CALENDRIER GREGORIEN.
C     EN ENTREE : TJJ    DATE JULIENNE (JOURS JULIENS).
C     EN SORTIE : IDATE  DATE GREGORIENNE CODEE *AAAAMMJJ (*SIGNE).
C                 IHEURE HEURE CODEE HHMMSS.
C     REMARQUE  : LES ANNEES (AAAA) SONT DES MILLESIMES ASTRONOMIQUES.
C                 L'AN 1 AV.J.C. CORRESPOND AU MILLESIME ASTRONOMIQUE 0.
C                 L'AN 80 AV.J.C. CORRESPOND AU MILLESIME -79.
C     RAPPEL    : L'ERE JULIENNE COMMENCE LE 1/1/4713 AV.J.C. A 12H.
C                 LA PERIODE DU 5/10/1582 0H AU 14/10/1582 N'EST PAS
C                 DANS LE CALENDRIER GREGORIEN.
C-----------------------------------------------------------------------
      IMPLICIT DOUBLE PRECISION (A-H,O-Z)
      IDATE=0
      IHEURE=0
      IF (TJJ.LT.0.D0) RETURN
      T=TJJ+0.5D0/86400.D0+0.5D0
      Z=DINT(T)
      F=T-Z
      A=Z
      IF (Z.LT.2299161.D0) GO TO 1
      X=DINT((Z-1867216.25D0)/36524.25D0)
      A=Z+1.D0+X-DINT(X/4.D0)
1     B=A+1524.D0
      C=DINT((B-122.1D0)/365.25D0)
      D=DINT(365.25D0*C)
      E=DINT((B-D)/30.6001D0)
      JOUR=B-D-DINT(30.6001D0*E)
      MOIS=E-1.D0
      IF (E.GT.13.5D0) MOIS=E-13.D0
      IAN=C-4716.D0
      IF (MOIS.LT.2.5D0) IAN=C-4715.D0
      IS=+1
      IF (IAN.LT.0) IS=-1
      IDATE=((IABS(IAN)*100+MOIS)*100+JOUR)*IS
      F=F*24.D0
      IH=F
      F=(F-IH)*60.D0
      IM=F
      F=(F-IM)*60.D0
      IS=F
      IHEURE=(IH*100+IM)*100+IS
      RETURN
      END
      SUBROUTINE DATEJJ (IDATE,IHEURE,TJJ)
C-----------------------------------------------------------------------
C     CONVERSION D'UNE DATE DU CALENDRIER GREGORIEN EN DATE JULIENNE.
C     EN ENTREE : IDATE  DATE GREGORIENNE CODEE *AAAAMMJJ (*SIGNE).
C                 IHEURE HEURE CODEE HHMMSS.
C     EN SORTIE : TJJ    DATE JULIENNE (JOURS JULIENS).
C     REMARQUE  : LES ANNEES (AAAA) SONT DES MILLESIMES ASTRONOMIQUES.
C                 L'AN 1 AV.J.C. CORRESPOND AU MILLESIME ASTRONOMIQUE 0.
C                 L'AN 80 AV.J.C. CORRESPOND AU MILLESIME -79.
C     RAPPEL    : L'ERE JULIENNE COMMENCE LE 1/1/4713 AV.J.C. A 12H.
C                 LA PERIODE DU 5/10/1582 0H AU 14/10/1582 N'EST PAS
C                 DANS LE CALENDRIER GREGORIEN.
C-----------------------------------------------------------------------
      IMPLICIT DOUBLE PRECISION (A-H,O-Z)
      TJJ=0.D0
      JOUR=IDATE
      IAN=JOUR/10000
      IF (IAN.LT.-4712) RETURN
      JOUR=IABS(JOUR-IAN*10000)
      MOIS=JOUR/100
      IF (MOIS.LT.1.OR.MOIS.GT.12) RETURN
      JOUR=JOUR-MOIS*100
      IF (JOUR.LT.0.OR.JOUR.GT.31) RETURN
      IS=IHEURE
      IH=IHEURE/10000
      IF (IH.LT.0.OR.IH.GT.24) RETURN
      IS=IS-IH*10000
      IM=IS/100
      IF (IM.LT.0.OR.IM.GT.60) RETURN
      IS=IS-IM*100
      IF (IS.LT.0.OR.IS.GT.60) RETURN
      Y=IAN
      M=MOIS
      B=0.D0
      C=0.D0
      IF (MOIS.GT.2) GO TO 10
      Y=Y-1.D0
      M=M+12
10    IF (Y.LT.0) GO TO 50
      IF (IAN-1582) 60,20,40
20    IF (MOIS-10) 60,30,40
30    IF (JOUR.LE.4) GO TO 60
      IF (JOUR.GE.15) GO TO 40
      RETURN
40    A=DINT(Y/100.D0)
      B=2.D0-A+DINT(A/4.D0)
      GO TO 60
50    C=-0.75D0
60    TJJ=DINT(365.25D0*Y+C)+DINT(30.6001D0*(M+1))+JOUR+
     .    FLOAT(IH)/24.D0+FLOAT(IM)/1440.D0+FLOAT(IS)/86400.D0+
     .    1720994.5D0+B
      RETURN
      END






      SUBROUTINE GUST86 (TJJ,ISAT,ICODE,R,IERR)
* 
*---- SATELLITES D'URANUS (LASKAR 1986, LASKAR and JACOBSON, 1987) --------
* 
*     VERSION PRELIMINAIRE 0.0 - G. FRANCOU JUIN 88.
* 
*     EN ENTREE :
* 
*     TJJ    DATE JULIENNE TEMPS DYNAMIQUE (REEL DP).
* 
*     ISAT   INDICE DU SATELLITE (ENTIER).
*            1 MIRANDA.
*            2 ARIEL.
*            3 UMBRIEL.
*            4 TITANIA.
*            5 OBERON.
*            LE PARAMETRE ISAT PEUT ETRE UNE COMBINAISON D'INDICES.
*            EX : ISAT=24 CORRESPOND A ARIEL + TITANIA.
* 
*     ICODE  INDICE DU CODE DES CALCULS (ENTIER).
*            1 CALCUL DES ELEMENTS ELLIPTIQUES RAPPORTES AU REPERE
*              UME50 (EQUATEUR D'URANUS ET EQUINOXE MOYENS B1950).
*            2 CALCUL DES X,Y,Z URANOCENTRIQUES RAPPORTES AU REPERE
*              UME50 (EQUATEUR D'URANUS ET EQUINOXE MOYENS B1950).
*            3 CALCUL DES X,Y,Z URANOCENTRIQUES RAPPORTES AU REPERE
*              EME50 (EQUATEUR CELESTE ET EQUINOXE MOYENS B1950).
*            4 CALCUL DES COORDONNEES GEOCENTRIQUES RAPPORTEES A
*              L'EQUATEUR CELESTE ET A L'EQUINOXE MOYENS B1950.
*            5 CALCUL DES COORDONNEES GEOCENTRIQUES RAPPORTEES A
*              L'EQUATEUR CELESTE ET A L'EQUINOXE MOYENS J2000.
*            6 CALCUL DES COORDONNEES GEOCENTRIQUES RAPPORTEES A
*              L'EQUATEUR CELESTE ET A L'EQUINOXE MOYENS DE LA DATE.
* 
*     EN SORTIE :
* 
*     R(I,J) TABLE DES COORDONNES (REELS DP).
*            I : INDICE COORDONNEES (1<=I<=6).
*            J : INDICE SATELLITES  (1<=J<=5).
*                POUR ICODE=1 :
*                     R(1,J) : DEMI GRAND AXE (KM).
*                     R(2,J) : LONGITUDE MOYENNE (RD).
*                     R(3,J) : K=E*COS(PI).
*                     R(4,J) : H=E*SIN(PI).
*                     R(5,J) : Q=SIN(I/2)*COS(GOM).
*                     R(6,J) : P=SIN(I/2)*SIN(GOM).
*                              E :   EXCENTRICITE.
*                              PI :  LONGITUDE DU PERIASTRE.
*                              I :   INCLINAISON.
*                              GOM : LONGITUDE DU NOEUD ASCENDANT.
*                POUR ICODE=2 ET ICODE=3 :
*                     R(I,J),I=1,3 : POSITIONS X, Y, Z (KM).
*                     R(I,J),I=4,6 : VITESSES  X, Y, Z (KM/S).
*                POUR ICODE=4, ICODE=5 ET ICODE=6 :
*                     R(1,J) : COORDONNEE DIFFERENTIELLE X (RD)
*                              DIFFERENCE EN ASCENSION DROITE ENTRE
*                              URANUS ET LE SATELLITE,
*                     R(2,J) : COORDONNEE DIFFERENTIELLE Y (RD)
*                              DIFFERENCE EN DECLINAISON ENTRE
*                              URANUS ET LE SATELLITE,
*                     R(3,J) : DISTANCE PARCOURUE PAR LA LUMIERE
*                              ENTRE LE SATELLITE ET LA TERRE (KM),
*                     R(4,J) : X  COORDONNEES RECTANGULAIRES
*                     R(5,J) : Y  ASTROMETRIQUES DU SATELLITE
*                     R(6,J) : Z  PAR RAPPORT A LA TERRE (KM).
* 
*     IERR   INDICE ERREUR (ENTIER).
*            0 PAS D'ERREUR.
*            1 ERREUR DANS TJJ.
*            2 ERREUR DANS ISAT.
*            3 ERREUR DANS ICODE.
* 
*     SUBROUTINE UTILISEES :
* 
*     URANUS  MIREL  ARIEL  UMBEL  TITEL  OBREL  ELLIPX  FRIECK  PRECES
*     CORDIF
* 
*     FICHIER UTILISE : FICHIER URANUS (UNITE LOGIQUE 10).
* 
*---- DECLARATIONS -----------------------------------------------------
* 
      IMPLICIT DOUBLE PRECISION (A-A,C-H,O-Z), LOGICAL (B-B)
      DIMENSION R(6,5),EL(6,5),XU(6,5),XE(6,5)
      DIMENSION XP(3),XS(3),YP(3),YS(3),W(3)
      DIMENSION FQN(5),FQE(5),FQI(5),PHN(5),PHE(5),PHI(5)
      DIMENSION GMS(5),RMU(5),JSAT(5)
      DIMENSION TRANS(3,3)
      COMMON/ASAT/AN(5),AE(5),AI(5)
      SAVE TRANS,RMU,DPI,DGRAD,SEJ2,SA,CA,SD,CD,B0
* 
*---- DONNEES ----------------------------------------------------------
* 
      DATA FQN/4445190.550D-06,2492952.519D-06,1516148.111D-06,
     .         721718.509D-06,466692.120D-06/
      DATA FQE/20.082D0,6.217D0,2.865D0,2.078D0,0.386D0/
      DATA FQI/-20.309D0,-6.288D0,-2.836D0,-1.843D0,-0.259D0/
      DATA PHN/-238051.D-06,3098046.D-06,2285402.D-06,
     .         856359.D-06,-915592.D-06/
      DATA PHE/0.611392D0,2.408974D0,2.067774D0,0.735131D0,0.426767D0/
      DATA PHI/5.702313D0,0.395757D0,0.589326D0,1.746237D0,4.206896D0/
      DATA GMS/4.4D0,86.1D0,84.0D0,230.0D0,200.0D0/
      DATA GMSU/5794554.5D0/
      DATA ALF/76.60666666666667D0/
      DATA DEL/15.03222222222222D0/
      DATA UA/149597870.0D0/
      DATA VL/299792.458D0/
      DATA T1950/2433282.423D0/
      DATA T2000/2451545.0D0/
      DATA T0/2444239.5D0/
      DATA MAXIT/2/
      DATA NUL/10/
      DATA B0/.FALSE./
* 
*---- INITIALISATIONS --------------------------------------------------
* 
      IF (B0) GOTO 200
      B0=.TRUE.
      PI=4.D0*DATAN(1.D0)
      DPI=2.D0*PI
      DGRAD=PI/180.D0
      SEJ=86400.D0
      SEJ2=SEJ*SEJ
      ANJ=365.25D0
      GMU=GMSU
      DO 100 I=1,5
         GMU=GMU-GMS(I)
100   CONTINUE
      DO 110 I=1,5
         RMU(I)=GMU+GMS(I)
110   CONTINUE
      ALF=ALF*DGRAD
      DEL=DEL*DGRAD
      SA=DSIN(ALF)
      CA=DCOS(ALF)
      SD=DSIN(DEL)
      CD=DCOS(DEL)
      TRANS(1,1)=SA
      TRANS(2,1)=-CA
      TRANS(3,1)=0.D0
      TRANS(1,2)=CA*SD
      TRANS(2,2)=SA*SD
      TRANS(3,2)=-CD
      TRANS(1,3)=CA*CD
      TRANS(2,3)=SA*CD
      TRANS(3,3)=SD
* 
*---- TEST DES PARAMETRES ----------------------------------------------
* 
200   CONTINUE
      IERR=1
      IF (TJJ.EQ.0.D0) RETURN
      DO 220 J=1,5
         JSAT(J)=0
         DO 210 I=1,6
            R(I,J)=0.D0
210      CONTINUE
220   CONTINUE
      IERR=2
      IF (ISAT.EQ.0) RETURN
      IS1=ISAT
      DO 230 I=1,5
         IS2=MOD(IS1,10)
         IF (IS2.LT.1.OR.IS2.GT.5) RETURN
         JSAT(IS2)=1
         IS1=IS1/10
         IF (IS1.EQ.0) GOTO 240
230   CONTINUE
      IF (IS1.NE.0) RETURN
240   IERR=3
      IF (ICODE.LT.1.OR.ICODE.GT.6) RETURN
      IERR=0
* 
*---- CALCUL DES COORDONNEES D'URANUS ET DU TEMPS DE LUMIERE -----------
* 
      T=TJJ-T0
      IF (ICODE.LT.4) GOTO 300
      CALL URANUS (TJJ,NUL,TAU,XP)
      CALL PRECES (TJJ,T1950,XP,W)
      CALL FRIECK (-1,W,XP)
      XP(1)=XP(1)*UA
      XP(2)=XP(2)*UA
      XP(3)=XP(3)*UA
      T=T-TAU
* 
*---- CALCUL DES ARGUMENTS ---------------------------------------------
* 
300   CONTINUE
      DO 310 I=1,5
         AN(I)=FQN(I)*T+PHN(I)
         AE(I)=FQE(I)*DGRAD/ANJ*T+PHE(I)
         AI(I)=FQI(I)*DGRAD/ANJ*T+PHI(I)
         AN(I)=DMOD(AN(I),DPI)
         AE(I)=DMOD(AE(I),DPI)
         AI(I)=DMOD(AI(I),DPI)
310   CONTINUE
* 
*---- <<< DEBUT BOUCLE DE CALCUL SATELLITES D'URANUS >>> ---------------
* 
      DO 900 IS=1,5
         IF (JSAT(IS).EQ.0) GOTO 900
* 
*---- CALCUL DES ELEMENTS ELLIPTIQUES (REPERE UME50) -------------------
* 
400      CONTINUE
         GOTO (410,420,430,440,450),IS
410      CALL MIREL (T,RN,RL,RK,RH,RQ,RP)
         GOTO 460
420      CALL ARIEL (T,RN,RL,RK,RH,RQ,RP)
         GOTO 460
430      CALL UMBEL (T,RN,RL,RK,RH,RQ,RP)
         GOTO 460
440      CALL TITEL (T,RN,RL,RK,RH,RQ,RP)
         GOTO 460
450      CALL OBREL (T,RN,RL,RK,RH,RQ,RP)
460      EL(1,IS)=(RMU(IS)*SEJ2/RN/RN)**(1.D0/3.D0)
         RL=DMOD(RL,DPI)
         IF (RL.LT.0.D0) RL=RL+DPI
         EL(2,IS)=RL
         EL(3,IS)=RK
         EL(4,IS)=RH
         EL(5,IS)=RQ
         EL(6,IS)=RP
         IF (ICODE.NE.1) GOTO 500
         DO 470 IV=1,6
         R(IV,IS)=EL(IV,IS)
470      CONTINUE
         GOTO 900
* 
*---- CALCUL DES COORDONNEES X,Y,Z (REPERE UME50) ----------------------
* 
500      CONTINUE
         CALL ELLIPX (EL(1,IS),RMU(IS),XU(1,IS),RIEN,0,0)
         IF (ICODE.NE.2) GOTO 600
         DO 510 IV=1,6
            R(IV,IS)=XU(IV,IS)
510      CONTINUE
         GOTO 900
* 
*---- CALCUL DES COORDONNEES X,Y,Z (REPERE EME50) ----------------------
* 
600      CONTINUE
         DO 620 IV=1,3
            XE(IV,IS)=0.D0
            XE(IV+3,IS)=0.D0
            DO 610 J=1,3
               XE(IV,IS)=XE(IV,IS)+TRANS(IV,J)*XU(J,IS)
               XE(IV+3,IS)=XE(IV+3,IS)+TRANS(IV,J)*XU(J+3,IS)
610         CONTINUE
620      CONTINUE
         IF (ICODE.NE.3) GOTO 700
         DO 630 IV=1,6
            R(IV,IS)=XE(IV,IS)
630      CONTINUE
         GOTO 900
* 
*---- CALCUL DES COORDONNEES GEOCENTRIQUES -----------------------------
* 
700      CONTINUE
         DO 710 IV=1,3
            XS(IV)=XP(IV)+XE(IV,IS)
710      CONTINUE
         DIST=DSQRT(XS(1)*XS(1)+XS(2)*XS(2)+XS(3)*XS(3))
* 
*---- CALCUL DES COORDONNEES DIFFERENTIELLES ---------------------------
* 
800      CONTINUE
         K=ICODE-3
         GOTO (810,830,840),K
810      CONTINUE
         DO 820 IV=1,3
            YP(IV)=XP(IV)
            YS(IV)=XE(IV,IS)
820      CONTINUE
         GOTO 850
830      CONTINUE
         CALL FRIECK (+1,XP,W)
         CALL PRECES (T1950,T2000,W,YP)
         CALL FRIECK (+1,XE(1,IS),W)
         CALL PRECES (T1950,T2000,W,YS)
         GOTO 850
840      CONTINUE
         CALL FRIECK (+1,XP,W)
         CALL PRECES (T1950,TJJ,W,YP)
         CALL FRIECK (+1,XE(1,IS),W)
         CALL PRECES (T1950,TJJ,W,YS)
850      CONTINUE
         CALL CORDIF (YP,YS,R(1,IS))
         R(3,IS)=DIST
         DO 860 IV=1,3
            R(IV+3,IS)=XS(IV)
860      CONTINUE
* 
*---- <<< FIN BOUCLE DE CALCUL SATELLITES D'URANUS >>> ---------------
* 
900   CONTINUE
* 
*---- SORTIE -----------------------------------------------------------
* 
      RETURN
      END
      SUBROUTINE URANUS (TJJ,NUL,TAU,R)
* 
*---- COORDONNEES RECTANGULAIRES ASTROMETRIQUES D'URANUS (VSOP85) ------
* 
*     VERSION PRELIMINAIRE 0.0 - G. FRANCOU JUIN 88.
* 
*     EN ENTREE :
* 
*     TJJ  : DATE JULIENNE TEMPS DYNAMIQUE (REEL DP).
*     NUL  : NUMERO D'UNITE LOGIQUE DU FICHIER URANUS (ENTIER).
* 
*     EN SORTIE :
* 
*     TAU  : TEMPS DE LUMIERE EN JOURS (REEL DP).
*     R(3) : COORDONNEES RECTANGULAIRES ASTROMETRIQUES X, Y , Z
*            D'URANUS (REEL DP).
*            REPERE : EQUINOXE ET ECLIPTIQUE MOYENS DE LA DATE.
*            UNITE  : UNITE ASTRONOMIQUE.
* 
*     REMARQUE :
* 
*     LES COORDONNEES D'URANUS SONT CALCULEES A PARTIR D'UNE VERSION DE
*     DE LA THEORIE PLANETAIRE VSOP85 (P.BRETAGNON).
*     CETTE VERSION DONNE LES COORDONNEES GEOCENTRIQUES D'URANUS :
*     LONGITUDE, LATITUDE, RAYON VECTEUR GEOMETRIQUES RAPPORTES A
*     L'EQUINOXE ET A L'ECLIPTIQUE MOYENS DE LA DATE.
*     LES SERIES DE CETTE THEORIE SONT LUES SUR UN FICHIER SEQUENTIEL
*     A ENREGISTREMENTS FIXES DE 80 CARACTERES (UNITE LOGIQUE : NUL).
* 
*---- DECLARATIONS -----------------------------------------------------
* 
      IMPLICIT DOUBLE PRECISION (A-H,O-Z)
      DIMENSION R(3),T(0:4),V1(3),V2(3),V3(3)
      DIMENSION JC(500),JT(500),C1(500),C2(500),C3(500)
      SAVE C1,C2,C3,JC,JT
      SAVE T,DT,DPI,SDRAD,T2000,TLUA
      SAVE V3,TL,NUL0,ITMAX,NT
* 
*---- CONSTANTES -------------------------------------------------------
* 
      DATA DPI/6.283185307179586D0/
      DATA SDRAD/0.4848136811095360D-5/
      DATA T2000/2451545.0D0/
      DATA TLUA/0.577551831D-2/
      DATA T/5*1.D0/
      DATA TL/0.D0/
      DATA NUL0/0/
      DATA ITMAX/2/
* 
*---- LECTURE DU FICHIER URANUS ----------------------------------------
* 
      IF (NUL.EQ.NUL0) GOTO 200
      Open (nul,file='URANUS.DAT',form='formatted',status='old')
      NT=1
100   CONTINUE
      READ (NUL,1000) JC(NT),JT(NT),C1(NT),C2(NT),C3(NT)
      IF (JC(NT).EQ.0) GOTO 110
      NT=NT+1
      GOTO 100
110   CONTINUE
      NT=NT-1
* 
*---- INITIALISATIONS --------------------------------------------------
* 
200   CONTINUE
      IF (TJJ.EQ.TL.AND.NUL.EQ.NUL0) GOTO 500
      TL=TJJ
      NUL0=NUL
      DJJ=TJJ
      IT=0
      TAU=0.D0
      DO 210 I=1,3
         R(I)=0.D0
210   CONTINUE
* 
*---- SUBSTITUTION DU TEMPS DANS LES SERIES VSOP85 ---------------------
* 
300   CONTINUE
      T(1)=(DJJ-T2000)/365250.D0
      DO 310 I=2,4
         T(I)=T(I-1)*T(1)
310   CONTINUE
      DO 320 I=1,3
         V1(I)=0.D0
320   CONTINUE
      DO 330 N=1,NT
         J1=JC(N)
         J2=JT(N)
         ARG=C2(N)+C3(N)*T(1)
         AMP=C1(N)*T(J2)
         V1(J1)=V1(J1)+AMP*DCOS(ARG)
330   CONTINUE
      IT=IT+1
      IF (IT.EQ.ITMAX) GOTO 400
      DT=V1(3)*TLUA
      DJJ=TJJ-DT
      GOTO 300
* 
*---- PASSAGE AUX COORDONNEES RECTANGULAIRES (REPERE DE LA DATE) -------
* 
400   CONTINUE
      V1(1)=DMOD(V1(1),DPI)
      IF (V1(1).LT.0.D0) V1(1)=V1(1)+DPI
      P=V1(3)*DCOS(V1(2))
      V2(1)=P*DCOS(V1(1))
      V2(2)=P*DSIN(V1(1))
      V2(3)=V1(3)*DSIN(V1(2))
* 
*---- CORRECTION DU TEMPS DE LUMIERE -----------------------------------
* 
      TT=(TJJ-T2000)/365.25D0
      TAU=DT/365.25D0
      A1=1.388122D0-6.283320D0*TT
      A2=0.365348D0+12.566395D0*TT
      DX=6.283320D0*
     .   (0.99986D0*DSIN(A1)+0.00374D0*DSIN(A2)+0.01628D0*DCOS(A2))
      DY=6.283320D0*
     .   (0.99986D0*DCOS(A1)+0.01628D0*DSIN(A2)-0.00374D0*DCOS(A2))
      V2(1)=V2(1)+DX*TAU
      V2(2)=V2(2)+DY*TAU
* 
*---- PASSAGE AUX COORDONNEES EQUATORIALES (REPERE DE LA DATE) ---------
* 
      TT=(TJJ-T2000)/36525.D0
      EPS=(84381.409D0+(-46.8093D0+(-0.15D-3+0.2001D-2*TT)*TT)*TT)*SDRAD
      C=DCOS(EPS)
      S=DSIN(EPS)
      V3(1)=V2(1)
      V3(2)=V2(2)*C-V2(3)*S
      V3(3)=V2(3)*C+V2(2)*S
* 
*---- RANGEMENT DES RESULTATS ------------------------------------------
* 
500   CONTINUE
      TAU=DT
      DO 510 I=1,3
         R(I)=V3(I)
510   CONTINUE
* 
      RETURN
1000  FORMAT (I2,I2,4X,F18.11,F14.11,F20.11)
      END
      SUBROUTINE MIREL (T,RN,RL,RK,RH,RQ,RP)
* 
*---- CALCUL DES ELEMENTS ELLIPTIQUES DE MIRANDA (GUST86) --------------
* 
      IMPLICIT DOUBLE PRECISION (A-H,O-Z)
      COMMON/ASAT/AN(5),AE(5),AI(5)
* 
*---- RN => MOYEN MOUVEMENT (RADIAN/JOUR) ------------------------------
* 
      RN = 4443522.67D-06
     .         -34.92D-06*COS(AN(1)-3.D0*AN(2)+2.D0*AN(3))
     .          +8.47D-06*COS(2.D0*AN(1)-6.D0*AN(2)+4.D0*AN(3))
     .          +1.31D-06*COS(3.D0*AN(1)-9.D0*AN(2)+6.D0*AN(3))
     .         -52.28D-06*COS(AN(1)-AN(2))
     .        -136.65D-06*COS(2.D0*AN(1)-2.D0*AN(2))
* 
*---- RL => LONGITUDE MOYENNE (RADIAN) ---------------------------------
* 
      RL =  -238051.58D-06
     .     +4445190.55D-06*T
     .       +25472.17D-06*SIN(AN(1)-3.D0*AN(2)+2.D0*AN(3))
     .        -3088.31D-06*SIN(2.D0*AN(1)-6.D0*AN(2)+4.D0*AN(3))
     .         -318.10D-06*SIN(3.D0*AN(1)-9.D0*AN(2)+6.D0*AN(3))
     .          -37.49D-06*SIN(4.D0*AN(1)-12.D0*AN(2)+8.D0*AN(3))
     .          -57.85D-06*SIN(AN(1)-AN(2))
     .          -62.32D-06*SIN(2.D0*AN(1)-2.D0*AN(2))
     .          -27.95D-06*SIN(3.D0*AN(1)-3.D0*AN(2))
* 
*---- Z = K + IH  ------------------------------------------------------
* 
      RK = 1312.38D-06*COS(AE(1))
     .      +71.81D-06*COS(AE(2))
     .      +69.77D-06*COS(AE(3))
     .       +6.75D-06*COS(AE(4))
     .       +6.27D-06*COS(AE(5))
     .     -123.31D-06*COS(-AN(1)+2.D0*AN(2))
     .      +39.52D-06*COS(-2.D0*AN(1)+3.D0*AN(2))
     .     +194.10D-06*COS(AN(1))
* 
      RH = 1312.38D-06*SIN(AE(1))
     .      +71.81D-06*SIN(AE(2))
     .      +69.77D-06*SIN(AE(3))
     .       +6.75D-06*SIN(AE(4))
     .       +6.27D-06*SIN(AE(5))
     .     -123.31D-06*SIN(-AN(1)+2.D0*AN(2))
     .      +39.52D-06*SIN(-2.D0*AN(1)+3.D0*AN(2))
     .     +194.10D-06*SIN(AN(1))
* 
*---- ZETA = Q + IP ----------------------------------------------------
* 
      RQ = 37871.71D-06*COS(AI(1))
     .       +27.01D-06*COS(AI(2))
     .       +30.76D-06*COS(AI(3))
     .       +12.18D-06*COS(AI(4))
     .        +5.37D-06*COS(AI(5))
* 
      RP = 37871.71D-06*SIN(AI(1))
     .       +27.01D-06*SIN(AI(2))
     .       +30.76D-06*SIN(AI(3))
     .       +12.18D-06*SIN(AI(4))
     .        +5.37D-06*SIN(AI(5))
* 
      RETURN

      END
      SUBROUTINE ARIEL (T,RN,RL,RK,RH,RQ,RP)
* 
*---- CALCUL DES ELEMENTS ELLIPTIQUES D'ARIEL (GUST86) -----------------
* 
      IMPLICIT DOUBLE PRECISION (A-H,O-Z)
      COMMON/ASAT/AN(5),AE(5),AI(5)
* 
*---- RN => MOYEN MOUVEMENT (RADIAN/JOUR) ------------------------------
* 
      RN = 2492542.57D-06
     .          +2.55D-06*COS(AN(1)-3.D0*AN(2)+2.D0*AN(3))
     .         -42.16D-06*COS(AN(2)-AN(3))
     .        -102.56D-06*COS(2.D0*AN(2)-2.D0*AN(3))
* 
*---- RL => LONGITUDE MOYENNE (RADIAN) ---------------------------------
* 
      RL =   3098046.41D-06
     .      +2492952.52D-06*T
     .         -1860.50D-06*SIN(AN(1)-3.D0*AN(2)+2.D0*AN(3))
     .          +219.99D-06*SIN(2.D0*AN(1)-6.D0*AN(2)+4.D0*AN(3))
     .           +23.10D-06*SIN(3.D0*AN(1)-9.D0*AN(2)+6.D0*AN(3))
     .            +4.30D-06*SIN(4.D0*AN(1)-12.D0*AN(2)+8.D0*AN(3))
     .           -90.11D-06*SIN(AN(2)-AN(3))
     .           -91.07D-06*SIN(2.D0*AN(2)-2.D0*AN(3))
     .           -42.75D-06*SIN(3.D0*AN(2)-3.D0*AN(3))
     .           -16.49D-06*SIN(2.D0*AN(2)-2.D0*AN(4))
* 
*---- Z = K + IH -------------------------------------------------------
* 
      RK =    -3.35D-06*COS(AE(1))
     .     +1187.63D-06*COS(AE(2))
     .      +861.59D-06*COS(AE(3))
     .       +71.50D-06*COS(AE(4))
     .       +55.59D-06*COS(AE(5))
     .       -84.60D-06*COS(-AN(2)+2.D0*AN(3))
     .       +91.81D-06*COS(-2.D0*AN(2)+3.D0*AN(3))
     .       +20.03D-06*COS(-AN(2)+2.D0*AN(4))
     .       +89.77D-06*COS(AN(2))
* 
      RH =    -3.35D-06*SIN(AE(1))
     .     +1187.63D-06*SIN(AE(2))
     .      +861.59D-06*SIN(AE(3))
     .       +71.50D-06*SIN(AE(4))
     .       +55.59D-06*SIN(AE(5))
     .       -84.60D-06*SIN(-AN(2)+2.D0*AN(3))
     .       +91.81D-06*SIN(-2.D0*AN(2)+3.D0*AN(3))
     .       +20.03D-06*SIN(-AN(2)+2.D0*AN(4))
     .       +89.77D-06*SIN(AN(2))
* 
*---- ZETA = Q + IP ----------------------------------------------------
* 
      RQ =   -121.75D-06*COS(AI(1))
     .       +358.25D-06*COS(AI(2))
     .       +290.08D-06*COS(AI(3))
     .        +97.78D-06*COS(AI(4))
     .        +33.97D-06*COS(AI(5))
* 
      RP =   -121.75D-06*SIN(AI(1))
     .       +358.25D-06*SIN(AI(2))
     .       +290.08D-06*SIN(AI(3))
     .        +97.78D-06*SIN(AI(4))
     .        +33.97D-06*SIN(AI(5))
* 
      RETURN
      END
      SUBROUTINE UMBEL (T,RN,RL,RK,RH,RQ,RP)
* 
*---- CALCUL DES ELEMENTS ELLIPTIQUES D'UMBRIEL (GUST86) ---------------
* 
      IMPLICIT DOUBLE PRECISION (A-H,O-Z)
      COMMON/ASAT/AN(5),AE(5),AI(5)
* 
*---- RN => MOYEN MOUVEMENT (RADIAN/JOUR) ------------------------------
* 
      RN =  1515954.90D-06
     .           +9.74D-06*COS(AN(3)-2.D0*AN(4)+AE(3))
     .         -106.00D-06*COS(AN(2)-AN(3))
     .          +54.16D-06*COS(2.D0*AN(2)-2.D0*AN(3))
     .          -23.59D-06*COS(AN(3)-AN(4))
     .          -70.70D-06*COS(2.D0*AN(3)-2.D0*AN(4))
     .          -36.28D-06*COS(3.D0*AN(3)-3.D0*AN(4))
* 
*---- RL => LONGITUDE MOYENNE (RADIAN) ---------------------------------
* 
      RL1 =  2285401.69D-06
     .      +1516148.11D-06*T
     .          +660.57D-06*SIN(AN(1)-3.D0*AN(2)+2.D0*AN(3))
     .           -76.51D-06*SIN(2.D0*AN(1)-6.D0*AN(2)+4.D0*AN(3))
     .            -8.96D-06*SIN(3.D0*AN(1)-9.D0*AN(2)+6.D0*AN(3))
     .            -2.53D-06*SIN(4.D0*AN(1)-12.D0*AN(2)+8.D0*AN(3))
     .           -52.91D-06*SIN(AN(3)-4.D0*AN(4)+3.D0*AN(5))
     .            -7.34D-06*SIN(AN(3)-2.D0*AN(4)+AE(5))
     .            -1.83D-06*SIN(AN(3)-2.D0*AN(4)+AE(4))
     .          +147.91D-06*SIN(AN(3)-2.D0*AN(4)+AE(3))
      RL2 =       -7.77D-06*SIN(AN(3)-2.D0*AN(4)+AE(2))
     .           +97.76D-06*SIN(AN(2)-AN(3))
     .           +73.13D-06*SIN(2.D0*AN(2)-2.D0*AN(3))
     .           +34.71D-06*SIN(3.D0*AN(2)-3.D0*AN(3))
     .           +18.89D-06*SIN(4.D0*AN(2)-4.D0*AN(3))
     .           -67.89D-06*SIN(AN(3)-AN(4))
     .           -82.86D-06*SIN(2.D0*AN(3)-2.D0*AN(4))
      RL3 =      -33.81D-06*SIN(3.D0*AN(3)-3.D0*AN(4))
     .           -15.79D-06*SIN(4.D0*AN(3)-4.D0*AN(4))
     .           -10.21D-06*SIN(AN(3)-AN(5))
     .           -17.08D-06*SIN(2.D0*AN(3)-2.D0*AN(5))
* 
      RL=RL1+RL2+RL3
* 
*---- Z = K + IH -------------------------------------------------------
* 
      RK1 =       -0.21D-06*COS(AE(1))
     .          -227.95D-06*COS(AE(2))
     .         +3904.69D-06*COS(AE(3))
     .          +309.17D-06*COS(AE(4))
     .          +221.92D-06*COS(AE(5))
     .           +29.34D-06*COS(AN(2))
     .           +26.20D-06*COS(AN(3))
     .           +51.19D-06*COS(-AN(2)+2.D0*AN(3))
     .          -103.86D-06*COS(-2.D0*AN(2)+3.D0*AN(3))
     .           -27.16D-06*COS(-3.D0*AN(2)+4.D0*AN(3))
      RK2 =      -16.22D-06*COS(AN(4))
     .          +549.23D-06*COS(-AN(3)+2.D0*AN(4))
     .           +34.70D-06*COS(-2.D0*AN(3)+3.D0*AN(4))
     .           +12.81D-06*COS(-3.D0*AN(3)+4.D0*AN(4))
     .           +21.81D-06*COS(-AN(3)+2.D0*AN(5))
     .           +46.25D-06*COS(AN(3))
* 
      RK=RK1+RK2
* 
      RH1 =       -0.21D-06*SIN(AE(1))
     .          -227.95D-06*SIN(AE(2))
     .         +3904.69D-06*SIN(AE(3))
     .          +309.17D-06*SIN(AE(4))
     .          +221.92D-06*SIN(AE(5))
     .           +29.34D-06*SIN(AN(2))
     .           +26.20D-06*SIN(AN(3))
     .           +51.19D-06*SIN(-AN(2)+2.D0*AN(3))
     .          -103.86D-06*SIN(-2.D0*AN(2)+3.D0*AN(3))
     .           -27.16D-06*SIN(-3.D0*AN(2)+4.D0*AN(3))
      RH2 =      -16.22D-06*SIN(AN(4))
     .          +549.23D-06*SIN(-AN(3)+2.D0*AN(4))
     .           +34.70D-06*SIN(-2.D0*AN(3)+3.D0*AN(4))
     .           +12.81D-06*SIN(-3.D0*AN(3)+4.D0*AN(4))
     .           +21.81D-06*SIN(-AN(3)+2.D0*AN(5))
     .           +46.25D-06*SIN(AN(3))
* 
      RH=RH1+RH2
* 
*---- ZETA = Q + IP ----------------------------------------------------
* 
      RQ =      -10.86D-06*COS(AI(1))
     .           -81.51D-06*COS(AI(2))
     .         +1113.36D-06*COS(AI(3))
     .          +350.14D-06*COS(AI(4))
     .          +106.50D-06*COS(AI(5))
* 
      RP =       -10.86D-06*SIN(AI(1))
     .           -81.51D-06*SIN(AI(2))
     .         +1113.36D-06*SIN(AI(3))
     .          +350.14D-06*SIN(AI(4))
     .          +106.50D-06*SIN(AI(5))
* 
      RETURN
      END
      SUBROUTINE TITEL (T,RN,RL,RK,RH,RQ,RP)
* 
*---- CALCUL DES ELEMENTS ELLIPTIQUES DE TITANIA (GUST86) --------------
* 
      IMPLICIT DOUBLE PRECISION (A-H,O-Z)
      COMMON/ASAT/AN(5),AE(5),AI(5)
* 
*---- RN => MOYEN MOUVEMENT (RADIAN/JOUR) ------------------------------
* 
      RN1 = 721663.16D-06
     .          -2.64D-06*COS(AN(3)-2.D0*AN(4)+AE(3))
     .          -2.16D-06*COS(2.D0*AN(4)-3.D0*AN(5)+AE(5))
     .          +6.45D-06*COS(2.D0*AN(4)-3.D0*AN(5)+AE(4))
     .          -1.11D-06*COS(2.D0*AN(4)-3.D0*AN(5)+AE(3))
      RN2 =    -62.23D-06*COS(AN(2)-AN(4))
     .         -56.13D-06*COS(AN(3)-AN(4))
     .         -39.94D-06*COS(AN(4)-AN(5))
     .         -91.85D-06*COS(2.D0*AN(4)-2.D0*AN(5))
     .         -58.31D-06*COS(3.D0*AN(4)-3.D0*AN(5))
     .         -38.60D-06*COS(4.D0*AN(4)-4.D0*AN(5))
     .         -26.18D-06*COS(5.D0*AN(4)-5.D0*AN(5))
     .         -18.06D-06*COS(6.D0*AN(4)-6.D0*AN(5))
* 
      RN=RN1+RN2
* 
*---- RL => LONGITUDE MOYENNE (RADIAN) --------------------------------
* 
      RL1 =  856358.79D-06
     .      +721718.51D-06*T
     .          +20.61D-06*SIN(AN(3)-4.D0*AN(4)+3.D0*AN(5))
     .           -2.07D-06*SIN(AN(3)-2.D0*AN(4)+AE(5))
     .           -2.88D-06*SIN(AN(3)-2.D0*AN(4)+AE(4))
     .          -40.79D-06*SIN(AN(3)-2.D0*AN(4)+AE(3))
     .           +2.11D-06*SIN(AN(3)-2.D0*AN(4)+AE(2))
     .          -51.83D-06*SIN(2.D0*AN(4)-3.D0*AN(5)+AE(5))
     .         +159.87D-06*SIN(2.D0*AN(4)-3.D0*AN(5)+AE(4))
      RL2 =     -35.05D-06*SIN(2.D0*AN(4)-3.D0*AN(5)+AE(3))
     .           -1.56D-06*SIN(3.D0*AN(4)-4.D0*AN(5)+AE(5))
     .          +40.54D-06*SIN(AN(2)-AN(4))
     .          +46.17D-06*SIN(AN(3)-AN(4))
     .         -317.76D-06*SIN(AN(4)-AN(5))
     .         -305.59D-06*SIN(2.D0*AN(4)-2.D0*AN(5))
     .         -148.36D-06*SIN(3.D0*AN(4)-3.D0*AN(5))
     .          -82.92D-06*SIN(4.D0*AN(4)-4.D0*AN(5))
      RL3 =     -49.98D-06*SIN(5.D0*AN(4)-5.D0*AN(5))
     .          -31.56D-06*SIN(6.D0*AN(4)-6.D0*AN(5))
     .          -20.56D-06*SIN(7.D0*AN(4)-7.D0*AN(5))
     .          -13.69D-06*SIN(8.D0*AN(4)-8.D0*AN(5))
* 
      RL=RL1+RL2+RL3
* 
*---- Z= K + IH -------------------------------------------------------
* 
      RK1 =       -0.02D-06*COS(AE(1))
     .            -1.29D-06*COS(AE(2))
     .          -324.51D-06*COS(AE(3))
     .          +932.81D-06*COS(AE(4))
     .         +1120.89D-06*COS(AE(5))
     .           +33.86D-06*COS(AN(2))
     .           +17.46D-06*COS(AN(4))
     .           +16.58D-06*COS(-AN(2)+2.D0*AN(4))
     .           +28.89D-06*COS(AN(3))
     .           -35.86D-06*COS(-AN(3)+2.D0*AN(4))
      RK2 =      -17.86D-06*COS(AN(4))
     .           -32.10D-06*COS(AN(5))
     .          -177.83D-06*COS(-AN(4)+2.D0*AN(5))
     .          +793.43D-06*COS(-2.D0*AN(4)+3.D0*AN(5))
     .           +99.48D-06*COS(-3.D0*AN(4)+4.D0*AN(5))
     .           +44.83D-06*COS(-4.D0*AN(4)+5.D0*AN(5))
     .           +25.13D-06*COS(-5.D0*AN(4)+6.D0*AN(5))
     .           +15.43D-06*COS(-6.D0*AN(4)+7.D0*AN(5))
* 
      RK=RK1+RK2
* 
      RH1 =       -0.02D-06*SIN(AE(1))
     .            -1.29D-06*SIN(AE(2))
     .          -324.51D-06*SIN(AE(3))
     .          +932.81D-06*SIN(AE(4))
     .         +1120.89D-06*SIN(AE(5))
     .           +33.86D-06*SIN(AN(2))
     .           +17.46D-06*SIN(AN(4))
     .           +16.58D-06*SIN(-AN(2)+2.D0*AN(4))
     .           +28.89D-06*SIN(AN(3))
     .           -35.86D-06*SIN(-AN(3)+2.D0*AN(4))
      RH2 =      -17.86D-06*SIN(AN(4))
     .           -32.10D-06*SIN(AN(5))
     .          -177.83D-06*SIN(-AN(4)+2.D0*AN(5))
     .          +793.43D-06*SIN(-2.D0*AN(4)+3.D0*AN(5))
     .           +99.48D-06*SIN(-3.D0*AN(4)+4.D0*AN(5))
     .           +44.83D-06*SIN(-4.D0*AN(4)+5.D0*AN(5))
     .           +25.13D-06*SIN(-5.D0*AN(4)+6.D0*AN(5))
     .           +15.43D-06*SIN(-6.D0*AN(4)+7.D0*AN(5))
* 
      RH=RH1+RH2
* 
*---- ZETA= Q + IP ----------------------------------------------------
* 
      RQ =        -1.43D-06*COS(AI(1))
     .            -1.06D-06*COS(AI(2))
     .          -140.13D-06*COS(AI(3))
     .          +685.72D-06*COS(AI(4))
     .          +378.32D-06*COS(AI(5))
* 
      RP =        -1.43D-06*SIN(AI(1))
     .            -1.06D-06*SIN(AI(2))
     .          -140.13D-06*SIN(AI(3))
     .          +685.72D-06*SIN(AI(4))
     .          +378.32D-06*SIN(AI(5))
* 
      RETURN
      END
      SUBROUTINE OBREL (T,RN,RL,RK,RH,RQ,RP)
* 
*---- CALCUL DES ELEMENTS ELLIPTIQUES D'OBERON (GUST86) ---------------
* 
      IMPLICIT DOUBLE PRECISION (A-H,O-Z)
      COMMON/ASAT/AN(5),AE(5),AI(5)
* 
*---- RN => MOYEN MOUVEMENT (RADIAN/JOUR) -----------------------------
* 
      RN1 = 466580.54D-06
     .          +2.08D-06*COS(2.D0*AN(4)-3.D0*AN(5)+AE(5))
     .          -6.22D-06*COS(2.D0*AN(4)-3.D0*AN(5)+AE(4))
     .          +1.07D-06*COS(2.D0*AN(4)-3.D0*AN(5)+AE(3))
     .         -43.10D-06*COS(AN(2)-AN(5))
      RN2 =    -38.94D-06*COS(AN(3)-AN(5))
     .         -80.11D-06*COS(AN(4)-AN(5))
     .         +59.06D-06*COS(2.D0*AN(4)-2.D0*AN(5))
     .         +37.49D-06*COS(3.D0*AN(4)-3.D0*AN(5))
     .         +24.82D-06*COS(4.D0*AN(4)-4.D0*AN(5))
     .         +16.84D-06*COS(5.D0*AN(4)-5.D0*AN(5))
* 
        RN=RN1+RN2
* 
*---- RL => LONGITUDE MOYENNE (RADIAN) --------------------------------
* 
      RL1 =  -915591.80D-06
     .       +466692.12D-06*T
     .            -7.82D-06*SIN(AN(3)-4.D0*AN(4)+3.D0*AN(5))
     .           +51.29D-06*SIN(2.D0*AN(4)-3.D0*AN(5)+AE(5))
     .          -158.24D-06*SIN(2.D0*AN(4)-3.D0*AN(5)+AE(4))
     .           +34.51D-06*SIN(2.D0*AN(4)-3.D0*AN(5)+AE(3))
     .           +47.51D-06*SIN(AN(2)-AN(5))
     .           +38.96D-06*SIN(AN(3)-AN(5))
     .          +359.73D-06*SIN(AN(4)-AN(5))
      RL2 =      282.78D-06*SIN(2.D0*AN(4)-2.D0*AN(5))
     .          +138.60D-06*SIN(3.D0*AN(4)-3.D0*AN(5))
     .           +78.03D-06*SIN(4.D0*AN(4)-4.D0*AN(5))
     .           +47.29D-06*SIN(5.D0*AN(4)-5.D0*AN(5))
     .           +30.00D-06*SIN(6.D0*AN(4)-6.D0*AN(5))
     .           +19.62D-06*SIN(7.D0*AN(4)-7.D0*AN(5))
     .           +13.11D-06*SIN(8.D0*AN(4)-8.D0*AN(5))
* 
      RL=RL1+RL2
* 
*---- Z = K + IH ------------------------------------------------------
* 
      RK1 =       0.00D-06*COS(AE(1))
     .           -0.35D-06*COS(AE(2))
     .          +74.53D-06*COS(AE(3))
     .         -758.68D-06*COS(AE(4))
     .        +1397.34D-06*COS(AE(5))
     .          +39.00D-06*COS(AN(2))
     .          +17.66D-06*COS(-AN(2)+2.D0*AN(5))
      RK2 =      32.42D-06*COS(AN(3))
     .          +79.75D-06*COS(AN(4))
     .          +75.66D-06*COS(AN(5))
     .         +134.04D-06*COS(-AN(4)+2.D0*AN(5))
     .         -987.26D-06*COS(-2.D0*AN(4)+3.D0*AN(5))
     .         -126.09D-06*COS(-3.D0*AN(4)+4.D0*AN(5))
     .          -57.42D-06*COS(-4.D0*AN(4)+5.D0*AN(5))
     .          -32.41D-06*COS(-5.D0*AN(4)+6.D0*AN(5))
     .          -19.99D-06*COS(-6.D0*AN(4)+7.D0*AN(5))
     .          -12.94D-06*COS(-7.D0*AN(4)+8.D0*AN(5))
* 
      RK=RK1+RK2
* 
      RH1 =       0.00D-06*SIN(AE(1))
     .           -0.35D-06*SIN(AE(2))
     .          +74.53D-06*SIN(AE(3))
     .         -758.68D-06*SIN(AE(4))
     .        +1397.34D-06*SIN(AE(5))
     .          +39.00D-06*SIN(AN(2))
     .          +17.66D-06*SIN(-AN(2)+2.D0*AN(5))
      RH2 =      32.42D-06*SIN(AN(3))
     .          +79.75D-06*SIN(AN(4))
     .          +75.66D-06*SIN(AN(5))
     .         +134.04D-06*SIN(-AN(4)+2.D0*AN(5))
     .         -987.26D-06*SIN(-2.D0*AN(4)+3.D0*AN(5))
     .         -126.09D-06*SIN(-3.D0*AN(4)+4.D0*AN(5))
     .          -57.42D-06*SIN(-4.D0*AN(4)+5.D0*AN(5))
     .          -32.41D-06*SIN(-5.D0*AN(4)+6.D0*AN(5))
     .          -19.99D-06*SIN(-6.D0*AN(4)+7.D0*AN(5))
     .          -12.94D-06*SIN(-7.D0*AN(4)+8.D0*AN(5))
* 
      RH=RH1+RH2
* 
*---- ZETA = Q + IP ---------------------------------------------------
* 
      RQ =       -0.44D-06*COS(AI(1))
     .           -0.31D-06*COS(AI(2))
     .          +36.89D-06*COS(AI(3))
     .         -596.33D-06*COS(AI(4))
     .         +451.69D-06*COS(AI(5))
* 
      RP =       -0.44D-06*SIN(AI(1))
     .           -0.31D-06*SIN(AI(2))
     .          +36.89D-06*SIN(AI(3))
     .         -596.33D-06*SIN(AI(4))
     .         +451.69D-06*SIN(AI(5))
* 
      RETURN
      END
      SUBROUTINE ELLIPX (ELL,RMU,XYZ,DXYZ,IDER,IPRT)
* 
*---- ELLIPX  1.1  18 MARS 1986  J. LASKAR -----------------------------
* 
*     CALCUL DES COORDONNEES RECTANGULAIRES (POSITIONS ET VITESSES) ET
*     DE LEURS DERIVEES PARTIELLES PAR RAPPORT AUX ELEMENTS ELLIPTIQUES
*     A PARTIR DES ELEMENTS ELLIPTIQUES.
* 
*     ELL(6)     : ELEMENTS ELLIPTIQUES A: DEMI-GRAND AXE
*                                       L: LONGITUDE MOYENNE
*                                       K: EXC*COS(LONG NOEUD+ ARG PERI)
*                                       H: EXC*SIN(LONG NOEUD+ ARG PERI)
*                                       Q: SIN(I/2)*COS(LONG NOEUD)
*                                       P: SIN(I/2)*SIN(LONG NOEUD)
*     RMU        : CONSTANTE DE GRAVITATION DU PROBLEME DE DEUX CORPS
*                  RMU = G*M1*(1+M2/M1) M1 MASSE CENTRALE
*                                       M2 MASSE DU CORPS CONSIDERE
*     XYZ(6)     : (1:3) POSITIONS ET (4:6) VITESSES
*     DXYZ(6,7)  : DERIVEES PARTIELLES
*                  DXYZ(I,J)=DRON(XYZ(I))/DRON(ELL(J))
*                  DXYZ(I,7)=DRON(XYZ(I))/DRON(RMU)
*     IDER       : 0 CALCUL DES XYZ SEULEMENT
*                  1 CALCUL DES DERIVEES PARTIELLES AUSSI
*     IPRT       : IMPRESSIONS SI IPRT.GE.1
* 
*     SUBROUTINE UTILISEE : KEPLKH
* 
* 
*---- DECLARATIONS -----------------------------------------------------
* 
      IMPLICIT DOUBLE PRECISION (A-H,O-Y)
      DIMENSION ELL(6),XYZ(6),DXYZ(6,7)
      DIMENSION ROT(3,2),DROTP(3,2),DROTQ(3,2)
      DIMENSION TX1(2),TX1T(2),DTX1K(2),DTX1H(2),DTX1TK(2),DTX1TH(2)
      DIMENSION DEXY1(2,7),DEXY1T(2,7)
* 
*---- ELEMENTS UTILES --------------------------------------------------
* 
      RA=ELL(1)
      RL=ELL(2)
      RK=ELL(3)
      RH=ELL(4)
      RQ=ELL(5)
      RP=ELL(6)
      RN=SQRT(RMU/RA**3)
      PHI=SQRT(1.D0-RK**2-RH**2)
      RKI=SQRT(1.D0-RQ**2-RP**2)
      PSI=1.D0/(1.D0+PHI)
* 
*---- MATRICE DE ROTATION ----------------------------------------------
* 
      ROT(1,1)=1.D0-2.D0*RP**2
      ROT(1,2)=2.D0*RP*RQ
      ROT(2,1)=2.D0*RP*RQ
      ROT(2,2)=1.D0-2.D0*RQ**2
      ROT(3,1)=-2.D0*RP*RKI
      ROT(3,2)= 2.D0*RQ*RKI
* 
*---- CALCUL DE LA LONGITUDE EXCENTRIQUE F -----------------------------
*---- F = ANOMALIE EXCENTRIQUE E + LONGITUDE DU PERIAPSE OMEGAPI -------
* 
      CALL KEPLKH (RL,RK,RH,F,IT,0)
      SF    =SIN(F)
      CF    =COS(F)
      RLMF  =-RK*SF+RH*CF
      UMRSA =RK*CF+RH*SF
      ASR   =1.D0/(1.D0-UMRSA)
      RSA   =1.D0/ASR
      RNA2SR=RN*RA*ASR
* 
*---- CALCUL DE TX1 ET TX1T --------------------------------------------
* 
      TX1(1) =RA*(CF-PSI*RH*RLMF-RK)
      TX1(2) =RA*(SF+PSI*RK*RLMF-RH)
      TX1T(1)=RNA2SR*(-SF+PSI*RH*UMRSA)
      TX1T(2)=RNA2SR*( CF-PSI*RK*UMRSA)
* 
*---- CALCUL DE XYZ ----------------------------------------------------
* 
      DO 110 I=1,3
         XYZ(I)  =0.D0
         XYZ(I+3)=0.D0
         DO 100 J=1,2
            XYZ(I)  =XYZ(I)  +ROT(I,J)*TX1(J)
            XYZ(I+3)=XYZ(I+3)+ROT(I,J)*TX1T(J)
100      CONTINUE
110   CONTINUE
* 
*---- FIN DU CALCUL DES COORDONNEES ------------------------------------
* 
      IF (IDER.NE.1) THEN
      RETURN
      END IF
* 
*---- CALCUL DES DERIVEES PARTIELLES -----------------------------------
* 
*---- CALCUL DE DROTP ET DROTQ -----------------------------------------
* 
      DROTP(1,1)=-4.D0*RP
      DROTP(1,2)= 2.D0*RQ
      DROTP(2,1)= 2.D0*RQ
      DROTP(2,2)= 0.D0
      DROTP(3,1)=-2.D0*RKI+2.D0*RP**2/RKI
      DROTP(3,2)=-2.D0*RP*RQ/RKI
      DROTQ(1,1)= 0.D0
      DROTQ(1,2)= 2.D0*RP
      DROTQ(2,1)= 2.D0*RP
      DROTQ(2,2)=-4.D0*RQ
      DROTQ(3,1)= 2.D0*RP*RQ/RKI
      DROTQ(3,2)= 2.D0*RKI-2.D0*RQ**2/RKI
* 
*---- DERIVEES PARTIELLES DANS LES VARIALES F,K,H ----------------------
* 
      PSI2FI=PSI**2/PHI
      DKH=RK*RH*PSI2FI
      DK2=RK*RK*PSI2FI+PSI
      DH2=RH*RH*PSI2FI+PSI
      DTX1K(1)=RA*(-RLMF*DKH-1.D0+PSI*RH*SF)
      DTX1K(2)=RA*( RLMF*DK2     -PSI*RK*SF)
      DTX1H(1)=RA*(-RLMF*DH2     -PSI*RH*CF)
      DTX1H(2)=RA*( RLMF*DKH-1.D0+PSI*RK*CF)
      DTX1TK(1)=RNA2SR*( UMRSA*DKH+PSI*RH*CF)+ASR*CF*TX1T(1)
      DTX1TK(2)=RNA2SR*(-UMRSA*DK2-PSI*RK*CF)+ASR*CF*TX1T(2)
      DTX1TH(1)=RNA2SR*( UMRSA*DH2+PSI*RH*SF)+ASR*SF*TX1T(1)
      DTX1TH(2)=RNA2SR*(-UMRSA*DKH-PSI*RK*SF)+ASR*SF*TX1T(2)
* 
*---- DERIVEES PARTIELLES DANS LES VARIABLES L,K,H ---------------------
* 
      DO 200 I=1,2
         DEXY1 (I,1)= TX1 (I)/RA
         DEXY1T(I,1)=-TX1T(I)/2.D0/RA
         DEXY1 (I,2)= TX1T(I)/RN
         DEXY1T(I,2)=-RN*ASR**3*TX1(I)
         DEXY1 (I,3)= SF*DEXY1 (I,2)+DTX1K (I)
         DEXY1T(I,3)= SF*DEXY1T(I,2)+DTX1TK(I)
         DEXY1 (I,4)=-CF*DEXY1 (I,2)+DTX1H (I)
         DEXY1T(I,4)=-CF*DEXY1T(I,2)+DTX1TH(I)
200   CONTINUE
* 
*---- DERIVEES PARTIELLES DES VARIABLES X,Y,Z,XDOT,YDOT,ZDOT -----------
* 
      DO 320 IV=1,4
         DO 310 I=1,3
            DXYZ(I  ,IV)=0.D0
            DXYZ(I+3,IV)=0.D0
            DO 300 J=1,2
               DXYZ(I  ,IV)=DXYZ(I  ,IV)+ROT(I,J)*DEXY1 (J,IV)
               DXYZ(I+3,IV)=DXYZ(I+3,IV)+ROT(I,J)*DEXY1T(J,IV)
300         CONTINUE
310      CONTINUE
320   CONTINUE
      IV=5
      DO 340 I=1,3
         DXYZ(I  ,IV)=0.D0
         DXYZ(I+3,IV)=0.D0
         DO 330 J=1,2
            DXYZ(I  ,IV)=DXYZ(I  ,IV)+DROTQ(I,J)*TX1(J)
            DXYZ(I+3,IV)=DXYZ(I+3,IV)+DROTQ(I,J)*TX1T(J)
330      CONTINUE
340   CONTINUE
      IV=6
      DO 360 I=1,3
         DXYZ(I  ,IV)=0.D0
         DXYZ(I+3,IV)=0.D0
         DO 350 J=1,2
            DXYZ(I  ,IV)=DXYZ(I  ,IV)+DROTP(I,J)*TX1(J)
            DXYZ(I+3,IV)=DXYZ(I+3,IV)+DROTP(I,J)*TX1T(J)
350      CONTINUE
360   CONTINUE
* 
*---- DERIVEES PARTIELLES PAR RAPPORT A RMU ----------------------------
* 
      DO 400 I=1,3
         DXYZ(I  ,7)=0.D0
         DXYZ(I+3,7)=0.5D0*XYZ(I+3)/RMU
400   CONTINUE
* 
      END
      SUBROUTINE KEPLKH (RL,RK,RH,F,IT,IPRT)
* 
*---- KEPLKH  1.0  12 DECEMBRE 1985 J. LASKAR --------------------------
* 
*     RESOLUTION DE L'EQUATION DE KEPLER EN VARIABLES LONGITUDES, K, H
* 
*-----------------------------------------------------------------------
* 
      IMPLICIT DOUBLE PRECISION (A-H,O-Y)
      IF (RL.EQ.0.D0) THEN
         F=0.D0
         RETURN
      END IF
      ITMAX=20
      EPS=1.0D-16
      F0=RL
      E0=ABS(RL)
      DO 110 IT=1,ITMAX
         K=0
         SF=SIN(F0)
         CF=COS(F0)
         FF0 =F0-RK*SF+RH*CF-RL
         FPF0=1.D0-RK*CF-RH*SF
         SDIR=FF0/FPF0
100      CONTINUE
         F=F0-SDIR*(0.5D0)**K
         E=ABS(F-F0)
         IF (IPRT.GE.1) THEN
            WRITE (*,*) 'IT=',IT,'K=',K,'ECART=',E
         END IF
         IF (E.GT.E0) THEN
            K=K+1
            GOTO 100
         ELSE
            IF (K.EQ.0.AND.E.LE.EPS.AND.FF0.LE.EPS) THEN
               RETURN
            ELSE
               F0=F
               E0=E
            END IF
         END IF
110   CONTINUE
      END
      SUBROUTINE FRIECK (IROT,V1,V2)
* 
*---- CHANGEMENT DE REPERE B1950 POUR COORDONNEES RECTANGULAIRES -------
*     ROTATION FRIECKE : 0.525 " AUTOUR DE L'AXE Z (REPERE EQUATORIAL).
* 
*     EN ENTREE :
* 
*     IROT  : INDICE DE LA ROTATION (ENTIER).
*             +1 : ROTATION DANS LE SENS FK4 -> FK5.
*             -1 : ROTATION DANS LE SENS FK5 -> FK4.
*     V1(3) : COORDONNEES RECTANGULAIRES AVANT ROTATION (REELS DP).
* 
*     EN SORTIE :
* 
*     V2(3) : COORDONNEES RECTANGULAIRES APRES ROTATION (REELS DP).
* 
*-----------------------------------------------------------------------
* 
      DOUBLE PRECISION V1(3),V2(3),SDRAD,AZ,SA,CA
      SAVE SDRAD
      DATA SDRAD/0.4848136811095360D-5/
      AZ=-0.525D0*IROT*SDRAD
      SA=DSIN(AZ)
      CA=DCOS(AZ)
      V2(1)=V1(1)*CA+V1(2)*SA
      V2(2)=V1(2)*CA-V1(1)*SA
      V2(3)=V1(3)
      RETURN
      END
      SUBROUTINE PRECES (TI,TF,V1,V2)
* 
*---- CORRECTION DE PRECESSION SUR DES COORDONNEES RECTANGULAIRES ------
* 
*     EN ENTREEE :
* 
*     TI :    DATE JULIENNE INITIALE (REEL DP)
*     TF :    DATE JULIENNE FINALE (REEL DP)
*     V1(3) : COORDONNEES RECTANGULAIRES DANS LE REPERE EQUATORIAL
*             MOYEN DE LA DATE TI (REEL DP)
* 
*     EN SORTIE :
* 
*     V2(3) : COORDONNEES RECTANGULAIRES DANS LE REPERE EQUATORIAL
*             MOYEN DE LA DATE TF (REEL DP)
* 
*     REMARQUE :
* 
*     LES FORMULES DE PRECESSION UTILISEES SONT CELLES RECOMMANDEES
*     L'U.A.I. A PARTIR DE 1984.
* 
*---- DECLARATIONS ET INITIALISATIONS ----------------------------------
* 
      IMPLICIT DOUBLE PRECISION (A-H,O-Z)
      DIMENSION V1(3),V2(3),A(3,3)
      SAVE A,QD1,QD2,QD3,QZ1,QZ2,QZ3,QT1,QT2,QT3,DZETA,ZA,TETA
      SAVE SDRAD,T2000,SIECLE,TIL,TFL
      DATA SDRAD/0.4848136811095360D-5/
      DATA T2000/2451545.D0/
      DATA SIECLE/36525.D0/
      DATA TIL/0.D0/
      DATA TFL/0.D0/
* 
*---- CALCUL DES QUANTITES LIEES A LA PRECESSION EQUATORIALE -----------
* 
      IF (TI.EQ.TIL) GOTO 100
      T=(TI-T2000)/SIECLE
      T2=T*T
      QD1=2306.2181D0+1.39656D0*T-0.139D-3*T2
      QD2=0.30188D0-0.345D-3*T
      QD3=0.17998D-1
      QZ1=QD1
      QZ2=1.09468D0+0.66D-4*T
      QZ3=0.18203D-1
      QT1=2004.3109D0-0.8533D0*T-0.217D-3*T2
      QT2=-0.42665D0-0.217D-3*T
      QT3=-0.41833D-1
100   CONTINUE
      IF (TI.EQ.TIL.AND.TF.EQ.TFL) GOTO 200
      PT=(TF-TI)/SIECLE
      PT2=PT*PT
      PT3=PT*PT2
      DZETA=(QD1*PT+QD2*PT2+QD3*PT3)*SDRAD
      ZA=(QZ1*PT+QZ2*PT2+QZ3*PT3)*SDRAD
      TETA=(QT1*PT+QT2*PT2+QT3*PT3)*SDRAD
* 
*---- CHARGEMENT DE LA MATRICE DE ROTATION -----------------------------
* 
      C1=DCOS(DZETA)
      C2=DCOS(ZA)
      S1=DSIN(DZETA)
      S2=DSIN(ZA)
      CC=C1*C2
      CS=C1*S2
      SC=S1*C2
      SS=S1*S2
      C=DCOS(TETA)
      S=DSIN(TETA)
      A(1,1)=-SS+CC*C
      A(1,2)=-CS-SC*C
      A(1,3)=-S*C2
      A(2,1)=SC+CS*C
      A(2,2)=CC-SS*C
      A(2,3)=-S*S2
      A(3,1)=C1*S
      A(3,2)=-S1*S
      A(3,3)=C
* 
*---- ROTATION DU REPERE -----------------------------------------------
* 
200   CONTINUE
      DO 220 I=1,3
         V2(I)=0.D0
         DO 210 J=1,3
            V2(I)=V2(I)+A(I,J)*V1(J)
210      CONTINUE
220   CONTINUE
* 
*---- SORTIE -----------------------------------------------------------
* 
      TIL=TI
      TFL=TF
      RETURN
      END
      SUBROUTINE CORDIF (VP,VS,CD)
* 
*---- CALCUL DES COORDONNEES DIFFERENTIELLES D'UN SATELLITE ------------
* 
*     EN ENTREE :
* 
*     VP(3) : COORDONNEES RECTANGULAIRES EQUATORIALES GEOCENTRIQUES
*             DE LA PLANETES (REEL DP)
*     VS(3) : COORDONNEES RECTANGULAIRES EQUATORIALES DU SATELLITE
*             PAR RAPPORT A LA PLANETE (REEL DP)
* 
*     EN SORTIE :
* 
*     CD(2) : COORDONNEES DIFFERENTIELLES DU SATELLITE (REEL DP)
*             CD(1) : DIFFERENCE EN ASCENCION DROITE (RADIAN)
*             CD(2) : DIFFERENCE EN DECLINAISON (RADIAN)
* 
*-----------------------------------------------------------------------
* 
      IMPLICIT DOUBLE PRECISION (A-H,O-Z)
      DIMENSION VP(3),VS(3),CD(2)
      D=SQRT(VP(1)*VP(1)+VP(2)*VP(2)+VP(3)*VP(3))
      ALPHA=ATAN2(VP(2),VP(1))
      DELTA=ASIN(VP(3)/D)
      C=COS(ALPHA)
      S=SIN(ALPHA)
      X=VS(1)*C+VS(2)*S
      Y=VS(2)*C-VS(1)*S
      C=COS(DELTA)
      S=SIN(DELTA)
      Z=VS(3)*C-X*S
      CD(1)=ATAN(Y/D)
      CD(2)=ATAN(Z/D)
      RETURN
      END
