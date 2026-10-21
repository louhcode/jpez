// ==========================================
// COUNTDOWN JLPT N5 (6 Desember 2026)
// Dipakai di kartu Home (prefix "jc") dan modal sambutan (prefix "wm")
// ==========================================
(function () {
    const START = new Date(2026, 11, 6, 0, 0, 0).getTime();   // bulan 11 = Desember
    const END = START + 24 * 60 * 60 * 1000;
    const $ = id => document.getElementById(id);
    const pad = n => String(n).padStart(2, '0');

    function paint(p) {
        if (!$(p + '-run')) return;
        const now = Date.now();
        const ms = START - now;
        const over = ms <= 0;
        $(p + '-run').classList.toggle('hidden', over);
        $(p + '-msg').classList.toggle('hidden', !over);
        if (over) {
            $(p + '-msg').innerHTML = now < END
                ? '<span class="font-jp">頑張って！今日は試験日</span><br>semangat, ujian hari ini!'
                : 'ujian sudah lewat <span class="font-jp">試験終了</span>';
            return;
        }
        $(p + '-days').textContent = Math.floor(ms / 86400000);
        $(p + '-h').textContent = pad(Math.floor(ms % 86400000 / 3600000));
        $(p + '-m').textContent = pad(Math.floor(ms % 3600000 / 60000));
        $(p + '-s').textContent = pad(Math.floor(ms % 60000 / 1000));
    }
    function tick() { paint('jc'); paint('wm'); }
    tick();
    setInterval(tick, 1000);
})();
