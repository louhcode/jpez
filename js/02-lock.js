// ==========================================
// PASSWORD GATE
// ==========================================
// Ganti password di sini (otomatis terkunci lagi setelah 5 menit tidak di website):
const APP_PASSWORD = 'sakura5';
const lockScreen = document.getElementById('lock-screen');
const lockInput = document.getElementById('lock-input');
const lockError = document.getElementById('lock-error');

const LOCK_AFTER_MS = 5 * 60 * 1000; // 5 menit
const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} },
    del: (k) => { try { localStorage.removeItem(k); } catch (e) {} }
};
const touchSeen = () => store.set('n5_lastSeen', Date.now());

function unlockApp() {
    lockScreen.style.display = 'none';
    document.body.classList.remove('locked');
    lockError.textContent = '';
    touchSeen();
}
function lockApp() {
    store.del('n5_unlocked');
    if (typeof closeKanjiModal === 'function') closeKanjiModal();
    lockInput.value = '';
    lockInput.type = 'password';
    document.getElementById('lock-eye').textContent = 'Lihat';
    lockScreen.style.display = 'flex';
    document.body.classList.add('locked');
    setTimeout(() => lockInput.focus(), 50);
}
// Masih berlaku bila login sebelumnya belum lewat 5 menit sejak terakhir aktif
function isSessionValid() {
    if (store.get('n5_unlocked') !== '1') return false;
    const last = parseInt(store.get('n5_lastSeen'), 10);
    return !isNaN(last) && (Date.now() - last) < LOCK_AFTER_MS;
}
function checkLock() {
    if (APP_PASSWORD_ENABLED && lockScreen.style.display === 'none' && !isSessionValid()) lockApp();
}

if (!APP_PASSWORD_ENABLED || isSessionValid()) unlockApp(); else lockApp();

// Catat waktu terakhir aktif; kunci bila pergi >= 5 menit
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') touchSeen();
    else checkLock();
});
window.addEventListener('pagehide', touchSeen);
window.addEventListener('focus', checkLock);
setInterval(() => { if (document.visibilityState === 'visible' && lockScreen.style.display === 'none') touchSeen(); }, 10000);

document.getElementById('lock-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (lockInput.value === APP_PASSWORD) {
        store.set('n5_unlocked', '1');
        unlockApp();
    } else {
        lockError.textContent = 'Password salah, coba lagi.';
        lockInput.value = '';
        const f = document.getElementById('lock-form');
        f.classList.remove('lock-shake'); void f.offsetWidth; f.classList.add('lock-shake');
        lockInput.focus();
    }
});
if (!APP_PASSWORD_ENABLED) { const lb = document.getElementById('logout-btn'); lb.previousElementSibling.classList.add('hidden'); lb.classList.add('hidden'); }
document.getElementById('logout-btn').addEventListener('click', () => { lockApp(); switchView('Home'); });
document.getElementById('lock-eye').addEventListener('click', (e) => {
    const show = lockInput.type === 'password';
    lockInput.type = show ? 'text' : 'password';
    e.target.textContent = show ? 'Tutup' : 'Lihat';
});
