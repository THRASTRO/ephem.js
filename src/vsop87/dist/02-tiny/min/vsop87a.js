/* autogenerated by webmerge (minify context) */
;
var vsop87a={};(function(exports){var mat3;function vsop(solver,theory,jy2k,elems,addGM,addEpoch,off)
{off=off||0;jy2k=jy2k||0;elems=elems||[];solver(theory,jy2k,elems,addGM,addEpoch,off);if(theory.givesMeanMotion){var fact=elems[off+0]*theory.givesMeanMotion;elems[off+0]=Math.cbrt(theory.GM/fact/fact);}
if(toVSOP=theory.toVSOP){var orbit=new Orbit({a:elems[off+0],L:elems[off+1],k:elems[off+2],h:elems[off+3],q:elems[off+4],p:elems[off+5],GM:theory.GM,epoch:jy2k});var state=orbit.state(jy2k);if(typeof toVSOP=="function"){mat3=mat3||new THREE.Matrix3();toVSOP(jy2k,mat3);toVSOP=mat3;}
state.r.applyMatrix3(toVSOP);state.v.applyMatrix3(toVSOP);orbit=new Orbit(state);elems[off++]=orbit._a;elems[off++]=orbit.L();elems[off++]=orbit.k();elems[off++]=orbit.h();elems[off++]=orbit.q();elems[off++]=orbit.p();}
return elems;}
function orbital(solver,theory,jy2k,elems,addGM,addEpoch,off)
{off=off||0;jy2k=jy2k||0;elems=elems||[];vsop(solver,theory,jy2k,elems,addGM,addEpoch,off);return{a:elems[off++],L:elems[off++],k:elems[off++],h:elems[off++],q:elems[off++],p:elems[off++],GM:theory.GM,epoch:jy2k};}
function state(solver,theory,jy2k,elems,addGM,addEpoch,off)
{off=off||0;jy2k=jy2k||0;elems=elems||[];vsop(solver,theory,jy2k,elems,addGM,addEpoch,off);var orbit=new Orbit({a:elems[off+0],L:elems[off+1],k:elems[off+2],h:elems[off+3],q:elems[off+4],p:elems[off+5],GM:theory.GM,epoch:jy2k});var state=orbit.state(jy2k);elems[off++]=state.r.x;elems[off++]=state.r.y;elems[off++]=state.r.z;elems[off++]=state.v.x;elems[off++]=state.v.y;elems[off++]=state.v.z;return elems;}
function position(solver,theory,jy2k,elems,addGM,addEpoch,off)
{off=off||0;jy2k=jy2k||0;elems=elems||[];state(solver,theory,jy2k,elems,addGM,addEpoch,off);return{x:elems[off++],y:elems[off++],z:elems[off++],vx:elems[off++],vy:elems[off++],vz:elems[off++],GM:theory.GM,epoch:jy2k};}
exports.VSOP=exports.VSOP||function VSOP(solver,name,GM,coeffs,toVSOP,givesMeanMotion)
{var theory={};theory.raw=function vsop_raw(jy2k,elems,addGM,addEpoch,off){return solver(theory,jy2k,elems,addGM,addEpoch,off);}
theory.vsop=function vsop_theory(jy2k,elems,addGM,addEpoch,off){return vsop(solver,theory,jy2k,elems,addGM,addEpoch,off);}
theory.state=function vsop_state(jy2k,elems,addGM,addEpoch,off){return state(solver,theory,jy2k,elems,addGM,addEpoch,off);}
theory.position=function vsop_position(jy2k,elems,addGM,addEpoch,off){return position(solver,theory,jy2k,elems,addGM,addEpoch,off);}
theory.orbital=function vsop_orbital(jy2k,elems,addGM,addEpoch,off){return orbital(solver,theory,jy2k,elems,addGM,addEpoch,off);}
theory.orbit=function vsop_orbit(jy2k,elems,addGM,addEpoch,off){return new Orbit(orbital(solver,theory,jy2k,elems,addGM,addEpoch,off));}
theory.givesMeanMotion=givesMeanMotion;theory.toVSOP=toVSOP;theory.coeffs=coeffs;theory.GM=GM;theory.name=name;return theory;}
})(this);;(function(exports){function vsop87_theory(theory,jy2k,elems,addGM,addEpoch,off)
{off=off||0;jy2k=jy2k||0;elems=elems||[];var coeffs=theory.coeffs;var t=jy2k/1000,orb={},u,cu,tt=[0,1,t,t*t];tt[4]=tt[3]*t,tt[5]=tt[4]*t,tt[6]=tt[5]*t;var main='a'in coeffs;for(var v in coeffs){orb[v]=0;if(!main)orb['v'+v]=0;for(var it=0;it<coeffs[v].length;it+=1){var pow_sum=0,dpow_sum=0,coeff=coeffs[v][it];for(var i=0,cl=coeff.length;i<cl;i+=3){var a=coeff[i+0],b=coeff[i+1],c=coeff[i+2];u=b+c*t,cu=Math.cos(u);pow_sum+=a*cu*tt[it+1];if(!main)dpow_sum+=tt[it]*it*a*cu-tt[it+1]*a*c*Math.sin(u);}
orb[v]+=pow_sum;;if(!main)orb['v'+v]+=dpow_sum/365250;}}
if('L'in orb){orb.L=orb.L%(Math.PI*2);if(orb.L<0)orb.L+=(Math.PI*2);}
if('l'in orb){orb.l=orb.l%(Math.PI*2);if(orb.l<0)orb.l+=(Math.PI*2);}
if('b'in orb){orb.n=orb.n%(Math.PI*2);if(orb.n<0)orb.n+=(Math.PI*2);}
orb.epoch=jy2k;return orb;}
exports.VSOP87=exports.VSOP87||function(name,GM,coeffs)
{return exports.VSOP(vsop87_theory,name,GM,coeffs);}
})(this);;(function(vsop87a){;vsop87a.mer=VSOP87('mer',39.4769329861321,{x:[[0.37546291728,4.39651506942,26087.9031415742,0.03825746672,1.16485604339,52175.8062831484,0.02625615963,3.14159265359,0]],y:[[0.37953642888,2.8378061782,26087.9031415742,0.11626131831,3.14159265359,0,0.03854668215,5.88780608966,52175.8062831484]],z:[[0.04607665326,1.99295081967,26087.9031415742]]});;vsop87a.ven=VSOP87('ven',39.4770230655563,{x:[[0.72211281391,3.17575836361,10213.285546211]],y:[[0.72324820731,1.60573808356,10213.285546211]],z:[[0.04282990302,0.26703856476,10213.285546211]]});;vsop87a.ear=VSOP87('ear',39.477046459361,{x:[[0.99982928844,1.75348568475,6283.0758499914]],y:[[0.9998921103,0.18265890456,6283.0758499914,0.02442699036,3.14159265359,0]],z:[[2.7962e-006,3.19870156017,84334.6615813083]]});;vsop87a.emb=VSOP87('emb',39.477046459361,{x:[[0.9998292746,1.75348568475,6283.0758499914]],y:[[0.99989209645,0.18265890456,6283.0758499914,0.02442698841,3.14159265359,0]],z:[[1.01625e-006,5.42248110597,5507.5532386674]]});;vsop87a.mar=VSOP87('mar',39.4769391722243,{x:[[1.51769936383,6.20403346548,3340.6124266998,0.19502945246,3.14159265359,0,0.07070919655,0.25870338558,6681.2248533996]],y:[[1.51558976277,4.63212206588,3340.6124266998,0.07064550239,4.97051892902,6681.2248533996,0.08655481102,0,0],[0.0142732421,3.14159265359,0]],z:[[0.0490120722,3.76712324286,3340.6124266998]]});;vsop87a.jup=VSOP87('jup',39.5146186826235,{x:[[5.19663470114,0.59945082355,529.6909650946,0.3666264232,3.14159265359,0,0.12593937922,0.94911583701,1059.3819301892,0.01500672056,0.7317513461,522.5774180938,0.01476224578,3.61736921122,536.8045120954]],y:[[5.19520046589,5.31203162731,529.6909650946,0.12592862602,5.66160227728,1059.3819301892,0.09363670616,3.14159265359,0,0.01508275299,5.43934968102,522.5774180938,0.0147580937,2.04679566495,536.8045120954],[0.01694798253,3.14159265359,0]],z:[[0.11823100489,3.55844646343,529.6909650946]]});;vsop87a.sat=VSOP87('sat',39.4882123322459,{x:[[9.51638335797,0.87441380794,213.299095438,0.26412374238,0.1239089262,426.598190876,0.06760430339,4.16767145778,206.1855484372,0.06624260115,0.7509473778,220.4126424388,0.04244797817,0,0,0.02336340488,2.02227784673,7.1135470008,0.01255372247,2.17338917731,110.2063212194,0.01115684467,3.15686878377,419.4846438752,0.01097683232,5.65753337256,639.897286314],[0.07575103962,0,0,0.03085041716,4.27565749128,426.598190876,0.02714918399,5.85229412397,206.1855484372,0.02643100909,5.33291950584,220.4126424388]],y:[[9.52986882699,5.58600556665,213.299095438,0.79387988806,3.14159265359,0,0.26441781302,4.83528061849,426.598190876,0.06916653915,2.55279408706,206.1855484372,0.06633570703,5.46258848288,220.4126424388,0.02345609742,0.44652132519,7.1135470008,0.01183874652,1.34638298371,419.4846438752,0.01245790434,0.60367177975,110.2063212194,0.01098751131,4.08608782813,639.897286314],[0.05373889135,0,0,0.03090575152,2.70346890906,426.598190876,0.02741594312,4.26667636015,206.1855484372,0.02647489677,3.76132298889,220.4126424388]],z:[[0.4135695094,3.60234142982,213.299095438,0.01148283576,2.85128367469,426.598190876,0.01214249867,0,0],[0.01906503283,4.94544746116,213.299095438]]});;vsop87a.ura=VSOP87('ura',39.4789600424755,{x:[[19.17370730359,5.48133416489,74.7815985673,1.32272523872,0,0,0.44402496796,1.65967519586,149.5631971346,0.14668209481,3.42395862804,73.297125859,0.14130269479,4.39572927934,76.2660712756,0.06201106178,5.14043574125,1.4844727083,0.01542951343,4.12121838072,224.3447957019,0.0144421666,2.65117115201,148.0787244263]],y:[[19.16518231584,3.91045677002,74.7815985673,0.44390465203,0.08884111329,149.5631971346,0.16256125476,3.14159265359,0,0.14755940186,1.85423280679,73.297125859,0.14123958128,2.82486076549,76.2660712756,0.06250078231,3.56960243857,1.4844727083,0.01542668264,2.55040539213,224.3447957019,0.01442356575,1.08004542712,148.0787244263],[0.02157896385,0,0]],z:[[0.25878127698,2.61861272578,74.7815985673,0.01774318778,3.14159265359,0]]});;vsop87a.nep=VSOP87('nep',39.4786500913706,{x:[[30.05890004476,5.31211340029,38.1330356378,0.27080164222,3.14159265359,0,0.13505661755,3.50078975634,76.2660712756,0.15726094556,0.11319072675,36.6485629295,0.14935120126,1.08499403018,39.6175083461,0.02597313814,1.99590301412,1.4844727083,0.01074040708,5.38502938672,74.7815985673]],y:[[30.06056351665,3.74086294714,38.1330356378,0.30205857683,3.14159265359,0,0.13506391797,1.92953034883,76.2660712756,0.15706589373,4.82539970129,36.6485629295,0.14936165806,5.79694900665,39.6175083461,0.02584250749,0.42549700754,1.4844727083,0.01073739772,3.81371728533,74.7815985673]],z:[[0.92866054405,1.44103930278,38.1330356378,0.01245978462,0,0]]});;})(vsop87a)
/* crc: 677595C67BE0632122190BC3A01A641C */
