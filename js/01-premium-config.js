// ==========================================
// VERSI GRATIS / PREMIUM
// ==========================================
// Aktifkan password aplikasi (false = tanpa password, hanya kode premium):
const APP_PASSWORD_ENABLED = false;
// Daftar kode premium disimpan sebagai hash SHA-256 (kode asli tidak tertulis di sini).
// Tambah kode baru: jalankan n5Hash('KODEBARU') di Console browser, lalu tempel hasilnya ke daftar ini.
const PREMIUM_HASHES = ["8a26c05f0c76b0008df9d6922b6207e3cff6d471fad15e57ac3ae0d5b085036f", "fa740d824ee8e034ced1f8d8a2be8dc8bb8973753215e6d2ae1d6a294be7d27b", "171d4449f6a0e705aa31004596e39a0ec7b48b421936e76d1257346488ff50b5", "05047b85e1749be1af727d9298f996252f6859136cbb8c49dae6930506e4c5b3", "c8d98b6c0e592e2e7a2ba36ba991cbde3c7fbe3d81f06fa56bbe31c87c66526b"];
// Link Web App Google Apps Script untuk validasi kode (lihat file apps_script_premium.gs).
// Kosongkan ('') untuk memakai daftar hash lokal saja.
const PREMIUM_API_URL = 'https://script.google.com/macros/s/AKfycbysA7m3QHIF5eJvpUEWRLWlCXZj7cLDVQbnUEg6LptZ0rQfi0Ad7nVARGbeRPZSsL0Pnw/exec';
// Premium yang sudah aktif tetap berlaku offline selama sekian hari sejak pengecekan server terakhir.
const PREMIUM_GRACE_MS = 7 * 24 * 60 * 60 * 1000;
const PREMIUM_CONTACT_TEXT = 'Belum punya kode? Hubungi admin untuk mendapatkan kode premium.';
const PREMIUM_CONTACT_URL = ''; // contoh: 'https://wa.me/62812xxxxxxx' (kosong = tombol tidak ditampilkan)
// Batas versi gratis: bab / tab yang boleh dibuka
const FREE_LIMIT = { kotoba: 1, bunpou: 1, partikel: 'wa', kanji: 1 };
// SHA-256 sederhana (tanpa dependensi) untuk memeriksa kode premium
function sha256(str) {
    const K = [0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
    const bytes = Array.from(new TextEncoder().encode(str));
    const bitLen = bytes.length * 8;
    bytes.push(0x80);
    while (bytes.length % 64 !== 56) bytes.push(0);
    for (let i = 7; i >= 0; i--) bytes.push(i >= 4 ? 0 : (bitLen >>> (i * 8)) & 0xff);
    let H = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];
    const rotr = (x, n) => (x >>> n) | (x << (32 - n));
    for (let o = 0; o < bytes.length; o += 64) {
        const w = new Array(64);
        for (let i = 0; i < 16; i++) w[i] = (bytes[o+i*4] << 24) | (bytes[o+i*4+1] << 16) | (bytes[o+i*4+2] << 8) | bytes[o+i*4+3];
        for (let i = 16; i < 64; i++) {
            const s0 = rotr(w[i-15],7) ^ rotr(w[i-15],18) ^ (w[i-15] >>> 3);
            const s1 = rotr(w[i-2],17) ^ rotr(w[i-2],19) ^ (w[i-2] >>> 10);
            w[i] = (w[i-16] + s0 + w[i-7] + s1) | 0;
        }
        let [a,b,c,d,e,f,g,h] = H;
        for (let i = 0; i < 64; i++) {
            const S1 = rotr(e,6) ^ rotr(e,11) ^ rotr(e,25);
            const ch = (e & f) ^ (~e & g);
            const t1 = (h + S1 + ch + K[i] + w[i]) | 0;
            const S0 = rotr(a,2) ^ rotr(a,13) ^ rotr(a,22);
            const mj = (a & b) ^ (a & c) ^ (b & c);
            const t2 = (S0 + mj) | 0;
            h = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0;
        }
        H = [(H[0]+a)|0,(H[1]+b)|0,(H[2]+c)|0,(H[3]+d)|0,(H[4]+e)|0,(H[5]+f)|0,(H[6]+g)|0,(H[7]+h)|0];
    }
    return H.map(x => (x >>> 0).toString(16).padStart(8, '0')).join('');
}

function n5Hash(code) { return sha256(String(code).trim().toUpperCase()); }
function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
function lsDel(k) { try { localStorage.removeItem(k); } catch (e) {} }
function deviceId() {
    let d = lsGet('n5_device');
    if (!d) { d = 'D' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36); lsSet('n5_device', d); }
    return d;
}
function autoDeviceName() {
    const ua = navigator.userAgent || '';
    let os = 'Perangkat', br = 'Browser';
    if (/Android/i.test(ua)) os = 'Android'; else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
    else if (/Windows/i.test(ua)) os = 'Windows'; else if (/Mac OS X/i.test(ua)) os = 'macOS'; else if (/Linux/i.test(ua)) os = 'Linux';
    if (/Edg\//.test(ua)) br = 'Edge'; else if (/OPR\//.test(ua)) br = 'Opera'; else if (/Chrome\//.test(ua)) br = 'Chrome';
    else if (/Firefox\//.test(ua)) br = 'Firefox'; else if (/Safari\//.test(ua)) br = 'Safari';
    return br + ' di ' + os;
}
const deviceName = () => lsGet('n5_device_name') || autoDeviceName();

// Mode akun (register/login) aktif bila PREMIUM_API_URL diisi
const AUTH_ON = !!PREMIUM_API_URL;
let AUTH = { user: lsGet('n5_user'), token: lsGet('n5_token') };
let PREMIUM = false;
if (AUTH_ON) {
    const t = parseInt(lsGet('n5_premium_t'), 10) || 0;
    PREMIUM = !!AUTH.token && lsGet('n5_premium') === '1' && (Date.now() - t) < PREMIUM_GRACE_MS;
} else {
    PREMIUM = PREMIUM_HASHES.includes(lsGet('n5_premium_h'));
}
function canOpen(kind, id) { return PREMIUM || id === FREE_LIMIT[kind]; }

const REASON_TEXT = {
    bad_credentials: 'Username atau password salah.',
    username_taken: 'Username sudah dipakai. Pilih username lain.',
    invalid_username: 'Username 3-20 karakter: huruf kecil, angka, atau garis bawah (_).',
    weak_password: 'Password minimal 6 karakter.',
    locked: 'Terlalu banyak percobaan salah. Akun dikunci sementara.',
    blocked: 'Akun ini diblokir. Hubungi admin.',
    device_limit: 'Batas jumlah perangkat untuk akun ini sudah tercapai.',
    session_invalid: 'Sesi berakhir. Silakan masuk kembali.',
    code_not_found: 'Kode tidak ditemukan. Periksa kembali.',
    code_inactive: 'Kode ini sudah dinonaktifkan.',
    code_expired: 'Kode ini sudah kedaluwarsa.',
    code_used: 'Kode ini sudah dipakai akun lain.',
    already_premium: 'Akunmu sudah memakai satu kode premium. Satu akun hanya bisa memakai satu kode.',
    not_found: 'Kode tidak ditemukan. Periksa kembali.',
    network: 'Tidak bisa terhubung ke server. Periksa internet lalu coba lagi.',
    bad_response: 'Server terjangkau tetapi balasannya tidak valid. Pastikan Apps Script sudah di-deploy ulang (New version) dan akses diatur ke "Anyone".',
    bad_request: 'Permintaan tidak valid.',
    server_error: 'Server sedang bermasalah. Coba lagi nanti.'
};
function reasonText(r, res) {
    if (r === 'locked' && res && res.minutes) return 'Terlalu banyak percobaan salah. Akun dikunci ' + res.minutes + ' menit.';
    return REASON_TEXT[r] || 'Terjadi kesalahan.';
}

// Semua permintaan ke Google Apps Script memakai POST (password tidak muncul di URL)
async function api(body) {
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), 20000);
    let r;
    try {
        r = await fetch(PREMIUM_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(body),
            signal: ctrl.signal
        });
    } catch (e) {
        console.warn('[N5 API] fetch gagal:', e);
        return { ok: false, reason: 'network' };
    } finally { clearTimeout(to); }
    // Server terjangkau, tetapi isi balasan bukan JSON (deploy salah / belum versi baru / akses bukan "Anyone")
    let text = '';
    try { text = await r.text(); } catch (e) {}
    try {
        return JSON.parse(text);
    } catch (e) {
        console.warn('[N5 API] balasan bukan JSON (status ' + r.status + '):', text.slice(0, 200));
        return { ok: false, reason: 'bad_response' };
    }
}

// Menebus kode premium. Mengembalikan { ok, reason }
async function tryUnlock(codeRaw) {
    const code = String(codeRaw).trim().toUpperCase();
    if (AUTH_ON) {
        if (!AUTH.token) return { ok: false, reason: 'session_invalid' };
        const res = await api({ action: 'redeem', username: AUTH.user, token: AUTH.token, code: code });
        if (res && res.ok) { applyServerState(res); return res; }
        if (res && (res.reason === 'session_invalid' || res.reason === 'blocked')) handleSessionLost(res.reason);
        return res || { ok: false, reason: 'server_error' };
    }
    // Mode tanpa server: daftar hash lokal
    const h = n5Hash(code);
    if (PREMIUM_HASHES.includes(h)) { PREMIUM = true; lsSet('n5_premium_h', h); return { ok: true }; }
    return { ok: false, reason: 'not_found' };
}

function deactivatePremium() {
    PREMIUM = false;
    lsSet('n5_premium', '0');
    ['n5_premium_h', 'n5_premium_c', 'n5_premium_exp'].forEach(lsDel);
}
