/* autogenerated by webmerge (compile context) */
;
var top2013={};
(function(v){(function(u){function w(c,d,e,b,l,p,a){a=a||0;e=e||0;b=b||[];c(d,e,b,l,p,a);d.givesMeanMotion&&(c=b[a+0]*d.givesMeanMotion,b[a+0]=Math.cbrt(d.GM/c/c));if(toVSOP=d.toVSOP)d=new Orbit({a:b[a+0],L:b[a+1],k:b[a+2],h:b[a+3],q:b[a+4],p:b[a+5],GM:d.GM,epoch:e}),d=d.state(e),"function"==typeof toVSOP&&(q=q||new THREE.Matrix3,toVSOP(e,q),toVSOP=q),d.r.applyMatrix3(toVSOP),d.v.applyMatrix3(toVSOP),d=new Orbit(d),b[a++]=d._a,b[a++]=d.L(),b[a++]=d.k(),b[a++]=d.h(),b[a++]=d.q(),b[a++]=d.p();return b}
function r(c,d,e,b,l,p,a){a=a||0;e=e||0;b=b||[];w(c,d,e,b,l,p,a);return{a:b[a++],L:b[a++],k:b[a++],h:b[a++],q:b[a++],p:b[a++],GM:d.GM,epoch:e}}function n(c,d,e,b,l,p,a){a=a||0;e=e||0;b=b||[];w(c,d,e,b,l,p,a);c=(new Orbit({a:b[a+0],L:b[a+1],k:b[a+2],h:b[a+3],q:b[a+4],p:b[a+5],GM:d.GM,epoch:e})).state(e);b[a++]=c.r.x;b[a++]=c.r.y;b[a++]=c.r.z;b[a++]=c.v.x;b[a++]=c.v.y;b[a++]=c.v.z;return b}var q;u.VSOP=u.VSOP||function(c,d,e,b,l,p){var a={raw:function(g,f,m,k,h){return c(a,g,f,m,k,h)},vsop:function(g,
f,m,k,h){return w(c,a,g,f,m,k,h)},state:function(g,f,m,k,h){return n(c,a,g,f,m,k,h)},position:function(g,f,m,k,h){h=h||0;g=g||0;f=f||[];n(c,a,g,f,m,k,h);return{x:f[h++],y:f[h++],z:f[h++],vx:f[h++],vy:f[h++],vz:f[h++],GM:a.GM,epoch:g}},orbital:function(g,f,m,k,h){return r(c,a,g,f,m,k,h)},orbit:function(g,f,m,k,h){return new Orbit(r(c,a,g,f,m,k,h))}};a.givesMeanMotion=p;a.toVSOP=l;a.coeffs=b;a.GM=e;a.name=d;return a}})(this);(function(u){function w(n,q,c,d,e,b){b=b||0;q=q||0;c=c||[];for(var l=q/1E3,
p=n.dmu,a=n.freq,g=r[0]=1;12>=g;g+=1)r[g]=r[g-1]*l;for(l=0;6>l;l+=1){c[b+l]=0;g=n.coeffs[l];for(var f=0;f<g.length;f+=1)for(var m=g[f],k=0;k<m.length;k+=4){var h=m[k+0]*p*r[1];if(1!=l||1!=f||0!=m[k+0])c[b+l]+=r[f]*(m[k+1]*Math.cos(h)+m[k+2]*Math.sin(h))}}p=c[b+1]+a[n.ipla-4]*r[1];p%=2*Math.PI;0>p&&(p+=2*Math.PI);c[b+1]=p;b+=6;d&&(c[b++]=n.GM);e&&(c[b++]=q);return c}var r=[];u.TOP2K=u.TOP2K||function(n,q,c,d,e){n=u.VSOP(w,n,q,c);n.dmu=(e[0]-e[1])/880;n.ipla=d;n.freq=e;return n}})(this);var t=[529.6909622785881,
213.2990811942489,74.78166163181234,38.13297236217556,25.33566020437];v.jup=TOP2K("jup",39.5146186826235,[[[0,5.20260320251589,0,0,1760,5.86644030389622E-4,3.64808880646653E-4,9.929435,287,-1.05511264989389E-4,-3.05044123711001E-4,60.891309],[],[],[],[],[],[],[],[],[],[],[],[]],[[0,.599544651972042,0,0,19,7.25433845217195E-4,-.00569011364035878,919.779253,287,-5.99442495631391E-4,1.70403895455559E-4,60.891309],[0,529.690962278588,0,0],[],[],[],[],[],[],[],[],[],[],[]],[[0,.0469858463615553,0,0,287,
2.71589555326587E-4,5.93820770691107E-4,60.891309,19,-1.70936289243544E-4,-3.39539891504608E-4,919.779253],[],[],[],[],[],[],[],[],[],[],[],[]],[[0,.0120037085333047,0,0,287,5.92321525822066E-4,-2.49925754750718E-4,60.891309,19,3.36250979092495E-4,-1.70410782760147E-4,919.779253],[],[],[],[],[],[],[],[],[],[],[],[]],[[0,-.0020656227444973,0,0,19,-4.34667341209352E-6,-7.38541333265967E-6,919.779253,306,-2.19852037896506E-6,-1.88973161699471E-7,57.110476],[],[],[],[],[],[],[],[],[],[],[],[]],[[0,.0111838645264996,
0,0,19,7.73344928224678E-6,-3.5689920029361E-6,919.779253,306,4.99162758782671E-7,-2.12950498605238E-6,57.110476],[],[],[],[],[],[],[],[],[],[],[],[]]],4,t);t=[529.6909622785881,213.2990811942489,74.78166163181234,38.13297236217556,25.33566020437];v.sat=TOP2K("sat",39.4882123322459,[[[0,9.55491043002684,0,0,880,.0323849548938038,.0090833511534089,19.85887,287,.00316316768111793,.00160030814087327,60.891309],[],[],[],[],[],[],[],[],[],[],[],[]],[[0,.874020950037982,0,0,19,-.00178566652495098,.0140036173759203,
919.779253,880,-7.15348378312963E-4,.00249743034543058,19.85887],[0,213.299081194249,0,0],[],[],[],[],[],[],[],[],[],[],[]],[[0,-.00295989865304265,0,0,1473,.00163239878614339,-.00110761848261287,11.864091,19,6.77965346409429E-4,.00139752681864814,919.779253],[],[],[],[],[],[],[],[],[],[],[],[]],[[0,.055429660844523,0,0,1473,.00111642352375446,.0016217640108255,11.864091,19,-.00138972523800651,6.76321547467004E-4,919.779253],[],[],[],[],[],[],[],[],[],[],[],[]],[[0,-.00871745581224837,0,0,19,1.0238535767657E-5,
1.78537700282835E-5,919.779253,880,6.74575140222428E-6,-2.75216351837503E-6,19.85887],[],[],[],[],[],[],[],[],[],[],[],[]],[[0,.0198914361655962,0,0,19,-1.84434292053419E-5,9.2450764886182E-6,919.779253,880,-6.44353156346286E-6,-5.45630659259749E-6,19.85887],[],[],[],[],[],[],[],[],[],[],[],[]]],5,t);t=[529.6909622785881,213.2990811942489,74.78166163181234,38.13297236217556,25.33566020437];v.ura=TOP2K("ura",39.4786500913706,[[[0,19.2184382726331,0,0,1265,.0135321421305627,-.0791569056236065,13.814866,
385,-.00217931380622157,-.0205722009175391,45.391703],[],[],[],[],[],[],[],[],[],[],[],[]],[[0,5.48122186942516,0,0,4,-.0132351614204233,.00698666639215793,4368.95145,1265,.00336169071114254,5.74788221698429E-4,13.814866],[0,74.7816616318123,0,0],[],[],[],[],[],[],[],[],[],[],[]],[[0,-.0459531056795268,0,0,1473,.0022664379788647,-.00154924834459392,11.864091,4,-8.66266631080079E-4,-.00189715676691731,4368.95145],[],[],[],[],[],[],[],[],[],[],[],[]],[[0,.00564841580952597,0,0,1473,.00154958122781575,
.00226794744239325,11.864091,4,.00190511516720455,-8.68008260060557E-4,4368.95145],[],[],[],[],[],[],[],[],[],[],[],[]],[[0,.00185924040912689,0,0,31,-4.82952528691316E-6,4.55879145453608E-6,563.735671,1265,4.11032214173787E-6,4.85672029953796E-6,13.814866],[],[],[],[],[],[],[],[],[]],[[0,.0064860176683173,0,0,31,-4.75178396329155E-6,-4.51675474651478E-6,563.735671,1265,4.83286024566077E-6,-4.14867855480451E-6,13.814866],[],[],[],[],[],[],[],[],[]]],6,t);t=[529.6909622785881,213.2990811942489,74.78166163181234,
38.13297236217556,25.33566020437];v.nep=TOP2K("nep",39.4789600424755,[[[0,30.1104158723525,0,0,1367,-3.67856780689795E-5,-.148182830545496,12.784057,487,-.00976035585958072,-.0346297908194847,35.884611],[1367,-.010662161045025,1.35390129109234E-5,12.784057],[],[],[],[],[],[],[],[],[],[],[]],[[0,5.31189904234912,0,0,4,.00898557276140093,-.00474751063165365,4368.95145,1367,.00441713228885103,-8.57776151108783E-7,12.784057],[0,38.1329723621756,0,0],[],[],[],[],[],[],[],[],[],[],[]],[[0,.00599886117351009,
0,0,1473,.00283781749466851,-.00194100749671137,11.864091,106,7.68674093478471E-4,.00112470824456332,164.866092],[],[],[],[],[],[],[],[],[],[],[],[]],[[0,.00669170746895091,0,0,1473,.00194150131622781,.00284019844334074,11.864091,106,-.0011251399251376,7.68858238136258E-4,164.866092],[],[],[],[],[],[],[],[],[],[],[],[]],[[0,-.0102914755515945,0,0,1367,-4.13172612520542E-7,-1.00922706146012E-5,12.784057,1579,8.26647428111936E-6,2.84144206947083E-6,11.067641],[],[],[],[],[],[],[],[],[],[]],[[0,.0115167670357546,
0,0,1367,-1.00851627243517E-5,4.10806174707248E-7,12.784057,1579,-2.83923603668692E-6,8.26699750663497E-6,11.067641],[],[],[],[],[],[],[],[],[],[]]],7,t);t=[529.6909622785881,213.2990811942489,74.78166163181234,38.13297236217556,25.33566020437];v.plu=TOP2K("plu",39.4769267244114,[[[0,39.54461714403,0,0,1402,-.188913735334341,-.0852581976354701,12.464911,1331,-.0414958778338123,-.0333874152748863,13.129832,522,-.0485024749192498,-.00734554122725473,33.478555,71,.0281021329189482,-.00534684376601521,
246.13811,1261,-.0091600251304609,-.0123092045544314,13.858688,452,-.012202161344832,-.00525198563299829,38.663287],[1402,-.024541007710854,.0538225296756512,12.464911,0,.03789,0,0,1331,-.0159817339293649,.0196235717652556,13.129832,522,-.0021667846285401,.0138515233201363,33.478555],[],[],[],[],[],[],[],[],[],[],[]],[[0,4.165471124826,0,0,1402,.00206105169349723,-.00456721639374337,12.464911,4,.00349013706591797,.00222149312802085,4368.95145],[0,25.33566020437,0,0],[0,-.0182722188391639,0,0],[],
[],[],[],[],[],[],[],[],[]],[[0,-.1787389594035,0,0,1473,.0031629832749993,-.00209858702949421,11.864091,71,-6.81803576638604E-4,.00111135191639409,246.13811],[],[],[],[],[],[],[],[],[],[],[],[]],[[0,-.1734047186423,0,0,1473,.00212348131150762,.0030130058621335,11.864091,71,-.00105054992003594,-7.08496491526814E-4,246.13811],[],[],[],[],[],[],[],[],[],[],[],[]],[[0,-.05170230782278,0,0,1402,-1.32967871573853E-4,1.35237840998234E-4,12.464911,1543,1.63008996403526E-4,5.59277554218394E-5,11.325862],
[],[],[],[],[],[],[],[],[],[],[],[]],[[0,.1397799251564,0,0,1402,1.28832005723724E-4,1.34711564336948E-4,12.464911,1543,-4.99793100988791E-5,1.61808960422928E-4,11.325862],[],[],[],[],[],[],[],[],[],[],[],[]]],8,t)})(top2013);

/* crc: C317F683CEE8AAF3FBB2887510E955C8 */
