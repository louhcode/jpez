// ==========================================
// MATERI PARTIKEL (JLPT N5)
// ==========================================
const PARTIKEL = [
    { id: 'wa', p: 'は', baca: 'wa', judul: 'Partikel Topik', ringkas: 'Penanda topik / kontras', kunci: 'AはBです, kontras, dibaca "wa"', fungsi: [
        { n: 'Menandai topik pembicaraan', pola: '[Topik] は [Penjelasan]', t: 'Hal yang sedang dibicarakan (sudah diketahui kedua pihak) ditandai dengan は. Ditulis "ha" tetapi dibaca "wa".', ex: [
            { j: '[私|わたし]{は}[学生|がくせい]です。', m: 'Saya adalah pelajar.' },
            { j: '[今日|きょう]{は}[暑|あつ]いです。', m: 'Hari ini panas.' },
            { j: 'これ{は}[何|なん]ですか。', m: 'Ini apa?' } ] },
        { n: 'Kontras / membandingkan dua hal', pola: 'A は ～ が、B は ～', t: 'Dua topik dipertentangkan: "kalau A begini, tetapi kalau B begitu".', ex: [
            { j: '[肉|にく]{は}[食|た]べますが、[魚|さかな]{は}[食|た]べません。', m: 'Daging saya makan, tetapi ikan tidak.' } ] },
        { n: 'Gabungan dengan partikel lain', pola: 'では / には / からは / までは', t: 'は bisa ditempel di belakang partikel lain untuk menjadikannya topik. を dan が justru digantikan oleh は.', ex: [
            { j: 'ここ{では}[写真|しゃしん]を[撮|と]らないで ください。', m: 'Tolong jangan memotret di sini.' },
            { j: '[肉|にく]{は}[食|た]べません。', m: 'Kalau daging, saya tidak makan. (を diganti は)' } ] } ],
      tips: ['は dibaca "wa". Begitu juga pada こんにちは dan こんばんは.', 'Soal klasik: 私（　）学生です → は.', 'Topik = informasi lama. Informasi baru memakai が (lihat tab Banding).'] },

    { id: 'ga', p: 'が', baca: 'ga', judul: 'Partikel Subjek', ringkas: 'Penanda subjek / objek perasaan', kunci: 'あります・います, すき, わかる, だれが', fungsi: [
        { n: 'Subjek yang menjadi informasi baru', pola: '[Subjek] が [Predikat]', t: 'Menyebut sesuatu yang baru muncul atau yang menjadi fokus, termasuk fenomena yang terlihat/terdengar.', ex: [
            { j: 'あそこに[猫|ねこ]{が}います。', m: 'Di sana ada kucing.' },
            { j: '[雨|あめ]{が}[降|ふ]っています。', m: 'Hujan sedang turun.' } ] },
        { n: 'Subjek berupa kata tanya', pola: 'だれ・なに・どれ + が', t: 'Jika subjek adalah kata tanya, wajib memakai が (bukan は). Jawabannya pun memakai が.', ex: [
            { j: '[誰|だれ]{が}[来|き]ましたか。', m: 'Siapa yang datang?' },
            { j: '[田中|たなか]さん{が}[来|き]ました。', m: 'Tuan Tanaka yang datang.' } ] },
        { n: 'Objek perasaan, kemampuan, keinginan, keberadaan', pola: 'が + すき/きらい/じょうず/へた/わかる/できる/ほしい/ある', t: 'Kata sifat dan kata kerja tertentu memakai が untuk "objeknya", bukan を.', ex: [
            { j: '[私|わたし]は[犬|いぬ]{が}[好|す]きです。', m: 'Saya suka anjing.' },
            { j: '[日本語|にほんご]{が}[分|わ]かります。', m: 'Saya mengerti bahasa Jepang.' },
            { j: '[車|くるま]{が}[欲|ほ]しいです。', m: 'Saya ingin mobil.' },
            { j: '[机|つくえ]の[上|うえ]に[本|ほん]{が}あります。', m: 'Ada buku di atas meja.' } ] },
        { n: 'Penghubung kalimat "tetapi / basa-basi"', pola: '～が、～', t: 'が di akhir klausa berarti "tetapi" atau pembuka sopan.', ex: [
            { j: 'すみません{が}、[駅|えき]はどこですか。', m: 'Permisi, di mana stasiun?' },
            { j: '[高|たか]いです{が}、おいしいです。', m: 'Mahal, tetapi enak.' } ] } ],
      tips: ['あります/います → benda yang ada diberi が (bukan を).', '好き・嫌い・上手・下手・分かる・できる・欲しい → が.', 'Kata tanya sebagai subjek → が.'] },

    { id: 'wo', p: 'を', baca: 'o', judul: 'Partikel Objek', ringkas: 'Penanda objek langsung', kunci: 'kata kerja transitif, tempat dilalui, titik awal', fungsi: [
        { n: 'Objek langsung kata kerja', pola: '[Objek] を [Kata kerja]', t: 'Menandai benda yang dikenai tindakan. Ditulis "wo" tetapi dibaca "o".', ex: [
            { j: 'パン{を}[食|た]べます。', m: 'Saya makan roti.' },
            { j: '[本|ほん]{を}[読|よ]みます。', m: 'Saya membaca buku.' },
            { j: '[音楽|おんがく]{を}[聞|き]きます。', m: 'Saya mendengarkan musik.' } ] },
        { n: 'Tempat yang dilalui', pola: '[Tempat] を [歩く・渡る・散歩する・走る]', t: 'Dengan kata kerja gerak, を menandai jalur atau tempat yang dilintasi.', ex: [
            { j: '[公園|こうえん]{を}[散歩|さんぽ]します。', m: 'Saya berjalan-jalan di taman.' },
            { j: '[橋|はし]{を}[渡|わた]ります。', m: 'Saya menyeberangi jembatan.' },
            { j: 'この[道|みち]{を}まっすぐ[行|い]きます。', m: 'Saya jalan lurus di jalan ini.' } ] },
        { n: 'Titik awal / tempat ditinggalkan', pola: '[Tempat] を [出る・降りる]', t: 'Tempat yang ditinggalkan atau kendaraan yang ditinggalkan memakai を.', ex: [
            { j: '[家|いえ]{を}[出|で]ます。', m: 'Saya keluar dari rumah.' },
            { j: '[電車|でんしゃ]{を}[降|お]ります。', m: 'Saya turun dari kereta.' } ] } ],
      tips: ['を dibaca "o".', 'あります/います tidak memakai を.', 'Naik kendaraan: 電車に乗ります (に), turun: 電車を降ります (を).'] },

    { id: 'ni', p: 'に', baca: 'ni', judul: 'Partikel Waktu, Tempat, Tujuan', ringkas: 'Waktu, keberadaan, tujuan, penerima', kunci: 'jam ○時に, あります・います, いきます, あげます', fungsi: [
        { n: 'Waktu yang tepat', pola: '[Jam / hari / bulan] に', t: 'Menunjuk titik waktu spesifik. Waktu relatif (きょう, あした, まいにち, いま) TIDAK memakai に.', ex: [
            { j: '[七時|しちじ]{に}[起|お]きます。', m: 'Saya bangun jam tujuh.' },
            { j: '[日曜日|にちようび]{に}[映画|えいが]を[見|み]ます。', m: 'Hari Minggu saya menonton film.' } ] },
        { n: 'Tempat keberadaan (ある・いる)', pola: '[Tempat] に [Benda] が あります / います', t: 'Menunjukkan di mana sesuatu berada.', ex: [
            { j: '[机|つくえ]の[上|うえ]{に}[本|ほん]があります。', m: 'Ada buku di atas meja.' },
            { j: '[公園|こうえん]{に}[子供|こども]がいます。', m: 'Ada anak-anak di taman.' } ] },
        { n: 'Tujuan perpindahan', pola: '[Tempat] に [行く・来る・帰る]', t: 'Tempat tujuan. Pada tiga kata kerja ini, に dapat diganti へ.', ex: [
            { j: '[学校|がっこう]{に}[行|い]きます。', m: 'Saya pergi ke sekolah.' },
            { j: '[家|いえ]{に}[帰|かえ]ります。', m: 'Saya pulang ke rumah.' } ] },
        { n: 'Penerima / lawan tindakan', pola: '[Orang] に あげる・もらう・電話する・聞く・会う', t: 'Orang yang menerima atau menjadi sasaran tindakan.', ex: [
            { j: '[友達|ともだち]{に}プレゼントをあげます。', m: 'Saya memberi hadiah kepada teman.' },
            { j: '[母|はは]{に}[電話|でんわ]します。', m: 'Saya menelepon ibu.' },
            { j: '[先生|せんせい]{に}[聞|き]きます。', m: 'Saya bertanya kepada guru.' } ] },
        { n: 'Titik kontak: naik, duduk, masuk', pola: '[Kendaraan / tempat] に [乗る・座る・入る]', t: 'Kendaraan yang dinaiki, kursi yang diduduki, ruangan yang dimasuki.', ex: [
            { j: '[電車|でんしゃ]{に}[乗|の]ります。', m: 'Saya naik kereta.' },
            { j: 'いす{に}[座|すわ]ります。', m: 'Saya duduk di kursi.' } ] },
        { n: 'Tujuan tindakan "pergi untuk ..."', pola: '[Kata kerja bentuk stem] / [Nomina] に 行く', t: 'Tujuan seseorang pergi, dengan stem ます atau nomina tindakan.', ex: [
            { j: '[買|か]い[物|もの]{に}[行|い]きます。', m: 'Saya pergi untuk berbelanja.' },
            { j: '[映画|えいが]を[見|み]{に}[行|い]きます。', m: 'Saya pergi untuk menonton film.' } ] },
        { n: 'Hasil perubahan', pola: '[Nomina] に なる', t: 'Menjadi sesuatu.', ex: [
            { j: '[医者|いしゃ]{に}なります。', m: 'Saya akan menjadi dokter.' } ] },
        { n: 'Frekuensi per satuan waktu', pola: '[Periode] に [Jumlah]', t: 'Berapa kali dalam satu periode.', ex: [
            { j: '[一週間|いっしゅうかん]{に}[二回|にかい][泳|およ]ぎます。', m: 'Seminggu saya berenang dua kali.' } ] } ],
      tips: ['Waktu spesifik → に; きょう / あした / まいにち → tanpa に.', 'Lokasi benda ada → に; lokasi tindakan → で.', 'Orang yang menerima: に; orang pemberi (dari): から / に.'] },

    { id: 'de', p: 'で', baca: 'de', judul: 'Partikel Tempat Tindakan & Alat', ringkas: 'Tempat tindakan, alat, cara, total', kunci: 'べんきょうします, バスで, はしで, ぜんぶで', fungsi: [
        { n: 'Tempat berlangsungnya tindakan', pola: '[Tempat] で [Kata kerja tindakan]', t: 'Tempat di mana suatu kegiatan dilakukan.', ex: [
            { j: '[図書館|としょかん]{で}[勉強|べんきょう]します。', m: 'Saya belajar di perpustakaan.' },
            { j: 'レストラン{で}[食|た]べます。', m: 'Saya makan di restoran.' } ] },
        { n: 'Alat, sarana, dan cara', pola: '[Alat / kendaraan] で', t: 'Dengan apa tindakan dilakukan: kendaraan, alat tulis, sumpit, dan sebagainya.', ex: [
            { j: '[バス]{で}[行|い]きます。', m: 'Saya pergi naik bus.' },
            { j: 'はし{で}[食|た]べます。', m: 'Saya makan dengan sumpit.' },
            { j: '[鉛筆|えんぴつ]{で}[書|か]きます。', m: 'Saya menulis dengan pensil.' } ] },
        { n: 'Bahasa dan bahan', pola: '[Bahasa] で / [Bahan] で', t: 'Bahasa yang dipakai berbicara dan bahan pembuat sesuatu.', ex: [
            { j: '[日本語|にほんご]{で}[話|はな]します。', m: 'Saya berbicara dalam bahasa Jepang.' },
            { j: '[木|き]{で}[机|つくえ]を[作|つく]ります。', m: 'Saya membuat meja dari kayu.' } ] },
        { n: 'Jumlah total / bersama-sama', pola: '[Jumlah] で', t: 'Total keseluruhan atau jumlah orang yang bertindak bersama.', ex: [
            { j: '[全部|ぜんぶ]{で}[五百円|ごひゃくえん]です。', m: 'Semuanya 500 yen.' },
            { j: 'みんな{で}[行|い]きましょう。', m: 'Mari kita pergi bersama-sama.' } ] } ],
      tips: ['Tempat tindakan → で, tempat keberadaan → に.', 'Kendaraan: バスで (cara), tetapi バスに乗る (naik).', 'ぜんぶで / ひとりで / みんなで sering keluar.'] },

    { id: 'he', p: 'へ', baca: 'e', judul: 'Partikel Arah', ringkas: 'Arah tujuan perjalanan', kunci: 'いきます・きます・かえります', fungsi: [
        { n: 'Arah tujuan', pola: '[Tempat] へ [行く・来る・帰る]', t: 'Menunjukkan arah. Ditulis "he" tetapi dibaca "e".', ex: [
            { j: '[日本|にほん]{へ}[行|い]きます。', m: 'Saya pergi ke Jepang.' },
            { j: '[右|みぎ]{へ}[曲|ま]がります。', m: 'Saya belok ke kanan.' } ] },
        { n: 'Tujuan pengiriman', pola: '[Tempat / orang] へ [送る・書く]', t: 'Sasaran pengiriman, misalnya surat.', ex: [
            { j: '[友達|ともだち]{へ}[手紙|てがみ]を[書|か]きます。', m: 'Saya menulis surat untuk teman.' } ] } ],
      tips: ['へ dibaca "e".', '行く・来る・帰る → へ boleh diganti に.', 'Tujuan tindakan "pergi untuk ..." wajib に (買い物に行く).'] },

    { id: 'to', p: 'と', baca: 'to', judul: 'Partikel "dengan" & "dan"', ringkas: 'Bersama, dan (lengkap), kutipan', kunci: 'ともだちと, AとB, と いいます', fungsi: [
        { n: 'Bersama seseorang', pola: '[Orang] と [Kata kerja]', t: 'Melakukan sesuatu bersama orang lain.', ex: [
            { j: '[友達|ともだち]{と}[映画|えいが]を[見|み]ます。', m: 'Saya menonton film bersama teman.' },
            { j: '[家族|かぞく]{と}[旅行|りょこう]します。', m: 'Saya bepergian bersama keluarga.' } ] },
        { n: 'Menyambung nomina "dan" (daftar lengkap)', pola: 'A と B', t: 'Semua benda yang ada disebutkan semuanya.', ex: [
            { j: '[本|ほん]{と}ノートを[買|か]いました。', m: 'Saya membeli buku dan buku catatan.' } ] },
        { n: 'Mengutip ucapan', pola: '「～」と いいます', t: 'Isi ucapan atau pikiran diikuti と.', ex: [
            { j: '「おはよう」{と}[言|い]いました。', m: 'Saya mengucapkan "selamat pagi".' } ] } ],
      tips: ['と = bersama / dan lengkap; や = dan tidak lengkap.', 'Bersama orang: と. Kepada orang (penerima): に.', 'Kutipan: ～と いいます / ～と おもいます.'] },

    { id: 'mo', p: 'も', baca: 'mo', judul: 'Partikel "juga"', ringkas: 'Juga / sama sekali tidak / penekanan jumlah', kunci: 'わたしも, なにも, さんじかんも', fungsi: [
        { n: 'Juga', pola: '[Nomina] も', t: 'Menggantikan は, が, atau を untuk menyatakan "juga".', ex: [
            { j: '[私|わたし]{も}[学生|がくせい]です。', m: 'Saya juga pelajar.' },
            { j: 'コーヒー{も}[飲|の]みます。', m: 'Saya juga minum kopi.' } ] },
        { n: 'Kata tanya + も + negatif', pola: 'なにも / だれも / どこも ～ません', t: 'Menyatakan "sama sekali tidak ada". Kalimat harus negatif.', ex: [
            { j: '[何|なに]{も}[食|た]べませんでした。', m: 'Saya tidak makan apa-apa.' },
            { j: '[誰|だれ]{も}いません。', m: 'Tidak ada seorang pun.' },
            { j: 'どこへ{も}[行|い]きません。', m: 'Saya tidak pergi ke mana-mana.' } ] },
        { n: 'Menekankan jumlah banyak', pola: '[Jumlah] も', t: 'Menunjukkan bahwa jumlahnya terasa banyak.', ex: [
            { j: '[三時間|さんじかん]{も}[待|ま]ちました。', m: 'Saya menunggu sampai tiga jam.' } ] } ],
      tips: ['も menggantikan は/が/を, tetapi dengan に / で / へ ia ditambahkan: ここにも, ここでも, どこへも.', 'なにも・だれも・どこも selalu dengan bentuk negatif.'] },

    { id: 'no', p: 'の', baca: 'no', judul: 'Partikel Kepemilikan', ringkas: 'Milik, hubungan, posisi', kunci: 'わたしの ほん, つくえの うえ', fungsi: [
        { n: 'Kepemilikan', pola: 'A の B', t: 'B milik A.', ex: [
            { j: '[私|わたし]{の}[本|ほん]です。', m: 'Ini buku saya.' },
            { j: 'これは[先生|せんせい]{の}かばんです。', m: 'Ini tas milik guru.' } ] },
        { n: 'Menjelaskan jenis / asal / afiliasi', pola: 'A の B', t: 'A menerangkan jenis atau asal B.', ex: [
            { j: 'これは[日本語|にほんご]{の}[本|ほん]です。', m: 'Ini buku bahasa Jepang.' },
            { j: '[私|わたし]は[会社|かいしゃ]{の}[人|ひと]です。', m: 'Saya orang perusahaan (karyawan).' } ] },
        { n: 'Kata penunjuk posisi', pola: '[Benda] の [上・下・前・後ろ・中・隣]', t: 'Dipakai bersama kata posisi.', ex: [
            { j: '[机|つくえ]{の}[上|うえ]に[本|ほん]があります。', m: 'Ada buku di atas meja.' } ] },
        { n: 'Pengganti nomina (milik ...)', pola: 'A は B の です', t: 'Nomina setelah の dihilangkan karena sudah jelas.', ex: [
            { j: 'この[傘|かさ]は[私|わたし]{の}です。', m: 'Payung ini punya saya.' } ] } ],
      tips: ['A の B: A menerangkan B.', 'Pada kalimat tanya kepemilikan: だれの ですか。'] },

    { id: 'ya', p: 'や・など', baca: 'ya / nado', judul: 'Daftar Tidak Lengkap', ringkas: 'dan (contoh sebagian), dan lain-lain', kunci: 'AやB, ～など', fungsi: [
        { n: 'Menyebut beberapa contoh', pola: 'A や B (など)', t: 'Hanya sebagian contoh yang disebutkan, masih ada yang lain. など = "dan sebagainya".', ex: [
            { j: '[机|つくえ]の[上|うえ]に[本|ほん]{や}ノート{など}があります。', m: 'Di atas meja ada buku, buku catatan, dan sebagainya.' },
            { j: 'りんご{や}みかん{など}を[買|か]いました。', m: 'Saya membeli apel, jeruk, dan sebagainya.' } ] } ],
      tips: ['と = semua disebut; や = baru sebagian.'] },

    { id: 'ka', p: 'か', baca: 'ka', judul: 'Partikel Tanya & Pilihan', ringkas: 'Kalimat tanya, atau, ajakan', kunci: 'ですか, AかB, ませんか', fungsi: [
        { n: 'Penanda kalimat tanya', pola: '～ですか。/ ～ますか。', t: 'Taruh か di akhir kalimat. Tanda tanya tidak wajib.', ex: [
            { j: '[学生|がくせい]です{か}。', m: 'Apakah Anda pelajar?' },
            { j: 'これは[何|なん]です{か}。', m: 'Ini apa?' } ] },
        { n: 'Atau (pilihan)', pola: 'A か B', t: 'Memilih salah satu dari dua hal.', ex: [
            { j: 'コーヒー{か}[紅茶|こうちゃ]を[飲|の]みます。', m: 'Saya minum kopi atau teh.' },
            { j: '[肉|にく]{か}[魚|さかな]、どちらが[好|す]きですか。', m: 'Daging atau ikan, kamu suka yang mana?' } ] },
        { n: 'Ajakan sopan', pola: '～ませんか', t: 'Bentuk negatif + か untuk mengajak.', ex: [
            { j: 'いっしょに[行|い]きません{か}。', m: 'Maukah pergi bersama?' } ] } ],
      tips: ['Ajakan: ～ませんか; usulan "mari": ～ましょう.'] },

    { id: 'kara', p: 'から', baca: 'kara', judul: 'Partikel "dari / karena"', ringkas: 'Dari (titik awal), karena', kunci: '○時から, ともだちから, ですから', fungsi: [
        { n: 'Titik awal waktu atau tempat', pola: '[Waktu / tempat] から', t: 'Dari kapan atau dari mana. Biasanya berpasangan dengan まで.', ex: [
            { j: '[九時|くじ]{から}[始|はじ]まります。', m: 'Dimulai dari jam sembilan.' },
            { j: '[家|いえ]{から}[駅|えき]まで[歩|ある]きます。', m: 'Saya berjalan kaki dari rumah ke stasiun.' } ] },
        { n: 'Asal pemberi', pola: '[Orang] から もらう', t: 'Dari siapa menerima sesuatu.', ex: [
            { j: '[友達|ともだち]{から}[手紙|てがみ]をもらいました。', m: 'Saya menerima surat dari teman.' } ] },
        { n: 'Alasan "karena"', pola: '[Alasan] から、[Akibat]', t: 'から di akhir klausa alasan. Alasan di depan, akibat di belakang.', ex: [
            { j: '[雨|あめ]です{から}、[傘|かさ]を[持|も]って[行|い]きます。', m: 'Karena hujan, saya membawa payung.' },
            { j: '[安|やす]い{から}、[買|か]います。', m: 'Karena murah, saya beli.' } ] } ],
      tips: ['から: "dari" (setelah kata benda) dan "karena" (setelah kalimat).', 'Pasangan: から ～ まで.'] },

    { id: 'made', p: 'まで', baca: 'made', judul: 'Partikel "sampai"', ringkas: 'Batas akhir waktu atau tempat', kunci: '○時まで, えきまで', fungsi: [
        { n: 'Batas akhir', pola: '[Waktu / tempat] まで', t: 'Sampai kapan atau sampai mana.', ex: [
            { j: '[五時|ごじ]{まで}[働|はたら]きます。', m: 'Saya bekerja sampai jam lima.' },
            { j: '[駅|えき]{まで}[歩|ある]きます。', m: 'Saya berjalan kaki sampai stasiun.' },
            { j: '[九時|くじ]から[五時|ごじ]{まで}[仕事|しごと]です。', m: 'Bekerja dari jam sembilan sampai jam lima.' } ] } ],
      tips: ['Pasangan: から ～ まで.', 'まで menyatakan kegiatan berlangsung terus sampai batas itu.'] },

    { id: 'yori', p: 'より', baca: 'yori', judul: 'Partikel Perbandingan', ringkas: 'daripada', kunci: 'AはBより, ～ほうが', fungsi: [
        { n: 'Perbandingan "daripada"', pola: 'A は B より [sifat]  /  A の ほうが B より [sifat]', t: 'Pembanding (yang kalah) ditandai より.', ex: [
            { j: '[今日|きょう]は[昨日|きのう]{より}[暑|あつ]いです。', m: 'Hari ini lebih panas daripada kemarin.' },
            { j: '[電車|でんしゃ]{より}[飛行機|ひこうき]の[方|ほう]が[速|はや]いです。', m: 'Pesawat lebih cepat daripada kereta.' } ] } ],
      tips: ['Yang lebih unggul: A は / A のほうが; yang kalah: B より.', 'Pertanyaan: AとBと どちらが ～ですか。'] },

    { id: 'dake', p: 'だけ・しか', baca: 'dake / shika', judul: 'Partikel "hanya"', ringkas: 'だけ = hanya, しか～ない = tidak ada selain', kunci: 'みずだけ, ひゃくえんしか ありません', fungsi: [
        { n: 'だけ: hanya (kalimat positif)', pola: '[Nomina / jumlah] だけ', t: 'Membatasi pada satu hal saja.', ex: [
            { j: '[水|みず]{だけ}[飲|の]みます。', m: 'Saya hanya minum air.' },
            { j: '[一人|ひとり]{だけ}[来|き]ました。', m: 'Hanya satu orang yang datang.' } ] },
        { n: 'しか: hanya (wajib kalimat negatif)', pola: '[Nomina] しか + bentuk negatif', t: 'Bermakna "tidak ada selain ini" dan terasa sedikit.', ex: [
            { j: '[百円|ひゃくえん]{しか}ありません。', m: 'Saya hanya punya 100 yen (tidak punya lebih).' } ] } ],
      tips: ['だけ + positif; しか + negatif.', 'しか terasa "hanya segitu (sedikit)".'] },

    { id: 'neyo', p: 'ね・よ', baca: 'ne / yo', judul: 'Partikel Akhir Kalimat', ringkas: 'ね = ya, ya kan; よ = lho, kok', kunci: 'いいてんきですね, もう くじですよ', fungsi: [
        { n: 'ね: meminta persetujuan / konfirmasi', pola: '～ね', t: 'Mencari persetujuan lawan bicara, "ya?", "kan?".', ex: [
            { j: 'いい[天気|てんき]です{ね}。', m: 'Cuacanya bagus ya.' },
            { j: '[明日|あした]は[休|やす]みです{ね}。', m: 'Besok libur ya.' } ] },
        { n: 'よ: menyampaikan informasi / penegasan', pola: '～よ', t: 'Memberi tahu sesuatu yang belum diketahui lawan bicara, "lho!".', ex: [
            { j: 'もう[九時|くじ]です{よ}。', m: 'Sudah jam sembilan lho.' },
            { j: 'この[店|みせ]はおいしいです{よ}。', m: 'Toko ini enak lho.' } ] } ],
      tips: ['ね = minta setuju; よ = beri tahu / tegaskan.'] },

    { id: 'gurai', p: 'ぐらい・ごろ', baca: 'gurai / goro', judul: 'Perkiraan', ringkas: 'ぐらい = kira-kira (jumlah / lama), ごろ = sekitar (titik waktu)', kunci: 'じゅっぷんぐらい, しちじごろ', fungsi: [
        { n: 'ぐらい／くらい: perkiraan jumlah dan lama', pola: '[Jumlah / durasi] ぐらい', t: 'Kira-kira sekian (durasi, jumlah, tingkat).', ex: [
            { j: '[駅|えき]まで[十分|じゅっぷん]{ぐらい}かかります。', m: 'Ke stasiun butuh sekitar sepuluh menit.' },
            { j: '[学生|がくせい]が[二十人|にじゅうにん]{ぐらい}います。', m: 'Ada kira-kira dua puluh pelajar.' } ] },
        { n: 'ごろ: perkiraan titik waktu', pola: '[Jam / tanggal] ごろ', t: 'Sekitar saat tertentu (bukan durasi).', ex: [
            { j: '[七時|しちじ]{ごろ}[起|お]きます。', m: 'Saya bangun sekitar jam tujuh.' } ] } ],
      tips: ['Durasi / jumlah → ぐらい; titik waktu → ごろ.'] },

    { id: 'zutsu', p: 'ずつ', baca: 'zutsu', judul: 'Partikel "masing-masing"', ringkas: 'sebanyak ... demi ...', kunci: 'ひとりずつ, すこしずつ', fungsi: [
        { n: 'Masing-masing / sedikit demi sedikit', pola: '[Jumlah] ずつ', t: 'Pembagian rata atau bertahap.', ex: [
            { j: '[一人|ひとり]{ずつ}[話|はな]します。', m: 'Satu per satu kami berbicara.' },
            { j: '[少|すこ]し{ずつ}[覚|おぼ]えます。', m: 'Saya menghafal sedikit demi sedikit.' } ] } ],
      tips: ['ずつ dipasang langsung setelah jumlah: ひとつずつ, ふたりずつ.'] },

    { id: 'demo', p: 'でも', baca: 'demo', judul: 'Partikel "misalnya / pun"', ringkas: 'misalnya (ajakan), pun (bahkan)', kunci: 'おちゃでも のみませんか', fungsi: [
        { n: 'Ajakan "misalnya"', pola: '[Nomina] でも ～ませんか', t: 'Mengajukan contoh secara halus.', ex: [
            { j: '[お茶|おちゃ]{でも}[飲|の]みませんか。', m: 'Bagaimana kalau minum teh atau semacamnya?' } ] },
        { n: 'Bahkan / pun', pola: '[Nomina] でも ～', t: 'Menunjukkan contoh ekstrem: "bahkan ... pun".', ex: [
            { j: '[子供|こども]{でも}[分|わ]かります。', m: 'Anak kecil pun mengerti.' } ] } ],
      tips: ['でも juga bisa berarti "tetapi" di awal kalimat (Sambung).'] }
];

// Contoh kalimat tambahan (minimal 5 per kategori penggunaan)
const PARTIKEL_EXTRA = {"wa.0":[{"j":"[兄|あに]{は}[会社員|かいしゃいん]です。","m":"Kakak laki-laki saya adalah karyawan perusahaan."},{"j":"この[本|ほん]{は}おもしろいです。","m":"Buku ini menarik."},{"j":"[東京|とうきょう]{は}[大|おお]きい[町|まち]です。","m":"Tokyo adalah kota yang besar."},{"j":"[田中|たなか]さん{は}[先生|せんせい]ではありません。","m":"Tuan Tanaka bukan guru."},{"j":"[私|わたし]の[家|いえ]{は}[駅|えき]から[近|ちか]いです。","m":"Rumah saya dekat dari stasiun."},{"j":"[日本語|にほんご]{は}むずかしいですか。","m":"Apakah bahasa Jepang itu sulit?"}],"wa.1":[{"j":"[夏|なつ]{は}[好|す]きですが、[冬|ふゆ]{は}[好|す]きではありません。","m":"Saya suka musim panas, tetapi tidak suka musim dingin."},{"j":"[兄|あに]{は}[背|せ]が[高|たか]いですが、[私|わたし]{は}[低|ひく]いです。","m":"Kakak saya tinggi, tetapi saya pendek."},{"j":"コーヒー{は}[飲|の]みますが、お[茶|ちゃ]{は}[飲|の]みません。","m":"Kopi saya minum, tetapi teh tidak."},{"j":"[昼|ひる]{は}[忙|いそが]しいですが、[夜|よる]{は}ひまです。","m":"Siang hari saya sibuk, tetapi malam hari senggang."},{"j":"[日本語|にほんご]{は}[分|わ]かりますが、[中国語|ちゅうごくご]{は}[分|わ]かりません。","m":"Bahasa Jepang saya mengerti, tetapi bahasa Mandarin tidak."},{"j":"[雨|あめ]の[日|ひ]{は}[家|いえ]にいますが、[晴|は]れの[日|ひ]{は}[外|そと]へ[行|い]きます。","m":"Saat hujan saya di rumah, tetapi saat cerah saya pergi keluar."}],"wa.2":[{"j":"この[部屋|へや]{では}たばこを[吸|す]わないでください。","m":"Tolong jangan merokok di ruangan ini."},{"j":"[図書館|としょかん]{では}[静|しず]かにしてください。","m":"Tolong tenang di perpustakaan."},{"j":"[日本|にほん]{には}[山|やま]がたくさんあります。","m":"Di Jepang ada banyak gunung."},{"j":"[駅|えき]{からは}[歩|ある]いて[十分|じゅっぷん]です。","m":"Dari stasiun, jalan kaki sepuluh menit."},{"j":"[私|わたし]{には}[弟|おとうと]が[二人|ふたり]います。","m":"Saya punya dua adik laki-laki."},{"j":"ここ{までは}バスで[来|き]ました。","m":"Sampai di sini saya naik bus."}],"ga.0":[{"j":"[空|そら]に[星|ほし]{が}[出|で]ています。","m":"Bintang muncul di langit."},{"j":"[玄関|げんかん]に[誰|だれ]か{が}います。","m":"Ada seseorang di pintu depan."},{"j":"[外|そと]で[子供|こども]{が}[遊|あそ]んでいます。","m":"Anak-anak bermain di luar."},{"j":"[電話|でんわ]{が}[鳴|な]っています。","m":"Teleponnya berdering."},{"j":"[部屋|へや]の[電気|でんき]{が}ついています。","m":"Lampu kamar menyala."},{"j":"[窓|まど]の[外|そと]に[鳥|とり]{が}います。","m":"Ada burung di luar jendela."}],"ga.1":[{"j":"[何|なに]{が}[好|す]きですか。","m":"Kamu suka apa?"},{"j":"どれ{が}あなたの[傘|かさ]ですか。","m":"Payung yang mana milikmu?"},{"j":"[誰|だれ]{が}この[絵|え]をかきましたか。","m":"Siapa yang melukis gambar ini?"},{"j":"どこ{が}いちばん[安|やす]いですか。","m":"Di mana yang paling murah?"},{"j":"いつ{が}いいですか。","m":"Kapan waktu yang cocok?"},{"j":"どの[色|いろ]{が}[好|す]きですか。","m":"Warna mana yang kamu suka?"}],"ga.2":[{"j":"[私|わたし]は[母|はは]の[料理|りょうり]{が}[好|す]きです。","m":"Saya suka masakan ibu."},{"j":"[弟|おとうと]は[野菜|やさい]{が}きらいです。","m":"Adik saya tidak suka sayuran."},{"j":"[姉|あね]は[歌|うた]{が}[上手|じょうず]です。","m":"Kakak perempuan saya pandai bernyanyi."},{"j":"[私|わたし]は[料理|りょうり]{が}[下手|へた]です。","m":"Saya tidak pandai memasak."},{"j":"[新|あたら]しいかばん{が}[欲|ほ]しいです。","m":"Saya ingin tas baru."},{"j":"この[漢字|かんじ]{が}[分|わ]かりますか。","m":"Apakah kamu mengerti kanji ini?"}],"ga.3":[{"j":"[失礼|しつれい]です{が}、お[名前|なまえ]は。","m":"Maaf, siapa nama Anda?"},{"j":"[日本語|にほんご]はむずかしいです{が}、おもしろいです。","m":"Bahasa Jepang sulit, tetapi menarik."},{"j":"[行|い]きたいです{が}、お[金|かね]がありません。","m":"Saya ingin pergi, tetapi tidak punya uang."},{"j":"[安|やす]いです{が}、おいしくないです。","m":"Murah, tetapi tidak enak."},{"j":"[天気|てんき]はいいです{が}、[風|かぜ]が[強|つよ]いです。","m":"Cuacanya bagus, tetapi anginnya kencang."},{"j":"すみません{が}、ちょっと[手伝|てつだ]ってください。","m":"Maaf, tolong bantu sebentar."}],"wo.0":[{"j":"[毎朝|まいあさ]、[水|みず]{を}[飲|の]みます。","m":"Setiap pagi saya minum air."},{"j":"[手紙|てがみ]{を}[書|か]きます。","m":"Saya menulis surat."},{"j":"テレビ{を}[見|み]ます。","m":"Saya menonton televisi."},{"j":"[友達|ともだち]に[電話|でんわ]{を}かけます。","m":"Saya menelepon teman."},{"j":"[新|あたら]しい[靴|くつ]{を}[買|か]いました。","m":"Saya membeli sepatu baru."},{"j":"[日本語|にほんご]{を}[勉強|べんきょう]しています。","m":"Saya sedang belajar bahasa Jepang."}],"wo.1":[{"j":"[毎朝|まいあさ]、[川|かわ]{を}[散歩|さんぽ]します。","m":"Setiap pagi saya berjalan-jalan di sepanjang sungai."},{"j":"[道|みち]{を}[渡|わた]ります。","m":"Saya menyeberangi jalan."},{"j":"[次|つぎ]の[角|かど]{を}[右|みぎ]へ[曲|ま]がります。","m":"Di sudut berikutnya, belok ke kanan."},{"j":"[山|やま]{を}[登|のぼ]ります。","m":"Saya mendaki gunung."},{"j":"[公園|こうえん]{を}[走|はし]ります。","m":"Saya berlari di taman."},{"j":"[鳥|とり]が[空|そら]{を}[飛|と]んでいます。","m":"Burung terbang di langit."}],"wo.2":[{"j":"[朝|あさ][七時|しちじ]に[家|いえ]{を}[出|で]ます。","m":"Saya keluar rumah jam tujuh pagi."},{"j":"バス{を}[降|お]りて、[歩|ある]きます。","m":"Saya turun dari bus, lalu berjalan kaki."},{"j":"この[駅|えき]{を}[出|で]て、[右|みぎ]へ[行|い]きます。","m":"Keluar dari stasiun ini, lalu pergi ke kanan."},{"j":"[毎日|まいにち]、[八時|はちじ]に[会社|かいしゃ]{を}[出|で]ます。","m":"Setiap hari saya keluar kantor jam delapan."},{"j":"[学校|がっこう]{を}[出|で]て、[友達|ともだち]と[会|あ]います。","m":"Saya keluar dari sekolah, lalu bertemu teman."},{"j":"[電車|でんしゃ]{を}[降|お]りて、バスに[乗|の]ります。","m":"Turun dari kereta, lalu naik bus."}],"ni.0":[{"j":"[毎朝|まいあさ][六時半|ろくじはん]{に}[起|お]きます。","m":"Setiap pagi saya bangun jam setengah tujuh."},{"j":"[土曜日|どようび]{に}[友達|ともだち]と[会|あ]います。","m":"Hari Sabtu saya bertemu teman."},{"j":"[三月|さんがつ]{に}[日本|にほん]へ[行|い]きます。","m":"Bulan Maret saya pergi ke Jepang."},{"j":"[夜|よる][十一時|じゅういちじ]{に}[寝|ね]ます。","m":"Saya tidur jam sebelas malam."},{"j":"[日曜日|にちようび]の[午後|ごご][三時|さんじ]{に}[買|か]い[物|もの]に[行|い]きます。","m":"Hari Minggu jam tiga sore saya pergi berbelanja."},{"j":"[八時|はちじ]{に}[学校|がっこう]へ[行|い]きます。","m":"Saya pergi ke sekolah jam delapan."}],"ni.1":[{"j":"かばんの[中|なか]{に}[財布|さいふ]があります。","m":"Ada dompet di dalam tas."},{"j":"[駅|えき]の[前|まえ]{に}[銀行|ぎんこう]があります。","m":"Ada bank di depan stasiun."},{"j":"[木|き]の[下|した]{に}[犬|いぬ]がいます。","m":"Ada anjing di bawah pohon."},{"j":"[教室|きょうしつ]{に}[先生|せんせい]がいます。","m":"Ada guru di dalam kelas."},{"j":"[机|つくえ]の[上|うえ]{に}[時計|とけい]があります。","m":"Ada jam di atas meja."},{"j":"[冷蔵庫|れいぞうこ]{に}[牛乳|ぎゅうにゅう]があります。","m":"Ada susu di dalam kulkas."}],"ni.2":[{"j":"[毎日|まいにち]、[会社|かいしゃ]{に}[行|い]きます。","m":"Setiap hari saya pergi ke kantor."},{"j":"[明日|あした]、[友達|ともだち]の[家|いえ]{に}[行|い]きます。","m":"Besok saya pergi ke rumah teman."},{"j":"[六時|ろくじ]に[家|いえ]{に}[帰|かえ]ります。","m":"Saya pulang ke rumah jam enam."},{"j":"[来年|らいねん]、[日本|にほん]{に}[来|き]ます。","m":"Tahun depan saya datang ke Jepang."},{"j":"[夏休|なつやす]みに[国|くに]{に}[帰|かえ]ります。","m":"Saat liburan musim panas saya pulang ke kampung halaman."},{"j":"[今日|きょう]はスーパー{に}[行|い]きます。","m":"Hari ini saya pergi ke supermarket."}],"ni.3":[{"j":"[母|はは]{に}[花|はな]をあげました。","m":"Saya memberi bunga kepada ibu."},{"j":"[友達|ともだち]{に}[本|ほん]を[借|か]りました。","m":"Saya meminjam buku dari teman."},{"j":"[田中|たなか]さん{に}[話|はな]します。","m":"Saya berbicara kepada Tuan Tanaka."},{"j":"[姉|あね]{に}[手紙|てがみ]を[書|か]きました。","m":"Saya menulis surat untuk kakak perempuan."},{"j":"[弟|おとうと]{に}おもちゃをあげました。","m":"Saya memberi mainan kepada adik laki-laki."},{"j":"[駅|えき]で[友達|ともだち]{に}[会|あ]います。","m":"Saya bertemu teman di stasiun."}],"ni.4":[{"j":"バス{に}[乗|の]ります。","m":"Saya naik bus."},{"j":"ソファ{に}[座|すわ]ります。","m":"Saya duduk di sofa."},{"j":"[教室|きょうしつ]{に}[入|はい]ります。","m":"Saya masuk ke dalam kelas."},{"j":"[電車|でんしゃ]{に}[乗|の]って、[会社|かいしゃ]へ[行|い]きます。","m":"Saya naik kereta, lalu pergi ke kantor."},{"j":"[大学|だいがく]{に}[入|はい]ります。","m":"Saya masuk universitas."},{"j":"[壁|かべ]{に}[絵|え]をかけます。","m":"Saya menggantung lukisan di dinding."}],"ni.5":[{"j":"[昼|ひる]ご[飯|はん]を[食|た]べ{に}[行|い]きます。","m":"Saya pergi untuk makan siang."},{"j":"[図書館|としょかん]へ[本|ほん]を[借|か]り{に}[行|い]きます。","m":"Saya pergi ke perpustakaan untuk meminjam buku."},{"j":"[駅|えき]へ[友達|ともだち]を[迎|むか]え{に}[行|い]きます。","m":"Saya pergi ke stasiun untuk menjemput teman."},{"j":"[町|まち]へ[服|ふく]を[買|か]い{に}[行|い]きます。","m":"Saya pergi ke kota untuk membeli pakaian."},{"j":"[海|うみ]へ[泳|およ]ぎ{に}[行|い]きます。","m":"Saya pergi ke laut untuk berenang."},{"j":"[公園|こうえん]へ[散歩|さんぽ]{に}[行|い]きます。","m":"Saya pergi ke taman untuk berjalan-jalan."}],"ni.6":[{"j":"[来年|らいねん]、[二十歳|はたち]{に}なります。","m":"Tahun depan saya akan berumur 20 tahun."},{"j":"[春|はる]{に}なりました。","m":"Sudah menjadi musim semi."},{"j":"[姉|あね]は[先生|せんせい]{に}なりました。","m":"Kakak perempuan saya menjadi guru."},{"j":"[十時|じゅうじ]{に}なりました。","m":"Sudah jam sepuluh."},{"j":"[彼|かれ]は[有名|ゆうめい]な[人|ひと]{に}なりました。","m":"Dia menjadi orang terkenal."},{"j":"[夜|よる]{に}なりました。","m":"Sudah menjadi malam."}],"ni.7":[{"j":"[一日|いちにち]{に}[三回|さんかい][薬|くすり]を[飲|の]みます。","m":"Sehari saya minum obat tiga kali."},{"j":"[一か月|いっかげつ]{に}[一回|いっかい]、[友達|ともだち]と[会|あ]います。","m":"Sebulan sekali saya bertemu teman."},{"j":"[一年|いちねん]{に}[一回|いっかい]、[日本|にほん]へ[行|い]きます。","m":"Setahun sekali saya pergi ke Jepang."},{"j":"[一週間|いっしゅうかん]{に}[二回|にかい]、プールへ[行|い]きます。","m":"Seminggu dua kali saya pergi ke kolam renang."},{"j":"[一日|いちにち]{に}[二回|にかい]、[歯|は]を[磨|みが]きます。","m":"Sehari dua kali saya menggosok gigi."},{"j":"[一週間|いっしゅうかん]{に}[一回|いっかい]、[母|はは]に[電話|でんわ]します。","m":"Seminggu sekali saya menelepon ibu."}],"de.0":[{"j":"[教室|きょうしつ]{で}[勉強|べんきょう]します。","m":"Saya belajar di kelas."},{"j":"[駅|えき]{で}[友達|ともだち]を[待|ま]ちます。","m":"Saya menunggu teman di stasiun."},{"j":"[公園|こうえん]{で}[遊|あそ]びます。","m":"Saya bermain di taman."},{"j":"スーパー{で}[野菜|やさい]を[買|か]います。","m":"Saya membeli sayur di supermarket."},{"j":"[家|いえ]{で}テレビを[見|み]ます。","m":"Saya menonton televisi di rumah."},{"j":"[海|うみ]{で}[泳|およ]ぎます。","m":"Saya berenang di laut."}],"de.1":[{"j":"[電車|でんしゃ]{で}[会社|かいしゃ]へ[行|い]きます。","m":"Saya pergi ke kantor naik kereta."},{"j":"ナイフ{で}[肉|にく]を[切|き]ります。","m":"Saya memotong daging dengan pisau."},{"j":"パソコン{で}[手紙|てがみ]を[書|か]きます。","m":"Saya menulis surat dengan komputer."},{"j":"[手|て]{で}[食|た]べます。","m":"Saya makan dengan tangan."},{"j":"ペン{で}[名前|なまえ]を[書|か]きます。","m":"Saya menulis nama dengan pulpen."},{"j":"[自転車|じてんしゃ]{で}[学校|がっこう]へ[行|い]きます。","m":"Saya pergi ke sekolah naik sepeda."}],"de.2":[{"j":"[英語|えいご]{で}[話|はな]します。","m":"Saya berbicara dalam bahasa Inggris."},{"j":"[日本語|にほんご]{で}[手紙|てがみ]を[書|か]きます。","m":"Saya menulis surat dalam bahasa Jepang."},{"j":"[紙|かみ]{で}[花|はな]を[作|つく]ります。","m":"Saya membuat bunga dari kertas."},{"j":"[米|こめ]{で}お[酒|さけ]を[作|つく]ります。","m":"Sake dibuat dari beras."},{"j":"[牛乳|ぎゅうにゅう]{で}ケーキを[作|つく]ります。","m":"Saya membuat kue dari susu."},{"j":"これは[日本語|にほんご]{で}[何|なん]と[言|い]いますか。","m":"Ini disebut apa dalam bahasa Jepang?"}],"de.3":[{"j":"[全部|ぜんぶ]{で}[千円|せんえん]です。","m":"Semuanya seribu yen."},{"j":"[三人|さんにん]{で}[映画|えいが]を[見|み]ます。","m":"Kami bertiga menonton film."},{"j":"[家族|かぞく]みんな{で}[旅行|りょこう]します。","m":"Seluruh keluarga bepergian bersama."},{"j":"[二人|ふたり]{で}[行|い]きましょう。","m":"Mari pergi berdua."},{"j":"[一人|ひとり]{で}[住|す]んでいます。","m":"Saya tinggal sendirian."},{"j":"みんな{で}[歌|うた]いましょう。","m":"Mari kita bernyanyi bersama-sama."}],"he.0":[{"j":"[学校|がっこう]{へ}[行|い]きます。","m":"Saya pergi ke sekolah."},{"j":"これから[家|いえ]{へ}[帰|かえ]ります。","m":"Sekarang saya pulang ke rumah."},{"j":"[明日|あした]、[京都|きょうと]{へ}[行|い]きます。","m":"Besok saya pergi ke Kyoto."},{"j":"[左|ひだり]{へ}[曲|ま]がってください。","m":"Tolong belok ke kiri."},{"j":"[駅|えき]{へ}[歩|ある]きます。","m":"Saya berjalan menuju stasiun."},{"j":"[友達|ともだち]の[家|いえ]{へ}[遊|あそ]びに[行|い]きます。","m":"Saya pergi bermain ke rumah teman."}],"he.1":[{"j":"[母|はは]{へ}[手紙|てがみ]を[送|おく]ります。","m":"Saya mengirim surat kepada ibu."},{"j":"[先生|せんせい]{へ}[花|はな]を[送|おく]ります。","m":"Saya mengirim bunga kepada guru."},{"j":"[友達|ともだち]{へ}はがきを[書|か]きます。","m":"Saya menulis kartu pos untuk teman."},{"j":"[会社|かいしゃ]{へ}[荷物|にもつ]を[送|おく]ります。","m":"Saya mengirim paket ke kantor."},{"j":"[日本|にほん]{へ}[手紙|てがみ]を[出|だ]します。","m":"Saya mengirim surat ke Jepang."},{"j":"[家族|かぞく]{へ}お[金|かね]を[送|おく]ります。","m":"Saya mengirim uang kepada keluarga."}],"to.0":[{"j":"[母|はは]{と}[買|か]い[物|もの]に[行|い]きます。","m":"Saya pergi berbelanja bersama ibu."},{"j":"[兄|あに]{と}サッカーをします。","m":"Saya bermain sepak bola bersama kakak."},{"j":"[先生|せんせい]{と}[話|はな]します。","m":"Saya berbicara dengan guru."},{"j":"[友達|ともだち]{と}[昼|ひる]ご[飯|はん]を[食|た]べます。","m":"Saya makan siang bersama teman."},{"j":"[家族|かぞく]{と}[日本|にほん]へ[行|い]きます。","m":"Saya pergi ke Jepang bersama keluarga."},{"j":"[彼女|かのじょ]{と}[公園|こうえん]を[散歩|さんぽ]します。","m":"Saya berjalan-jalan di taman bersama pacar."}],"to.1":[{"j":"[犬|いぬ]{と}[猫|ねこ]がいます。","m":"Ada anjing dan kucing."},{"j":"パン{と}[牛乳|ぎゅうにゅう]を[買|か]いました。","m":"Saya membeli roti dan susu."},{"j":"[机|つくえ]の[上|うえ]に[本|ほん]{と}ペンがあります。","m":"Di atas meja ada buku dan pulpen."},{"j":"[兄|あに]{と}[私|わたし]は[学生|がくせい]です。","m":"Kakak dan saya adalah pelajar."},{"j":"[春|はる]{と}[秋|あき]が[好|す]きです。","m":"Saya suka musim semi dan musim gugur."},{"j":"りんご{と}バナナを[食|た]べました。","m":"Saya makan apel dan pisang."}],"to.2":[{"j":"[母|はは]は「[元気|げんき]ですか」{と}[言|い]いました。","m":"Ibu berkata, \"Apakah kamu sehat?\""},{"j":"[先生|せんせい]は「[静|しず]かにしてください」{と}[言|い]いました。","m":"Guru berkata, \"Tolong tenang.\""},{"j":"[弟|おとうと]は「ありがとう」{と}[言|い]いました。","m":"Adik berkata, \"Terima kasih.\""},{"j":"[友達|ともだち]は「[行|い]きましょう」{と}[言|い]いました。","m":"Teman berkata, \"Ayo pergi.\""},{"j":"[明日|あした]は[雨|あめ]だ{と}[思|おも]います。","m":"Saya pikir besok akan hujan."},{"j":"[私|わたし]は[日本語|にほんご]がむずかしい{と}[思|おも]います。","m":"Saya pikir bahasa Jepang itu sulit."}],"mo.0":[{"j":"[弟|おとうと]{も}[学生|がくせい]です。","m":"Adik saya juga pelajar."},{"j":"[私|わたし]{も}[行|い]きます。","m":"Saya juga pergi."},{"j":"[彼女|かのじょ]{も}[先生|せんせい]です。","m":"Dia juga guru."},{"j":"[肉|にく]{も}[魚|さかな]{も}[食|た]べます。","m":"Daging dan ikan pun saya makan."},{"j":"[日曜日|にちようび]{も}[働|はたら]きます。","m":"Hari Minggu pun saya bekerja."},{"j":"これ{も}ください。","m":"Tolong yang ini juga."}],"mo.1":[{"j":"[部屋|へや]に[誰|だれ]{も}いません。","m":"Tidak ada seorang pun di kamar."},{"j":"[冷蔵庫|れいぞうこ]に[何|なに]{も}ありません。","m":"Tidak ada apa-apa di kulkas."},{"j":"[昨日|きのう]はどこ{も}[行|い]きませんでした。","m":"Kemarin saya tidak pergi ke mana-mana."},{"j":"[質問|しつもん]は[一つ|ひとつ]{も}ありません。","m":"Tidak ada satu pun pertanyaan."},{"j":"[今朝|けさ]は[誰|だれ]{も}[来|き]ませんでした。","m":"Pagi ini tidak ada yang datang."},{"j":"[今日|きょう]は[誰|だれ]{にも}[会|あ]いませんでした。","m":"Hari ini saya tidak bertemu siapa pun."}],"mo.2":[{"j":"ご[飯|はん]を[三杯|さんばい]{も}[食|た]べました。","m":"Saya makan nasi sampai tiga mangkuk."},{"j":"[本|ほん]を[十冊|じゅっさつ]{も}[買|か]いました。","m":"Saya membeli buku sampai sepuluh eksemplar."},{"j":"[一時間|いちじかん]{も}[待|ま]ちました。","m":"Saya menunggu sampai satu jam."},{"j":"[毎日|まいにち][五時間|ごじかん]{も}[勉強|べんきょう]します。","m":"Setiap hari saya belajar sampai lima jam."},{"j":"[水|みず]を[二|に]リットル{も}[飲|の]みました。","m":"Saya minum air sampai dua liter."},{"j":"[友達|ともだち]が[二十人|にじゅうにん]{も}[来|き]ました。","m":"Sampai dua puluh teman datang."}],"no.0":[{"j":"これは[姉|あね]{の}[傘|かさ]です。","m":"Ini payung kakak perempuan saya."},{"j":"あれは[先生|せんせい]{の}[車|くるま]です。","m":"Itu mobil guru."},{"j":"[私|わたし]{の}[名前|なまえ]は[山田|やまだ]です。","m":"Nama saya Yamada."},{"j":"[田中|たなか]さん{の}かばんは[大|おお]きいです。","m":"Tas Tuan Tanaka besar."},{"j":"[母|はは]{の}[料理|りょうり]はおいしいです。","m":"Masakan ibu enak."},{"j":"これは[誰|だれ]{の}[本|ほん]ですか。","m":"Ini buku siapa?"}],"no.1":[{"j":"[日本|にほん]{の}[車|くるま]は[有名|ゆうめい]です。","m":"Mobil Jepang terkenal."},{"j":"[英語|えいご]{の}[先生|せんせい]に[会|あ]いました。","m":"Saya bertemu guru bahasa Inggris."},{"j":"[銀行|ぎんこう]{の}[人|ひと]に[聞|き]きます。","m":"Saya bertanya kepada orang bank."},{"j":"これは[料理|りょうり]{の}[本|ほん]です。","m":"Ini buku masakan."},{"j":"[日本語|にほんご]{の}[勉強|べんきょう]は[楽|たの]しいです。","m":"Belajar bahasa Jepang menyenangkan."},{"j":"[私|わたし]は[大学|だいがく]{の}[学生|がくせい]です。","m":"Saya adalah mahasiswa universitas."}],"no.2":[{"j":"ベッド{の}[下|した]に[猫|ねこ]がいます。","m":"Ada kucing di bawah ranjang."},{"j":"[駅|えき]{の}[前|まえ]に[郵便局|ゆうびんきょく]があります。","m":"Ada kantor pos di depan stasiun."},{"j":"[学校|がっこう]{の}[隣|となり]に[公園|こうえん]があります。","m":"Ada taman di sebelah sekolah."},{"j":"[机|つくえ]{の}[中|なか]に[鉛筆|えんぴつ]があります。","m":"Ada pensil di dalam meja."},{"j":"[家|いえ]{の}[後ろ|うしろ]に[庭|にわ]があります。","m":"Ada pekarangan di belakang rumah."},{"j":"[銀行|ぎんこう]{の}[近|ちか]くにレストランがあります。","m":"Ada restoran di dekat bank."}],"no.3":[{"j":"その[傘|かさ]は[私|わたし]{の}です。","m":"Payung itu punya saya."},{"j":"この[車|くるま]は[先生|せんせい]{の}です。","m":"Mobil ini milik guru."},{"j":"これは[誰|だれ]{の}ですか。","m":"Ini punya siapa?"},{"j":"それは[兄|あに]のかばんではなく、[私|わたし]{の}です。","m":"Itu bukan tas kakak, tetapi punya saya."},{"j":"あの[赤|あか]い{の}は[私|わたし]のです。","m":"Yang merah itu punya saya."},{"j":"この[時計|とけい]は[父|ちち]{の}です。","m":"Jam ini milik ayah."}],"ya.0":[{"j":"かばんに[本|ほん]{や}ノート{など}が[入|はい]っています。","m":"Di dalam tas ada buku, buku catatan, dan sebagainya."},{"j":"[公園|こうえん]に[犬|いぬ]{や}[猫|ねこ]{など}がいます。","m":"Di taman ada anjing, kucing, dan sebagainya."},{"j":"スーパーで[肉|にく]{や}[野菜|やさい]{など}を[買|か]いました。","m":"Di supermarket saya membeli daging, sayur, dan sebagainya."},{"j":"[机|つくえ]の[上|うえ]にペン{や}[鉛筆|えんぴつ]{など}があります。","m":"Di atas meja ada pulpen, pensil, dan sebagainya."},{"j":"[日曜日|にちようび]は[掃除|そうじ]{や}[洗濯|せんたく]{など}をします。","m":"Hari Minggu saya membersihkan rumah, mencuci, dan sebagainya."},{"j":"[動物園|どうぶつえん]に[象|ぞう]{や}ライオン{など}がいます。","m":"Di kebun binatang ada gajah, singa, dan sebagainya."}],"ka.0":[{"j":"これはあなたの[本|ほん]です{か}。","m":"Apakah ini bukumu?"},{"j":"[明日|あした]、[学校|がっこう]へ[行|い]きます{か}。","m":"Apakah besok kamu pergi ke sekolah?"},{"j":"お[名前|なまえ]は[何|なに]です{か}。","m":"Siapa nama Anda?"},{"j":"トイレはどこです{か}。","m":"Di mana toilet?"},{"j":"[田中|たなか]さんは[先生|せんせい]です{か}。","m":"Apakah Tuan Tanaka seorang guru?"},{"j":"[今日|きょう]は[暑|あつ]いです{か}。","m":"Apakah hari ini panas?"}],"ka.1":[{"j":"バス{か}[電車|でんしゃ]で[行|い]きます。","m":"Saya pergi naik bus atau kereta."},{"j":"[日曜日|にちようび]{か}[月曜日|げつようび]に[会|あ]いましょう。","m":"Mari bertemu hari Minggu atau Senin."},{"j":"[紅茶|こうちゃ]{か}コーヒーを[飲|の]みます。","m":"Saya minum teh atau kopi."},{"j":"[犬|いぬ]{か}[猫|ねこ]を[飼|か]いたいです。","m":"Saya ingin memelihara anjing atau kucing."},{"j":"[土曜日|どようび]{か}[日曜日|にちようび]に[行|い]きます。","m":"Saya pergi hari Sabtu atau Minggu."},{"j":"ペン{か}[鉛筆|えんぴつ]で[書|か]いてください。","m":"Tolong menulis dengan pulpen atau pensil."}],"ka.2":[{"j":"いっしょに[食|た]べません{か}。","m":"Maukah makan bersama?"},{"j":"[明日|あした]、[映画|えいが]を[見|み]に[行|い]きません{か}。","m":"Besok maukah pergi menonton film?"},{"j":"コーヒーを[飲|の]みません{か}。","m":"Maukah minum kopi?"},{"j":"[日曜日|にちようび]に[海|うみ]へ[行|い]きません{か}。","m":"Hari Minggu maukah pergi ke laut?"},{"j":"いっしょにテニスをしません{か}。","m":"Maukah bermain tenis bersama?"},{"j":"お[茶|ちゃ]を[飲|の]みません{か}。","m":"Maukah minum teh?"}],"kara.0":[{"j":"[八時|はちじ]{から}[授業|じゅぎょう]が[始|はじ]まります。","m":"Pelajaran dimulai dari jam delapan."},{"j":"[月曜日|げつようび]{から}[金曜日|きんようび]まで[働|はたら]きます。","m":"Saya bekerja dari hari Senin sampai Jumat."},{"j":"[東京|とうきょう]{から}[京都|きょうと]まで[新幹線|しんかんせん]で[行|い]きます。","m":"Dari Tokyo ke Kyoto saya naik Shinkansen."},{"j":"いつ{から}[日本語|にほんご]を[勉強|べんきょう]していますか。","m":"Sejak kapan kamu belajar bahasa Jepang?"},{"j":"[家|いえ]{から}[学校|がっこう]まで[歩|ある]きます。","m":"Dari rumah ke sekolah saya berjalan kaki."},{"j":"[十時|じゅうじ]{から}テストがあります。","m":"Ada ujian mulai jam sepuluh."}],"kara.1":[{"j":"[母|はは]{から}[電話|でんわ]がありました。","m":"Ada telepon dari ibu."},{"j":"[先生|せんせい]{から}[本|ほん]をもらいました。","m":"Saya menerima buku dari guru."},{"j":"[友達|ともだち]{から}プレゼントをもらいました。","m":"Saya menerima hadiah dari teman."},{"j":"[兄|あに]{から}[手紙|てがみ]が[来|き]ました。","m":"Surat datang dari kakak."},{"j":"[姉|あね]{から}お[金|かね]を[借|か]りました。","m":"Saya meminjam uang dari kakak perempuan."},{"j":"[田中|たなか]さん{から}[聞|き]きました。","m":"Saya mendengarnya dari Tuan Tanaka."}],"kara.2":[{"j":"[雨|あめ]です{から}、[家|いえ]にいます。","m":"Karena hujan, saya di rumah."},{"j":"[忙|いそが]しい{から}、[行|い]きません。","m":"Karena sibuk, saya tidak pergi."},{"j":"お[金|かね]がない{から}、[買|か]いません。","m":"Karena tidak punya uang, saya tidak membeli."},{"j":"[熱|ねつ]がある{から}、[休|やす]みます。","m":"Karena demam, saya libur."},{"j":"おいしい{から}、たくさん[食|た]べました。","m":"Karena enak, saya makan banyak."},{"j":"[天気|てんき]がいい{から}、[散歩|さんぽ]しましょう。","m":"Karena cuacanya bagus, mari berjalan-jalan."}],"made.0":[{"j":"[十時|じゅうじ]{まで}[寝|ね]ました。","m":"Saya tidur sampai jam sepuluh."},{"j":"[駅|えき]{まで}[歩|ある]きます。","m":"Saya berjalan kaki sampai stasiun."},{"j":"[明日|あした]{まで}[待|ま]ってください。","m":"Tolong tunggu sampai besok."},{"j":"[夜|よる][遅|おそ]く{まで}[勉強|べんきょう]しました。","m":"Saya belajar sampai larut malam."},{"j":"[毎日|まいにち]、[五時|ごじ]{まで}[学校|がっこう]にいます。","m":"Setiap hari saya di sekolah sampai jam lima."},{"j":"[日曜日|にちようび]{まで}[休|やす]みです。","m":"Libur sampai hari Minggu."}],"yori.0":[{"j":"[今日|きょう]は[昨日|きのう]{より}[寒|さむ]いです。","m":"Hari ini lebih dingin daripada kemarin."},{"j":"[兄|あに]は[私|わたし]{より}[背|せ]が[高|たか]いです。","m":"Kakak lebih tinggi daripada saya."},{"j":"[犬|いぬ]{より}[猫|ねこ]の[方|ほう]が[好|す]きです。","m":"Saya lebih suka kucing daripada anjing."},{"j":"バス{より}[電車|でんしゃ]の[方|ほう]が[速|はや]いです。","m":"Kereta lebih cepat daripada bus."},{"j":"[東京|とうきょう]は[大阪|おおさか]{より}[大|おお]きいです。","m":"Tokyo lebih besar daripada Osaka."},{"j":"[夏|なつ]{より}[冬|ふゆ]の[方|ほう]が[好|す]きです。","m":"Saya lebih suka musim dingin daripada musim panas."}],"dake.0":[{"j":"お[茶|ちゃ]{だけ}[飲|の]みます。","m":"Saya hanya minum teh."},{"j":"[日曜日|にちようび]{だけ}[休|やす]みです。","m":"Hanya hari Minggu libur."},{"j":"[一つ|ひとつ]{だけ}ください。","m":"Tolong satu saja."},{"j":"お[金|かね]は[千円|せんえん]{だけ}あります。","m":"Uangnya hanya seribu yen."},{"j":"[今日|きょう]は[私|わたし]{だけ}[行|い]きます。","m":"Hari ini hanya saya yang pergi."},{"j":"[野菜|やさい]{だけ}[食|た]べます。","m":"Saya hanya makan sayur."}],"dake.1":[{"j":"[今日|きょう]は[三人|さんにん]{しか}[来|き]ませんでした。","m":"Hari ini hanya tiga orang yang datang."},{"j":"[水|みず]{しか}[飲|の]みません。","m":"Saya tidak minum selain air."},{"j":"[日本語|にほんご]{しか}[分|わ]かりません。","m":"Saya hanya mengerti bahasa Jepang."},{"j":"この[店|みせ]には[野菜|やさい]{しか}ありません。","m":"Toko ini hanya ada sayur."},{"j":"[今朝|けさ]はパン{しか}[食|た]べませんでした。","m":"Pagi ini saya hanya makan roti."},{"j":"[時間|じかん]が[十分|じゅっぷん]{しか}ありません。","m":"Waktunya hanya ada sepuluh menit."}],"neyo.0":[{"j":"[今日|きょう]は[暑|あつ]いです{ね}。","m":"Hari ini panas ya."},{"j":"この[料理|りょうり]はおいしいです{ね}。","m":"Masakan ini enak ya."},{"j":"[日本語|にほんご]はむずかしいです{ね}。","m":"Bahasa Jepang sulit ya."},{"j":"[来週|らいしゅう]はテストです{ね}。","m":"Minggu depan ada ujian ya."},{"j":"きれいな[花|はな]です{ね}。","m":"Bunganya cantik ya."},{"j":"[毎日|まいにち][忙|いそが]しいです{ね}。","m":"Setiap hari sibuk ya."}],"neyo.1":[{"j":"これは[私|わたし]の[本|ほん]です{よ}。","m":"Ini buku saya lho."},{"j":"あそこにバスが[来|き]ます{よ}。","m":"Busnya datang di sana lho."},{"j":"この[店|みせ]は[安|やす]いです{よ}。","m":"Toko ini murah lho."},{"j":"[明日|あした]は[休|やす]みです{よ}。","m":"Besok libur lho."},{"j":"[傘|かさ]を[忘|わす]れました{よ}。","m":"Kamu lupa membawa payung lho."},{"j":"もう[帰|かえ]ります{よ}。","m":"Aku pulang sekarang ya (lho)."}],"gurai.0":[{"j":"[家|いえ]から[駅|えき]まで[二十分|にじゅっぷん]{ぐらい}かかります。","m":"Dari rumah ke stasiun butuh sekitar dua puluh menit."},{"j":"[毎日|まいにち][三時間|さんじかん]{ぐらい}[勉強|べんきょう]します。","m":"Setiap hari saya belajar sekitar tiga jam."},{"j":"りんごを[五つ|いつつ]{ぐらい}[買|か]いました。","m":"Saya membeli sekitar lima apel."},{"j":"ここから[学校|がっこう]まで[一|いち]キロ{ぐらい}です。","m":"Dari sini ke sekolah sekitar satu kilometer."},{"j":"パーティーに[十人|じゅうにん]{ぐらい}[来|き]ました。","m":"Sekitar sepuluh orang datang ke pesta."},{"j":"[夜|よる]は[六時間|ろくじかん]{ぐらい}[寝|ね]ます。","m":"Malam hari saya tidur sekitar enam jam."}],"gurai.1":[{"j":"[毎朝|まいあさ]、[七時半|しちじはん]{ごろ}[起|お]きます。","m":"Setiap pagi saya bangun sekitar jam setengah delapan."},{"j":"[明日|あした]、[三時|さんじ]{ごろ}[会|あ]いましょう。","m":"Besok mari bertemu sekitar jam tiga."},{"j":"[夜|よる]、[十一時|じゅういちじ]{ごろ}[寝|ね]ます。","m":"Malam hari saya tidur sekitar jam sebelas."},{"j":"[昨日|きのう]は[十二時|じゅうにじ]{ごろ}[寝|ね]ました。","m":"Kemarin saya tidur sekitar jam dua belas."},{"j":"[十月|じゅうがつ]{ごろ}[日本|にほん]へ[行|い]きます。","m":"Sekitar bulan Oktober saya pergi ke Jepang."},{"j":"[五時|ごじ]{ごろ}[家|いえ]に[帰|かえ]ります。","m":"Saya pulang ke rumah sekitar jam lima."}],"zutsu.0":[{"j":"[毎日|まいにち]、[漢字|かんじ]を[五つ|いつつ]{ずつ}[覚|おぼ]えます。","m":"Setiap hari saya menghafal lima kanji."},{"j":"みんなに[二つ|ふたつ]{ずつ}あげます。","m":"Saya memberi masing-masing dua."},{"j":"[一人|ひとり]{ずつ}[入|はい]ってください。","m":"Tolong masuk satu per satu."},{"j":"[毎日|まいにち]、[少|すこ]し{ずつ}[勉強|べんきょう]します。","m":"Setiap hari saya belajar sedikit demi sedikit."},{"j":"りんごを[一つ|ひとつ]{ずつ}[食|た]べます。","m":"Saya makan apel satu per satu."},{"j":"ページを[一枚|いちまい]{ずつ}[見|み]ます。","m":"Saya melihat halaman satu per satu."}],"demo.0":[{"j":"コーヒー{でも}[飲|の]みませんか。","m":"Bagaimana kalau minum kopi atau semacamnya?"},{"j":"ちょっと[散歩|さんぽ]{でも}しませんか。","m":"Bagaimana kalau jalan-jalan sebentar?"},{"j":"[映画|えいが]{でも}[見|み]ませんか。","m":"Bagaimana kalau menonton film atau semacamnya?"},{"j":"ジュース{でも}どうですか。","m":"Bagaimana kalau minum jus atau semacamnya?"},{"j":"[日曜日|にちようび]に[買|か]い[物|もの]{でも}[行|い]きませんか。","m":"Hari Minggu, bagaimana kalau pergi berbelanja atau semacamnya?"},{"j":"おやつに[果物|くだもの]{でも}[食|た]べませんか。","m":"Untuk camilan, bagaimana kalau makan buah atau semacamnya?"}],"demo.1":[{"j":"[子供|こども]{でも}できます。","m":"Anak kecil pun bisa."},{"j":"[先生|せんせい]{でも}[分|わ]かりません。","m":"Guru pun tidak mengerti."},{"j":"[日曜日|にちようび]{でも}[働|はたら]きます。","m":"Hari Minggu pun saya bekerja."},{"j":"[冬|ふゆ]{でも}[泳|およ]ぎます。","m":"Musim dingin pun saya berenang."},{"j":"[小学生|しょうがくせい]{でも}[知|し]っています。","m":"Anak SD pun tahu."},{"j":"[東京|とうきょう]{でも}[雪|ゆき]が[降|ふ]ります。","m":"Di Tokyo pun salju turun."}]};
PARTIKEL.forEach(p => p.fungsi.forEach((f, i) => { const e = PARTIKEL_EXTRA[p.id + '.' + i]; if (e) f.ex.push(...e); }));

const PARTIKEL_BANDING = [
    { judul: 'は vs が', intro: 'は = topik / informasi lama / kontras. が = subjek baru / kata tanya / objek perasaan.', pairs: [
        { p: 'は', j: '[私|わたし]{は}[田中|たなか]です。', m: 'Saya Tanaka. (memperkenalkan diri = topik)' },
        { p: 'が', j: '[誰|だれ]{が}[田中|たなか]さんですか。', m: 'Siapa yang bernama Tanaka? (kata tanya = が)' },
        { p: 'が', j: '[私|わたし]{が}[田中|たなか]です。', m: 'Sayalah Tanaka. (menjawab "siapa" = が)' },
        { p: 'が', j: 'むかしむかし、[男|おとこ]の[人|ひと]{が}いました。', m: 'Dahulu kala ada seorang pria. (tokoh baru = が)' } ],
      kunci: 'Kata tanya sebagai subjek dan jawabannya memakai が. Perkenalan topik lama memakai は.' },
    { judul: 'に vs で (tempat)', intro: 'に = tempat keberadaan / tujuan. で = tempat berlangsungnya tindakan.', pairs: [
        { p: 'に', j: '[公園|こうえん]{に}[犬|いぬ]がいます。', m: 'Ada anjing di taman. (keberadaan)' },
        { p: 'で', j: '[公園|こうえん]{で}[遊|あそ]びます。', m: 'Saya bermain di taman. (tindakan)' },
        { p: 'に', j: '[学校|がっこう]{に}[行|い]きます。', m: 'Saya pergi ke sekolah. (tujuan)' },
        { p: 'で', j: '[学校|がっこう]{で}[勉強|べんきょう]します。', m: 'Saya belajar di sekolah. (tempat tindakan)' } ],
      kunci: 'あります / います / いきます → に. Kata kerja tindakan (たべます, べんきょうします, はたらきます) → で.' },
    { judul: 'に vs へ', intro: 'Keduanya boleh dipakai pada 行く・来る・帰る. に wajib pada beberapa pola.', pairs: [
        { p: 'へ', j: '[日本|にほん]{へ}[行|い]きます。', m: 'Saya pergi ke Jepang. (へ boleh diganti に)' },
        { p: 'に', j: '[買|か]い[物|もの]{に}[行|い]きます。', m: 'Saya pergi berbelanja. (tujuan tindakan = に)' },
        { p: 'に', j: '[七時|しちじ]{に}[起|お]きます。', m: 'Saya bangun jam tujuh. (waktu = に)' } ],
      kunci: 'Arah umum: へ atau に. Waktu, penerima, hasil perubahan, tujuan tindakan: hanya に.' },
    { judul: 'と vs や vs も', intro: 'と = dan (lengkap) / bersama. や = dan (sebagian). も = juga.', pairs: [
        { p: 'と', j: '[本|ほん]{と}ノートを[買|か]いました。', m: 'Saya membeli buku dan buku catatan (hanya dua itu).' },
        { p: 'や', j: '[本|ほん]{や}ノート{など}を[買|か]いました。', m: 'Saya membeli buku, buku catatan, dan lain-lain.' },
        { p: 'も', j: '[私|わたし]{も}[買|か]いました。', m: 'Saya juga membeli.' },
        { p: 'と', j: '[友達|ともだち]{と}[買|か]い[物|もの]に[行|い]きます。', m: 'Saya berbelanja bersama teman.' } ],
      kunci: 'や selalu bisa diikuti など. と tidak bisa.' },
    { judul: 'から vs まで vs より', intro: 'から = dari. まで = sampai. より = daripada.', pairs: [
        { p: 'から', j: '[九時|くじ]{から}[始|はじ]まります。', m: 'Dimulai dari jam sembilan.' },
        { p: 'まで', j: '[五時|ごじ]{まで}[働|はたら]きます。', m: 'Saya bekerja sampai jam lima.' },
        { p: 'より', j: '[私|わたし]は[兄|あに]{より}[背|せ]が[高|たか]いです。', m: 'Saya lebih tinggi daripada kakak.' },
        { p: 'から', j: '[暑|あつ]いです{から}、[窓|まど]を[開|あ]けます。', m: 'Karena panas, saya membuka jendela.' } ],
      kunci: 'から setelah nomina = dari; setelah kalimat = karena.' },
    { judul: 'だけ vs しか', intro: 'Keduanya "hanya", tetapi pasangan kalimatnya berbeda.', pairs: [
        { p: 'だけ', j: '[水|みず]{だけ}[飲|の]みます。', m: 'Saya hanya minum air. (positif)' },
        { p: 'しか', j: '[水|みず]{しか}[飲|の]みません。', m: 'Saya tidak minum selain air. (negatif)' } ],
      kunci: 'しか wajib dengan bentuk negatif.' },
    { judul: 'を vs が (kata kerja / sifat tertentu)', intro: 'Objek biasa memakai を. Perasaan, kemampuan, keinginan, keberadaan memakai が.', pairs: [
        { p: 'を', j: 'パン{を}[食|た]べます。', m: 'Saya makan roti. (objek tindakan)' },
        { p: 'が', j: 'パン{が}[好|す]きです。', m: 'Saya suka roti. (objek perasaan)' },
        { p: 'が', j: '[車|くるま]{が}[欲|ほ]しいです。', m: 'Saya ingin mobil.' },
        { p: 'が', j: '[机|つくえ]の[上|うえ]に[本|ほん]{が}あります。', m: 'Ada buku di atas meja.' } ],
      kunci: 'すき / きらい / じょうず / へた / わかる / できる / ほしい / ある / いる → が.' }
];

const PARTIKEL_QUIZ = [
    { j: '[私|わたし]（　）[学生|がくせい]です。', o: ['は', 'が', 'を', 'に'], a: 0, e: 'Topik kalimat → は.' },
    { j: '[雨|あめ]（　）[降|ふ]っています。', o: ['が', 'は', 'を', 'で'], a: 0, e: 'Fenomena / subjek baru → が.' },
    { j: 'パン（　）[食|た]べます。', o: ['を', 'が', 'に', 'で'], a: 0, e: 'Objek langsung → を.' },
    { j: '[七時|しちじ]（　）[起|お]きます。', o: ['に', 'で', 'を', 'と'], a: 0, e: 'Waktu spesifik → に.' },
    { j: '[図書館|としょかん]（　）[勉強|べんきょう]します。', o: ['で', 'に', 'を', 'へ'], a: 0, e: 'Tempat berlangsungnya tindakan → で.' },
    { j: '[日本|にほん]（　）[行|い]きます。', o: ['へ', 'を', 'が', 'と'], a: 0, e: 'Arah tujuan → へ (dibaca "e").' },
    { j: '[友達|ともだち]（　）[映画|えいが]を[見|み]ます。', o: ['と', 'を', 'が', 'に'], a: 0, e: '"Bersama teman" → と.' },
    { j: 'これは[私|わたし]（　）[本|ほん]です。', o: ['の', 'が', 'を', 'は'], a: 0, e: 'Kepemilikan → の.' },
    { j: '[田中|たなか]さんは[先生|せんせい]です。[私|わたし]（　）[先生|せんせい]です。', o: ['も', 'は', 'が', 'を'], a: 0, e: '"Saya juga guru" → も.' },
    { j: '[九時|くじ]（　）[五時|ごじ]まで[働|はたら]きます。', o: ['から', 'より', 'で', 'に'], a: 0, e: 'から ～ まで = dari ... sampai ...' },
    { j: '[電車|でんしゃ]（　）[行|い]きます。', o: ['で', 'に', 'を', 'が'], a: 0, e: 'Kendaraan / sarana → で.' },
    { j: '[公園|こうえん]に[子供|こども]（　）います。', o: ['が', 'を', 'は', 'で'], a: 0, e: 'います → subjek yang ada diberi が.' },
    { j: '[机|つくえ]の[上|うえ]（　）[本|ほん]があります。', o: ['に', 'で', 'を', 'は'], a: 0, e: 'Tempat keberadaan → に.' },
    { j: '[何|なに]（　）[食|た]べませんでした。', o: ['も', 'が', 'を', 'は'], a: 0, e: 'なにも + negatif = tidak makan apa-apa.' },
    { j: '[私|わたし]は[犬|いぬ]（　）[好|す]きです。', o: ['が', 'を', 'は', 'に'], a: 0, e: '好き → objeknya memakai が.' },
    { j: '[今日|きょう]は[昨日|きのう]（　）[暑|あつ]いです。', o: ['より', 'から', 'まで', 'と'], a: 0, e: 'Perbandingan "daripada" → より.' },
    { j: '[友達|ともだち]（　）[手紙|てがみ]をもらいました。', o: ['から', 'を', 'が', 'で'], a: 0, e: 'Asal pemberi "dari teman" → から.' },
    { j: 'コーヒー（　）[紅茶|こうちゃ]、どちらが[好|す]きですか。', o: ['か', 'と', 'や', 'も'], a: 0, e: 'Pilihan "atau" → か.' },
    { j: '[机|つくえ]の[上|うえ]に[本|ほん]（　）ノートなどがあります。', o: ['や', 'と', 'の', 'か'], a: 0, e: 'Daftar tidak lengkap, diikuti など → や.' },
    { j: '[百円|ひゃくえん]（　）ありません。', o: ['しか', 'だけ', 'も', 'は'], a: 0, e: 'しか + negatif = hanya punya sedikit.' },
    { j: '[水|みず]（　）[飲|の]みます。', o: ['だけ', 'しか', 'から', 'まで'], a: 0, e: 'Kalimat positif + "hanya" → だけ.' },
    { j: 'いい[天気|てんき]です（　）。', o: ['ね', 'を', 'が', 'の'], a: 0, e: 'Meminta persetujuan → ね.' },
    { j: 'もう[九時|くじ]です（　）。', o: ['よ', 'を', 'が', 'で'], a: 0, e: 'Memberi tahu / menegaskan → よ.' },
    { j: '[駅|えき]まで[十分|じゅっぷん]（　）かかります。', o: ['ぐらい', 'より', 'だけ', 'しか'], a: 0, e: 'Durasi kira-kira → ぐらい.' },
    { j: '[母|はは]（　）[電話|でんわ]します。', o: ['に', 'を', 'で', 'が'], a: 0, e: 'Orang yang dituju oleh tindakan → に.' },
    { j: '[橋|はし]（　）[渡|わた]ります。', o: ['を', 'に', 'で', 'が'], a: 0, e: 'Tempat yang dilintasi → を.' },
    { j: '[日本語|にほんご]（　）[話|はな]します。', o: ['で', 'を', 'に', 'が'], a: 0, e: 'Bahasa / alat → で.' },
    { j: '[買|か]い[物|もの]（　）[行|い]きます。', o: ['に', 'を', 'で', 'が'], a: 0, e: 'Tujuan "pergi untuk ..." → に.' },
    { j: '[誰|だれ]（　）[来|き]ましたか。', o: ['が', 'は', 'を', 'に'], a: 0, e: 'Kata tanya sebagai subjek → が.' },
    { j: '[電車|でんしゃ]（　）[乗|の]ります。', o: ['に', 'を', 'で', 'が'], a: 0, e: '乗る → に (naik ke kendaraan).' },
    { j: '[雨|あめ]です（　）、[傘|かさ]を[持|も]って[行|い]きます。', o: ['から', 'まで', 'より', 'を'], a: 0, e: 'Alasan "karena" → から.' },
    { j: '[医者|いしゃ]（　）なりたいです。', o: ['に', 'を', 'が', 'で'], a: 0, e: 'Hasil perubahan "menjadi" → に.' },
    { j: 'すみません（　）、[駅|えき]はどこですか。', o: ['が', 'は', 'を', 'に'], a: 0, e: 'Pembuka sopan / "tetapi" → が.' },
    { j: '[魚|さかな]（　）[食|た]べません。（[肉|にく]は[食|た]べます）', o: ['は', 'を', 'が', 'も'], a: 0, e: 'Kontras "kalau ikan, tidak" → は.' },
    { j: '[少|すこ]し（　）[覚|おぼ]えます。', o: ['ずつ', 'ぐらい', 'だけ', 'から'], a: 0, e: 'Sedikit demi sedikit → ずつ.' },
    { j: '[お茶|おちゃ]（　）[飲|の]みませんか。', o: ['でも', 'を', 'が', 'に'], a: 0, e: 'Ajakan "misalnya teh" → でも.' },
    { j: '[三時間|さんじかん]（　）[待|ま]ちました。', o: ['も', 'に', 'を', 'で'], a: 0, e: 'Menekankan jumlah banyak → も.' },
    { j: '[七時|しちじ]（　）[起|お]きます。', o: ['ごろ', 'ぐらい', 'より', 'まで'], a: 0, e: 'Sekitar titik waktu → ごろ.' }
];

const PARTIKEL_TABS = [
    { id: 'ringkasan', label: 'Ringkasan' },
    ...PARTIKEL.map(x => ({ id: x.id, label: x.p })),
    { id: 'banding', label: 'Banding' },
    { id: 'latihan', label: 'Latihan' }
];
let currentPartikelTab = 'ringkasan';
try { const t = localStorage.getItem('n5_partikelTab'); if (PARTIKEL_TABS.some(x => x.id === t)) currentPartikelTab = t; } catch (e) {}
if (!PREMIUM && currentPartikelTab !== FREE_LIMIT.partikel) currentPartikelTab = FREE_LIMIT.partikel;
const PX = { j: '', r: '' };
const pJp = (s) => renderExample(s, PX);
const pExBox = (e) => {
    const cp = colorPairA(e.j, PX, e.m);
    return `
    <div class="border-2 border-black bg-white p-3">
        <div class="font-jp text-lg md:text-xl leading-[2.4]">${cp.jp}</div>
        <div class="border-t-2 border-black mt-1 pt-1.5 text-sm font-bold">${cp.id}</div>
    </div>`;
};

function renderPartikelNav() {
    const nav = document.getElementById('partikel-nav');
    nav.innerHTML = '';
    PARTIKEL_TABS.forEach(t => {
        const b = document.createElement('button');
        const active = t.id === currentPartikelTab;
        b.className = `flex-shrink-0 px-3 py-1 border-2 border-black font-bold text-xs font-jp transition-colors ${active ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200'}`;
        b.textContent = t.label + (canOpen('partikel', t.id) ? '' : ' \uD83D\uDD12');
        b.addEventListener('click', () => selectPartikelTab(t.id));
        nav.appendChild(b);
    });
    const act = nav.querySelector('.bg-black');
    if (act) act.scrollIntoView({ inline: 'center', block: 'nearest' });
}

function selectPartikelTab(id) {
    if (!canOpen('partikel', id)) { openPremiumModal('Materi partikel ini hanya tersedia untuk pengguna premium.'); return; }
    currentPartikelTab = id;
    try { localStorage.setItem('n5_partikelTab', id); } catch (e) {}
    renderPartikelNav();
    renderPartikelContent();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderPartikelContent() {
    const box = document.getElementById('partikel-content');
    const id = currentPartikelTab;
    if (id === 'ringkasan') {
        box.innerHTML = `
            <h2 class="text-xl md:text-2xl font-black mb-3 uppercase border-b-4 border-black inline-block pb-0.5">Ringkasan Partikel N5</h2>
            <p class="text-sm font-bold text-gray-600 mb-3">Ketuk salah satu partikel untuk melihat penjelasan lengkap dan contoh kalimat.</p>
            <div class="flex flex-col gap-2 mb-5">
                ${PARTIKEL.map(x => `
                <button data-go="${x.id}" class="text-left border-2 border-black bg-white p-3 hover:shadow-solid-sm transition-all flex gap-3 items-center">
                    <span class="font-jp text-2xl font-black min-w-[64px] text-center">${x.p}</span>
                    <span class="flex-1">
                        <span class="block text-sm font-black leading-tight">${esc(x.ringkas)}</span>
                        <span class="block text-xs text-gray-600 font-bold mt-0.5">${esc(x.kunci)}</span>
                    </span>
                </button>`).join('')}
            </div>
            <div class="border-2 border-black bg-white shadow-solid p-4">
                <h3 class="font-black text-sm uppercase mb-2">Strategi soal partikel JLPT N5</h3>
                <ul class="text-sm font-bold leading-relaxed list-disc pl-5 flex flex-col gap-1">
                    <li>Lihat kata kerja di akhir kalimat dulu: あります・います → が; たべます・のみます → を; いきます・きます → に / へ.</li>
                    <li>Kata keterangan waktu spesifik (jam, hari, bulan) → に. きょう・あした・まいにち → tanpa に.</li>
                    <li>Tempat tindakan → で. Tempat keberadaan → に.</li>
                    <li>なにも・だれも・どこも + negatif. しか + negatif.</li>
                    <li>すき・きらい・じょうず・へた・わかる・ほしい → が.</li>
                    <li>Kata tanya sebagai subjek → が. Topik / kontras → は.</li>
                    <li>Dibaca: は = wa, へ = e, を = o.</li>
                </ul>
            </div>`;
        box.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => selectPartikelTab(b.dataset.go)));
    } else if (id === 'banding') {
        box.innerHTML = `
            <h2 class="text-xl md:text-2xl font-black mb-3 uppercase border-b-4 border-black inline-block pb-0.5">Perbandingan</h2>
            <p class="text-sm font-bold text-gray-600 mb-3">Pasangan partikel yang paling sering dipertukarkan di ujian.</p>
            <div class="flex flex-col gap-5">
            ${PARTIKEL_BANDING.map(c => `
                <section class="border-2 border-black bg-white shadow-solid p-3">
                    <h3 class="font-jp text-xl font-black mb-1">${esc(c.judul)}</h3>
                    <p class="text-sm font-bold text-gray-600 mb-3">${esc(c.intro)}</p>
                    <div class="flex flex-col gap-2">
                        ${c.pairs.map(pr => `
                        <div class="flex gap-2 items-stretch">
                            <span class="font-jp font-black text-lg bg-black text-white min-w-[52px] flex items-center justify-center px-1 text-center">${esc(pr.p)}</span>
                            <div class="flex-1">${pExBox(pr)}</div>
                        </div>`).join('')}
                    </div>
                    <div class="mt-3 p-2 bg-gray-100 border border-black text-xs font-bold"><span class="uppercase">Kunci:</span> ${esc(c.kunci)}</div>
                </section>`).join('')}
            </div>`;
    } else if (id === 'latihan') {
        startPartikelQuiz();
    } else {
        const x = PARTIKEL.find(p => p.id === id);
        box.innerHTML = `
            <div class="flex items-center gap-3 mb-3">
                <div class="font-jp text-5xl font-black border-2 border-black bg-white shadow-solid min-w-[96px] text-center px-2 py-1">${x.p}</div>
                <div>
                    <h2 class="text-lg md:text-xl font-black leading-tight">${esc(x.judul)}</h2>
                    <div class="text-xs font-mono text-gray-600">dibaca: ${esc(x.baca)}</div>
                </div>
            </div>
            <div class="flex flex-col gap-4">
                ${x.fungsi.map((f, i) => `
                <section class="border-2 border-black bg-white p-3">
                    <div class="flex items-start gap-2 mb-1">
                        <span class="font-black text-xs mt-1 min-w-[20px] text-gray-400">${i + 1}.</span>
                        <h3 class="font-black text-base leading-tight">${esc(f.n)}</h3>
                    </div>
                    <div class="font-jp text-sm bg-gray-100 border border-black px-2 py-1 mb-2 break-words">${esc(f.pola)}</div>
                    <p class="text-sm font-bold text-gray-700 mb-3">${esc(f.t)}</p>
                    <div class="flex flex-col gap-2">${f.ex.map(pExBox).join('')}</div>
                </section>`).join('')}
                <section class="border-2 border-black bg-white shadow-solid p-3">
                    <h3 class="font-black text-sm uppercase mb-2">Poin penting untuk ujian</h3>
                    <ul class="text-sm font-bold leading-relaxed list-disc pl-5 flex flex-col gap-1">${x.tips.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
                </section>
            </div>`;
    }
}

// ----- Latihan -----
let pq = { order: [], i: 0, score: 0, answered: false };
function startPartikelQuiz() {
    pq.order = PARTIKEL_QUIZ.map((_, i) => i).sort(() => Math.random() - 0.5).slice(0, 15);
    pq.i = 0; pq.score = 0; pq.answered = false;
    renderPartikelQuestion();
}
function renderPartikelQuestion() {
    const box = document.getElementById('partikel-content');
    if (pq.i >= pq.order.length) {
        const total = pq.order.length;
        box.innerHTML = `
            <div class="border-2 border-black bg-white shadow-solid p-6 text-center">
                <div class="text-[10px] font-bold uppercase tracking-wider text-gray-500">Skor akhir</div>
                <div class="text-5xl font-black my-2">${pq.score}/${total}</div>
                <p class="text-sm font-bold mb-4">${pq.score >= total * 0.8 ? 'Hebat! Partikelmu sudah kuat.' : pq.score >= total * 0.5 ? 'Lumayan, ulangi bagian yang masih salah.' : 'Pelajari lagi tab Ringkasan dan Banding, lalu coba lagi.'}</p>
                <button id="pq-restart" class="w-full border-2 border-black bg-black text-white py-2 font-bold text-sm uppercase hover:bg-white hover:text-black transition-colors">Ulangi (soal diacak)</button>
            </div>`;
        document.getElementById('pq-restart').addEventListener('click', startPartikelQuiz);
        return;
    }
    const q = PARTIKEL_QUIZ[pq.order[pq.i]];
    const html = pJp(q.j).replace('（　）', '<span class="inline-block min-w-[2.2em] border-b-4 border-black mx-1 align-baseline">&nbsp;</span>');
    const opts = q.o.map((t, idx) => ({ t, idx })).sort(() => Math.random() - 0.5);
    box.innerHTML = `
        <div class="flex justify-between items-center mb-2 text-xs font-black uppercase">
            <span>Soal ${pq.i + 1} / ${pq.order.length}</span><span>Skor: ${pq.score}</span>
        </div>
        <div class="w-full h-2.5 border-2 border-black bg-white mb-4"><div class="h-full bg-black" style="width:${pq.i / pq.order.length * 100}%"></div></div>
        <div class="border-2 border-black bg-white shadow-solid p-4 mb-3">
            <div class="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Isi partikel yang tepat</div>
            <div class="font-jp text-xl md:text-2xl leading-[2.6] text-center">${html}</div>
        </div>
        <div id="pq-opts" class="grid grid-cols-2 gap-2 mb-3">
            ${opts.map(o => `<button data-i="${o.idx}" class="pq-opt border-2 border-black bg-white py-3 font-jp text-2xl font-black hover:bg-gray-200 transition-colors">${o.t}</button>`).join('')}
        </div>
        <div id="pq-feedback" class="hidden"></div>`;
    pq.answered = false;
    box.querySelectorAll('.pq-opt').forEach(btn => btn.addEventListener('click', () => {
        if (pq.answered) return;
        pq.answered = true;
        const chosen = parseInt(btn.dataset.i, 10), ok = chosen === q.a;
        if (ok) pq.score++;
        box.querySelectorAll('.pq-opt').forEach(b => {
            const bi = parseInt(b.dataset.i, 10);
            if (bi === q.a) { b.classList.remove('bg-white'); b.classList.add('bg-black', 'text-white'); }
            else if (bi === chosen) { b.classList.add('line-through', 'bg-gray-200'); }
            b.classList.remove('hover:bg-gray-200');
        });
        const fb = document.getElementById('pq-feedback');
        fb.classList.remove('hidden');
        fb.innerHTML = `
            <div class="border-2 border-black bg-white p-3">
                <div class="font-black text-sm uppercase mb-1">${ok ? 'Benar!' : 'Kurang tepat. Jawaban: ' + esc(q.o[q.a])}</div>
                <div class="text-sm font-bold text-gray-700 mb-3">${esc(q.e)}</div>
                <button id="pq-next" class="w-full border-2 border-black bg-black text-white py-2 font-bold text-sm uppercase hover:bg-white hover:text-black transition-colors">${pq.i + 1 >= pq.order.length ? 'Lihat skor' : 'Berikutnya'}</button>
            </div>`;
        document.getElementById('pq-next').addEventListener('click', () => { pq.i++; renderPartikelQuestion(); window.scrollTo({ top: 0 }); });
    }));
}
let partikelRendered = false;
function showPartikelView() {
    if (!partikelRendered) { partikelRendered = true; renderPartikelNav(); renderPartikelContent(); }
    else renderPartikelNav();
}
