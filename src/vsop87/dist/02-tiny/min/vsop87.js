/* autogenerated by webmerge (compile context) */
;
var vsop87={};
(function(p){function u(c,d,e,b,q,h,a){a=a||0;e=e||0;b=b||[];c(d,e,b,q,h,a);d.givesMeanMotion&&(c=b[a+0]*d.givesMeanMotion,b[a+0]=Math.cbrt(d.GM/c/c));if(toVSOP=d.toVSOP)d=new Orbit({a:b[a+0],L:b[a+1],k:b[a+2],h:b[a+3],q:b[a+4],p:b[a+5],GM:d.GM,epoch:e}),d=d.state(e),"function"==typeof toVSOP&&(n=n||new THREE.Matrix3,toVSOP(e,n),toVSOP=n),d.r.applyMatrix3(toVSOP),d.v.applyMatrix3(toVSOP),d=new Orbit(d),b[a++]=d._a,b[a++]=d.L(),b[a++]=d.k(),b[a++]=d.h(),b[a++]=d.q(),b[a++]=d.p();return b}function r(c,
d,e,b,q,h,a){a=a||0;e=e||0;b=b||[];u(c,d,e,b,q,h,a);return{a:b[a++],L:b[a++],k:b[a++],h:b[a++],q:b[a++],p:b[a++],GM:d.GM,epoch:e}}function t(c,d,e,b,q,h,a){a=a||0;e=e||0;b=b||[];u(c,d,e,b,q,h,a);c=(new Orbit({a:b[a+0],L:b[a+1],k:b[a+2],h:b[a+3],q:b[a+4],p:b[a+5],GM:d.GM,epoch:e})).state(e);b[a++]=c.r.x;b[a++]=c.r.y;b[a++]=c.r.z;b[a++]=c.v.x;b[a++]=c.v.y;b[a++]=c.v.z;return b}var n;p.VSOP=function(c,d,e,b,q,h){var a={raw:function(k,f,m,l,g){return c(a,k,f,m,l,g)},vsop:function(k,f,m,l,g){return u(c,
a,k,f,m,l,g)},state:function(k,f,m,l,g){return t(c,a,k,f,m,l,g)},position:function(k,f,m,l,g){g=g||0;k=k||0;f=f||[];t(c,a,k,f,m,l,g);return{x:f[g++],y:f[g++],z:f[g++],vx:f[g++],vy:f[g++],vz:f[g++],GM:a.GM,epoch:k}},orbital:function(k,f,m,l,g){return r(c,a,k,f,m,l,g)},orbit:function(k,f,m,l,g){return new Orbit(r(c,a,k,f,m,l,g))}};a.givesMeanMotion=h;a.toVSOP=q;a.coeffs=b;a.GM=e;a.name=d;return a}})(this);
(function(p){function u(r,t,n,c,d,e){t=t||0;r=r.coeffs;n=t/1E3;c={};var b=[0,1,n,n*n];b[4]=b[3]*n;b[5]=b[4]*n;b[6]=b[5]*n;var q="a"in r,h;for(h in r){c[h]=0;q||(c["v"+h]=0);for(var a=0;a<r[h].length;a+=1){for(var k=0,f=0,m=r[h][a],l=0,g=m.length;l<g;l+=3){var v=m[l+0],w=m[l+2];d=m[l+1]+w*n;e=Math.cos(d);k+=v*e*b[a+1];q||(f+=b[a]*a*v*e-b[a+1]*v*w*Math.sin(d))}c[h]+=k;q||(c["v"+h]+=f/365250)}}"L"in c&&(c.L%=2*Math.PI,0>c.L&&(c.L+=2*Math.PI));"l"in c&&(c.l%=2*Math.PI,0>c.l&&(c.l+=2*Math.PI));"b"in c&&
(c.n%=2*Math.PI,0>c.n&&(c.n+=2*Math.PI));c.epoch=t;return c}p.VSOP87=function(r,t,n){return p.VSOP(u,r,t,n)}})(this);
(function(p){p.mer=VSOP87("mer",39.4769329861321,{a:[[.38709830982,0,0]],L:[[4.4026088424,0,0],[26087.9031415742,0,0]],k:[[.0446605976,0,0]],h:[[.20072331368,0,0]],q:[[.04061563384,0,0]],p:[[.04563550461,0,0]]});p.ven=VSOP87("ven",39.4770230655563,{a:[[.72332981996,0,0]],L:[[3.17614669689,0,0],[10213.285546211,0,0]],k:[[.00449282133,3.14159265359,0]],h:[[.00506684726,0,0]],q:[[.00682410142,0,0]],p:[[.02882285775,0,0]]});p.emb=VSOP87("emb",39.477046459361,{a:[[1.00000101778,0,0]],L:[[1.75347045953,
0,0],[6283.0758499914,0,0]],k:[[.0037408165,3.14159265359,0]],h:[[.01628447663,0,0]],q:[[4.699E-7,1.03836320801,775.522611324]],p:[[4.8408E-7,5.76054381234,775.522611324]]});p.mar=VSOP87("mar",39.4769391722243,{a:[[1.52367934191,0,0]],L:[[6.20347611291,0,0],[3340.61242669981,0,0]],k:[[.08536560252,0,0]],h:[[.03789973236,3.14159265359,0]],q:[[.01047042574,0,0]],p:[[.01228449307,0,0]]});p.jup=VSOP87("jup",39.5146186826235,{a:[[5.20260319132,0,0]],L:[[.59954649739,0,0],[529.6909650946,0,0]],k:[[.04698572124,
0,0]],h:[[.01200385748,0,0]],q:[[.00206561098,3.14159265359,0]],p:[[.01118377157,0,0]]});p.sat=VSOP87("sat",39.4882123322459,{a:[[9.55490959574,0,0,.03363448736,6.0097367346,316.3918696566]],L:[[.8740167565,0,0,.01411655077,4.58553469006,7.1135470008],[213.299095438,0,0]],k:[[.00296003595,3.14159265359,0]],h:[[.05542964254,0,0]],q:[[.00871747436,3.14159265359,0]],p:[[.01989147301,0,0]]});p.ura=VSOP87("ura",39.4789600424755,{a:[[19.21844606178,0,0,.0803047624,1.40140954803,454.9093665273,.02068375131,
1.67626096637,138.5174968707]],L:[[5.48129387159,0,0,.01503941337,3.62721239702,1.4844727083],[74.7815985673,0,0]],k:[[.04595132376,3.14159265359,0]],h:[[.00563791307,0,0]],q:[[.00185915075,0,0]],p:[[.00648617008,0,0]]});p.nep=VSOP87("nep",39.4786500913706,{a:[[30.11038686942,0,0,.14818172119,1.57105922541,491.5579294568,.03597274341,1.84552690821,175.1660598002]],L:[[5.31188628676,0,0,.01017628072,.48586478491,1.4844727083],[38.1330356378,0,0]],k:[[.00599977571,0,0]],h:[[.00669242413,0,0]],q:[[.01029147819,
3.14159265359,0]],p:[[.01151683985,0,0]]})})(vsop87);

/* crc: D55CCA54B0463E05D26220111A0B5BBE */
