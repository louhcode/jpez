// ----- UI Premium -----
function openPremiumModal(msg) {
    document.getElementById('pm-msg').textContent = msg || 'Versi gratis hanya membuka 1 bab dari tiap materi.';
    document.getElementById('pm-benefits').innerHTML = [
        vocabData.length + ' bab Kotoba lengkap (775 kata) beserta contoh kalimat',
        bunpouData.length + ' bab Bunpou dengan kalimat contoh',
        'Materi Partikel lengkap: ' + PARTIKEL.length + ' kartu partikel, perbandingan, dan latihan soal',
        KANJI.length + ' kanji N5 (arti, bacaan on/kun, contoh kata) dan kuis kanji'
    ].map(t => '<li>' + t + '</li>').join('');
    document.getElementById('pm-contact-text').textContent = PREMIUM_CONTACT_TEXT;
    const c = document.getElementById('pm-contact');
    if (PREMIUM_CONTACT_URL) { c.href = PREMIUM_CONTACT_URL; c.classList.remove('hidden'); } else c.classList.add('hidden');
    document.getElementById('pm-error').textContent = '';
    document.getElementById('pm-input').value = '';
    const m = document.getElementById('premium-modal');
    m.classList.remove('hidden'); m.classList.add('flex');
    setTimeout(() => document.getElementById('pm-input').focus(), 50);
}
function closePremiumModal() {
    const m = document.getElementById('premium-modal');
    m.classList.add('hidden'); m.classList.remove('flex');
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closePremiumModal(); });

function refreshPremiumUI() {
    document.getElementById('home-premium-banner').classList.toggle('hidden', PREMIUM);
    document.getElementById('km-free-note').classList.toggle('hidden', PREMIUM);
    const st = document.getElementById('st-status');
    const exp = lsGet('n5_premium_exp');
    let expTxt = '';
    if (PREMIUM && exp) { const dt = new Date(exp); if (!isNaN(dt)) expTxt = ' (berlaku s/d ' + dt.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) + ')'; }
    st.textContent = PREMIUM ? '\u2605 PREMIUM AKTIF: semua materi terbuka' + expTxt : '\uD83D\uDD12 VERSI GRATIS: 1 bab per materi';
    document.getElementById('st-free-box').classList.toggle('hidden', PREMIUM);
    document.getElementById('st-deactivate').classList.toggle('hidden', AUTH_ON || !PREMIUM);
    updateAccountUI();
    renderKotobaCategories();
    renderBunpouCategories();
    if (partikelRendered) { renderPartikelNav(); renderPartikelContent(); }
    if (kanjiRendered) { renderKanjiNav(); if (currentKanjiTab !== 'kuis') renderKanjiContent(); }
    // render ulang halaman yang sedang tampil
    const names = ['Home', 'Kotoba', 'Bunpou', 'Partikel', 'Settings'];
    const cur = names.find(n => !document.getElementById('view-' + n.toLowerCase()).classList.contains('hidden'));
    if (cur) switchView(cur);
}

async function submitPremiumFrom(input, errEl, onDone, btn) {
    const code = input.value;
    errEl.classList.add('text-red-600');
    if (!code.trim()) { errEl.textContent = 'Masukkan kode terlebih dahulu.'; return; }
    const oldTxt = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Memeriksa kode...'; }
    errEl.textContent = '';
    const res = await tryUnlock(code);
    if (btn) { btn.disabled = false; btn.textContent = oldTxt; }
    if (res && res.ok) {
        input.value = '';
        refreshPremiumUI();
        if (onDone) onDone();
        alert('Premium aktif! Semua materi sekarang terbuka.');
    } else {
        errEl.textContent = reasonText(res && res.reason, res);
    }
}
document.getElementById('premium-form').addEventListener('submit', (e) => {
    e.preventDefault();
    submitPremiumFrom(document.getElementById('pm-input'), document.getElementById('pm-error'), closePremiumModal, e.target.querySelector('button[type=submit]'));
});
document.getElementById('st-unlock').addEventListener('click', (e) => submitPremiumFrom(document.getElementById('st-code'), document.getElementById('st-msg'), null, e.currentTarget));
document.getElementById('st-code').addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); document.getElementById('st-unlock').click(); } });

function deactivateAndRefresh() {
    deactivatePremium();
    if (!canOpen('kotoba', currentKotobaCategoryId)) { currentKotobaCategoryId = 1; lsSet('n5_kotobaCategory', 1); }
    if (!canOpen('bunpou', currentBunpouCategoryId)) { currentBunpouCategoryId = 1; lsSet('n5_bunpouCategory', 1); }
    if (!canOpen('partikel', currentPartikelTab)) currentPartikelTab = FREE_LIMIT.partikel;
    if (currentKanjiTab !== 'kuis' && !canOpen('kanji', currentKanjiTab)) currentKanjiTab = FREE_LIMIT.kanji;
    renderVocab(currentKotobaCategoryId); renderBunpou(currentBunpouCategoryId);
    refreshPremiumUI();
}
document.getElementById('st-deactivate').addEventListener('click', () => {
    if (!confirm('Nonaktifkan premium di perangkat ini?')) return;
    deactivateAndRefresh();
});
