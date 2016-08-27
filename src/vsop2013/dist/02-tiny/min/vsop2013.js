/* autogenerated by webmerge (compile context) */
;
(function(window){window.vsop2013={};(function(){function vsop2k_time_factors(kj2ky){return[4.402608631669+26087.9031406856*kj2ky,3.176134461576+10213.2855474345*kj2ky,1.753470369433+6283.07585035322*kj2ky,6.203500014141+3340.61243414546*kj2ky,4.09136000305+1731.17045272186*kj2ky,1.713740719173+1704.4508550272*kj2ky,5.598641292287+1428.94891784427*kj2ky,2.805136360408+1364.75651362999*kj2ky,2.32698973462+1361.92320763284*kj2ky,.599546107035+529.690961562325*kj2ky,.874018510107+213.299086108488*kj2ky,
5.481225395663+74.781659030778*kj2ky,5.311897933164+38.132972226125*kj2ky,.359536228504931*kj2ky,5.19846640063+77713.7714481804*kj2ky,1.62790513602+84334.6615717837*kj2ky,2.35555563875+83286.9142477147*kj2ky]}function vsop2k_coeffs_eval(coeffs,kj2ky,F){var rv=0;for(var n=0;n<coeffs.length;n+=1){var sum=0,c=coeffs[n],iL=c.length;for(var i=0;i<iL;i+=3){var S=c[i+0],C=c[i+1],phis=c[i+2];for(var p=0,phi=0;p<phis.length;p+=2)phi+=F[phis[p+0]-1]*phis[p+1];sum+=S*Math.sin(phi)+C*Math.cos(phi)}rv+=sum*Math.pow(kj2ky,
n)}return rv}if(typeof window.vsop2k!=="function")window.vsop2k=function vsop2k(coeffs,j2ky){var kj2ky=j2ky/1E3;var F=vsop2k_time_factors(kj2ky),xa=vsop2k_coeffs_eval(coeffs.a,kj2ky,F),xl=vsop2k_coeffs_eval(coeffs.L,kj2ky,F),xk=vsop2k_coeffs_eval(coeffs.k,kj2ky,F),xh=vsop2k_coeffs_eval(coeffs.h,kj2ky,F),xq=vsop2k_coeffs_eval(coeffs.q,kj2ky,F),xp=vsop2k_coeffs_eval(coeffs.p,kj2ky,F);xl%=Math.PI*2;if(xl<0)xl+=Math.PI*2;return{a:xa,L:xl,k:xk,h:xh,q:xq,p:xp}};if(typeof window.vsop2k.xyz!=="function")window.vsop2k.xyz=
function vsop2k_xyz(coeffs,j2ky){var orb=vsop2k(coeffs,j2ky);var orbit=new Orbit(orb);var state=orbit.state();return{x:state.r.x,y:state.r.y,z:state.r.z,vx:state.v.x,vy:state.v.y,vz:state.v.z}}})();function vsop2013_mer(tj){return vsop2k(vsop2013_mer.coeffs,tj)}function vsop2013_mer_xyz(tj){return vsop2k.xyz(vsop2013_mer.coeffs,tj)}vsop2013_mer.xyz=vsop2013_mer_xyz;vsop2013.mer=vsop2013_mer;vsop2013_mer.coeffs={L:[[0,4.402608631669,[],-2.64201510547113E-5,-2.38270747280894E-5,[1,2,2,-5],3.94031227204977E-6,
1.68698854273669E-5,[1,1,2,-2]],[0,26087.9031406855,[]]],a:[[0,.387098309884,[],7.13402040140914E-7,-1.65207278540128E-7,[1,1,2,-2],-2.43928339505339E-7,2.70920226701764E-7,[1,2,2,-5]]],h:[[0,.200723308731,[],1.46247498744885E-6,-7.07670146252083E-6,[10,2],3.00433394958519E-6,-1.85000579683909E-6,[1,2,2,-5]]],k:[[0,.044660629417,[],7.05228200003398E-6,1.49541239574951E-6,[10,2],-1.71581143672001E-6,-2.90474601259122E-6,[1,2,2,-5]]],p:[[0,.045635493308,[],3.72456558359801E-7,-2.87633393077938E-7,[10,
2],-1.67950164335416E-8,-1.99423696797858E-7,[1,2,2,-5]]],q:[[0,.040615640596,[],2.66404005645022E-7,2.94193091838155E-7,[10,2],-1.11822395889423E-7,-2.39875696291645E-8,[1,2,2,-5]]]};function vsop2013_ven(tj){return vsop2k(vsop2013_ven.coeffs,tj)}function vsop2013_ven_xyz(tj){return vsop2k.xyz(vsop2013_ven.coeffs,tj)}vsop2013_ven.xyz=vsop2013_ven_xyz;vsop2013.ven=vsop2013_ven;vsop2013_ven.coeffs={L:[[0,3.176134461576,[],-8.46240143006899E-6,1.38117115866901E-5,[2,2,4,-7,10,8,11,-6],-2.00389761567184E-5,
-3.91666190285054E-9,[2,2,3,-2]],[0,10213.2855474345,[]]],a:[[0,.723329819945,[],-7.57621007994627E-10,4.32265701301435E-6,[2,2,3,-2],-2.07964337102651E-9,2.93979825880255E-6,[2,2,10,-2]]],h:[[0,.005066851475,[],-2.2306600601243E-5,-3.67117331614278E-8,[2,2,3,-3],1.69019496240294E-5,3.97002296377586E-8,[2,1,3,-2]]],k:[[0,-.004492821048,[],2.55941691370281E-8,2.2474862866452E-5,[2,2,3,-3],-3.29894880831982E-8,-1.70585586765891E-5,[2,1,3,-2]]],p:[[0,.02882281923,[],-1.69237193160802E-7,-6.92583235329188E-7,
[2,3,3,-5],1.67848361967255E-7,-3.36675578181574E-7,[10,2]]],q:[[0,.006824113928,[],-6.68927877125373E-7,1.5424001125855E-7,[2,3,3,-5],3.41175266713452E-7,1.68082501916137E-7,[10,2]]]};function vsop2013_emb(tj){return vsop2k(vsop2013_emb.coeffs,tj)}function vsop2013_emb_xyz(tj){return vsop2k.xyz(vsop2013_emb.coeffs,tj)}vsop2013_emb.xyz=vsop2013_emb_xyz;vsop2013.emb=vsop2013_emb;vsop2013_emb.coeffs={L:[[0,1.753470369433,[],-9.52880232652368E-6,3.22544756191703E-5,[3,4,4,-8,10,3],-2.05639600394634E-5,
-1.71630674001416E-8,[3,2,10,-2]],[0,6283.07585035321,[]]],a:[[0,1.000001017641,[],-7.73623606396365E-9,1.12049565335755E-5,[3,2,10,-2],5.48709811880914E-10,7.60860006258569E-6,[2,1,3,-1]]],h:[[0,.01628448918,[],1.98701374528987E-5,7.52684631316272E-9,[2,2,3,-3],-1.8640576961788E-5,-2.45293668960439E-8,[3,1,10,-2]]],k:[[0,-.003740818074,[],5.39117622023673E-9,-1.98894819107988E-5,[2,2,3,-3],-4.57790064492791E-9,1.85926022136086E-5,[3,1,10,-2]]],p:[[1.14305124894666E-7,4.7021367794192E-7,[2,3,3,-5],
6.68445976458009E-8,3.60317800223394E-7,[10,2],2.38375772852068E-8,9.86174970745443E-8,[2,2,3,-4]]],q:[[4.57512732935583E-7,-1.06488903835686E-7,[2,3,3,-5],-3.63902851148984E-7,6.80744605654306E-8,[10,2],-2.37906960826515E-7,1.28823777138285E-8,[2,1,3,-1]]]};function vsop2013_mar(tj){return vsop2k(vsop2013_mar.coeffs,tj)}function vsop2013_mar_xyz(tj){return vsop2k.xyz(vsop2013_mar.coeffs,tj)}vsop2013_mar.xyz=vsop2013_mar_xyz;vsop2013.mar=vsop2013_mar;vsop2013_mar.coeffs={L:[[0,6.203500014141,[],7.74226442511148E-5,
-2.61783269737478E-4,[3,4,4,-8,10,3],5.34524186153185E-5,-7.80488663170154E-5,[2,2,4,-7,10,8,11,-6]],[0,3340.61243414546,[]]],a:[[0,1.523679340234,[],2.10177537333173E-7,6.60170427846137E-5,[4,2,10,-2],-9.97760498098323E-6,-1.96269515718286E-5,[4,1,10,-2]]],h:[[0,-.037899709162,[],-8.15830080347651E-5,-1.63133322577743E-7,[4,1,10,-2],-4.51462167164009E-5,-1.33856005180842E-6,[10,1]]],k:[[0,.085365593164,[],7.5923424053874E-7,8.22828165672222E-5,[4,1,10,-2],1.32864651729855E-6,-4.6299966034315E-5,
[10,1]]],p:[[0,.012284486457,[],8.45182476840896E-7,-7.45419237323267E-8,[10,2],-1.46410716642413E-7,2.82737644897297E-7,[10,1]]],q:[[0,.010470428021,[],5.24681330274117E-8,8.59427436162037E-7,[10,2],-2.44990400897291E-7,1.14143053443839E-7,[3,1,4,-2]]]};function vsop2013_jup(tj){return vsop2k(vsop2013_jup.coeffs,tj)}function vsop2013_jup_xyz(tj){return vsop2k.xyz(vsop2013_jup.coeffs,tj)}vsop2013_jup.xyz=vsop2013_jup_xyz;vsop2013.jup=vsop2013_jup;vsop2013_jup.coeffs={L:[[0,.599546107035,[],-.00566625683418009,
-8.92514475215568E-4,[10,2,11,-5],6.16623284320103E-4,-9.02526061446375E-5,[10,1,11,-2]],[0,529.690961562325,[]]],a:[[0,5.202603206345,[],5.10073137608823E-6,6.90804351056146E-4,[10,2,11,-2],-2.87828738537348E-5,-3.21490464594591E-4,[10,1,11,-2]]],h:[[0,.012003719726,[],-6.42719873733828E-4,1.479851653241E-5,[10,1,11,-2],-1.60443913831529E-4,-3.41117655890013E-4,[10,2,11,-5]]],k:[[0,.046985847005,[],-4.34754594830865E-6,6.52966387169899E-4,[10,1,11,-2],-3.44420534520134E-4,1.60872409455138E-4,[10,
2,11,-5]]],p:[[0,.01118386458,[],-3.33992313710715E-6,-7.83506890214899E-6,[10,2,11,-5],-1.37865441865821E-6,1.69801625112118E-6,[10,1,11,-3]]],q:[[0,-.002065622731,[],-7.51006482364563E-6,4.12750504201726E-6,[10,2,11,-5],1.89550929058217E-6,1.12970775000631E-6,[10,1,11,-3]]]};function vsop2013_sat(tj){return vsop2k(vsop2013_sat.coeffs,tj)}function vsop2013_sat_xyz(tj){return vsop2k.xyz(vsop2013_sat.coeffs,tj)}vsop2013_sat.xyz=vsop2013_sat_xyz;vsop2013.sat=vsop2013_sat;vsop2013_sat.coeffs={L:[[0,
.874018510107,[],.0139448524795837,.00219682237703802,[10,2,11,-5],.00259783521557205,-1.16600357373602E-5,[10,1,11,-1]],[0,213.299086108488,[]]],a:[[0,9.554910386039,[],-3.4372664690557E-5,.0336346748120207,[10,1,11,-1],-.0022293855186355,.00275617197670516,[10,1,11,-2]]],h:[[0,.055429636102,[],6.35129860363602E-4,.00140901985337072,[10,2,11,-5],.00196887696972844,6.60369782670219E-6,[10,1]]],k:[[0,-.002959913416,[],.00141686641362994,-6.365432862294E-4,[10,2,11,-5],6.66644424044003E-6,.001972688473832,
[10,1]]],p:[[0,.019891436236,[],8.69842146851722E-6,1.87074111159286E-5,[10,2,11,-5],-3.50559744644866E-6,-7.68122509116786E-6,[10,1,11,-1]]],q:[[0,-.008717455856,[],1.8147187106274E-5,-9.70888214768663E-6,[10,2,11,-5],-4.4775348263207E-6,5.74727861695624E-6,[10,1,11,-1]]]};function vsop2013_ura(tj){return vsop2k(vsop2013_ura.coeffs,tj)}function vsop2013_ura_xyz(tj){return vsop2k.xyz(vsop2013_ura.coeffs,tj)}vsop2013_ura.xyz=vsop2013_ura_xyz;vsop2013.ura=vsop2013_ura;vsop2013_ura.coeffs={L:[[0,5.481225395663,
[],-.0149449950730489,8.34844473590201E-4,[12,1,13,-2],.00341047621755124,-1.91057710127704E-7,[10,1,12,-1]],[0,74.781659030778,[]]],a:[[0,19.218438555474,[],2.27856970378006E-6,.0803052568869785,[10,1,12,-1],-7.30491609037666E-6,.0206873102632775,[11,1,12,-1]]],h:[[0,.005648340159,[],.00274677765640599,-4.04116199877446E-7,[10,1],.00209355702962403,5.55479382439183E-6,[12,1,13,-2]]],k:[[0,-.045953074838,[],-1.72793094161794E-7,.0027453436203276,[10,1],3.65735313605478E-6,-.00208562132364666,[12,
1,13,-2]]],p:[[0,.006486018467,[],-3.81845253809257E-6,5.32915473528968E-6,[11,1,12,-3],4.06482649231472E-6,4.90360484510344E-6,[10,1,12,-1]]],q:[[0,.001859240754,[],5.18112789501957E-6,4.1548457762982E-6,[11,1,12,-3],4.86984206974084E-6,-4.09476001250862E-6,[10,1,12,-1]]]};function vsop2013_nep(tj){return vsop2k(vsop2013_nep.coeffs,tj)}function vsop2013_nep_xyz(tj){return vsop2k.xyz(vsop2013_nep.coeffs,tj)}vsop2013_nep.xyz=vsop2013_nep_xyz;vsop2013.nep=vsop2013_nep;vsop2013_nep.coeffs={L:[[0,5.311897933164,
[],.0101469046279758,-5.6880414013645E-4,[12,1,13,-2],.00441713216417606,7.04519591120121E-7,[10,1,13,-1]],[0,38.132972226125,[]]],a:[[0,30.110415987017,[],-3.16688453816727E-5,.148182835507509,[10,1,13,-1],-7.59625666080917E-6,.0359789774926939,[11,1,13,-1]]],h:[[0,.006691809982,[],.00344037123410276,2.60037089689158E-7,[10,1],.00136274559681672,-7.31683642143236E-8,[13,1]]],k:[[0,.005998838194,[],-1.19590818920499E-6,.00343812701387651,[10,1],-2.34014011757408E-8,.00136228851875839,[13,1]]],p:[[0,
.011516766659,[],-1.00851792138856E-5,-4.10456052892944E-7,[10,1,13,-1],8.73365050781177E-6,3.5758669468006E-7,[10,1,13,1]]],q:[[0,-.010291475138,[],-4.12822331979157E-7,1.00922848608511E-5,[10,1,13,-1],-3.55340973333777E-7,8.7339646391212E-6,[10,1,13,1]]]};function vsop2013_plu(tj){return vsop2k(vsop2013_plu.coeffs,tj)}function vsop2013_plu_xyz(tj){return vsop2k.xyz(vsop2013_plu.coeffs,tj)}vsop2013_plu.xyz=vsop2013_plu_xyz;vsop2013.plu=vsop2013_plu;vsop2013_plu.coeffs={L:[[0,4.165471124826,[],-.00456721639374337,
.00206105169349723,[14,1402],.00222149312802085,.00349013706591797,[14,4]],[0,25.33566020437,[]],[0,-.0182722188391639,[]]],a:[[0,39.54461714403,[],-.0852581976354701,-.188913735334341,[14,1402],-.0333874152748863,-.0414958778338123,[14,1331],-.00734554122725473,-.0485024749192498,[14,522],-.00534684376601522,.0281021329189482,[14,71],-.0123092045544314,-.0091600251304609,[14,1261],-.00525198563299829,-.012202161344832,[14,452]],[.0538225296756512,-.024541007710854,[14,1402],0,.03789,[],.0196235717652556,
-.0159817339293649,[14,1331],.0138515233201363,-.00216678462854011,[14,522]]],h:[[0,-.1734047186423,[],.0030130058621335,.00212348131150762,[14,1473],-7.08496491526814E-4,-.00105054992003594,[14,71]]],k:[[0,-.1787389594035,[],-.00209858702949421,.0031629832749993,[14,1473],.00111135191639409,-6.81803576638604E-4,[14,71]]],p:[[0,.1397799251564,[],1.34711564336948E-4,1.28832005723724E-4,[14,1402],1.61808960422928E-4,-4.99793100988791E-5,[14,1543]]],q:[[0,-.05170230782278,[],1.35237840998234E-4,-1.32967871573853E-4,
[14,1402],5.59277554218395E-5,1.63008996403526E-4,[14,1543]]]}})(window);

/* crc: 775FA3DD12222859463D4CC501B11AA4 */
