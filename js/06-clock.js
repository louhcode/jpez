// ==========================================
// TANGGAL & JAM BAHASA JEPANG
// ==========================================
const U = ['', 'いち', 'に', 'さん', 'よん', 'ご', 'ろく', 'なな', 'はち', 'きゅう'];
const tensRead = (n) => ['', 'じゅう', 'にじゅう', 'さんじゅう', 'よんじゅう', 'ごじゅう'][n];
function numRead(n, units) { // 1-59
    const t = Math.floor(n / 10), u = n % 10;
    return tensRead(t) + (u ? units[u] : '');
}
const rt = (base, reading) => `<ruby>${base}<rt>${reading}</rt></ruby>`;
const WEEK = ['日', '月', '火', '水', '木', '金', '土'];
const WEEK_R = ['にち', 'げつ', 'か', 'すい', 'もく', 'きん', 'ど'];

function yearRead(y) { // 2000-2099
    const u = [...U]; u[4] = 'よ'; u[9] = 'きゅう';
    const r = y % 100;
    return 'にせん' + (r ? numRead(r, u) : '');
}
function reiwaRead(n) {
    if (n === 1) return 'がん';
    const u = [...U]; u[4] = 'よ'; u[9] = 'きゅう';
    return numRead(n, u);
}
function monthRead(m) {
    const u = [...U]; u[4] = 'し'; u[7] = 'しち'; u[9] = 'く';
    return numRead(m, u) + 'がつ';
}
function dayRead(d) {
    const sp = { 1: 'ついたち', 2: 'ふつか', 3: 'みっか', 4: 'よっか', 5: 'いつか', 6: 'むいか', 7: 'なのか', 8: 'ようか', 9: 'ここのか', 10: 'とおか', 14: 'じゅうよっか', 20: 'はつか', 24: 'にじゅうよっか' };
    if (sp[d]) return sp[d];
    const u = [...U]; u[4] = 'よん'; u[7] = 'しち'; u[9] = 'く';
    return numRead(d, u) + 'にち';
}
function hourRead(h) { // 1-12
    const u = [...U]; u[4] = 'よ'; u[7] = 'しち'; u[9] = 'く';
    return numRead(h, u) + 'じ';
}
function minuteRead(m) {
    if (m === 0) return 'れいふん';
    const tens = Math.floor(m / 10), u = m % 10;
    const unitPun = ['', 'いっぷん', 'にふん', 'さんぷん', 'よんぷん', 'ごふん', 'ろっぷん', 'ななふん', 'はっぷん', 'きゅうふん'];
    if (u === 0) return ['', 'じゅっぷん', 'にじゅっぷん', 'さんじゅっぷん', 'よんじゅっぷん', 'ごじゅっぷん'][tens];
    return tensRead(tens) + unitPun[u];
}

function updateJapaneseClock() {
    const el = document.getElementById('jp-date');
    if (!el) return;
    const n = new Date();
    const y = n.getFullYear(), mo = n.getMonth() + 1, d = n.getDate(), w = n.getDay();
    const h24 = n.getHours(), mi = n.getMinutes(), se = n.getSeconds();
    const reiwa = y - 2018;
    const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
    const pad = (x) => String(x).padStart(2, '0');

    el.innerHTML =
        rt(y + '年', yearRead(y) + 'ねん') + ' ' +
        rt(mo + '月', monthRead(mo)) + ' ' +
        rt(d + '日', dayRead(d)) + '<br>' +
        '<span class="text-lg md:text-xl">(' + rt('令和' + reiwa + '年', 'れいわ' + reiwaRead(reiwa) + 'ねん') + ') ' +
        rt(WEEK[w] + '曜日', WEEK_R[w] + 'ようび') + '</span>';

    document.getElementById('jp-time').innerHTML =
        rt(h24 < 12 ? '午前' : '午後', h24 < 12 ? 'ごぜん' : 'ごご') +
        rt(h12 + '時', hourRead(h12)) +
        rt(mi + '分', minuteRead(mi)) +
        se + '秒';
    document.getElementById('jp-clock').textContent = pad(h24) + ':' + pad(mi) + ':' + pad(se);
}
updateJapaneseClock();
setInterval(updateJapaneseClock, 1000);
