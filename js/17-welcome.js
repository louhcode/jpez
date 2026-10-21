// ==========================================
// MODAL SAMBUTAN: kalimat penyemangat + countdown JLPT N5
// Tampil sekali tiap membuka website (per sesi), setelah login/kunci terbuka
// ==========================================
const WELCOME_QUOTES = [
    { jp: '七転び八起き', ro: 'nana korobi ya oki', id: 'jatuh tujuh kali, bangkit delapan kali. jangan menyerah.' },
    { jp: '継続は力なり', ro: 'keizoku wa chikara nari', id: 'konsisten itu kekuatan. belajar sedikit tiap hari, hasilnya besar.' },
    { jp: '千里の道も一歩から', ro: 'senri no michi mo ippo kara', id: 'perjalanan sejauh apa pun dimulai dari satu langkah.' },
    { jp: '塵も積もれば山となる', ro: 'chiri mo tsumoreba yama to naru', id: 'debu yang menumpuk pun jadi gunung. kosakata kecil lama-lama jadi banyak.' },
    { jp: '習うより慣れよ', ro: 'narau yori narero', id: 'membiasakan diri lebih baik daripada hanya mempelajari.' },
    { jp: '失敗は成功のもと', ro: 'shippai wa seikou no moto', id: 'kegagalan adalah awal dari keberhasilan.' },
    { jp: '石の上にも三年', ro: 'ishi no ue ni mo san nen', id: 'sabar dan tekun, pada waktunya hasilnya akan datang.' },
    { jp: '好きこそものの上手なれ', ro: 'suki koso mono no jouzu nare', id: 'apa yang kita sukai akan jadi keahlian kita.' },
    { jp: '為せば成る', ro: 'naseba naru', id: 'kalau dikerjakan, pasti bisa terwujud.' },
    { jp: '急がば回れ', ro: 'isogaba maware', id: 'pelan tapi pasti, tidak perlu terburu-buru.' },
    { jp: '初心忘るべからず', ro: 'shoshin wasuru bekarazu', id: 'jangan lupakan semangat saat pertama kali memulai.' }
];
let welcomeSeen = false;
function pickWelcomeQuote() {
    const day = Math.floor(Date.now() / 86400000);          // ganti tiap hari
    return WELCOME_QUOTES[(day + Math.floor(Math.random() * 3)) % WELCOME_QUOTES.length];
}
function closeWelcomeModal() {
    const m = document.getElementById('welcome-modal');
    m.classList.add('hidden'); m.classList.remove('flex');
}
function maybeShowWelcome() {
    if (welcomeSeen || document.body.classList.contains('locked')) return;
    try { if (sessionStorage.getItem('n5_welcome_seen') === '1') { welcomeSeen = true; return; } } catch (e) {}
    welcomeSeen = true;
    try { sessionStorage.setItem('n5_welcome_seen', '1'); } catch (e) {}
    const q = pickWelcomeQuote();
    document.getElementById('wm-quote-jp').textContent = q.jp;
    document.getElementById('wm-quote-ro').textContent = q.ro;
    document.getElementById('wm-quote-id').textContent = q.id;
    const m = document.getElementById('welcome-modal');
    m.classList.remove('hidden'); m.classList.add('flex');
}
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeWelcomeModal(); });
// buka saat gerbang login/kunci terbuka (class "locked" dilepas dari body)
new MutationObserver(maybeShowWelcome).observe(document.body, { attributes: true, attributeFilter: ['class'] });
maybeShowWelcome();
