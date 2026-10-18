// ==========================================
// PENJELASAN PARTIKEL PADA KALIMAT BUNPOU
// ==========================================
const analyzeBunpouParticles = (function () {
function toks(r){return r.split(/\s+/).filter(Boolean).map(raw=>({raw,core:raw.toLowerCase().replace(/[.,?!―;:()「」"]/g,''),end:/[.,?!―;:]$/.test(raw)}))}

const OVERRIDE={
 'Kuroi kutsu wa shiroi shatsu ni aimasu.':{ni:['Kecocokan','に menandai hal yang dicocokkan: "shiroi shatsu" cocok dengan sepatu hitam. 合います (aimasu) di sini berarti "cocok/serasi dengan", bukan "bertemu".']}
};
const NUM=new Set('zero rei ichi ni san yon shi yo go roku nana shichi hachi kyuu ku juu hyaku sen man'.split(' '));
const COUNTER=/^(ji|jikan|fun|pun|gatsu|nichi|nin|hon|mai|satsu|ko|hai|kai|dai|wa|hiki|tsu|sai|en|kiro|kagetsu|shuukan|nen|banme|ban|ten|do|meetoru|guramu|ji?han)$/;
const QW=new Set('dare nani nan doko dore dochira itsu ikura ikutsu dono donna doushite dou'.split(' '));
const PARTS=new Set('wa ga wo ni de e to mo no ya ka kara made yori dake shika ne yo gurai kurai goro zutsu demo nado na'.split(' '));
const CHAR={wa:'は',ga:'が',wo:'を',ni:'に',de:'で',e:'へ',to:'と',mo:'も',no:'の',ya:'や',ka:'か',kara:'から',made:'まで',yori:'より',dake:'だけ',shika:'しか',ne:'ね',yo:'よ',gurai:'ぐらい',kurai:'ぐらい',goro:'ごろ',zutsu:'ずつ',demo:'でも',nado:'など',na:'な'};
const VERBLIKE=/(masu|masen|mashita|mashou|mashouka|desu|deshita|kudasai|tai|taidesu|arimasen|imasu|imasen)$/;
const TEFORM0=/^[a-z']{2,}(te|de|ite|tte|nde)$/;
const NOT_TE=new Set(['kitte','kate','node','noni']);
const TEFORM={test:w=>TEFORM0.test(w)&&!NOT_TE.has(w)};
const TIME=/(^|[^a-z])(ji|han|fun|pun|youbi|gatsu|nichi|nen|asa|hiru|yoru|gogo|gozen|shuumatsu|natsuyasumi|fuyuyasumi|haru|natsu|aki|fuyu|tsuitachi|futsuka|mikka|yokka|itsuka|muika|nanoka|youka|kokonoka|tooka|hatsuka|kinou|kyou|ashita|mainichi|maiasa|maiban|raishuu|senshuu|raigetsu|rainen|kotoshi|ima|ato|goro|tanjoubi|mae|aida)$|(ji|han|fun|pun|youbi|gatsu|nichi|nen|yokka|ikka|mikka|futsuka)$/;
const STRICT_TIME=/^(ji|han|fun|pun|youbi|gatsu|nichi|nen|gogo|gozen|asa|hiru|yoru|shuumatsu|natsuyasumi|fuyuyasumi|haru|natsu|aki|fuyu|tsuitachi|futsuka|mikka|yokka|itsuka|muika|nanoka|youka|kokonoka|tooka|hatsuka|tanjoubi)$|(youbi|gatsu|nichi|yokka|ji)$/;
const TRANSPORT=new Set('densha basu kuruma jitensha takushii fune hikouki chikatetsu baiku shinkansen aruite erebeetaa esukareetaa feri'.split(' '));
const LANG=/^(nihongo|eigo|chuugokugo|indoneshiago|kankokugo|furansugo|doitsugo|supeingo)$/;
const TOOL=new Set('mimi kuchi ashi pen enpitsu hashi naifu fooku supuun te pasokon nooto jisho jibiki keitai denwa sekken hasami kasa'.split(' '));
const MATERIAL=new Set('ki kami kome gyuunyuu mugi tamago'.split(' '));
const PERSON=new Set('watashi boku kare kanojo anata haha chichi ani ane otouto imouto sensei tomodachi kazoku ryoushin kyoudai shachou okaasan otousan oniisan oneesan obaasan ojiisan tanaka yamada minna kodomo hito gakusei isha kaishain'.split(' '));
const POS=new Set('ue shita mae ushiro naka soto tonari yoko chikaku soba mukou temae aida hidari migi muko'.split(' '));
const ACTION=new Set('benkyou kaimono sanpo ryokou asobi shokuji ryouri sentaku souji undou shigoto renshuu kekkon nyuuin taiin unten shoukai sotsugyou ryuugaku eiga tabe mi kai nomi kiki'.split(' '));
const GOOD=/^(suki|kirai|daisuki|jouzu|heta|tokui|nigate)(desu|deshita|dewa|ja)?$/;
const EXIST=/^(arimasu|arimasen|arimashita|arimasendeshita|imasu|imasen|imashita|imasendeshita|aru|iru|arimasuka|imasuka)$/;
const MOTION=/^(ikimasu|ikimasen|ikimashita|ikimashou|ikitai|ikitaidesu|kimasu|kimasen|kimashita|kaerimasu|kaerimasen|kaerimashita|modorimasu|itte|kite|kaette|ikimashouka|kaerimashou)$/;
const CONTACT=/^(norimasu|norimashita|norimasen|hairimasu|hairimashita|hairimasen|suwarimasu|suwarimashita|notte|haitte|suwatte|agarimasu|noborimasu|tsukimasu|tsukimashita|tsuite)$/;
const PUT=/^(iremasu|iremashita|irete|nurimasu|kakemasu|okimasu|okimashita|oite|tsukemasu|harimasu|nosemasu|kaite|kakimasu|kakimashita|tomemasu)$/;
const GIVE=/^(agemasu|agemashita|yarimasu|kuremasu|kuremashita|kashimasu|kashimashita|misemasu|oshiemasu|okurimasu|okurimashita|dashimasu|dashimashita|tsutaemasu|iimasu|iimashita|hanashimasu|hanashimashita|setsumei|tanomimasu)$/;
const RECV=/^(moraimasu|moraimashita|karimasu|karimashita|kikimasu|kikimashita|naraimasu|naraimashita|moratte|karite)$/;
const MEET=/^(aimasu|aimashita|aimasen|atte|ai)$/;
const BECOME=/^(narimasu|narimashita|narimasen|naru|natte)$/;

function clauseOf(T,i){ // tokens after i until end punctuation (inclusive)
  const out=[];for(let j=i+1;j<T.length;j++){out.push(T[j]);if(T[j].end&&j>i)break}return out}
function pred(T,i){ const c=clauseOf(T,i);
  for(let k=0;k<c.length;k++){ const t=c[k]; if(PARTS.has(t.core)&&t.core.length<=2)continue;
    if(/^(desu|deshita|node|noni)$/.test(t.core)&&k>0&&!(PARTS.has(c[k-1].core)&&c[k-1].core.length<=2)) return c[k-1].core;   // kata sifat / nomina + desu
    if(VERBLIKE.test(t.core)||TEFORM.test(t.core)||/^(shimasu|shimashita|shimasen|shite)$/.test(t.core))return t.core}
  // tidak ada predikat di klausa ini (dilesapkan): cari predikat berikutnya di kalimat
  for(let j=i+1;j<T.length;j++){ const t=T[j]; if(PARTS.has(t.core)&&t.core.length<=2)continue; if(VERBLIKE.test(t.core)||TEFORM.test(t.core)||/^(shimasu|shimashita|shimasen|shite)$/.test(t.core))return t.core}
  return c.length?c[c.length-1].core:'';}
const LIST_OK=new Set(['no','ya','to','nado']);
const STOPW=new Set(['node','noni','keredo','keredomo','shi']);
function phrase(T,i){ const w=[];for(let j=i-1;j>=0&&w.length<5;j--){ const c=T[j].core; if(PARTS.has(c)&&!LIST_OK.has(c))break; if(STOPW.has(c))break; if(T[j].end&&j<i-1)break; w.unshift(c); if(j>0&&T[j-1].end)break} return w.join(' ')||(T[i-1]?T[i-1].core:'');}
// frasa nomina setelah partikel (sampai partikel / predikat berikutnya), maks 3 kata
function nphr(T,i){ const w=[];for(let j=i+1;j<T.length&&w.length<3;j++){ const c=T[j].core; if(PARTS.has(c)&&c!=='no')break; if(VERBLIKE.test(c)||TEFORM.test(c))break; w.push(c); if(T[j].end)break} return w.join(' ')||nextw(T,i);}
function nextw(T,i){return T[i+1]?T[i+1].core:''}
const q=s=>`"${s}"`;
function isNumberAmb(T,i){ // ni / yo / to dipakai sebagai angka?
  const c=T[i].core;const prev=T[i-1]&&T[i-1].core,next=T[i+1]&&T[i+1].core;
  if(c!=='ni'&&c!=='yo'&&c!=='go')return false;
  if(c==='go')return true; // 'go' bukan partikel
  if(NUM.has(prev)&&!T[i-1].end&&(NUM.has(next)||COUNTER.test(next)||T[i].end)) return true;
  if(COUNTER.test(next||'')&&!PARTS.has(next))return true;
  if(NUM.has(next||'')) return true;
  if(T[i].end&&NUM.has(prev))return true;
  if(T[i-1]&&T[i-1].end&&NUM.has(next))return true;
  return false;}

function baseNi(T,i){
  const prev=T[i-1]?T[i-1].core:'',p=pred(T,i),np=phrase(T,i),cl=clauseOf(T,i).map(t=>t.core);
  if(/^(kai|sankai|nikai|ikkai|yonkai|gokai|rokkai|kai)$/.test(nextw(T,i))||/kai$/.test(nextw(T,i))&&TIME.test(prev)) return ['Frekuensi',`に menyatakan frekuensi: dalam periode ${q(np)} terjadi ${q(nextw(T,i))} kali.`];
  if(prev==='issho') return ['Keterangan "bersama"',`に pada ${q('issho ni')} (いっしょに) membentuk keterangan "bersama-sama" untuk ${q(p)}.`];
  if(/^(ii|yoi|warui)$/.test(p)) return ['Pihak terkait',`に menandai pihak atau hal yang terkena manfaat/dampak: ${q(np)} ("baik/buruk bagi ${np}").`];
  if(/^(nishi|higashi|minami|kita)$/.test(prev)) return ['Arah mata angin',`に menandai arah ${q(prev)} sebagai titik tujuan gerak ${q(p)}.`];
  if(prev==='you') return ['Cara (ように)',`に setelah ${q(np)} membentuk keterangan cara: "dengan cara / seperti ${np}".`];
  if(/^(hontou|shizuka|kirei|genki|tokubetsu|daijoubu|jouzu|yukkuri)$/.test(prev)) return ['Keterangan (sifat-na + に)',`に mengubah ${q(prev)} menjadi kata keterangan (cara/tingkat) yang menerangkan ${q(p)}.`];
  if(/^(sunde|sumimasu|sumimashita|sumu|sumimasen)$/.test(p)) return ['Tempat tinggal',`に menandai tempat tinggal: ${q(np)} adalah tempat menetap (${q(p)}).`];
  if(/^(tsutomete|tsutomemasu|tsutomeru)$/.test(p)) return ['Tempat bekerja',`に menandai tempat bekerja tetap: ${q(np)} (${q(p)}).`];
  if(/^(migi|hidari)$/.test(prev)&&/maga/.test(p)) return ['Arah belokan',`に menandai arah belokan: ${q(prev)} dengan ${q(p)}.`];
  if(STRICT_TIME.test(prev)&&!BECOME.test(p)&&!EXIST.test(p)) return ['Waktu',`に menandai titik waktu yang tepat: ${q(np)}. Waktu spesifik (jam, hari, bulan) memakai に.`];
  if(BECOME.test(p)) return ['Hasil perubahan',`に menandai hasil perubahan: menjadi ${q(np)} (${p}).`];
  if(EXIST.test(p)){ if(TIME.test(prev)&&!POS.has(prev)&&/(youbi|gatsu|nichi|ji|han|ka)$/.test(prev)) return ['Waktu',`に menandai waktu kejadian ${q(np)} pada kalimat dengan ${q(p)}.`]; return ['Lokasi keberadaan',`に menandai tempat keberadaan: ${q(np)} adalah lokasi tempat sesuatu ada/berada (${q(p)}). Dengan あります/います, lokasi memakai に.`];}
  if(CONTACT.test(p)) return ['Titik kontak/masuk',`に menandai titik kontak atau tujuan masuk: ${q(np)} dengan ${q(p)} (naik, duduk, masuk, tiba memakai に).`];
  if(PUT.test(p)) return ['Tujuan benda',`に menandai tempat/tujuan benda ditaruh, dimasukkan, atau ditulis: ${q(np)} (${q(p)}).`];
  if(MEET.test(p)) return ['Lawan tindakan',`に menandai orang yang ditemui: ${q(np)} (${q(p)}). Bertemu seseorang memakai に.`];
  if(cl.includes('denwa')&&/shi/.test(p)) return ['Lawan tindakan',`に menandai orang yang dihubungi lewat telepon: ${q(np)}.`];
  if(GIVE.test(p)) return ['Penerima',`に menandai penerima/lawan bicara tindakan: ${q(np)} (${q(p)}).`];
  if(RECV.test(p)) return ['Sumber/penerima',`に menandai orang yang memberi atau menjadi sumber: ${q(np)} (${q(p)}), "dari/pada ${np}".`];
  if(MOTION.test(p)){ if(ACTION.has(prev)) return ['Tujuan tindakan',`に menandai tujuan seseorang pergi: ${q(np)}, artinya "pergi untuk ${np}".`]; return ['Tujuan perpindahan',`に menandai tempat tujuan: ${q(np)} dengan ${q(p)} (pergi/datang/pulang ke). Boleh diganti へ.`];}
  if(TIME.test(prev)||/^(.*ji|.*han|.*youbi|.*gatsu|.*nichi)$/.test(prev)) return ['Waktu',`に menandai titik waktu yang tepat: ${q(np)}. Waktu spesifik (jam, hari, bulan) memakai に.`];
  return ['Sasaran/tujuan',`に menandai sasaran atau tujuan tindakan: ${q(np)} dengan ${q(p)}.`];
}
function baseDe(T,i){
  const prev=T[i-1]?T[i-1].core:'',p=pred(T,i),np=phrase(T,i);
  if(/(kan|jikan)$/.test(prev)||COUNTER.test(prev)&&/(kan|jikan)/.test(prev)) return ['Jangka waktu',`で menandai jangka waktu/ukuran yang dipakai: ${q(np)} untuk menyelesaikan ${q(p)}.`];
  if(TRANSPORT.has(prev)) return ['Sarana/kendaraan',`で menandai sarana atau kendaraan: ${q(np)} (naik/dengan ${prev}).`];
  if(LANG.test(prev)) return ['Bahasa',`で menandai bahasa yang dipakai: ${q(np)}.`];
  if(/^(minna|hitori|futari|zenbu|issho|kazoku|sannin|yonin|gonin)$/.test(prev)||/nin$/.test(prev)||prev==='zenbu') return ['Jumlah/bersama',`で menandai jumlah total atau kelompok yang bertindak bersama: ${q(np)}.`];
  if(TOOL.has(prev)) return ['Alat',`で menandai alat yang dipakai: ${q(np)}.`];
  if(MATERIAL.has(prev)&&/tsukuri/.test(p)) return ['Bahan',`で menandai bahan pembuat: ${q(np)}.`];
  if(EXIST.test(p)) return ['Tempat acara',`で menandai tempat berlangsungnya suatu acara/kegiatan: ${q(np)} (${q(p)}).`];
  return ['Tempat tindakan',`で menandai tempat berlangsungnya tindakan: ${q(np)} adalah lokasi tempat ${q(p)} dilakukan.`];
}
function baseGa(T,i){
  const prev=T[i-1]?T[i-1].core:'',p=pred(T,i),np=phrase(T,i),raw=T[i];
  if(QW.has(prev)||QW.has(np.split(' ')[0])) return ['Subjek kata tanya',`が menandai kata tanya sebagai subjek: ${q(np)}. Kata tanya yang menjadi subjek memakai が, bukan は.`];
  if(raw.end||/(desu|masu|masen|deshita|mashita|dewa|ta|i|da|nai)$/.test(prev)&&!T[i-1].end&&/(desu|masu|masen|deshita|mashita|da)$/.test(prev)) return ['Penghubung "tetapi"','が di akhir klausa berarti "tetapi" (atau pembuka sopan), menghubungkan dua klausa yang berlawanan atau memperhalus ucapan.'];
  if(GOOD.test(p)) return ['Objek perasaan/kemampuan',`が menandai objek perasaan atau kemampuan: ${q(np)} dengan ${q(p)}. Sifat seperti 好き, きらい, 上手, 下手 memakai が, bukan を.`];
  if(/^(wakarimasu|wakarimasen|wakarimashita|dekimasu|dekimasen|dekimashita|dekiru|wakaru)$/.test(p)) return ['Objek pemahaman/kemampuan',`が menandai objek dari ${q(p)}: ${q(np)}. Mengerti dan bisa memakai が.`];
  if(/^(hoshii|hoshiidesu|hoshikunai|hoshikatta)$/.test(p)||/hoshii/.test(p)) return ['Objek keinginan',`が menandai benda yang diinginkan: ${q(np)} dengan ${q(p)} (欲しい).`];
  if(/tai(desu)?$/.test(p)) return ['Objek keinginan',`が menandai objek keinginan (bentuk ~たい): ${q(np)}.`];
  if(EXIST.test(p)) return ['Keberadaan/kepemilikan',`が menandai benda atau orang yang ada: ${q(np)} dengan ${q(p)}. Dengan あります/います, yang ada ditandai が.`];
  if(!VERBLIKE.test(p)&&!TEFORM.test(p)&&!/^(shi|shite)/.test(p)) return ['Subjek sifat/keadaan',`が menandai hal yang dijelaskan sifat atau keadaannya: ${q(np)} bersifat ${q(p)}. Pada pola "A は B が ...", B adalah bagian/aspek yang bersifat demikian.`];
  return ['Subjek/fokus',`が menandai subjek yang menjadi fokus informasi baru: ${q(np)} adalah pelaku atau hal yang mengalami ${q(p)}.`];
}
function baseWo(T,i){
  const prev=T[i-1]?T[i-1].core:'',p=pred(T,i),np=phrase(T,i);
  if(/^(demasu|demashita|orimasu|orimashita|dete|orite|deru|oriru|demasen|orimasen)$/.test(p)) return ['Titik awal',`を menandai tempat yang ditinggalkan: ${q(np)} dengan ${q(p)} (keluar/turun dari).`];
  if(/^(arukimasu|arukimashita|aruite|watarimasu|watarimashita|watatte|hashirimasu|noborimasu|noborimashita|magarimasu|magatte|tooru|toorimasu|sanposhimasu|tobimasu)$/.test(p)||(/^(michi|hashi|kouen|yama|kawa|sora|machi|kado|saka)$/.test(prev)&&/^(aruki|wata|hashiri|nobori|magari|shi)/.test(p))) return ['Tempat dilalui',`を menandai tempat yang dilintasi: ${q(np)} dengan ${q(p)} (menyeberang, berjalan, melintasi).`];
  return ['Objek langsung',`を menandai objek langsung: ${q(np)} adalah benda yang dikenai tindakan ${q(p)}. (Ditulis "wo", dibaca "o".)`];
}
function baseTo(T,i){
  const prev=T[i-1]?T[i-1].core:'',p=pred(T,i),np=phrase(T,i),nx=nextw(T,i);
  if(/^(iimasu|iimashita|iu|itte|omoimasu|omoimashita|omou)$/.test(p)) return ['Kutipan',`と menandai isi ucapan atau pikiran yang dikutip, sebelum ${q(p)}.`];
  if(/^(chigaimasu|chigaimashita|chigau|onaji|onajidesu|onajidewa)$/.test(p)||/^(chigai|onaji)/.test(p)) return ['Pembanding',`と menandai pembanding pada ${q(p)}: "berbeda dari / sama dengan ${np}".`];
  // partikel yang mengikuti frasa sesudah と
  let k=i+1;while(k<T.length&&!PARTS.has(T[k].core)&&!T[k].end)k++;
  const after=T[k]?T[k].core:'';
  const personBefore=PERSON.has(prev)||/^(.*san|.*kun|.*chan)$/.test(prev);
  if(VERBLIKE.test(nx)||/^(issho|issho ni)$/.test(nx)) return ['Bersama',`と menandai teman atau lawan tindakan: "dengan ${np}" pada ${q(p)}.`];
  if(personBefore&&['wo','ni','de','e'].includes(after)) return ['Bersama',`と menandai teman atau lawan tindakan: ${q(p)} dilakukan "bersama/dengan ${np}".`];
  return ['Dan (lengkap)',`と menghubungkan benda-benda yang disebut lengkap: ${q(np)} dan ${q(nphr(T,i))}. Semua anggota daftar disebutkan.`];
}
function baseMo(T,i){
  const prev=T[i-1]?T[i-1].core:'',p=pred(T,i),np=phrase(T,i);
  if(QW.has(prev)||QW.has(np.split(' ')[0])) return ['Kata tanya + も',`も setelah kata tanya ${q(np)} dengan kalimat negatif (${q(p)}) berarti "sama sekali tidak".`];
  if(COUNTER.test(prev)||/(jikan|nin|kai|hai|satsu|mai|ko|kiro)$/.test(prev)||/(nichi|ji)$/.test(prev)&&false) return ['Penekanan jumlah',`も menekankan bahwa jumlah ${q(np)} terasa banyak ("sampai ${np}").`];
  return ['Juga',`も berarti "juga/pun": ${q(np)} juga mengalami hal yang sama seperti yang disebut sebelumnya (menggantikan は/が/を).`];
}
function baseNo(T,i){
  const prev=T[i-1]?T[i-1].core:'',nx=nextw(T,i),np=phrase(T,i);
  if(['ga','wa','wo','ni','de','mo'].includes(nx)) return ['Nominalisasi / pengganti nomina',`の membuat frasa ${q(np)} berfungsi sebagai kata benda ("hal ${np}") atau menggantikan benda yang sudah jelas, sehingga bisa diikuti partikel ${CHAR[nx]}.`];
  if(POS.has(nx)) return ['Posisi',`の menghubungkan benda acuan ${q(np)} dengan kata posisi ${q(nx)}: "bagian ${nx} dari ${np}".`];
  if(!nx||/^(desu|deshita|dewa|janai)$/.test(nx)||T[i+1].end&&!/(masu|desu)/.test(nx)&&false) return ['Pengganti nomina',`の menggantikan nomina yang sudah jelas: "milik ${np}" tanpa mengulang bendanya.`];
  if(PERSON.has(prev)) return ['Kepemilikan',`の menyatakan kepemilikan: ${q(np)} memiliki ${q(nphr(T,i))} ("${nphr(T,i)} milik ${np}").`];
  return ['Hubungan nomina',`の menghubungkan dua nomina: ${q(np)} menerangkan ${q(nphr(T,i))} (milik, asal, atau jenis).`];
}
function baseKa(T,i){
  const raw=T[i],prev=T[i-1]?T[i-1].core:'',np=phrase(T,i);
  const last=raw.end&&/[?.]$/.test(raw.raw)||i===T.length-1;
  if(QW.has(prev)&&!last) return ['Tidak tentu',`か setelah kata tanya ${q(prev)} berarti "seseorang/sesuatu" yang tidak tentu.`];
  if(last){ if(/masen$/.test(prev)) return ['Ajakan',`〜ませんか adalah ajakan sopan: ${q(prev)} + か berarti "maukah ...?"`]; if(/mashou$/.test(prev)) return ['Tawaran',`〜ましょうか adalah tawaran atau ajakan: ${q(prev)} + か.`]; return ['Pertanyaan',`か di akhir kalimat menandakan kalimat tanya: ${q(prev)} + か.`];}
  return ['Atau (pilihan)',`か menghubungkan dua pilihan "atau": ${q(np)} atau ${q(nphr(T,i))}.`];
}
function baseKara(T,i){
  const prev=T[i-1]?T[i-1].core:'',p=pred(T,i),np=phrase(T,i),raw=T[i];
  if(/(desu|masu|masen|deshita|mashita|i|ta|da|nai|iru|aru)$/.test(prev)&&(raw.end||/(desu|masu|masen|deshita|mashita)$/.test(prev))) return ['Alasan',`から di belakang klausa ${q(np)} berarti "karena": klausa itu adalah alasan bagi kalimat berikutnya.`];
  if(RECV.test(p)&&PERSON.has(prev)) return ['Asal pemberi',`から menandai orang yang memberi: ${q(np)} adalah sumber dari ${q(p)} ("dari ${np}").`];
  return ['Titik awal',`から menandai titik awal waktu atau tempat: ${q(np)} ("dari ${np}"). Biasanya berpasangan dengan まで.`];
}
const BASE={ni:baseNi,de:baseDe,ga:baseGa,wo:baseWo,to:baseTo,mo:baseMo,no:baseNo,ka:baseKa,kara:baseKara};
const SIMPLE={
 e:(T,i)=>['Arah',`へ (dibaca "e") menandai arah tujuan: ${q(phrase(T,i))} dengan ${q(pred(T,i))}.`],
 ya:(T,i)=>['Daftar tidak lengkap',`や menghubungkan contoh-contoh benda: ${q(phrase(T,i))} dan ${q(nphr(T,i))}, masih ada yang lain.`],
 made:(T,i)=>['Batas akhir',`まで menandai batas akhir waktu atau tempat: ${q(phrase(T,i))} ("sampai ${phrase(T,i)}").`],
 yori:(T,i)=>['Perbandingan',`より menandai pembanding: ${q(phrase(T,i))} adalah yang dikalahkan ("daripada ${phrase(T,i)}").`],
 dake:(T,i)=>['Hanya',`だけ berarti "hanya": membatasi pada ${q(phrase(T,i))} saja.`],
 shika:(T,i)=>['Hanya (negatif)',`しか berarti "hanya/tidak ada selain": ${q(phrase(T,i))}, dan harus diikuti bentuk negatif.`],
 ne:(T,i)=>['Minta persetujuan','ね di akhir kalimat meminta persetujuan atau konfirmasi lawan bicara ("ya?", "kan?").'],
 yo:(T,i)=>['Penegasan','よ di akhir kalimat menyampaikan informasi atau menegaskan sesuatu kepada lawan bicara ("lho!").'],
 gurai:(T,i)=>['Perkiraan',`ぐらい berarti "kira-kira": ${q(phrase(T,i))} adalah perkiraan jumlah atau lama.`],
 goro:(T,i)=>['Perkiraan waktu',`ごろ berarti "sekitar" untuk titik waktu: ${q(phrase(T,i))}.`],
 zutsu:(T,i)=>['Masing-masing',`ずつ berarti "masing-masing/sedikit demi sedikit": ${q(phrase(T,i))} setiap kali.`],
 demo:(T,i)=>['Misalnya / pun',`でも berarti "misalnya" atau "pun": contoh ${q(phrase(T,i))}.`],
 nado:(T,i)=>['Dan sebagainya',`など berarti "dan sebagainya": daftar ${q(phrase(T,i))} tidak lengkap.`],
 na:(T,i)=>['Penyambung kata sifat-na',`な menyambung kata sifat-na ${q(T[i-1].core)} dengan kata benda ${q(nphr(T,i))} yang diterangkannya.`]
};
SIMPLE.kurai=SIMPLE.gurai;

function analyze(r){
  const T=toks(r);const out=[];
  const ov=OVERRIDE[r.trim()]||OVERRIDE[r.trim().split(/(?<=[.?!])\s+/).find(x=>OVERRIDE[x])]||null;
  for(let i=0;i<T.length;i++){
    const c=T[i].core;
    if(!PARTS.has(c)) continue;
    if(isNumberAmb(T,i)) continue;
    if((c==='kurai'||c==='gurai')&&!(T[i-1]&&(NUM.has(T[i-1].core)||COUNTER.test(T[i-1].core)||/(jikan|kai|nin|fun|pun|ji|en|kiro|meetoru|ko|tsu)$/.test(T[i-1].core)))) continue;
    if(c==='na'&&!(T[i-1]&&/[a-z]/.test(T[i-1].core))) continue;
    // de bentuk sambung dari desu (mis. "ichinichi de, ...")
    if(c==='de'&&T[i].end&&!TRANSPORT.has(T[i-1]&&T[i-1].core)) { out.push({p:'で',lbl:'Bentuk sambung です',t:'で di sini adalah bentuk sambung dari です ("adalah ..., dan ..."), bukan partikel tempat.'}); continue; }
    if(c==='de'&&nextw(T,i)==='wa'&&T[i+2]&&/^arimasen/.test(T[i+2].core)) { out.push({p:'では',lbl:'Negatif sopan',t:'では ありません adalah bentuk negatif sopan dari です: "bukan ...". では = で (bentuk sambung です) + は.'});i++;continue; }
    // gabungan dengan wa / mo
    const nx=nextw(T,i);
    if((nx==='wa'||nx==='mo')&&['ni','de','e','to','kara','made','yori'].includes(c)){
      const b=(c==='ni'?baseNi:c==='de'?baseDe:c==='kara'?baseKara:c==='to'?baseTo:(SIMPLE[c]||(()=>['','']))) (T,i);
      const w=nx==='wa'?'は':'も';const add=nx==='wa'?'は menambahkan makna topik/kontras':'も menambahkan makna "juga/pun"';
      out.push({p:CHAR[c]+w,lbl:CHAR[c]+w,t:`${CHAR[c]}${w}: ${add} setelah partikel ${CHAR[c]}. Fungsi dasar ${CHAR[c]} di sini: ${b[1]}`});i++;continue;
    }
    if(c==='wa'){
      const wasBefore=T.slice(0,i).filter(t=>t.core==='wa').length;
      const np=phrase(T,i);
      if(wasBefore>0) out.push({p:'は',lbl:'Topik sejajar',t:`は dipakai lagi untuk topik sejajar ${q(np)}: beberapa hal diurutkan atau dibandingkan dalam satu kalimat.`});
      else out.push({p:'は',lbl:'Topik',t:`は menandai topik kalimat: ${q(np)} adalah hal yang dibicarakan, dan bagian sesudahnya menjelaskannya. (Ditulis "ha", dibaca "wa".)`});
      continue;
    }
    const f=BASE[c]||SIMPLE[c]; if(!f) continue;
    const [lbl,t]=f(T,i); out.push({p:CHAR[c],lbl,t});
  }
  if(ov)for(const k in ov){const idx=out.findIndex(x=>x.p===CHAR[k]);if(idx>=0)out[idx]={p:CHAR[k],lbl:ov[k][0],t:ov[k][1]}}
  return out;
}

  return analyze;
})();

// Tombol + panel penjelasan partikel di tiap kalimat Bunpou
function renderParticleBox(host, romaji) {
    let list = [];
    try { list = analyzeBunpouParticles(romaji); } catch (e) { list = []; }
    if (!list.length) return;
    const chips = list.map(x => `<span class="font-jp">${esc(x.p)}</span>`).join(' ');
    host.innerHTML = `
        <button type="button" class="partikel-btn mt-2 w-full flex items-center justify-between gap-2 border-2 border-black px-2 py-1 text-xs font-black uppercase hover:bg-black hover:text-white transition-colors">
            <span>Partikel (${list.length}) <span class="normal-case tracking-widest">${chips}</span></span><span class="arrow">&#9662;</span>
        </button>
        <div class="partikel-panel border-2 border-t-0 border-black bg-gray-50 p-2 flex flex-col gap-2">
            ${list.map(x => `
            <div class="flex gap-2 items-start">
                <span class="font-jp font-black text-lg bg-black text-white min-w-[44px] text-center px-1 py-0.5">${esc(x.p)}</span>
                <div class="flex-1 min-w-0">
                    <div class="text-[10px] font-black uppercase tracking-wider text-gray-500">${esc(x.lbl)}</div>
                    <div class="text-xs md:text-sm font-bold leading-snug text-gray-800 break-words">${esc(x.t)}</div>
                </div>
            </div>`).join('')}
        </div>`;
    const btn = host.querySelector('.partikel-btn'), panel = host.querySelector('.partikel-panel');
    btn.addEventListener('click', () => {
        const open = panel.classList.toggle('open');
        btn.querySelector('.arrow').innerHTML = open ? '&#9652;' : '&#9662;';
    });
}
