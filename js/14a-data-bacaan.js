// ==========================================
// DATA BACAAN PANJANG (長文読解) N5
// Markup furigana: [漢字|よみ]. Kanji di luar daftar N5 ditulis dengan hiragana.
// Struktur: id, jp (judul), t (judul Indonesia), tag (jenis teks),
//           p: paragraf {j, m}, v: kosakata {w, r, a}, q: soal {q, qm, o[4], a (indeks benar), e (pembahasan)}
// ==========================================
const BACAAN = [
{
  id: 1, jp: 'じこしょうかい', t: 'Perkenalan Diri', tag: 'Perkenalan',
  p: [
    { j: 'はじめまして。[私|わたし]は [田中|たなか] ゆきです。[日本人|にほんじん]です。[大学生|だいがくせい]です。', m: 'Perkenalkan. Saya Tanaka Yuki. Saya orang Jepang. Saya seorang mahasiswa.' },
    { j: '[十九|じゅうきゅう]さいです。[家族|かぞく]は [四人|よにん]です。[父|ちち]と [母|はは]と いもうとが います。', m: 'Saya berusia 19 tahun. Keluarga saya ada empat orang. Ada ayah, ibu, dan adik perempuan.' },
    { j: '[休|やす]みの [日|ひ]は えいがを [見|み]ます。おんがくも [聞|き]きます。', m: 'Pada hari libur, saya menonton film. Saya juga mendengarkan musik.' },
    { j: '[毎日|まいにち]、[大学|だいがく]で えいごを [勉強|べんきょう]します。どうぞ よろしく おねがいします。', m: 'Setiap hari, saya belajar bahasa Inggris di universitas. Mohon bantuannya (salam kenal).' }
  ],
  v: [
    { w: 'はじめまして', r: 'hajimemashite', a: 'perkenalkan (salam saat pertama bertemu)' },
    { w: '[日本人|にほんじん]', r: 'nihonjin', a: 'orang Jepang' },
    { w: '[大学生|だいがくせい]', r: 'daigakusei', a: 'mahasiswa' },
    { w: '[家族|かぞく]', r: 'kazoku', a: 'keluarga' },
    { w: '[四人|よにん]', r: 'yonin', a: 'empat orang' },
    { w: '[父|ちち]・[母|はは]', r: 'chichi, haha', a: 'ayah saya, ibu saya' },
    { w: 'いもうと', r: 'imouto', a: 'adik perempuan (saya)' },
    { w: '[休|やす]みの [日|ひ]', r: 'yasumi no hi', a: 'hari libur' },
    { w: 'えいが', r: 'eiga', a: 'film' },
    { w: '[勉強|べんきょう]します', r: 'benkyou shimasu', a: 'belajar' },
    { w: 'どうぞ よろしく おねがいします', r: 'douzo yoroshiku onegaishimasu', a: 'mohon bantuannya / senang berkenalan' }
  ],
  q: [
    { q: '[田中|たなか]さんは なにですか。', qm: 'Tanaka-san itu apa (status/pekerjaannya)?',
      o: ['[日本人|にほんじん]の [先生|せんせい]', '[日本人|にほんじん]の [大学生|だいがくせい]', '[中国人|ちゅうごくじん]の [大学生|だいがくせい]', '[日本人|にほんじん]の [会社員|かいしゃいん]'], a: 1,
      e: 'Teks menyebut 日本人です dan 大学生です. Jadi Tanaka-san orang Jepang yang berstatus mahasiswa.' },
    { q: '[田中|たなか]さんの [家族|かぞく]は なんにんですか。', qm: 'Keluarga Tanaka-san ada berapa orang?',
      o: ['[三人|さんにん]', '[四人|よにん]', '[五人|ごにん]', '[六人|ろくにん]'], a: 1,
      e: 'Tertulis 家族は四人です: ayah, ibu, adik perempuan, dan Tanaka-san sendiri.' },
    { q: '[休|やす]みの [日|ひ]に [田中|たなか]さんは なにを しますか。', qm: 'Apa yang dilakukan Tanaka-san pada hari libur?',
      o: ['えいがを [見|み]ます', 'おんがくを うたいます', '[本|ほん]を [書|か]きます', '[友|とも]だちと [食|た]べます'], a: 0,
      e: 'Kalimatnya 休みの日はえいがを見ます. Musik hanya "didengarkan" (聞きます), bukan dinyanyikan.' },
    { q: '[田中|たなか]さんは [大学|だいがく]で なにを [勉強|べんきょう]しますか。', qm: 'Apa yang dipelajari Tanaka-san di universitas?',
      o: ['にほんご', 'えいご', 'ちゅうごくご', 'かんこくご'], a: 1,
      e: 'Teks: 毎日、大学でえいごを勉強します. えいご = bahasa Inggris.' }
  ]
},
{
  id: 2, jp: '[私|わたし]の [一日|いちにち]', t: 'Rutinitas Harian', tag: 'Cerita',
  p: [
    { j: '[私|わたし]は [毎朝|まいあさ] 6[時|じ]に おきます。それから、シャワーを あびます。', m: 'Setiap pagi saya bangun pukul 6. Lalu saya mandi (shower).' },
    { j: '[朝|あさ]ごはんは パンと ぎゅうにゅうです。7[時|じ][半|はん]に うちを [出|で]ます。', m: 'Sarapan saya roti dan susu. Pukul 7.30 saya keluar dari rumah.' },
    { j: '[駅|えき]まで あるいて いきます。[電車|でんしゃ]で [会社|かいしゃ]へ [行|い]きます。', m: 'Saya berjalan kaki sampai stasiun. Saya pergi ke kantor naik kereta.' },
    { j: '[会社|かいしゃ]は 9[時|じ]から 5[時|じ]までです。[昼|ひる]ごはんは [会社|かいしゃ]の ちかくの [店|みせ]で [食|た]べます。', m: 'Kantor dari pukul 9 sampai pukul 5. Makan siang saya makan di toko (kedai) dekat kantor.' },
    { j: '[夜|よる]は 7[時|じ]に うちへ [帰|かえ]ります。そして、11[時|じ]に ねます。', m: 'Malam hari saya pulang ke rumah pukul 7. Lalu saya tidur pukul 11.' }
  ],
  v: [
    { w: '[毎朝|まいあさ]', r: 'maiasa', a: 'setiap pagi' },
    { w: 'おきます', r: 'okimasu', a: 'bangun' },
    { w: 'シャワーを あびます', r: 'shawaa o abimasu', a: 'mandi (shower)' },
    { w: '[朝|あさ]ごはん', r: 'asagohan', a: 'sarapan' },
    { w: '[出|で]ます', r: 'demasu', a: 'keluar / berangkat' },
    { w: 'あるいて', r: 'aruite', a: 'dengan berjalan kaki' },
    { w: '[電車|でんしゃ]', r: 'densha', a: 'kereta listrik' },
    { w: '[会社|かいしゃ]', r: 'kaisha', a: 'perusahaan / kantor' },
    { w: '[昼|ひる]ごはん', r: 'hirugohan', a: 'makan siang' },
    { w: '[帰|かえ]ります', r: 'kaerimasu', a: 'pulang' },
    { w: 'ねます', r: 'nemasu', a: 'tidur' },
    { w: 'そして', r: 'soshite', a: 'lalu / dan' }
  ],
  q: [
    { q: '[私|わたし]は なんじに おきますか。', qm: 'Pukul berapa saya bangun?',
      o: ['5[時|じ]', '6[時|じ]', '7[時|じ]', '7[時|じ][半|はん]'], a: 1,
      e: 'Teks: 毎朝6時におきます. Pukul 7.30 adalah waktu keluar rumah.' },
    { q: '[私|わたし]は どうやって [駅|えき]まで いきますか。', qm: 'Bagaimana saya pergi sampai stasiun?',
      o: ['[電車|でんしゃ]で', 'バスで', 'あるいて', 'じてんしゃで'], a: 2,
      e: 'Teks: 駅まであるいていきます. Kereta (電車) dipakai dari stasiun menuju kantor.' },
    { q: '[会社|かいしゃ]は なんじまでですか。', qm: 'Kantor buka sampai pukul berapa?',
      o: ['9[時|じ]まで', '7[時|じ]まで', '5[時|じ]まで', '11[時|じ]まで'], a: 2,
      e: 'Teks: 会社は9時から5時までです. Jadi tutup pukul 5.' },
    { q: '[私|わたし]は [昼|ひる]ごはんを どこで [食|た]べますか。', qm: 'Di mana saya makan siang?',
      o: ['うちで', '[会社|かいしゃ]の ちかくの [店|みせ]で', '[駅|えき]で', '[学校|がっこう]で'], a: 1,
      e: 'Teks: 昼ごはんは会社のちかくの店で食べます (di toko dekat kantor).' }
  ]
},
{
  id: 3, jp: 'にちようびの かいもの', t: 'Belanja Hari Minggu', tag: 'Cerita (lampau)',
  p: [
    { j: 'きのうは [日曜日|にちようび]でした。[天気|てんき]が よかったです。', m: 'Kemarin hari Minggu. Cuacanya bagus.' },
    { j: '[友|とも]だちと デパートへ かいものに [行|い]きました。デパートは [駅|えき]の [前|まえ]に あります。', m: 'Saya pergi berbelanja ke department store bersama teman. Department store itu ada di depan stasiun.' },
    { j: '[私|わたし]は [白|しろ]い シャツを [買|か]いました。2,000[円|えん]でした。', m: 'Saya membeli kemeja putih. Harganya 2.000 yen.' },
    { j: '[友|とも]だちは [新|あたら]しい くつを [買|か]いました。', m: 'Teman saya membeli sepatu baru.' },
    { j: 'それから、カフェで コーヒーを [飲|の]みました。[楽|たの]しい [日|ひ]でした。', m: 'Setelah itu, kami minum kopi di kafe. Hari yang menyenangkan.' }
  ],
  v: [
    { w: '[日曜日|にちようび]', r: 'nichiyoubi', a: 'hari Minggu' },
    { w: '[天気|てんき]', r: 'tenki', a: 'cuaca' },
    { w: 'よかったです', r: 'yokatta desu', a: 'bagus (bentuk lampau dari いい)' },
    { w: '[友|とも]だち', r: 'tomodachi', a: 'teman' },
    { w: 'かいもの', r: 'kaimono', a: 'belanja' },
    { w: '[駅|えき]の [前|まえ]', r: 'eki no mae', a: 'di depan stasiun' },
    { w: '[白|しろ]い', r: 'shiroi', a: 'putih' },
    { w: '[円|えん]', r: 'en', a: 'yen' },
    { w: '[新|あたら]しい', r: 'atarashii', a: 'baru' },
    { w: 'くつ', r: 'kutsu', a: 'sepatu' },
    { w: '[楽|たの]しい', r: 'tanoshii', a: 'menyenangkan' }
  ],
  q: [
    { q: 'デパートは どこに ありますか。', qm: 'Department store ada di mana?',
      o: ['[駅|えき]の [前|まえ]', '[駅|えき]の [後|うし]ろ', '[学校|がっこう]の となり', 'こうえんの [中|なか]'], a: 0,
      e: 'Teks: デパートは駅の前にあります (di depan stasiun).' },
    { q: '[私|わたし]は なにを いくらで [買|か]いましたか。', qm: 'Apa yang saya beli dan berapa harganya?',
      o: ['[白|しろ]い シャツ、2,000[円|えん]', '[白|しろ]い くつ、2,000[円|えん]', '[白|しろ]い シャツ、12,000[円|えん]', '[新|あたら]しい くつ、200[円|えん]'], a: 0,
      e: 'Teks: 白いシャツを買いました。2,000円でした. Sepatu baru dibeli oleh teman, bukan saya.' },
    { q: '[友|とも]だちは なにを [買|か]いましたか。', qm: 'Apa yang dibeli teman saya?',
      o: ['[白|しろ]い シャツ', '[新|あたら]しい くつ', 'コーヒー', '[新|あたら]しい シャツ'], a: 1,
      e: 'Teks: 友だちは新しいくつを買いました.' },
    { q: '[私|わたし]と [友|とも]だちは カフェで なにを [飲|の]みましたか。', qm: 'Apa yang saya dan teman minum di kafe?',
      o: ['こうちゃ', 'コーヒー', 'ぎゅうにゅう', 'みず'], a: 1,
      e: 'Teks: カフェでコーヒーを飲みました.' }
  ]
},
{
  id: 4, jp: 'ともだちへの メール', t: 'Surel untuk Teman', tag: 'Surel',
  p: [
    { j: '[山田|やまだ]さんへ', m: 'Kepada Yamada-san' },
    { j: 'こんにちは。[元気|げんき]ですか。[私|わたし]は [元気|げんき]です。', m: 'Halo. Apa kabar? Saya baik-baik saja.' },
    { j: 'こんどの [土曜日|どようび]に いっしょに えいがを [見|み]に いきませんか。', m: 'Maukah kamu pergi menonton film bersama pada Sabtu yang akan datang?' },
    { j: 'えいがは 1[時|じ]からです。[駅|えき]で 12[時|じ][半|はん]に [会|あ]いましょう。', m: 'Filmnya mulai pukul 1. Mari bertemu di stasiun pukul 12.30.' },
    { j: 'へんじを ください。', m: 'Mohon balasannya.' },
    { j: '[鈴木|すずき]より', m: 'Dari Suzuki' }
  ],
  v: [
    { w: '[元気|げんき]', r: 'genki', a: 'sehat / baik-baik saja' },
    { w: 'こんど', r: 'kondo', a: 'kali ini / yang akan datang' },
    { w: '[土曜日|どようび]', r: 'doyoubi', a: 'hari Sabtu' },
    { w: 'いっしょに', r: 'issho ni', a: 'bersama-sama' },
    { w: '[見|み]に いきます', r: 'mi ni ikimasu', a: 'pergi untuk menonton (V-stem + に行きます)' },
    { w: '〜ませんか', r: '-masen ka', a: 'maukah ...? (ajakan sopan)' },
    { w: '〜ましょう', r: '-mashou', a: 'mari ... (ajakan)' },
    { w: '[会|あ]います', r: 'aimasu', a: 'bertemu' },
    { w: 'へんじ', r: 'henji', a: 'balasan / jawaban' },
    { w: '〜より', r: '-yori', a: 'dari ... (pengirim surat)' }
  ],
  q: [
    { q: '[鈴木|すずき]さんは [山田|やまだ]さんに なにを いいましたか。', qm: 'Apa yang dikatakan (diajak) Suzuki-san kepada Yamada-san?',
      o: ['いっしょに えいがを [見|み]ませんか', 'いっしょに [買|か]いものに いきませんか', 'いっしょに ごはんを [食|た]べませんか', 'いっしょに [勉強|べんきょう]しませんか'], a: 0,
      e: 'Teks: いっしょにえいがを見にいきませんか. Pola 〜ませんか adalah ajakan sopan.' },
    { q: 'えいがは いつですか。', qm: 'Kapan filmnya?',
      o: ['こんどの [土曜日|どようび]', 'こんどの [日曜日|にちようび]', 'きのう', '[毎週|まいしゅう]の [土曜日|どようび]'], a: 0,
      e: 'Teks: こんどの土曜日に ... (Sabtu yang akan datang).' },
    { q: 'ふたりは どこで [会|あ]いますか。', qm: 'Di mana mereka berdua akan bertemu?',
      o: ['えいがかんで', '[駅|えき]で', 'デパートで', '[大学|だいがく]で'], a: 1,
      e: 'Teks: 駅で12時半に会いましょう (di stasiun).' },
    { q: 'ふたりは なんじに [会|あ]いますか。', qm: 'Pukul berapa mereka bertemu?',
      o: ['12[時|じ]', '12[時|じ][半|はん]', '1[時|じ]', '1[時|じ][半|はん]'], a: 1,
      e: 'Bertemu pukul 12.30 (12時半). Pukul 1 adalah jam mulai film, bukan jam bertemu.' }
  ]
},
{
  id: 5, jp: '[日本語|にほんご]クラスの おしらせ', t: 'Pengumuman Kelas Bahasa Jepang', tag: 'Pengumuman',
  p: [
    { j: 'クラスは [月曜日|げつようび]と [木曜日|もくようび]に あります。[日曜日|にちようび]は [休|やす]みです。', m: 'Kelas ada pada hari Senin dan Kamis. Hari Minggu libur.' },
    { j: '[時間|じかん]は [午後|ごご] 6[時|じ]から 7[時|じ][半|はん]までです。', m: 'Waktunya dari pukul 6 sore sampai pukul 7.30.' },
    { j: '[教室|きょうしつ]は 2かいです。[先生|せんせい]は [山本|やまもと][先生|せんせい]です。', m: 'Ruang kelasnya di lantai 2. Gurunya adalah Yamamoto-sensei.' },
    { j: '[本|ほん]と ノートを もって きて ください。おかねは いりません。', m: 'Tolong bawa buku dan buku catatan. Uang tidak diperlukan (gratis).' }
  ],
  v: [
    { w: 'クラス', r: 'kurasu', a: 'kelas' },
    { w: '[月曜日|げつようび]', r: 'getsuyoubi', a: 'hari Senin' },
    { w: '[木曜日|もくようび]', r: 'mokuyoubi', a: 'hari Kamis' },
    { w: '[休|やす]み', r: 'yasumi', a: 'libur' },
    { w: '[時間|じかん]', r: 'jikan', a: 'waktu / jam' },
    { w: '[午後|ごご]', r: 'gogo', a: 'siang-sore (PM)' },
    { w: '[教室|きょうしつ]', r: 'kyoushitsu', a: 'ruang kelas' },
    { w: '2かい', r: 'nikai', a: 'lantai 2' },
    { w: 'ノート', r: 'nooto', a: 'buku catatan' },
    { w: 'もって きて ください', r: 'motte kite kudasai', a: 'tolong bawa (ke sini)' },
    { w: 'いりません', r: 'irimasen', a: 'tidak perlu / tidak butuh' }
  ],
  q: [
    { q: 'クラスは なんようびに ありますか。', qm: 'Kelas diadakan pada hari apa saja?',
      o: ['[月曜日|げつようび]と [火曜日|かようび]', '[月曜日|げつようび]と [木曜日|もくようび]', '[水曜日|すいようび]と [金曜日|きんようび]', '[土曜日|どようび]と [日曜日|にちようび]'], a: 1,
      e: 'Teks: 月曜日と木曜日にあります. Hari Minggu justru libur.' },
    { q: 'クラスは なんじに おわりますか。', qm: 'Pukul berapa kelas selesai?',
      o: ['6[時|じ]', '6[時|じ][半|はん]', '7[時|じ]', '7[時|じ][半|はん]'], a: 3,
      e: 'Waktunya 午後6時から7時半まで, jadi selesai pukul 7.30. Pukul 6 adalah jam mulai.' },
    { q: '[教室|きょうしつ]は どこですか。', qm: 'Di mana ruang kelasnya?',
      o: ['1かい', '2かい', '3かい', '4かい'], a: 1,
      e: 'Teks: 教室は2かいです (lantai 2).' },
    { q: '[学生|がくせい]は なにを もって きますか。', qm: 'Apa yang harus dibawa siswa?',
      o: ['[本|ほん]と ノート', 'おかねと [本|ほん]', 'ノートと ペン', '[本|ほん]と じしょ'], a: 0,
      e: 'Teks: 本とノートをもってきてください. Uang tidak perlu (おかねはいりません).' }
  ]
},
{
  id: 6, jp: '[日本|にほん]の きせつ', t: 'Empat Musim di Jepang', tag: 'Cerita',
  p: [
    { j: '[日本|にほん]には [四|よっ]つの きせつが あります。', m: 'Jepang memiliki empat musim.' },
    { j: '[春|はる]は あたたかいです。[花|はな]が きれいです。[夏|なつ]は あついです。[海|うみ]で およぎます。', m: 'Musim semi hangat. Bunga-bunganya indah. Musim panas panas. Orang berenang di laut.' },
    { j: '[秋|あき]は すずしいです。[山|やま]が あかく なります。[冬|ふゆ]は さむいです。[雪|ゆき]が ふります。', m: 'Musim gugur sejuk. Gunung berubah menjadi merah. Musim dingin dingin. Salju turun.' },
    { j: '[私|わたし]は [夏|なつ]が いちばん [好|す]きです。[海|うみ]で およぎたいです。', m: 'Saya paling suka musim panas. Saya ingin berenang di laut.' }
  ],
  v: [
    { w: 'きせつ', r: 'kisetsu', a: 'musim' },
    { w: '[四|よっ]つ', r: 'yottsu', a: 'empat (buah)' },
    { w: '[春|はる]・[夏|なつ]', r: 'haru, natsu', a: 'musim semi, musim panas' },
    { w: '[秋|あき]・[冬|ふゆ]', r: 'aki, fuyu', a: 'musim gugur, musim dingin' },
    { w: 'あたたかい', r: 'atatakai', a: 'hangat' },
    { w: 'すずしい', r: 'suzushii', a: 'sejuk' },
    { w: '[海|うみ]', r: 'umi', a: 'laut' },
    { w: 'およぎます', r: 'oyogimasu', a: 'berenang' },
    { w: 'あかく なります', r: 'akaku narimasu', a: 'menjadi merah' },
    { w: '[雪|ゆき]が ふります', r: 'yuki ga furimasu', a: 'salju turun' },
    { w: 'いちばん', r: 'ichiban', a: 'paling' },
    { w: '〜たいです', r: '-tai desu', a: 'ingin ...' }
  ],
  q: [
    { q: '[日本|にほん]には きせつが いくつ ありますか。', qm: 'Berapa musim yang ada di Jepang?',
      o: ['[二|ふた]つ', '[三|みっ]つ', '[四|よっ]つ', '[五|いつ]つ'], a: 2,
      e: 'Teks: 日本には四つのきせつがあります (empat musim).' },
    { q: '[秋|あき]は どうですか。', qm: 'Bagaimana musim gugur?',
      o: ['あたたかいです', 'あついです', 'すずしいです', 'さむいです'], a: 2,
      e: 'Teks: 秋はすずしいです. Hangat = semi, panas = musim panas, dingin = musim dingin.' },
    { q: '[山|やま]が あかく なる きせつは いつですか。', qm: 'Pada musim apa gunung berubah merah?',
      o: ['[春|はる]', '[夏|なつ]', '[秋|あき]', '[冬|ふゆ]'], a: 2,
      e: 'Teks: 秋は ... 山があかくなります (musim gugur).' },
    { q: '[私|わたし]は なにを したいですか。', qm: 'Apa yang ingin saya lakukan?',
      o: ['[山|やま]へ いきたいです', '[海|うみ]で およぎたいです', '[雪|ゆき]で あそびたいです', '[花|はな]を [見|み]たいです'], a: 1,
      e: 'Teks: 海でおよぎたいです. Saya suka musim panas, bukan musim dingin atau semi.' }
  ]
}
];
