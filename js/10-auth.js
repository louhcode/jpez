// ==========================================
// AKUN: REGISTER / LOGIN
// ==========================================
const authScreen = document.getElementById('auth-screen');
const authErr = document.getElementById('auth-error');
let authMode = 'login';

function setAuthMode(m) {
    authMode = m;
    const isReg = m === 'register';
    document.getElementById('auth-confirm-wrap').classList.toggle('hidden', !isReg);
    document.getElementById('auth-submit').textContent = isReg ? 'Daftar' : 'Masuk';
    document.getElementById('auth-pass').autocomplete = isReg ? 'new-password' : 'current-password';
    const on = 'flex-1 py-2 font-bold text-sm uppercase bg-black text-white', off = 'flex-1 py-2 font-bold text-sm uppercase bg-white text-black hover:bg-gray-200';
    document.getElementById('auth-tab-login').className = !isReg ? on : off;
    document.getElementById('auth-tab-register').className = isReg ? on : off;
    document.getElementById('auth-hint').textContent = isReg
        ? 'Username 3-20 karakter (huruf kecil, angka, _). Password minimal 6 karakter.'
        : 'Belum punya akun? Pilih tab Daftar.';
    authErr.textContent = '';
}
function showAuth(msg) {
    authScreen.style.display = 'flex';
    document.body.classList.add('locked');
    setAuthMode(authMode);
    document.getElementById('auth-device-name').value = deviceName();
    if (msg) authErr.textContent = msg;
}
function hideAuth() {
    authScreen.style.display = 'none';
    document.body.classList.remove('locked');
}
document.getElementById('auth-tab-login').addEventListener('click', () => setAuthMode('login'));
document.getElementById('auth-tab-register').addEventListener('click', () => setAuthMode('register'));
document.getElementById('auth-eye').addEventListener('click', (e) => {
    const i1 = document.getElementById('auth-pass'), i2 = document.getElementById('auth-pass2');
    const show = i1.type === 'password';
    i1.type = i2.type = show ? 'text' : 'password';
    e.target.textContent = show ? 'Tutup' : 'Lihat';
});

function saveSession(res) {
    AUTH = { user: res.username, token: res.token };
    lsSet('n5_user', res.username); lsSet('n5_token', res.token);
}
// Menerapkan status premium dari server
function applyServerState(res) {
    const was = PREMIUM, p = !!res.premium;
    lsSet('n5_premium', p ? '1' : '0'); lsSet('n5_premium_t', Date.now());
    if (res.expires) lsSet('n5_premium_exp', res.expires); else lsDel('n5_premium_exp');
    if (was && !p) { deactivateAndRefresh(); }
    else { PREMIUM = p; refreshPremiumUI(); }
}
function logoutLocal() {
    AUTH = { user: null, token: null };
    lsDel('n5_user'); lsDel('n5_token');
    deactivateAndRefresh();
}
function handleSessionLost(reason) {
    logoutLocal();
    showAuth(reasonText(reason));
}

document.getElementById('auth-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = document.getElementById('auth-user').value.trim().toLowerCase();
    const pass = document.getElementById('auth-pass').value;
    const pass2 = document.getElementById('auth-pass2').value;
    const dn = (document.getElementById('auth-device-name').value.trim() || autoDeviceName()).slice(0, 60);
    if (!/^[a-z0-9_]{3,20}$/.test(user)) { authErr.textContent = reasonText('invalid_username'); return; }
    if (pass.length < 6) { authErr.textContent = reasonText('weak_password'); return; }
    if (authMode === 'register' && pass !== pass2) { authErr.textContent = 'Ulangi password tidak sama.'; return; }
    lsSet('n5_device_name', dn);
    const btn = document.getElementById('auth-submit'), old = btn.textContent;
    btn.disabled = true; btn.textContent = 'Memproses...'; authErr.textContent = '';
    const res = await api({ action: authMode, username: user, password: pass, deviceId: deviceId(), deviceName: dn });
    btn.disabled = false; btn.textContent = old;
    if (res && res.ok) {
        document.getElementById('auth-pass').value = ''; document.getElementById('auth-pass2').value = '';
        saveSession(res);
        applyServerState(res);
        hideAuth();
        switchView('Home');
    } else {
        authErr.textContent = reasonText(res && res.reason, res);
    }
});

function updateAccountUI() {
    const box = document.getElementById('st-account'), lo = document.getElementById('st-logout');
    if (!AUTH_ON || !AUTH.user) { box.classList.add('hidden'); lo.classList.add('hidden'); return; }
    box.classList.remove('hidden'); lo.classList.remove('hidden');
    box.textContent = 'Masuk sebagai: ' + AUTH.user + ' | Perangkat: ' + deviceName();
}
document.getElementById('st-logout').addEventListener('click', async () => {
    if (!confirm('Keluar dari akun di perangkat ini?')) return;
    if (AUTH.token) await api({ action: 'logout', username: AUTH.user, token: AUTH.token });
    logoutLocal();
    switchView('Home');
    showAuth();
});

// Cek status akun ke server (premium dicabut / kedaluwarsa, akun diblokir, sesi habis)
let lastSync = 0;
async function syncStatus(force) {
    if (!AUTH_ON || !AUTH.token) return;
    if (!force && Date.now() - lastSync < 60 * 60 * 1000) return;
    lastSync = Date.now();
    const res = await api({ action: 'status', username: AUTH.user, token: AUTH.token });
    if (res && res.ok) { applyServerState(res); return; }
    if (res && (res.reason === 'session_invalid' || res.reason === 'blocked')) handleSessionLost(res.reason);
}
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') syncStatus(false); });
function startAuth() {
    if (!AUTH_ON) { hideAuth(); return; }
    if (AUTH.token) { hideAuth(); syncStatus(true); }
    else showAuth();
}
