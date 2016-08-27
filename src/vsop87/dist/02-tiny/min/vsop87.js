/* autogenerated by webmerge (compile context) */
;
(function(){if(typeof window.vsop87!=="function")window.vsop87=function vsop87(coeffs,time){var t=time/1E3,result={},u,cu,tt=[0,1,t,t*t];tt[4]=tt[3]*t,tt[5]=tt[4]*t,tt[6]=tt[5]*t;var main="a"in coeffs;for(var v in coeffs){result[v]=0;if(!main)result["v"+v]=0;for(var it=0,sum=0,dsum=0;it<coeffs[v].length;it+=1){var pow_sum=0,dpow_sum=0,coeff=coeffs[v][it];for(var i=0,cl=coeff.length;i<cl;i+=3){var a=coeff[i+0],b=coeff[i+1],c=coeff[i+2];u=b+c*t,cu=Math.cos(u);pow_sum+=a*cu*tt[it+1];if(!main)dpow_sum+=
tt[it]*it*a*cu-tt[it+1]*a*c*Math.sin(u)}result[v]+=pow_sum;if(!main)result["v"+v]+=dpow_sum/365250}}if("L"in result){result.L=result.L%(Math.PI*2);if(result.L<0)result.L+=Math.PI*2}if("l"in result){result.l=result.l%(Math.PI*2);if(result.l<0)result.l+=Math.PI*2}if("b"in result){result.n=result.n%(Math.PI*2);if(result.n<0)result.n+=Math.PI*2}return result}})();
(function(vsop87){function vsop87_mer(jy){return vsop87(vsop87_mer.coeffs,jy)}vsop87_mer.coeffs={a:[[.38709830982,0,0]],L:[[4.4026088424,0,0],[26087.9031415742,0,0]],k:[[.0446605976,0,0]],h:[[.20072331368,0,0]],q:[[.04061563384,0,0]],p:[[.04563550461,0,0]]};vsop87.mer=vsop87_mer;function vsop87_ven(jy){return vsop87(vsop87_ven.coeffs,jy)}vsop87_ven.coeffs={a:[[.72332981996,0,0]],L:[[3.17614669689,0,0],[10213.285546211,0,0]],k:[[.00449282133,3.14159265359,0]],h:[[.00506684726,0,0]],q:[[.00682410142,
0,0]],p:[[.02882285775,0,0]]};vsop87.ven=vsop87_ven;function vsop87_emb(jy){return vsop87(vsop87_emb.coeffs,jy)}vsop87_emb.coeffs={a:[[1.00000101778,0,0]],L:[[1.75347045953,0,0],[6283.0758499914,0,0]],k:[[.0037408165,3.14159265359,0]],h:[[.01628447663,0,0]],q:[[4.699E-7,1.03836320801,775.522611324]],p:[[4.8408E-7,5.76054381234,775.522611324]]};vsop87.emb=vsop87_emb;function vsop87_mar(jy){return vsop87(vsop87_mar.coeffs,jy)}vsop87_mar.coeffs={a:[[1.52367934191,0,0]],L:[[6.20347611291,0,0],[3340.61242669981,
0,0]],k:[[.08536560252,0,0]],h:[[.03789973236,3.14159265359,0]],q:[[.01047042574,0,0]],p:[[.01228449307,0,0]]};vsop87.mar=vsop87_mar;function vsop87_jup(jy){return vsop87(vsop87_jup.coeffs,jy)}vsop87_jup.coeffs={a:[[5.20260319132,0,0]],L:[[.59954649739,0,0],[529.6909650946,0,0]],k:[[.04698572124,0,0]],h:[[.01200385748,0,0]],q:[[.00206561098,3.14159265359,0]],p:[[.01118377157,0,0]]};vsop87.jup=vsop87_jup;function vsop87_sat(jy){return vsop87(vsop87_sat.coeffs,jy)}vsop87_sat.coeffs={a:[[9.55490959574,
0,0,.03363448736,6.0097367346,316.3918696566]],L:[[.8740167565,0,0,.01411655077,4.58553469006,7.1135470008],[213.299095438,0,0]],k:[[.00296003595,3.14159265359,0]],h:[[.05542964254,0,0]],q:[[.00871747436,3.14159265359,0]],p:[[.01989147301,0,0]]};vsop87.sat=vsop87_sat;function vsop87_ura(jy){return vsop87(vsop87_ura.coeffs,jy)}vsop87_ura.coeffs={a:[[19.21844606178,0,0,.0803047624,1.40140954803,454.9093665273,.02068375131,1.67626096637,138.5174968707]],L:[[5.48129387159,0,0,.01503941337,3.62721239702,
1.4844727083],[74.7815985673,0,0]],k:[[.04595132376,3.14159265359,0]],h:[[.00563791307,0,0]],q:[[.00185915075,0,0]],p:[[.00648617008,0,0]]};vsop87.ura=vsop87_ura;function vsop87_nep(jy){return vsop87(vsop87_nep.coeffs,jy)}vsop87_nep.coeffs={a:[[30.11038686942,0,0,.14818172119,1.57105922541,491.5579294568,.03597274341,1.84552690821,175.1660598002]],L:[[5.31188628676,0,0,.01017628072,.48586478491,1.4844727083],[38.1330356378,0,0]],k:[[.00599977571,0,0]],h:[[.00669242413,0,0]],q:[[.01029147819,3.14159265359,
0]],p:[[.01151683985,0,0]]};vsop87.nep=vsop87_nep})(vsop87);

/* crc: 681C248E153A896662231B0053F0DBC5 */