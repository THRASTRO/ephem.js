/* autogenerated by webmerge (compile context) */
;
var vsop2010={};
(function(t){(function(u){function q(c,e,f,b,d,k,a){a=a||0;f=f||0;b=b||[];c(e,f,b,d,k,a);e.givesMeanMotion&&(c=b[a+0]*e.givesMeanMotion,b[a+0]=Math.cbrt(e.GM/c/c));if(toVSOP=e.toVSOP)e=new Orbit({a:b[a+0],L:b[a+1],k:b[a+2],h:b[a+3],q:b[a+4],p:b[a+5],GM:e.GM,epoch:f}),e=e.state(f),"function"==typeof toVSOP&&(p=p||new THREE.Matrix3,toVSOP(f,p),toVSOP=p),e.r.applyMatrix3(toVSOP),e.v.applyMatrix3(toVSOP),e=new Orbit(e),b[a++]=e._a,b[a++]=e.L(),b[a++]=e.k(),b[a++]=e.h(),b[a++]=e.q(),b[a++]=e.p();return b}
function v(c,e,f,b,d,k,a){a=a||0;f=f||0;b=b||[];q(c,e,f,b,d,k,a);return{a:b[a++],L:b[a++],k:b[a++],h:b[a++],q:b[a++],p:b[a++],GM:e.GM,epoch:f}}function r(c,e,f,b,d,k,a){a=a||0;f=f||0;b=b||[];q(c,e,f,b,d,k,a);c=(new Orbit({a:b[a+0],L:b[a+1],k:b[a+2],h:b[a+3],q:b[a+4],p:b[a+5],GM:e.GM,epoch:f})).state(f);b[a++]=c.r.x;b[a++]=c.r.y;b[a++]=c.r.z;b[a++]=c.v.x;b[a++]=c.v.y;b[a++]=c.v.z;return b}var p;u.VSOP=u.VSOP||function(c,e,f,b,d,k){var a={raw:function(l,h,n,m,g){return c(a,l,h,n,m,g)},vsop:function(l,
h,n,m,g){return q(c,a,l,h,n,m,g)},state:function(l,h,n,m,g){return r(c,a,l,h,n,m,g)},position:function(l,h,n,m,g){g=g||0;l=l||0;h=h||[];r(c,a,l,h,n,m,g);return{x:h[g++],y:h[g++],z:h[g++],vx:h[g++],vy:h[g++],vz:h[g++],GM:a.GM,epoch:l}},orbital:function(l,h,n,m,g){return v(c,a,l,h,n,m,g)},orbit:function(l,h,n,m,g){return new Orbit(v(c,a,l,h,n,m,g))}};a.givesMeanMotion=k;a.toVSOP=d;a.coeffs=b;a.GM=f;a.name=e;return a}})(this);(function(u){function q(r,p,c){for(var e=0,f=0;f<r.length;f+=1){for(var b=
0,d=r[f],k=d.length,a=0;a<k;a+=3){for(var l=d[a+0],h=d[a+1],n=d[a+2],m=0,g=0;m<n.length;m+=2)g+=c[n[m+0]-1]*n[m+1];b+=l*Math.sin(g)+h*Math.cos(g)}e+=b*Math.pow(p,f)}return e}function v(r,p,c,e,f,b){b=b||0;p=p||0;c=c||[];var d=p/1E3,k=r.coeffs,a=[4.402608631669+26087.9031406856*d,3.176134461576+10213.2855474345*d,1.753470369433+6283.07585035322*d,6.203500014141+3340.61243414546*d,4.09136000305+1731.17045272186*d,1.713740719173+1704.4508550272*d,5.598641292287+1428.94891784427*d,2.805136360408+1364.75651362999*
d,2.32698973462+1361.92320763284*d,.599546107035+529.690961562325*d,.874018510107+213.299086108488*d,5.481225395663+74.781659030778*d,5.311897933164+38.132972226125*d,.359536228504931*d,5.19846640063+77713.7714481804*d,1.62790513602+84334.6615717837*d,2.35555563875+83286.9142477147*d];c[b++]=q(k.a,d,a);c[b++]=CYCLE(q(k.L,d,a));c[b++]=q(k.k,d,a);c[b++]=q(k.h,d,a);c[b++]=q(k.q,d,a);c[b++]=q(k.p,d,a);e&&(c[b++]=r.GM);f&&(c[b++]=p);return c}u.VSOP2K=function(r,p,c){return u.VSOP(v,r,p,c)}})(this);t.mer=
VSOP2K("mer",39.4769329861321,{L:[[0,4.402608634958,[],-2.64201522670335E-5,-2.38270719313597E-5,[1,2,2,-5],3.94031252193582E-6,1.68698851462506E-5,[1,1,2,-2]],[0,26087.9031407479,[]]],a:[[0,.387098309825,[],7.13402028809345E-7,-1.65207289029428E-7,[1,1,2,-2],-2.43928311061146E-7,2.70920239163361E-7,[1,2,2,-5]]],h:[[0,.200723306513,[],1.46247510056051E-6,-7.07670167503659E-6,[10,2],3.00433378875618E-6,-1.85000588197322E-6,[1,2,2,-5]]],k:[[0,.044660632145,[],7.05228219125317E-6,1.49541249989743E-6,
[10,2],-1.71581152612749E-6,-2.9047458604038E-6,[1,2,2,-5]]],p:[[0,.045635506259,[],3.72456622815479E-7,-2.87633259774439E-7,[10,2],-1.67949929062814E-8,-1.99423734197158E-7,[1,2,2,-5]]],q:[[0,.040615647442,[],2.66403900926623E-7,2.94193158444715E-7,[10,2],-1.11822412449545E-7,-2.39875924795339E-8,[1,2,2,-5]]]});t.ven=VSOP2K("ven",39.4770230655563,{L:[[0,3.176134454599,[],-8.46240143006893E-6,1.38117115866899E-5,[2,2,4,-7,10,8,11,-6],-2.00389756287857E-5,-3.91666181827629E-9,[2,2,3,-2]],[0,10213.2855472784,
[]]],a:[[0,.723329819886,[],-7.57620994411122E-10,4.32265690212177E-6,[2,2,3,-2],-2.07964654446319E-9,2.93979841750061E-6,[2,2,10,-2]]],h:[[0,.005066851819,[],-2.23065999914255E-5,-3.67117397037589E-8,[2,2,3,-3],1.69019491669063E-5,3.97002361563882E-8,[2,1,3,-2]]],k:[[0,-.004492821064,[],2.55941759138896E-8,2.24748622741178E-5,[2,2,3,-3],-3.29894947520449E-8,-1.70585582369065E-5,[2,1,3,-2]]],p:[[0,.028822821668,[],-1.69237210562926E-7,-6.92583271309403E-7,[2,3,3,-5],1.67848386075785E-7,-3.36675068778861E-7,
[10,2]]],q:[[0,.006824114874,[],-6.68927910297951E-7,1.54240025226593E-7,[2,3,3,-5],3.41174753652136E-7,1.68082529845489E-7,[10,2]]]});t.emb=VSOP2K("emb",39.477046459361,{L:[[0,1.753470407365,[],-9.52887631596824E-6,3.22549399417682E-5,[3,4,4,-8,10,3],-2.05639611051847E-5,-1.7163073429688E-8,[3,2,10,-2]],[0,6283.07585023801,[]]],a:[[0,1.00000101757,[],-7.73623889346358E-9,1.12049571070469E-5,[3,2,10,-2],5.48709810755875E-10,7.60860006968868E-6,[2,1,3,-1]]],h:[[0,.016284489307,[],1.9870137410749E-5,
7.5268469554213E-9,[2,2,3,-3],-1.86405779411837E-5,-2.45293721197461E-8,[3,1,10,-2]]],k:[[0,-.003740817992,[],5.3911755771211E-9,-1.98894818704333E-5,[2,2,3,-3],-4.57790598040938E-9,1.85926031955318E-5,[3,1,10,-2]]],p:[[1.14305139203922E-7,4.70213713427448E-7,[2,3,3,-5],6.68446056160719E-8,3.60318770595279E-7,[10,2],2.38375802814195E-8,9.8617504571055E-8,[2,2,3,-4]]],q:[[4.57512766619672E-7,-1.06488916145471E-7,[2,3,3,-5],-3.63903832086008E-7,6.80744701688986E-8,[10,2],-2.37906978475016E-7,1.28823793717714E-8,
[2,1,3,-1]]]});t.mar=VSOP2K("mar",39.4769391722243,{L:[[0,6.203499866531,[],7.74235605944231E-5,-2.61783430250939E-4,[3,4,4,-8,10,3],5.34524186153185E-5,-7.8048866315239E-5,[2,2,4,-7,10,8,11,-6]],[0,3340.61243348051,[]]],a:[[0,1.523679340688,[],2.10177475060165E-7,6.6017046505836E-5,[4,2,10,-2],-9.97760548337139E-6,-1.96269524649139E-5,[4,1,10,-2]]],h:[[0,-.03789970896,[],-8.15830129274742E-5,-1.63133363985508E-7,[4,1,10,-2],-4.51462191517654E-5,-1.33856036872035E-6,[10,1]]],k:[[0,.08536559315,[],
7.59234168329626E-7,8.22828214610147E-5,[4,1,10,-2],1.32864651746027E-6,-4.62999686534388E-5,[10,1]]],p:[[0,.012284486291,[],8.45182541308784E-7,-7.45399190771075E-8,[10,2],-1.46410947408683E-7,2.82737269050899E-7,[10,1]]],q:[[0,.010470428292,[],5.24660980941539E-8,8.59427446062127E-7,[10,2],-2.44990389459863E-7,1.14143047541592E-7,[3,1,4,-2]]]});t.jup=VSOP2K("jup",39.5146186826235,{L:[[0,.59954609792,[],-.00566623987134923,-8.92559187360027E-4,[10,2,11,-5],6.16623674445687E-4,-9.02518292284778E-5,
[10,1,11,-2]],[-1.74952165271472E-13,529.690968176081,[]]],a:[[0,5.202603156914,[],5.10071945012176E-6,6.90804372208541E-4,[10,2,11,-2],-2.87825241796765E-5,-3.21490648279802E-4,[10,1,11,-2]]],h:[[0,.012003719463,[],-6.42719933597925E-4,1.47984982727316E-5,[10,1,11,-2],-1.60441762075901E-4,-3.41117970303028E-4,[10,2,11,-5]]],k:[[0,.04698585415,[],-4.34755266569202E-6,6.52966326253384E-4,[10,1,11,-2],-3.44420830476197E-4,1.60870225873298E-4,[10,2,11,-5]]],p:[[0,.011183894414,[],-3.33987813982107E-6,
-7.83497649059113E-6,[10,2,11,-5],-1.37863413142908E-6,1.69799936366335E-6,[10,1,11,-3]]],q:[[0,-.002065622793,[],-7.5099818730761E-6,4.12745072196874E-6,[10,2,11,-5],1.89549042319157E-6,1.12969139607457E-6,[10,1,11,-3]]]});t.sat=VSOP2K("sat",39.4882123322459,{L:[[0,.87401834497,[],.0139448111557635,.00219693250253942,[10,2,11,-5],.0025978352864037,-1.16600080492372E-5,[10,1,11,-1]],[0,213.299086091733,[]]],a:[[0,9.554910378112,[],-3.4372544443503E-5,.0336346753264386,[10,1,11,-1],-.0022293807231311,
.00275617044443976,[10,1,11,-2]]],h:[[0,.055429461883,[],6.35121088770331E-4,.00140902106294366,[10,2,11,-5],.00196887708331382,6.60368517037526E-6,[10,1]]],k:[[0,-.002959983388,[],.00141686759957569,-6.36534426943265E-4,[10,2,11,-5],6.66643500114881E-6,.00197268850168487,[10,1]]],p:[[0,.019891374992,[],8.69830946116295E-6,1.87071949357162E-5,[10,2,11,-5],-3.50554823795889E-6,-7.68114511152702E-6,[10,1,11,-1]]],q:[[0,-.008717361432,[],1.81469852271165E-5,-9.70875879012806E-6,[10,2,11,-5],-4.47748707747418E-6,
5.74719690638081E-6,[10,1,11,-1]]]});t.ura=VSOP2K("ura",39.4786500913706,{L:[[0,5.481224786038,[],-.0149454709887597,8.36462519121679E-4,[12,1,13,-2],.00341047641872115,-1.91054522639452E-7,[10,1,12,-1]],[0,74.781653800278,[]]],a:[[0,19.218439287036,[],2.27855795263522E-6,.0803052643857234,[10,1,12,-1],-7.30496660393603E-6,.0206873124885464,[11,1,12,-1]]],h:[[0,.005647966027,[],.00274677779999139,-4.04116959299732E-7,[10,1],.00209367354511594,5.55491315644574E-6,[12,1,13,-2]]],k:[[0,-.045953250797,
[],-1.72795604072523E-7,.00274534376318399,[10,1],3.65789913745649E-6,-.00208573717620544,[12,1,13,-2]]],p:[[0,.006486072973,[],-3.8184133137512E-6,5.32911454619932E-6,[11,1,12,-3],4.06479566312906E-6,4.90357922293699E-6,[10,1,12,-1]]],q:[[0,.001859210711,[],5.18108664311659E-6,4.15480638342931E-6,[11,1,12,-3],4.86981667572992E-6,-4.09472896777568E-6,[10,1,12,-1]]]});t.nep=VSOP2K("nep",39.4789600424755,{L:[[0,5.311894573453,[],.0101487036981737,-5.68627881804584E-4,[12,1,13,-2],.00441713419495917,
7.04524571624978E-7,[10,1,13,-1]],[0,38.132927373227,[]]],a:[[0,30.110439638406,[],-3.1669018477414E-5,.148183001944669,[10,1,13,-1],-7.59631077478751E-6,.0359790148985674,[11,1,13,-1]]],h:[[0,.006691013143,[],.00344037271210066,2.60047251176929E-7,[10,1],.00136274554541729,-7.31600288268588E-8,[13,1]]],k:[[0,.005998419642,[],-1.19590693976619E-6,.00343812848498352,[10,1],-2.33799319374669E-8,.00136228843996479,[13,1]]],p:[[0,.011516898449,[],-1.008524631792E-5,-4.10581376424088E-7,[10,1,13,-1],8.73371008673231E-6,
3.57695227627113E-7,[10,1,13,1]]],q:[[0,-.010291527179,[],-4.12947584026413E-7,1.00923519892543E-5,[10,1,13,-1],-3.55449496563709E-7,8.73402427654602E-6,[10,1,13,1]]]});t.plu=VSOP2K("plu",39.4769267244114,{L:[[0,4.166144186927,[],-.00456583327646248,.00206416206323593,[14,1402],.00219275180301368,.00282526966742194,[14,4]],[0,25.3363411174083,[]],[0,-.0182807024038974,[]]],a:[[0,39.54470599359,[],-.0853871348201155,-.188856887968998,[14,1402],-.0334407179334043,-.0414526604237341,[14,1331],-.0073788773702726,
-.0484978885372198,[14,522],-.00535961817372672,.0280976664834542,[14,71],-.0123263783658494,-.00913663936136193,[14,1261],-.00526781366320596,-.0121954072119394,[14,452]],[.053676522241001,-.0245188221694707,[14,1402],0,.0378904808510013,[],.0195474173149917,-.015961060108816,[14,1331],.0138167288060952,-.00217190934339332,[14,522]]],h:[[0,-.1734154998938,[],.0030130079923837,.00212348584672692,[14,1473],-7.07800891750754E-4,-.00105093327613335,[14,71]]],k:[[0,-.1787246950685,[],-.00209858994701332,
.00316298912578306,[14,1473],.00111179681573192,-6.81136951235402E-4,[14,71]]],p:[[0,.139779560579086,[],1.3480122930835E-4,1.28742494031123E-4,[14,1402],1.6184522556001E-4,-4.98695225339238E-5,[14,1543]]],q:[[0,-.0517028337448404,[],1.35147039182862E-4,-1.33061378669859E-4,[14,1402],5.58152705651425E-5,1.63047844135352E-4,[14,1543]]]})})(vsop2010);

/* crc: B3765D445675C86D5C25C722C446F3C7 */
