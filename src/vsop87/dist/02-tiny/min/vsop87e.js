/* autogenerated by webmerge (compile context) */
;
var vsop87e={};
(function(p){function u(c,d,e,b,q,h,a){a=a||0;e=e||0;b=b||[];c(d,e,b,q,h,a);d.givesMeanMotion&&(c=b[a+0]*d.givesMeanMotion,b[a+0]=Math.cbrt(d.GM/c/c));if(toVSOP=d.toVSOP)d=new Orbit({a:b[a+0],L:b[a+1],k:b[a+2],h:b[a+3],q:b[a+4],p:b[a+5],GM:d.GM,epoch:e}),d=d.state(e),"function"==typeof toVSOP&&(n=n||new THREE.Matrix3,toVSOP(e,n),toVSOP=n),d.r.applyMatrix3(toVSOP),d.v.applyMatrix3(toVSOP),d=new Orbit(d),b[a++]=d._a,b[a++]=d.L(),b[a++]=d.k(),b[a++]=d.h(),b[a++]=d.q(),b[a++]=d.p();return b}function r(c,
d,e,b,q,h,a){a=a||0;e=e||0;b=b||[];u(c,d,e,b,q,h,a);return{a:b[a++],L:b[a++],k:b[a++],h:b[a++],q:b[a++],p:b[a++],GM:d.GM,epoch:e}}function t(c,d,e,b,q,h,a){a=a||0;e=e||0;b=b||[];u(c,d,e,b,q,h,a);c=(new Orbit({a:b[a+0],L:b[a+1],k:b[a+2],h:b[a+3],q:b[a+4],p:b[a+5],GM:d.GM,epoch:e})).state(e);b[a++]=c.r.x;b[a++]=c.r.y;b[a++]=c.r.z;b[a++]=c.v.x;b[a++]=c.v.y;b[a++]=c.v.z;return b}var n;p.VSOP=function(c,d,e,b,q,h){var a={raw:function(k,f,m,l,g){return c(a,k,f,m,l,g)},vsop:function(k,f,m,l,g){return u(c,
a,k,f,m,l,g)},state:function(k,f,m,l,g){return t(c,a,k,f,m,l,g)},position:function(k,f,m,l,g){g=g||0;k=k||0;f=f||[];t(c,a,k,f,m,l,g);return{x:f[g++],y:f[g++],z:f[g++],vx:f[g++],vy:f[g++],vz:f[g++],GM:a.GM,epoch:k}},orbital:function(k,f,m,l,g){return r(c,a,k,f,m,l,g)},orbit:function(k,f,m,l,g){return new Orbit(r(c,a,k,f,m,l,g))}};a.givesMeanMotion=h;a.toVSOP=q;a.coeffs=b;a.GM=e;a.name=d;return a}})(this);
(function(p){function u(r,t,n,c,d,e){t=t||0;r=r.coeffs;n=t/1E3;c={};var b=[0,1,n,n*n];b[4]=b[3]*n;b[5]=b[4]*n;b[6]=b[5]*n;var q="a"in r,h;for(h in r){c[h]=0;q||(c["v"+h]=0);for(var a=0;a<r[h].length;a+=1){for(var k=0,f=0,m=r[h][a],l=0,g=m.length;l<g;l+=3){var v=m[l+0],w=m[l+2];d=m[l+1]+w*n;e=Math.cos(d);k+=v*e*b[a+1];q||(f+=b[a]*a*v*e-b[a+1]*v*w*Math.sin(d))}c[h]+=k;q||(c["v"+h]+=f/365250)}}"L"in c&&(c.L%=2*Math.PI,0>c.L&&(c.L+=2*Math.PI));"l"in c&&(c.l%=2*Math.PI,0>c.l&&(c.l+=2*Math.PI));"b"in c&&
(c.n%=2*Math.PI,0>c.n&&(c.n+=2*Math.PI));c.epoch=t;return c}p.VSOP87=function(r,t,n){return p.VSOP(u,r,t,n)}})(this);
(function(p){p.sun=VSOP87("sun",39.4769264324223,{x:[[.00495672739,3.74107356792,529.6909650946]],y:[[.00495536218,2.17046712634,529.6909650946]],z:[[1.1810648E-4,.46078690233,213.299095438]]});p.mer=VSOP87("mer",39.4769329861321,{x:[[.37546285495,4.39651506942,26087.9031415742,.03825746037,1.16485604343,52175.8062831484,.02596241714,3.14159265359,0]],y:[[.37953636588,2.83780617821,26087.9031415742,.11592262295,3.14159265359,0,.03854667576,5.88780608961,52175.8062831484]],z:[[.04607664562,1.99295081967,
26087.9031415742]]});p.ven=VSOP87("ven",39.4770230655563,{x:[[.72211104628,3.17575836361,10213.285546211]],y:[[.72324643689,1.60573808356,10213.285546211]],z:[[.04282979819,.26703856471,10213.285546211]]});p.ear=VSOP87("ear",39.477046459361,{x:[[.99982624851,1.75348568475,6283.0758499914]],y:[[.99988907017,.18265890456,6283.0758499914,.02408829501,3.14159265359,0]],z:[[1.1810174E-4,.46078312048,213.299095438]]});p.mar=VSOP87("mar",39.4769391722243,{x:[[1.51769887405,6.20403346548,3340.6124266998,
.19473570996,3.14159265359,0,.07070917372,.25870338552,6681.2248533996]],y:[[1.51558927367,4.63212206588,3340.6124266998,.07064547959,4.97051892898,6681.2248533996,.08689350637,0,0],[.01427318093,3.14159265359,0]],z:[[.04901205639,3.76712324293,3340.6124266998]]});p.jup=VSOP87("jup",39.5146186826235,{x:[[5.19167797375,.59945079482,529.6909650946,.3663326807,3.14159265359,0,.12581924842,.94911581432,1059.3819301892,.01499237862,.73175554601,522.5774180938,.01474818211,3.61736901402,536.8045120954]],
y:[[5.19024510371,5.31203160043,529.6909650946,.12580850775,5.66160225641,1059.3819301892,.09329801081,3.14159265359,0,.01506838468,5.43934599781,522.5774180938,.01474403395,2.04679547637,536.8045120954],[.01694792137,3.14159265359,0]],z:[[.11811822789,3.55844641987,529.6909650946]]});p.sat=VSOP87("sat",39.4882123322459,{x:[[9.51366533422,.8744138065,213.299095438,.26404799161,.12391580771,426.598190876,.06758489145,4.16767544586,206.1855484372,.06622371284,.75094738122,220.4126424388,.04274172066,
0,0,.02335961354,2.02227905783,7.1135470008,.01255113414,2.17347170552,110.2063212194,.01115372225,3.15690865182,419.4846438752,.01097374519,5.65753938643,639.897286314],[.07573807889,0,0,.03084144308,4.27565898829,426.598190876,.02714141496,5.85229546861,206.1855484372,.02642347272,5.33291950842,220.4126424388]],y:[[9.52714696877,5.58600556072,213.299095438,.79354119271,3.14159265359,0,.26434197609,4.83528742856,426.598190876,.06914690347,2.55279029588,206.1855484372,.066316792,5.46258849076,220.4126424388,
.02345226948,.44652393276,7.1135470008,.01183557497,1.34637027573,419.4846438752,.012455238,.60375781288,110.2063212194,.01098442011,4.08609387384,639.897286314],[.05373895252,0,0,.03089676414,2.70347020059,426.598190876,.02740812928,4.2666750646,206.1855484372,.02646734779,3.76132299914,220.4126424388]],z:[[.41345140292,3.60234141893,213.299095438,.01147953788,2.85128771957,426.598190876,.01213097211,0,0],[.0190595894,4.94544746619,213.299095438]]});p.ura=VSOP87("ura",39.4789600424755,{x:[[19.17286937362,
5.48133416758,74.7815985673,1.32301898121,0,0,.44400556159,1.65967535182,149.5631971346,.14667584671,3.42395875589,73.297125859,.14129215712,4.39576776954,76.2660712756,.06200970387,5.14043568284,1.4844727083,.01542890129,4.12122840701,224.3447957019,.0144415347,2.65117108186,148.0787244263]],y:[[19.16434475791,3.91045677275,74.7815985673,.44388525091,.08884126943,149.5631971346,.16222255941,3.14159265359,0,.14755311401,1.85423292905,73.297125859,.14122904825,2.82489928705,76.2660712756,.06249939655,
3.56960238469,1.4844727083,.01542607086,2.5504154317,224.3447957019,.01442293466,1.08004535633,148.0787244263],[.02157902502,0,0]],z:[[.25876996652,2.61861278845,74.7815985673,.01775471434,3.14159265359,0]]});p.nep=VSOP87("nep",39.4786500913706,{x:[[30.05734568801,5.3121134003,38.1330356378,.27050789973,3.14159265359,0,.1350457827,3.50075407055,76.2660712756,.15725280871,.11319072402,36.6485629295,.14934353052,1.08499398649,39.6175083461,.02597449604,1.99590330725,1.4844727083]],y:[[30.05900907352,
3.74086294715,38.1330356378,.30171988148,3.14159265359,0,.13505308635,1.92949466968,76.2660712756,.15705776296,4.82539969469,36.6485629295,.14935398681,5.79694896309,39.6175083461,.02584389323,.42549727257,1.4844727083]],z:[[.92861252357,1.44103930199,38.1330356378,.01244825806,0,0]]})})(vsop87e);

/* crc: 5FFF0BE3E2ACB4A2E4BED3F6790FDA9D */
