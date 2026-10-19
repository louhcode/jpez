// ==========================================
// COUNTDOWN JLPT N5 (6 Desember 2026)
// ==========================================
(function () {
    const START = new Date(2026, 11, 6, 0, 0, 0).getTime();   // bulan 11 = Desember
    const END = START + 24 * 60 * 60 * 1000;
    const $ = id => document.getElementById(id);
    const pad = n => String(n).padStart(2, '0');

    function tick() {
        if (!$('jlpt-countdown')) return;
        const now = Date.now();
        const ms = START - now;
        const over = ms <= 0;
        $('jc-run').classList.toggle('hidden', over);
        $('jc-msg').classList.toggle('hidden', !over);
        if (over) {
            $('jc-msg').innerHTML = now < END
                ? '<span class="font-jp">頑張って！</span><br>Ujian hari ini!'
                : 'Ujian sudah lewat';
            return;
        }
        $('jc-days').textContent = Math.floor(ms / 86400000);
        $('jc-h').textContent = pad(Math.floor(ms % 86400000 / 3600000));
        $('jc-m').textContent = pad(Math.floor(ms % 3600000 / 60000));
        $('jc-s').textContent = pad(Math.floor(ms % 60000 / 1000));
    }
    tick();
    setInterval(tick, 1000);
})();
