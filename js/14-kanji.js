// ==========================================
// KANJI N5 (100 huruf) + KUIS
// ==========================================
const KANJI_BAB = [
    { id: 1, t: 'Angka', raw: [
        '一|satu|イチ・イツ|ひと(つ)|一つ:ひとつ:satu (benda)/一人:ひとり:satu orang/一月:いちがつ:Januari',
        '二|dua|ニ|ふた(つ)|二つ:ふたつ:dua (benda)/二人:ふたり:dua orang/二月:にがつ:Februari',
        '三|tiga|サン|み(つ)|三つ:みっつ:tiga (benda)/三人:さんにん:tiga orang/三月:さんがつ:Maret',
        '四|empat|シ|よ(つ)・よん|四つ:よっつ:empat (benda)/四人:よにん:empat orang/四月:しがつ:April',
        '五|lima|ゴ|いつ(つ)|五つ:いつつ:lima (benda)/五人:ごにん:lima orang/五月:ごがつ:Mei',
        '六|enam|ロク|む(つ)|六つ:むっつ:enam (benda)/六時:ろくじ:jam enam/六月:ろくがつ:Juni',
        '七|tujuh|シチ|なな(つ)・なの|七つ:ななつ:tujuh (benda)/七日:なのか:tanggal 7/七月:しちがつ:Juli',
        '八|delapan|ハチ|や(つ)・よう|八つ:やっつ:delapan (benda)/八日:ようか:tanggal 8/八月:はちがつ:Agustus',
        '九|sembilan|キュウ・ク|ここの(つ)|九つ:ここのつ:sembilan (benda)/九時:くじ:jam sembilan/九月:くがつ:September',
        '十|sepuluh|ジュウ|とお|十:とお:sepuluh (benda)/十分:じゅっぷん:sepuluh menit/十月:じゅうがつ:Oktober'
    ] },
    { id: 2, t: 'Angka Besar, Uang & Kalender', raw: [
        '百|seratus|ヒャク|-|百:ひゃく:seratus/三百:さんびゃく:tiga ratus/百円:ひゃくえん:seratus yen',
        '千|seribu|セン|ち|千:せん:seribu/三千:さんぜん:tiga ribu/千円:せんえん:seribu yen',
        '万|sepuluh ribu|マン・バン|-|一万:いちまん:sepuluh ribu/百万:ひゃくまん:satu juta/万年筆:まんねんひつ:pen tinta',
        '円|yen; bulat|エン|まる(い)|円:えん:yen/百円:ひゃくえん:seratus yen/二千円:にせんえん:dua ribu yen',
        '年|tahun|ネン|とし|今年:ことし:tahun ini/来年:らいねん:tahun depan/毎年:まいとし:setiap tahun',
        '日|hari; matahari|ニチ・ジツ|ひ・か|日曜日:にちようび:hari Minggu/毎日:まいにち:setiap hari/二日:ふつか:tanggal 2',
        '月|bulan|ゲツ・ガツ|つき|月曜日:げつようび:hari Senin/今月:こんげつ:bulan ini/一月:いちがつ:Januari',
        '時|waktu; jam|ジ|とき|時間:じかん:waktu/三時:さんじ:jam tiga/時々:ときどき:kadang-kadang',
        '分|menit; bagian|フン・ブン・プン|わ(かる)|五分:ごふん:lima menit/自分:じぶん:diri sendiri/分かります:わかります:mengerti',
        '半|setengah|ハン|なか(ば)|半分:はんぶん:setengah/三時半:さんじはん:jam setengah empat/一時間半:いちじかんはん:satu setengah jam',
        '午|tengah hari|ゴ|-|午前:ごぜん:pagi (a.m.)/午後:ごご:siang atau sore (p.m.)'
    ] },
    { id: 3, t: 'Waktu & Posisi', raw: [
        '前|depan; sebelum|ゼン|まえ|前:まえ:depan/午前:ごぜん:pagi (a.m.)/名前:なまえ:nama',
        '後|belakang; sesudah|ゴ・コウ|あと・うし(ろ)|後ろ:うしろ:belakang/午後:ごご:siang atau sore (p.m.)/後で:あとで:nanti, setelah itu',
        '間|antara; selang|カン・ケン|あいだ・ま|時間:じかん:waktu/一週間:いっしゅうかん:satu minggu/二日間:ふつかかん:selama dua hari',
        '今|sekarang|コン・キン|いま|今:いま:sekarang/今日:きょう:hari ini/今朝:けさ:pagi ini',
        '毎|setiap|マイ|-|毎日:まいにち:setiap hari/毎朝:まいあさ:setiap pagi/毎年:まいとし:setiap tahun',
        '上|atas; naik|ジョウ|うえ・あ(がる)・のぼ(る)|上:うえ:atas/上手:じょうず:pandai/上がります:あがります:naik',
        '下|bawah; turun|カ・ゲ|した・さ(がる)・くだ(さい)|下:した:bawah/下手:へた:tidak pandai/地下鉄:ちかてつ:kereta bawah tanah',
        '中|dalam; tengah|チュウ・ジュウ|なか|中:なか:dalam/一日中:いちにちじゅう:seharian/中国:ちゅうごく:Tiongkok',
        '外|luar|ガイ・ゲ|そと・ほか|外:そと:luar/外国:がいこく:luar negeri/外国人:がいこくじん:orang asing',
        '右|kanan|ウ・ユウ|みぎ|右:みぎ:kanan/右手:みぎて:tangan kanan'
    ] },
    { id: 4, t: 'Arah & Alam', raw: [
        '左|kiri|サ|ひだり|左:ひだり:kiri/左手:ひだりて:tangan kiri',
        '東|timur|トウ|ひがし|東:ひがし:timur/東京:とうきょう:Tokyo',
        '西|barat|セイ・サイ|にし|西:にし:barat/西口:にしぐち:pintu keluar barat',
        '南|selatan|ナン|みなみ|南:みなみ:selatan/南口:みなみぐち:pintu keluar selatan',
        '北|utara|ホク|きた|北:きた:utara/北口:きたぐち:pintu keluar utara/北海道:ほっかいどう:Hokkaido',
        '山|gunung|サン|やま|山:やま:gunung/富士山:ふじさん:Gunung Fuji/火山:かざん:gunung berapi',
        '川|sungai|セン|かわ|川:かわ:sungai/小川:おがわ:anak sungai',
        '水|air|スイ|みず|水:みず:air/水曜日:すいようび:hari Rabu/水道:すいどう:air ledeng',
        '火|api|カ|ひ|火:ひ:api/火曜日:かようび:hari Selasa/火山:かざん:gunung berapi',
        '木|pohon; kayu|モク・ボク|き|木:き:pohon/木曜日:もくようび:hari Kamis'
    ] },
    { id: 5, t: 'Alam & Manusia', raw: [
        '土|tanah|ド・ト|つち|土:つち:tanah/土曜日:どようび:hari Sabtu',
        '金|emas; uang|キン・コン|かね|お金:おかね:uang/金曜日:きんようび:hari Jumat',
        '天|langit|テン|あま|天気:てんき:cuaca/天ぷら:てんぷら:tempura',
        '雨|hujan|ウ|あめ|雨:あめ:hujan/大雨:おおあめ:hujan lebat/雨季:うき:musim hujan',
        '気|semangat; perasaan|キ・ケ|-|天気:てんき:cuaca/元気:げんき:sehat/気をつけて:きをつけて:hati-hati',
        '人|orang|ジン・ニン|ひと|人:ひと:orang/日本人:にほんじん:orang Jepang/三人:さんにん:tiga orang',
        '男|laki-laki|ダン・ナン|おとこ|男:おとこ:laki-laki/男の子:おとこのこ:anak laki-laki/男性:だんせい:pria',
        '女|perempuan|ジョ・ニョ|おんな|女:おんな:perempuan/女の子:おんなのこ:anak perempuan/彼女:かのじょ:dia (perempuan)',
        '子|anak|シ・ス|こ|子供:こども:anak/男の子:おとこのこ:anak laki-laki/女の子:おんなのこ:anak perempuan',
        '母|ibu|ボ|はは|母:はは:ibu (saya)/お母さん:おかあさん:ibu (Anda)'
    ] },
    { id: 6, t: 'Keluarga, Sekolah & Bahasa', raw: [
        '父|ayah|フ|ちち|父:ちち:ayah (saya)/お父さん:おとうさん:ayah (Anda)',
        '友|teman|ユウ|とも|友達:ともだち:teman/友人:ゆうじん:kawan',
        '先|dulu; sebelumnya|セン|さき|先生:せんせい:guru/先週:せんしゅう:minggu lalu/先月:せんげつ:bulan lalu',
        '生|hidup; lahir|セイ・ショウ|い(きる)・う(まれる)・なま|学生:がくせい:pelajar/生まれます:うまれます:lahir/先生:せんせい:guru',
        '学|belajar|ガク|まな(ぶ)|学校:がっこう:sekolah/大学:だいがく:universitas/学生:がくせい:pelajar',
        '校|sekolah|コウ|-|学校:がっこう:sekolah/高校:こうこう:SMA',
        '名|nama|メイ・ミョウ|な|名前:なまえ:nama/有名:ゆうめい:terkenal',
        '語|bahasa; kata|ゴ|かた(る)|日本語:にほんご:bahasa Jepang/英語:えいご:bahasa Inggris',
        '読|membaca|ドク・トク|よ(む)|読みます:よみます:membaca/読書:どくしょ:membaca buku',
        '書|menulis|ショ|か(く)|書きます:かきます:menulis/辞書:じしょ:kamus/図書館:としょかん:perpustakaan'
    ] },
    { id: 7, t: 'Kata Kerja', raw: [
        '行|pergi|コウ・ギョウ|い(く)・おこな(う)|行きます:いきます:pergi/銀行:ぎんこう:bank/旅行:りょこう:perjalanan',
        '来|datang|ライ|く(る)|来ます:きます:datang/来年:らいねん:tahun depan/来週:らいしゅう:minggu depan',
        '出|keluar|シュツ・スイ|で(る)・だ(す)|出ます:でます:keluar/出口:でぐち:pintu keluar/出します:だします:mengeluarkan',
        '入|masuk|ニュウ|い(る)・はい(る)・い(れる)|入ります:はいります:masuk/入口:いりぐち:pintu masuk/入れます:いれます:memasukkan',
        '見|melihat|ケン|み(る)・み(せる)|見ます:みます:melihat/見せます:みせます:memperlihatkan/花見:はなみ:melihat bunga',
        '聞|mendengar; bertanya|ブン・モン|き(く)|聞きます:ききます:mendengar/新聞:しんぶん:koran',
        '話|berbicara; cerita|ワ|はな(す)・はなし|話します:はなします:berbicara/電話:でんわ:telepon/会話:かいわ:percakapan',
        '食|makan|ショク|た(べる)・く(う)|食べます:たべます:makan/食堂:しょくどう:ruang makan/食べ物:たべもの:makanan',
        '休|istirahat; libur|キュウ|やす(む)|休みます:やすみます:istirahat/休み:やすみ:libur/夏休み:なつやすみ:liburan musim panas'
    ] },
    { id: 8, t: 'Sifat & Benda', raw: [
        '大|besar|ダイ・タイ|おお(きい)|大きい:おおきい:besar/大学:だいがく:universitas/大丈夫:だいじょうぶ:tidak apa-apa',
        '小|kecil|ショウ|ちい(さい)・こ|小さい:ちいさい:kecil/小学生:しょうがくせい:siswa SD',
        '高|tinggi; mahal|コウ|たか(い)|高い:たかい:tinggi atau mahal/高校:こうこう:SMA',
        '長|panjang; kepala|チョウ|なが(い)|長い:ながい:panjang/社長:しゃちょう:direktur',
        '白|putih|ハク・ビャク|しろ(い)|白い:しろい:putih/白:しろ:warna putih',
        '本|buku; asal|ホン|もと|本:ほん:buku/日本:にほん:Jepang/一本:いっぽん:satu batang',
        '車|mobil; kendaraan|シャ|くるま|車:くるま:mobil/電車:でんしゃ:kereta listrik/自転車:じてんしゃ:sepeda',
        '電|listrik|デン|-|電車:でんしゃ:kereta listrik/電話:でんわ:telepon/電気:でんき:listrik',
        '何|apa|カ|なに・なん|何:なに:apa/何時:なんじ:jam berapa/何人:なんにん:berapa orang',
        '国|negara|コク|くに|国:くに:negara/外国:がいこく:luar negeri/中国:ちゅうごく:Tiongkok'
    ] },
    { id: 9, t: 'Musim & Waktu Harian', raw: [
        '春|musim semi|シュン|はる|春:はる:musim semi/春休み:はるやすみ:liburan musim semi',
        '夏|musim panas|カ|なつ|夏:なつ:musim panas/夏休み:なつやすみ:liburan musim panas',
        '秋|musim gugur|シュウ|あき|秋:あき:musim gugur',
        '冬|musim dingin|トウ|ふゆ|冬:ふゆ:musim dingin/冬休み:ふゆやすみ:liburan musim dingin',
        '朝|pagi|チョウ|あさ|朝:あさ:pagi/毎朝:まいあさ:setiap pagi/今朝:けさ:pagi ini',
        '昼|siang|チュウ|ひる|昼:ひる:siang/昼ご飯:ひるごはん:makan siang/昼休み:ひるやすみ:istirahat siang',
        '夜|malam|ヤ|よる|夜:よる:malam/今夜:こんや:malam ini/夜中:よなか:tengah malam'
    ] },
    { id: 10, t: 'Tempat & Kata Kerja Tambahan', raw: [
        '家|rumah; keluarga|カ・ケ|いえ・うち|家:いえ:rumah/家族:かぞく:keluarga',
        '会|bertemu; pertemuan|カイ・エ|あ(う)|会います:あいます:bertemu/会社:かいしゃ:perusahaan/会話:かいわ:percakapan',
        '社|perusahaan; kuil|シャ|やしろ|会社:かいしゃ:perusahaan/社長:しゃちょう:direktur/会社員:かいしゃいん:karyawan',
        '駅|stasiun|エキ|-|駅:えき:stasiun/駅前:えきまえ:depan stasiun',
        '店|toko|テン|みせ|店:みせ:toko/喫茶店:きっさてん:kedai kopi/店員:てんいん:pegawai toko',
        '買|membeli|バイ|か(う)|買います:かいます:membeli/買い物:かいもの:belanja',
        '飲|minum|イン|の(む)|飲みます:のみます:minum/飲み物:のみもの:minuman',
        '言|berkata|ゲン・ゴン|い(う)・こと|言います:いいます:berkata/言葉:ことば:kata'
    ] },
    { id: 11, t: 'Hewan & Makanan', raw: [
        '犬|anjing|ケン|いぬ|犬:いぬ:anjing/子犬:こいぬ:anak anjing',
        '猫|kucing|ビョウ|ねこ|猫:ねこ:kucing/子猫:こねこ:anak kucing',
        '魚|ikan|ギョ|さかな・うお|魚:さかな:ikan/金魚:きんぎょ:ikan mas',
        '肉|daging|ニク|-|肉:にく:daging/牛肉:ぎゅうにく:daging sapi/豚肉:ぶたにく:daging babi',
        '花|bunga|カ|はな|花:はな:bunga/花見:はなみ:melihat bunga/花瓶:かびん:vas bunga'
    ] }
];
const KANJI = [];
KANJI_BAB.forEach(b => b.raw.forEach(line => {
    const p = line.split('|');
    KANJI.push({ k: p[0], m: p[1], on: p[2], kun: p[3], bab: b.id,
        ex: p[4].split('/').map(x => { const q = x.split(':'); return { w: q[0], r: q[1], a: q[2] }; }) });
}));

let kanjiDone = new Set();
try { kanjiDone = new Set(JSON.parse(lsGet('n5_kanjiDone') || '[]')); } catch (e) {}
const saveKanjiDone = () => lsSet('n5_kanjiDone', JSON.stringify([...kanjiDone]));
let currentKanjiTab = parseInt(lsGet('n5_kanjiTab'), 10) || 1;
if (lsGet('n5_kanjiTab') === 'kuis') currentKanjiTab = 'kuis';
if (!PREMIUM && currentKanjiTab !== 'kuis' && currentKanjiTab !== FREE_LIMIT.kanji) currentKanjiTab = FREE_LIMIT.kanji;
const kjBab = (id) => KANJI_BAB.find(b => b.id === id);
const kjOfBab = (id) => KANJI.filter(k => k.bab === id);

function renderKanjiNav() {
    const nav = document.getElementById('kanji-nav');
    nav.innerHTML = '';
    const tabs = KANJI_BAB.map(b => ({ id: b.id, label: 'Bab ' + b.id })).concat([{ id: 'kuis', label: 'Kuis' }]);
    tabs.forEach(t => {
        const locked = t.id !== 'kuis' && !canOpen('kanji', t.id);
        const b = document.createElement('button');
        const active = t.id === currentKanjiTab;
        b.className = `flex-shrink-0 px-3 py-1 border-2 border-black font-bold text-xs transition-colors ${active ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200'}`;
        b.textContent = t.label + (locked ? ' \uD83D\uDD12' : '');
        b.addEventListener('click', () => selectKanjiTab(t.id));
        nav.appendChild(b);
    });
    const act = nav.querySelector('.bg-black');
    if (act) act.scrollIntoView({ inline: 'center', block: 'nearest' });
}
function selectKanjiTab(id) {
    if (id !== 'kuis' && !canOpen('kanji', id)) { openPremiumModal('Bab kanji ini hanya tersedia untuk pengguna premium.'); return; }
    currentKanjiTab = id;
    lsSet('n5_kanjiTab', id);
    renderKanjiNav(); renderKanjiContent();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
function kanjiProgressHtml(done, total) {
    return `<div class="flex items-center gap-2 mb-3"><span class="text-xs font-black font-mono whitespace-nowrap">${done}/${total}</span><div class="flex-1 h-3 border-2 border-black bg-white"><div class="h-full bg-black transition-all duration-300" style="width:${total ? done / total * 100 : 0}%"></div></div></div>`;
}
function renderKanjiContent() {
    const box = document.getElementById('kanji-content');
    if (currentKanjiTab === 'kuis') { renderKanjiQuizSetup(); return; }
    const bab = kjBab(currentKanjiTab) || KANJI_BAB[0];
    const list = kjOfBab(bab.id);
    const done = list.filter(k => kanjiDone.has(k.k)).length;
    box.innerHTML = `
        <h2 class="text-xl md:text-2xl font-black mb-1 uppercase border-b-4 border-black inline-block pb-0.5">Bab ${bab.id}: ${esc(bab.t)}</h2>
        <p class="text-xs font-bold text-gray-600 mb-3">Ketuk kanji untuk melihat arti, bacaan on dan kun, serta contoh kata.</p>
        ${kanjiProgressHtml(done, list.length)}
        <div class="grid grid-cols-3 sm:grid-cols-4 gap-2 md:gap-3">
            ${list.map((k, i) => `
            <button data-i="${i}" class="kj-tile relative border-2 border-black bg-white p-2 flex flex-col items-center hover:shadow-solid-sm transition-all ${kanjiDone.has(k.k) ? 'bg-gray-100' : ''}">
                ${kanjiDone.has(k.k) ? '<span class="absolute top-1 right-1.5 text-xs font-black">&#10003;</span>' : ''}
                <span class="font-jp text-4xl md:text-5xl font-black leading-tight">${esc(k.k)}</span>
                <span class="text-[11px] font-bold text-gray-600 text-center leading-tight mt-1">${esc(k.m)}</span>
            </button>`).join('')}
        </div>
        <button id="kj-study" class="w-full mt-4 border-2 border-black bg-black text-white py-2 font-bold text-sm uppercase hover:bg-white hover:text-black transition-colors">Uji bab ini (Kuis)</button>`;
    box.querySelectorAll('.kj-tile').forEach(b => b.addEventListener('click', () => openKanjiDetail(list, parseInt(b.dataset.i, 10))));
    document.getElementById('kj-study').addEventListener('click', () => { kq.scope = bab.id; selectKanjiTab('kuis'); startKanjiQuiz(bab.id); });
}

// ----- Modal detail -----
let kjCtx = { list: [], i: 0 };
function openKanjiDetail(list, i) {
    kjCtx = { list, i };
    renderKanjiDetail();
    const m = document.getElementById('kj-modal');
    m.classList.remove('hidden'); m.classList.add('flex');
}
function closeKanjiDetail() {
    const m = document.getElementById('kj-modal');
    m.classList.add('hidden'); m.classList.remove('flex');
    if (currentKanjiTab !== 'kuis' && document.getElementById('view-kanji') && !document.getElementById('view-kanji').classList.contains('hidden')) renderKanjiContent();
}
function renderKanjiDetail() {
    const k = kjCtx.list[kjCtx.i];
    const isDone = kanjiDone.has(k.k);
    document.getElementById('kj-body').innerHTML = `
        <div class="text-center">
            <div class="text-[10px] font-bold uppercase tracking-wider text-gray-500">${kjCtx.i + 1} / ${kjCtx.list.length}</div>
            <div class="font-jp text-8xl font-black leading-tight">${esc(k.k)}</div>
            <div class="text-2xl font-black leading-tight">${esc(k.m)}</div>
        </div>
        <div class="grid grid-cols-2 gap-2 mt-4">
            <div class="border-2 border-black p-2 text-center"><div class="text-[10px] font-black uppercase tracking-wider text-gray-500">On (音)</div><div class="font-jp text-base font-bold break-words">${esc(k.on === '-' ? '-' : k.on)}</div></div>
            <div class="border-2 border-black p-2 text-center"><div class="text-[10px] font-black uppercase tracking-wider text-gray-500">Kun (訓)</div><div class="font-jp text-base font-bold break-words">${esc(k.kun === '-' ? '-' : k.kun)}</div></div>
        </div>
        <div class="mt-4">
            <div class="text-[10px] font-black uppercase tracking-wider text-gray-500 mb-1">Contoh kata</div>
            <div class="flex flex-col gap-1.5">
                ${k.ex.map(e => `
                <div class="border-2 border-black p-2 flex items-center justify-between gap-2">
                    <span class="font-jp text-xl font-black leading-[2]">${hasKanji(e.w) ? `<ruby>${esc(e.w)}<rt>${esc(e.r)}</rt></ruby>` : esc(e.w)}</span>
                    <span class="text-sm font-bold text-right">${esc(e.a)}</span>
                </div>`).join('')}
            </div>
        </div>
        <div class="grid grid-cols-2 gap-2 mt-4">
            <button id="kj-speak" class="border-2 border-black py-2 font-bold text-xs uppercase hover:bg-black hover:text-white transition-colors">&#128266; Suara</button>
            <button id="kj-done" class="border-2 border-black py-2 font-bold text-xs uppercase transition-colors ${isDone ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'}">${isDone ? '&#10003; Sudah hafal' : 'Tandai hafal'}</button>
        </div>
        <div class="grid grid-cols-2 gap-2 mt-2">
            <button id="kj-prev" class="border-2 border-black py-2 font-bold text-xs uppercase hover:bg-black hover:text-white transition-colors ${kjCtx.i === 0 ? 'opacity-30 pointer-events-none' : ''}">&#9664; Sebelumnya</button>
            <button id="kj-next" class="border-2 border-black py-2 font-bold text-xs uppercase hover:bg-black hover:text-white transition-colors ${kjCtx.i >= kjCtx.list.length - 1 ? 'opacity-30 pointer-events-none' : ''}">Berikutnya &#9654;</button>
        </div>`;
    document.getElementById('kj-prev').addEventListener('click', () => { if (kjCtx.i > 0) { kjCtx.i--; renderKanjiDetail(); } });
    document.getElementById('kj-next').addEventListener('click', () => { if (kjCtx.i < kjCtx.list.length - 1) { kjCtx.i++; renderKanjiDetail(); } });
    document.getElementById('kj-done').addEventListener('click', () => { if (kanjiDone.has(k.k)) kanjiDone.delete(k.k); else kanjiDone.add(k.k); saveKanjiDone(); renderKanjiDetail(); });
    const sp = document.getElementById('kj-speak');
    if (!('speechSynthesis' in window)) sp.classList.add('hidden');
    sp.addEventListener('click', () => { try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(k.ex[0].r); u.lang = 'ja-JP'; u.rate = 0.85; speechSynthesis.speak(u); } catch (e) {} });
}
document.getElementById('kj-close').addEventListener('click', closeKanjiDetail);
document.getElementById('kj-modal').addEventListener('click', (e) => { if (e.target.id === 'kj-modal') closeKanjiDetail(); });
document.addEventListener('keydown', (e) => {
    const m = document.getElementById('kj-modal');
    if (m.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeKanjiDetail();
    else if (e.key === 'ArrowRight' && kjCtx.i < kjCtx.list.length - 1) { kjCtx.i++; renderKanjiDetail(); }
    else if (e.key === 'ArrowLeft' && kjCtx.i > 0) { kjCtx.i--; renderKanjiDetail(); }
});

// ----- Kuis kanji -----
const kq = { scope: 'all', qs: [], i: 0, score: 0, answered: false };
const shuffleArr = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
function kjPool(scope) {
    const open = KANJI.filter(k => canOpen('kanji', k.bab));
    return scope === 'all' ? open : open.filter(k => k.bab === scope);
}
function renderKanjiQuizSetup() {
    const box = document.getElementById('kanji-content');
    const opts = ['<option value="all">Semua bab yang terbuka</option>'].concat(KANJI_BAB.map(b => {
        const lk = !canOpen('kanji', b.id);
        return `<option value="${b.id}" ${lk ? 'disabled' : ''} ${String(kq.scope) === String(b.id) ? 'selected' : ''}>Bab ${b.id}: ${esc(b.t)}${lk ? ' \uD83D\uDD12' : ''}</option>`;
    }));
    box.innerHTML = `
        <h2 class="text-xl md:text-2xl font-black mb-1 uppercase border-b-4 border-black inline-block pb-0.5">Kuis Kanji</h2>
        <p class="text-sm font-bold text-gray-600 mb-3">10 soal acak: arti kanji, mencari kanji dari arti, dan membaca kata.</p>
        <label class="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Materi kuis</label>
        <select id="kq-scope" class="w-full border-2 border-black bg-white px-2 py-2 font-bold text-sm mb-3">${opts.join('')}</select>
        <button id="kq-start" class="w-full border-2 border-black bg-black text-white py-2 font-bold text-sm uppercase hover:bg-white hover:text-black transition-colors">Mulai Kuis</button>
        ${PREMIUM ? '' : '<p class="text-[11px] font-bold text-gray-500 text-center mt-3">&#128274; Versi gratis: kuis hanya memakai kanji Bab 1.</p>'}`;
    document.getElementById('kq-scope').addEventListener('change', (e) => { kq.scope = e.target.value === 'all' ? 'all' : parseInt(e.target.value, 10); });
    document.getElementById('kq-start').addEventListener('click', () => startKanjiQuiz(kq.scope));
}
function makeKanjiQuestion(k, type) {
    const others = KANJI.filter(x => x.k !== k.k);
    if (type === 3) {
        const withKanji = k.ex.filter(e => hasKanji(e.w));
        if (!withKanji.length) type = 1; else {
            const e = withKanji[Math.floor(Math.random() * withKanji.length)];
            const wrong = shuffleArr(others.flatMap(x => x.ex).filter(x => x.r !== e.r && hasKanji(x.w)).map(x => x.r)).filter((r, i, a) => a.indexOf(r) === i).slice(0, 3);
            return { q: 'Bagaimana cara membaca kata ini?', big: e.w, opts: shuffleArr([e.r].concat(wrong)), ans: e.r, info: `${e.w} (${e.r}) = ${e.a}`, jp: true, k };
        }
    }
    if (type === 2) {
        const wrong = shuffleArr(others.filter(x => x.m !== k.m)).slice(0, 3).map(x => x.k);
        return { q: 'Kanji mana yang berarti', big: '"' + k.m + '"', opts: shuffleArr([k.k].concat(wrong)), ans: k.k, jp: true, optJp: true, k };
    }
    const wrong = shuffleArr(others.filter(x => x.m !== k.m)).slice(0, 3).map(x => x.m);
    return { q: 'Apa arti kanji ini?', big: k.k, opts: shuffleArr([k.m].concat(wrong)), ans: k.m, bigJp: true, k };
}
function startKanjiQuiz(scope) {
    kq.scope = scope;
    const pool = kjPool(scope);
    if (!pool.length) { openPremiumModal(); return; }
    const picks = shuffleArr(pool);
    const qs = [];
    for (let i = 0; i < 10; i++) qs.push(makeKanjiQuestion(picks[i % picks.length], 1 + Math.floor(Math.random() * 3)));
    Object.assign(kq, { qs, i: 0, score: 0, answered: false });
    renderKanjiQuestion();
}
function renderKanjiQuestion() {
    const box = document.getElementById('kanji-content');
    if (kq.i >= kq.qs.length) {
        const total = kq.qs.length;
        box.innerHTML = `
            <div class="border-2 border-black bg-white shadow-solid p-6 text-center">
                <div class="text-[10px] font-bold uppercase tracking-wider text-gray-500">Skor akhir</div>
                <div class="text-5xl font-black my-2">${kq.score}/${total}</div>
                <p class="text-sm font-bold mb-4">${kq.score >= total * 0.8 ? 'Hebat! Kanjimu sudah kuat.' : kq.score >= total * 0.5 ? 'Lumayan, ulangi kanji yang masih salah.' : 'Pelajari lagi kanjinya, lalu coba kuis lagi.'}</p>
                <button id="kq-again" class="w-full border-2 border-black bg-black text-white py-2 font-bold text-sm uppercase hover:bg-white hover:text-black transition-colors">Ulangi (soal diacak)</button>
                <button id="kq-setup" class="w-full mt-2 border-2 border-black py-2 font-bold text-sm uppercase hover:bg-black hover:text-white transition-colors">Ganti materi</button>
            </div>`;
        document.getElementById('kq-again').addEventListener('click', () => startKanjiQuiz(kq.scope));
        document.getElementById('kq-setup').addEventListener('click', renderKanjiQuizSetup);
        return;
    }
    const q = kq.qs[kq.i];
    box.innerHTML = `
        <div class="flex justify-between items-center mb-2 text-xs font-black uppercase"><span>Soal ${kq.i + 1} / ${kq.qs.length}</span><span>Skor: ${kq.score}</span></div>
        <div class="w-full h-2.5 border-2 border-black bg-white mb-4"><div class="h-full bg-black" style="width:${kq.i / kq.qs.length * 100}%"></div></div>
        <div class="border-2 border-black bg-white shadow-solid p-4 mb-3 text-center">
            <div class="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">${esc(q.q)}</div>
            <div class="${q.bigJp || q.jp && !q.optJp ? 'font-jp' : ''} ${q.bigJp ? 'text-7xl' : 'text-3xl'} font-black leading-tight break-words">${esc(q.big)}</div>
        </div>
        <div id="kq-opts" class="grid grid-cols-2 gap-2 mb-3">
            ${q.opts.map(o => `<button data-v="${esc(o)}" class="kq-opt border-2 border-black bg-white py-3 px-1 ${q.optJp || (/[\u3040-\u30ff\u4e00-\u9fff]/.test(o)) ? 'font-jp text-2xl' : 'text-sm'} font-black hover:bg-gray-200 transition-colors break-words">${esc(o)}</button>`).join('')}
        </div>
        <div id="kq-fb" class="hidden"></div>`;
    kq.answered = false;
    box.querySelectorAll('.kq-opt').forEach(btn => btn.addEventListener('click', () => {
        if (kq.answered) return; kq.answered = true;
        const v = btn.dataset.v, ok = v === q.ans;
        if (ok) kq.score++;
        box.querySelectorAll('.kq-opt').forEach(b => {
            if (b.dataset.v === q.ans) { b.classList.remove('bg-white'); b.classList.add('bg-black', 'text-white'); }
            else if (b === btn) b.classList.add('line-through', 'bg-gray-200');
            b.classList.remove('hover:bg-gray-200');
        });
        const k = q.k, fb = document.getElementById('kq-fb');
        fb.classList.remove('hidden');
        fb.innerHTML = `
            <div class="border-2 border-black bg-white p-3">
                <div class="font-black text-sm uppercase mb-1">${ok ? 'Benar!' : 'Kurang tepat. Jawaban: ' + esc(q.ans)}</div>
                <div class="text-sm font-bold text-gray-700 mb-3"><span class="font-jp text-lg font-black">${esc(k.k)}</span> = ${esc(k.m)} &middot; On: <span class="font-jp">${esc(k.on)}</span> &middot; Kun: <span class="font-jp">${esc(k.kun)}</span>${q.info ? '<br>' + esc(q.info) : ''}</div>
                <button id="kq-next" class="w-full border-2 border-black bg-black text-white py-2 font-bold text-sm uppercase hover:bg-white hover:text-black transition-colors">${kq.i + 1 >= kq.qs.length ? 'Lihat skor' : 'Berikutnya'}</button>
            </div>`;
        document.getElementById('kq-next').addEventListener('click', () => { kq.i++; renderKanjiQuestion(); window.scrollTo({ top: 0 }); });
    }));
}
let kanjiRendered = false;
function showKanjiView() {
    if (!kanjiRendered) { kanjiRendered = true; renderKanjiNav(); renderKanjiContent(); }
    else { renderKanjiNav(); if (currentKanjiTab !== 'kuis') renderKanjiContent(); }
}


function renderKanjiHome() {
    const d = KANJI.filter(k => kanjiDone.has(k.k)).length;
    document.getElementById('home-kanji-text').textContent = d + '/' + KANJI.length;
    document.getElementById('home-kanji-bar').style.width = (d / KANJI.length * 100) + '%';
}
document.getElementById('home-kanji-btn').addEventListener('click', () => switchView('Kanji'));
