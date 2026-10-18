// ==========================================
// FLASHCARD KOTOBA
// ==========================================
let kotobaView = lsGet('n5_kotobaView') === 'list' ? 'list' : 'flash';
let flashDir = lsGet('n5_flashDir') === 'id' ? 'id' : 'jp';
let flashOnly = lsGet('n5_flashOnly') !== '0';
let flashShuffle = lsGet('n5_flashShuffle') === '1';
const FL = { cat: null, deck: [], pos: 0, flipped: false, total: 0, known: 0, again: 0, timer: null };

function applyKotobaViewMode() {
    const flash = kotobaView === 'flash';
    document.getElementById('vocab-grid').classList.toggle('hidden', flash);
    document.getElementById('flash-area').classList.toggle('hidden', !flash);
    const on = 'flex-1 py-1.5 font-black text-xs uppercase bg-black text-white', off = 'flex-1 py-1.5 font-black text-xs uppercase bg-white text-black hover:bg-gray-200';
    document.getElementById('kv-flash').className = flash ? on : off;
    document.getElementById('kv-list').className = (flash ? off : on) + ' border-l-2 border-black';
    document.getElementById('cat-toggle-all').classList.toggle('hidden', flash);
}
function setKotobaView(v) {
    kotobaView = v; lsSet('n5_kotobaView', v);
    if (v === 'list') renderVocab(currentKotobaCategoryId);   // sinkronkan centang hafal dari mode kartu
    else renderFlash(currentKotobaCategoryId, true);
    applyKotobaViewMode();
}
document.getElementById('kv-flash').addEventListener('click', () => setKotobaView('flash'));
document.getElementById('kv-list').addEventListener('click', () => setKotobaView('list'));

function flashItem() {
    const cat = vocabData.find(c => c.id === FL.cat);
    const idx = FL.deck[FL.pos];
    return { cat, idx, item: cat.items[idx], key: itemKey(cat.id, idx) };
}
function buildFlashDeck(catId) {
    const cat = vocabData.find(c => c.id === catId);
    let deck = cat.items.map((_, i) => i);
    if (flashOnly) deck = deck.filter(i => !doneSet.has(itemKey(cat.id, i)));
    if (flashShuffle) for (let i = deck.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [deck[i], deck[j]] = [deck[j], deck[i]]; }
    Object.assign(FL, { cat: catId, deck, pos: 0, flipped: false, total: deck.length, known: 0, again: 0 });
}

function renderFlash(catId, reset) {
    if (!catId) return;
    if (reset || FL.cat !== catId) buildFlashDeck(catId);
    const area = document.getElementById('flash-area');
    const btn = 'border-2 border-black font-black text-xs uppercase py-2 px-2 hover:bg-black hover:text-white transition-colors';
    area.innerHTML = `
        <div class="max-w-md mx-auto pb-24">
            <div class="flex items-center justify-between text-xs font-black uppercase mb-1">
                <span id="fl-pos"></span><span id="fl-stat" class="font-mono"></span>
            </div>
            <div class="w-full h-2.5 border-2 border-black bg-white mb-3"><div id="fl-bar" class="h-full bg-black transition-all duration-300" style="width:0%"></div></div>
            <div id="fl-main">
                <div id="fl-scene" class="flash-scene">
                    <div id="fl-card" class="flash-card">
                        <div id="fl-front" class="flash-face"></div>
                        <div id="fl-back" class="flash-face flash-back"></div>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-2 mt-3">
                    <button id="fl-forget" class="border-2 border-black bg-white font-black text-sm uppercase py-3 hover:bg-black hover:text-white transition-colors">&#10007; Lupa</button>
                    <button id="fl-know" class="border-2 border-black bg-black text-white font-black text-sm uppercase py-3 hover:bg-white hover:text-black transition-colors">&#10003; Hafal</button>
                </div>
                <div class="grid grid-cols-4 gap-2 mt-2">
                    <button id="fl-prev" class="${btn}">&#9664; Prev</button>
                    <button id="fl-dir" class="${btn}">&#8644; Arah</button>
                    <button id="fl-speak" class="${btn}">&#128266; Suara</button>
                    <button id="fl-next" class="${btn}">Next &#9654;</button>
                </div>
            </div>
            <div id="fl-done" class="hidden"></div>
            <div class="mt-4 flex flex-col gap-2 text-xs font-bold">
                <label class="flex items-center justify-between cursor-pointer border-2 border-black bg-white px-3 py-2"><span>Hanya kartu yang belum hafal</span><input id="fl-only" type="checkbox" class="w-5 h-5 accent-black" ${flashOnly ? 'checked' : ''}></label>
                <label class="flex items-center justify-between cursor-pointer border-2 border-black bg-white px-3 py-2"><span>Acak urutan kartu</span><input id="fl-shuffle" type="checkbox" class="w-5 h-5 accent-black" ${flashShuffle ? 'checked' : ''}></label>
                <p class="text-[11px] text-gray-500 text-center leading-snug">Ketuk kartu untuk membalik. Geser kartu ke kanan = Hafal, ke kiri = Lupa. Pintasan keyboard: Spasi, &larr; &rarr;, &uarr; Hafal, &darr; Lupa.</p>
            </div>
        </div>`;
    document.getElementById('fl-forget').addEventListener('click', flashForget);
    document.getElementById('fl-know').addEventListener('click', flashKnow);
    document.getElementById('fl-prev').addEventListener('click', () => flashMove(-1));
    document.getElementById('fl-next').addEventListener('click', () => flashMove(1));
    document.getElementById('fl-dir').addEventListener('click', () => { flashDir = flashDir === 'jp' ? 'id' : 'jp'; lsSet('n5_flashDir', flashDir); flashShow(true); });
    const sp = document.getElementById('fl-speak');
    if (!('speechSynthesis' in window)) sp.classList.add('hidden');
    sp.addEventListener('click', flashSpeak);
    document.getElementById('fl-only').addEventListener('change', (e) => { flashOnly = e.target.checked; lsSet('n5_flashOnly', flashOnly ? '1' : '0'); renderFlash(FL.cat, true); });
    document.getElementById('fl-shuffle').addEventListener('change', (e) => { flashShuffle = e.target.checked; lsSet('n5_flashShuffle', flashShuffle ? '1' : '0'); renderFlash(FL.cat, true); });
    document.getElementById('fl-scene').addEventListener('click', () => flashFlip());
    bindFlashSwipe(document.getElementById('fl-scene'));
    flashShow(false);
}

function flashFaces(item, cat, idx) {
    const label = (t) => `<div class="text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2">${t}</div>`;
    const kanji = hasKanji(item.j);
    const f = buildFurigana(item.j, item.r);
    const wordRuby = kanji ? f.html : esc(item.j);
    const frontJP = `${label('Bahasa Jepang')}<div class="font-jp text-4xl md:text-5xl font-black text-center break-words leading-tight">${esc(item.j)}</div><div class="mt-5 text-[11px] font-bold text-gray-400">Ketuk untuk melihat arti</div>`;
    const frontID = `${label('Bahasa Indonesia')}<div class="text-3xl md:text-4xl font-black text-center break-words leading-tight">${esc(item.m)}</div><div class="mt-5 text-[11px] font-bold text-gray-400">Ketuk untuk melihat kata Jepang</div>`;
    const ex = KOTOBA_EXAMPLES[cat.id + '.' + idx];
    let exHtml = '';
    if (ex) {
        const cp = colorPairA(ex.j, item, ex.m);
        exHtml = `<div class="w-full border-t-2 border-dashed border-black mt-3 pt-2 text-left">${label('Contoh kalimat')}<div class="font-jp text-base md:text-lg leading-[2.4]">${cp.jp}</div><div class="text-sm font-bold mt-1">${cp.id}</div></div>`;
    }
    const note = item.note ? `<div class="w-full mt-2 p-2 bg-gray-100 border border-black text-[11px] font-medium text-left leading-snug">${item.note}</div>` : '';
    const back = `<div class="font-jp text-4xl font-black text-center break-words leading-tight pt-3">${wordRuby}</div>
        <div class="font-mono text-sm text-gray-600 mt-2">${esc(item.r)}</div>
        <div class="text-2xl font-black text-center mt-2 leading-tight">${esc(item.m)}</div>${exHtml}${note}`;
    return flashDir === 'jp' ? { front: frontJP, back } : { front: frontID, back };
}

function flashShow(unflip) {
    const card = document.getElementById('fl-card');
    if (!card) return;
    const main = document.getElementById('fl-main'), done = document.getElementById('fl-done');
    const cat = vocabData.find(c => c.id === FL.cat);
    const d = catDoneCount(cat);
    document.getElementById('fl-stat').textContent = 'Hafal ' + d + '/' + cat.items.length;
    document.getElementById('fl-bar').style.width = (FL.total ? (FL.total - FL.deck.length) / FL.total * 100 : 100) + '%';
    if (!FL.deck.length) {
        main.classList.add('hidden'); done.classList.remove('hidden');
        document.getElementById('fl-pos').textContent = FL.total ? 'Sesi selesai' : 'Tidak ada kartu';
        const all = d === cat.items.length;
        const idx = vocabData.findIndex(c => c.id === FL.cat), nxt = vocabData[idx + 1];
        done.innerHTML = `
            <div class="border-2 border-black bg-white shadow-solid p-5 text-center">
                <div class="text-4xl mb-1">&#127881;</div>
                <div class="font-black text-lg uppercase">${all ? 'Semua kartu sudah hafal!' : 'Sesi selesai!'}</div>
                <p class="text-sm font-bold text-gray-600 mt-1">${FL.total ? 'Hafal ' + FL.known + ' kartu, ' + FL.again + ' kali ditandai Lupa.' : 'Tidak ada kartu yang perlu dipelajari di bab ini.'}</p>
                <div class="flex flex-col gap-2 mt-4">
                    <button id="fl-redo" class="border-2 border-black bg-black text-white py-2 font-bold text-sm uppercase hover:bg-white hover:text-black transition-colors">Ulangi semua kartu</button>
                    <button id="fl-reset" class="border-2 border-black py-2 font-bold text-sm uppercase hover:bg-black hover:text-white transition-colors">Reset hafalan bab ini</button>
                    ${nxt ? `<button id="fl-nextcat" class="border-2 border-black py-2 font-bold text-sm uppercase hover:bg-black hover:text-white transition-colors">Bab berikutnya &rarr;</button>` : ''}
                    <button id="fl-map" class="border-2 border-black py-2 font-bold text-sm uppercase hover:bg-black hover:text-white transition-colors">Kembali ke peta</button>
                </div>
            </div>`;
        document.getElementById('fl-redo').addEventListener('click', () => { flashOnly = false; lsSet('n5_flashOnly', '0'); renderFlash(FL.cat, true); });
        document.getElementById('fl-reset').addEventListener('click', () => {
            if (!confirm('Hapus semua centang hafal di bab ini?')) return;
            cat.items.forEach((_, i) => doneSet.delete(itemKey(cat.id, i)));
            saveDone(); updateCategoryProgress(); renderVocab(cat.id);
        });
        const nb = document.getElementById('fl-nextcat'); if (nb) nb.addEventListener('click', () => { selectKotobaCategory(nxt.id); window.scrollTo({ top: 0 }); });
        document.getElementById('fl-map').addEventListener('click', () => { setKotobaMode('map'); applyKotobaMode(); });
        return;
    }
    main.classList.remove('hidden'); done.classList.add('hidden');
    const { item, idx } = flashItem();
    document.getElementById('fl-pos').textContent = 'Kartu ' + (FL.pos + 1) + ' / ' + FL.deck.length;
    const faces = flashFaces(item, cat, idx);
    document.getElementById('fl-front').innerHTML = faces.front;
    document.getElementById('fl-back').innerHTML = faces.back;
    if (unflip) { card.classList.remove('flipped'); FL.flipped = false; }
}
function flashFlip() {
    const card = document.getElementById('fl-card');
    if (!card || !FL.deck.length) return;
    FL.flipped = !FL.flipped;
    card.classList.toggle('flipped', FL.flipped);
}
// Ganti kartu; bila sedang terbalik, putar balik dulu agar jawaban kartu baru tidak terlihat
function flashAdvance() {
    const card = document.getElementById('fl-card');
    clearTimeout(FL.timer);
    if (card && FL.flipped) {
        card.classList.remove('flipped'); FL.flipped = false;
        FL.timer = setTimeout(() => flashShow(false), 260);
    } else flashShow(false);
}
function flashMove(step) {
    if (FL.deck.length < 2) return;
    FL.pos = (FL.pos + step + FL.deck.length) % FL.deck.length;
    flashAdvance();
}
function flashKnow() {
    if (!FL.deck.length) return;
    const { key } = flashItem();
    doneSet.add(key); saveDone(); updateCategoryProgress();
    FL.deck.splice(FL.pos, 1); FL.known++;
    if (FL.pos >= FL.deck.length) FL.pos = 0;
    flashAdvance();
}
function flashForget() {
    if (!FL.deck.length) return;
    const { key } = flashItem();
    if (doneSet.delete(key)) { saveDone(); updateCategoryProgress(); }
    const [c] = FL.deck.splice(FL.pos, 1); FL.deck.push(c); FL.again++;
    if (FL.pos >= FL.deck.length) FL.pos = 0;
    flashAdvance();
}
function flashSpeak() {
    if (!FL.deck.length || !('speechSynthesis' in window)) return;
    const { item } = flashItem();
    try {
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(item.j.split('、')[0].replace(/[()（）]/g, ''));
        u.lang = 'ja-JP'; u.rate = 0.85;
        speechSynthesis.speak(u);
    } catch (e) {}
}
function bindFlashSwipe(scene) {
    let x0 = 0, y0 = 0, dx = 0, active = false;
    scene.addEventListener('touchstart', (e) => { const t = e.touches[0]; x0 = t.clientX; y0 = t.clientY; dx = 0; active = true; }, { passive: true });
    scene.addEventListener('touchmove', (e) => {
        if (!active) return;
        const t = e.touches[0]; dx = t.clientX - x0; const dy = t.clientY - y0;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) scene.style.transform = `translateX(${dx * 0.5}px) rotate(${dx / 40}deg)`;
    }, { passive: true });
    scene.addEventListener('touchend', () => {
        if (!active) return; active = false;
        scene.style.transform = '';
        if (dx > 80) { scene.dataset.swiped = '1'; flashKnow(); }
        else if (dx < -80) { scene.dataset.swiped = '1'; flashForget(); }
        if (scene.dataset.swiped) setTimeout(() => { delete scene.dataset.swiped; }, 350);
    });
    // cegah "klik" yang menyusul setelah geser agar kartu tidak ikut terbalik
    scene.addEventListener('click', (e) => { if (scene.dataset.swiped) { e.stopImmediatePropagation(); } }, true);
}
document.addEventListener('keydown', (e) => {
    if (kotobaView !== 'flash' || kotobaMode !== 'chapter') return;
    if (document.getElementById('view-kotoba').classList.contains('hidden')) return;
    if (document.getElementById('kanji-modal').classList.contains('open') || !document.getElementById('premium-modal').classList.contains('hidden')) return;
    if (document.getElementById('auth-screen') && document.getElementById('auth-screen').style.display !== 'none') return;
    const tag = (e.target && e.target.tagName) || '';
    if (/INPUT|TEXTAREA|SELECT/.test(tag)) return;
    if (e.key === ' ') { e.preventDefault(); flashFlip(); }
    else if (e.key === 'ArrowRight') flashMove(1);
    else if (e.key === 'ArrowLeft') flashMove(-1);
    else if (e.key === 'ArrowUp') { e.preventDefault(); flashKnow(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); flashForget(); }
});
