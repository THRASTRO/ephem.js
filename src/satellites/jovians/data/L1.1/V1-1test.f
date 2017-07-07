      PROGRAM V1_1test

      IMPLICIT DOUBLE PRECISION (A-H,O-Z)
      PARAMETER(pi=3.141592653589793D0)
      DIMENSION ELEM(6)
      DATA gk,UA/0.01720209895d0, 149597870.691d0/ !! UA valeur DE406

      WRITE(*,*)'Entrez nsat'
      READ(*,*) nsat
      WRITE(*,*)'Entrez la date'
      READ(*,*) ET

      ET=ET-2433282.5d0

      CALL V1_1(ET,nsat,1,1,ELEM)

      WRITE(*,*)'         '
      WRITE(*,*) ELEM*UA
      WRITE(*,*)'         '
      WRITE(*,*) ELEM!*UA

c      WRITE(*,*)'Voici la longitude'
c      WRITE(*,*)ELEM(2)

c      WRITE(*,*)'Voici la longitude du perijove'
c      PERI=DATAN2(ELEM(4),ELEM(3))
c      IF(PERI.LT.0.D0)PERI=PERI+2.D0*pi
c      WRITE(*,*)PERI

c      WRITE(*,*)'Voici la longitude du noeud'
c      PNOEUD=DATAN2(ELEM(6),ELEM(5))
c      IF(PNOEUD.LT.0.D0)PNOEUD=PNOEUD+2.D0*pi
c      WRITE(*,*)PNOEUD

      END


      SUBROUTINE V1_1(ET,nsat,is,iv,ELEM) 

      !********************************************************************
      !*         Théorie synthétique ajustée entre 1891 et 2003           *
      !*                  des satellites Galiléens                        *
      !*                                                                  *
      !*                        (Version 1.1)                             *
      !*                                                                  *
      !*------------------------------------------------------------------*
      !*                   V.Lainey (lainey@imcce.fr)                     *
      !*                                                                  *
      !*    IMCCE - 77, Avenue Denfert-Rochereau 75014 Paris (France)     *
      !*__________________________________________________________________*
      !*                                                                  *
      !*  ET : date en jours juliens a partir du 01/01/1950 a 0H00 (TT)   *
      !* nsat: numéro du satellite désiré (de 1 a 4)                      *
      !*  is : choix LP solaires (0=sans, 1=avec)                         *
      !*  iv : choix J2000 (0=repère initial en éléments, 1=J2000 en xyz) *
      !* nsat: numéro du satellite desiré (de 1 a 4)                      *
      !* ELEM: en sortie (a,l,Z,ZETA) ou (x,y,z,vx,vy,vz)                 *
      !********************************************************************
      !*                          02/04/2003                              *
      !********************************************************************

      IMPLICIT DOUBLE PRECISION (A-H,O-Z)
      PARAMETER(pi=3.141592653589793D0)
      DOUBLE PRECISION L,MU
      DIMENSION ELEM(6),ELEMCP(6),L(4),XV(6),MU(4)
      DATA L(1),L(2),L(3),L(4)/ 3.55155228618240D0, 1.76932271112347D0, 
     & 0.878207923589328D0, 0.376486233433828D0/
      DATA ome,ainc/ 6.24950183065715D0,0.445094736497665D0/
      DATA MU/ 2.82489428433814D-07, 2.82483274392893D-07,
     & 2.82498184184723D-07, 2.82492144889909D-07/
      CALL bnlp(ET,nsat,is,ELEM)
      CALL bncp(ET,nsat,ELEMCP)
      ELEM=ELEM+ELEMCP
      ELEM(2)=ELEM(2)+L(nsat)*ET
      XX=DCOS(ELEM(2))
      YY=DSIN(ELEM(2))
      ELEM(2)=DATAN2(YY,XX)
      IF(ELEM(2).LT.0.D0)ELEM(2)=ELEM(2)+2.D0*pi
      IF(iv.EQ.1)THEN
        xmu=MU(nsat)
        CALL ELEM2PV(xmu,ELEM,XV)
        ELEM(1)=XV(1)*DCOS(ome)-XV(2)*DSIN(ome)*DCOS(ainc)
     &  +XV(3)*DSIN(ainc)*DSIN(ome)
        ELEM(2)=XV(1)*DSIN(ome)+XV(2)*DCOS(ome)*
     &  DCOS(ainc)-XV(3)*DSIN(ainc)*DCOS(ome)      
        ELEM(3)=XV(2)*DSIN(ainc)+XV(3)*DCOS(ainc)
        ELEM(4)=XV(4)*DCOS(ome)-XV(5)*DSIN(ome)*DCOS(ainc)
     &  +XV(6)*DSIN(ainc)*DSIN(ome)
        ELEM(5)=XV(4)*DSIN(ome)+XV(5)*DCOS(ome)*
     &  DCOS(ainc)-XV(6)*DSIN(ainc)*DCOS(ome)      
        ELEM(6)=XV(5)*DSIN(ainc)+XV(6)*DCOS(ainc)
      ENDIF
      RETURN
      END
************************************************************************
      SUBROUTINE bnlp(dat0,nsat,is,ELEM)
      IMPLICIT DOUBLE PRECISION (A-H,O-Z)
      PARAMETER(pi=3.141592653589793D0,nfm=200)
      DIMENSION AMP(nfm),PER(nfm),PHASE(nfm),ELEM(6),
     & c(9,20),val(5),NBF(4),TN(0:8)
      COMPLEX*16 ICOMP,RESULT
      ICOMP=(0.D0,1.D0)
      dat=dat0+310910.16D0
      OPEN(14,file='coefcheb_1_1.dat')
      DO I=1,20
        READ(14,*) (c(j,I),j=1,9)
      ENDDO
      IF(nsat.EQ.1)THEN
        OPEN(15,file='AF1_1_1.dat')
      ELSE
        IF(nsat.EQ.2)THEN
          OPEN(15,file='AF2_1_1.dat')
        ELSE
          IF(nsat.EQ.3)THEN
            OPEN(15,file='AF3_1_1.dat')
          ELSE
            OPEN(15,file='AF4_1_1.dat')
          ENDIF
        ENDIF
      ENDIF
      READ(15,*) NBF
      DO ib=1,4
      val=0.D0
      RESULT=0.D0
      IF((is==1))THEN
        a=-819.727638594856D0
        b=812.721806990360D0
        x=(dat0/365.25D0-0.5D0*(b+a))/(0.5D0*(b-a))
        TN(0)=1.D0
        TN(1)=x
        DO it=2,8
          TN(it)=2.D0*x*TN(it-1)-TN(it-2)
        ENDDO
        DO nv=1,5
          nv2=nv+(nsat-1)*5
          DO it=0,8
          val(nv)=val(nv)+c(it+1,nv2)*TN(it)
          ENDDO
          val(nv)=val(nv)-0.5D0*c(1,nv2)
        ENDDO
       ENDIF
      DO j=1,NBF(ib)
        READ(15,*) AMP(j),PER(j),PHASE(j)
         IF (PER(j).EQ.0.D0) THEN
          RESULT=RESULT+AMP(j)*EXP(ICOMP*PHASE(j))
         ELSE
          RESULT=RESULT+AMP(j)*EXP(ICOMP*((2.D0*pi/PER(j))*dat
     &    +PHASE(j)))
         ENDIF
      ENDDO
      IF(ib.EQ.1) ELEM(ib)=DREAL(RESULT)
      IF(ib.EQ.2) ELEM(ib)=DREAL(RESULT)+val(1)
      IF(ib.GT.2) THEN
        ELEM(2*(ib-2)+1)=DREAL(RESULT)+val(2*(ib-2))
        ELEM(2*(ib-2)+2)=DIMAG(RESULT)+val(2*(ib-2)+1)
      ENDIF 
      ENDDO  
      CLOSE(14)
      CLOSE(15)
      RETURN
      END
************************************************************************
      SUBROUTINE bncp(dat0,nsat,ELEM) 
      IMPLICIT DOUBLE PRECISION (A-H,O-Z)
      PARAMETER(pi=3.141592653589793D0,nfm=200)
      DIMENSION AMP(nfm),PER(nfm),PHASE(nfm),ELEM(6),NBF(4)
      COMPLEX*16 ICOMP,RESULT
      ICOMP=(0.D0,1.D0)
      IF(nsat.EQ.1)THEN
        OPEN(15,file='AFCP1_1_1.dat')
      ELSE
        IF(nsat.EQ.2)THEN
          OPEN(15,file='AFCP2_1_1.dat')
        ELSE
          IF(nsat.EQ.3)THEN
            OPEN(15,file='AFCP3_1_1.dat')
          ELSE
            OPEN(15,file='AFCP4_1_1.dat')
          ENDIF
        ENDIF
      ENDIF
      READ(15,*) NBF
      DO ib=1,4
        RESULT=0.D0
        DO j=1,NBF(ib)
          READ(15,*) AMP(j),PER(j),PHASE(j)
          IF (PER(j).EQ.0.D0) THEN
            RESULT=RESULT+AMP(j)*EXP(ICOMP*PHASE(j))
          ELSE
            RESULT=RESULT+AMP(j)*EXP(ICOMP*((2.D0*pi/PER(j))*dat0
     &      +PHASE(j)))
          ENDIF
        ENDDO
        IF(ib.LE.2) ELEM(ib)=DREAL(RESULT)
        IF(ib.GT.2) THEN
          ELEM(2*(ib-2)+1)=DREAL(RESULT)
          ELEM(2*(ib-2)+2)=DIMAG(RESULT)
        ENDIF 
      ENDDO 
      CLOSE(15)
      RETURN
      END
************************************************************
      SUBROUTINE ELEM2PV(MU,ELEM,XV) 
      IMPLICIT DOUBLE PRECISION(A-H,O-Z) 
      PARAMETER(PI2=3.141592653589793D0*2.d0) 
      DOUBLE PRECISION MU,K 
      DIMENSION XV(6),ELEM(6),G(3),E(3) 
      K=ELEM(3) 
      H=ELEM(4) 
      Q=ELEM(5) 
      P=ELEM(6) 
      A=ELEM(1) 
      AL=ELEM(2) 
      AN=DSQRT(MU/A**3.D0)
      EE=AL+K*DSIN(AL)-H*DCOS(AL) 
20    CONTINUE 
      CE=DCOS(EE) 
      SE=DSIN(EE) 
      DE=(AL-EE+K*SE-H*CE)/(1.D0-K*CE-H*SE) 
      EE=EE+DE 
      IF (ABS(DE).GE.1.D-12) GOTO 20
      CE=DCOS(EE) 
      SE=DSIN(EE) 
      DLE=H*CE-K*SE 
      RSAM1=-K*CE-H*SE 
      ASR=1.D0/(1.D0+RSAM1) 
      PHI=DSQRT(1.D0-K*K-H*H) 
      PSI=1.D0/(1.D0+PHI) 
      X1=A*(CE-K-PSI*H*DLE) 
      Y1=A*(SE-H+PSI*K*DLE) 
      VX1=AN*ASR*A*(-SE-PSI*H*RSAM1) 
      VY1=AN*ASR*A*( CE+PSI*K*RSAM1) 
      F2=2.D0*DSQRT(1.d0-Q*Q-P*P) 
      P2=1.D0-2.D0*P*P 
      Q2=1.D0-2.D0*Q*Q 
      PQ=2.D0*P*Q 
      XV(1)=X1*P2+Y1*PQ 
      XV(2)=X1*PQ+Y1*Q2 
      XV(3)=(Q*Y1-X1*P)*F2 
      XV(4)=VX1*P2+VY1*PQ 
      XV(5)=VX1*PQ+VY1*Q2 
      XV(6)=(Q*VY1-VX1*P)*F2 
      RETURN 
      END 
******************************************


