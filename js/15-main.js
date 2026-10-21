// ==========================================
// MODE GELAP
// ==========================================
const themeMQ = (window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null);
const currentTheme = () => lsGet('n5_theme') || 'auto';
function applyTheme(mode) {
    lsSet('n5_theme', mode);
    const dark = mode === 'dark' || (mode === 'auto' && themeMQ && themeMQ.matches);
    document.documentElement.classList.toggle('dark', !!dark);
    const on = 'flex-1 py-2 font-black text-xs uppercase bg-black text-white', off = 'flex-1 py-2 font-black text-xs uppercase bg-white text-black hover:bg-gray-200';
    [['light', 'th-light'], ['dark', 'th-dark'], ['auto', 'th-auto']].forEach(([m, id], i) => {
        const b = document.getElementById(id);
        if (b) b.className = (mode === m ? on : off) + (i ? ' border-l-2 border-black' : '');
    });
}
function initTheme() {
    ['light', 'dark', 'auto'].forEach(m => document.getElementById('th-' + m).addEventListener('click', () => applyTheme(m)));
    if (themeMQ && themeMQ.addEventListener) themeMQ.addEventListener('change', () => { if (currentTheme() === 'auto') applyTheme('auto'); });
    applyTheme(currentTheme());
}


// View Switcher
function switchView(viewName) {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        if (btn.id === `nav-${viewName}`) {
            btn.classList.add('bg-black', 'text-white');
            btn.classList.remove('bg-white', 'text-black');
        } else {
            btn.classList.remove('bg-black', 'text-white');
            btn.classList.add('bg-white', 'text-black');
        }
    });

    document.querySelectorAll('.page-view').forEach(view => {
        view.classList.remove('block', 'flex');
        view.classList.add('hidden');
    });

    if (viewName === 'Kotoba') {
        headerTitle.textContent = "N5 KOTOBA";
        document.getElementById('view-kotoba').classList.remove('hidden');
        document.getElementById('view-kotoba').classList.add('block');
        updateItemCount(vocabData.find(c => c.id === currentKotobaCategoryId).items.length);
        if (kotobaMode === 'chapter') renderVocab(currentKotobaCategoryId);   // sinkronkan centang hafal dari flashcard
        applyKotobaMode();
    } else if (viewName === 'Bunpou') {
        headerTitle.textContent = "N5 BUNPOU";
        document.getElementById('view-bunpou').classList.remove('hidden');
        document.getElementById('view-bunpou').classList.add('block');
        updateItemCount(bunpouData.find(c => c.id === currentBunpouCategoryId).items.length);
    } else if (viewName === 'Partikel') {
        headerTitle.textContent = "N5 PARTIKEL";
        document.getElementById('view-partikel').classList.remove('hidden');
        document.getElementById('view-partikel').classList.add('block');
        showPartikelView();
        updateItemCount(0);
    } else if (viewName === 'Kanji') {
        headerTitle.textContent = "N5 KANJI";
        document.getElementById('view-kanji').classList.remove('hidden');
        document.getElementById('view-kanji').classList.add('block');
        showKanjiView();
        updateItemCount(KANJI.length);
    } else if (viewName === 'Settings') {
        headerTitle.textContent = "SETTINGS";
        document.getElementById('view-settings').classList.remove('hidden');
        document.getElementById('view-settings').classList.add('flex');
        updateItemCount(0);
    } else if (viewName === 'Home') {
        headerTitle.textContent = "HOME";
        document.getElementById('view-home').classList.remove('hidden');
        document.getElementById('view-home').classList.add('block');
        renderHome();
        showHomeFlash();
        updateItemCount(0);
    } else {
        headerTitle.textContent = "HOME";
        document.getElementById('view-soon').classList.remove('hidden');
        document.getElementById('view-soon').classList.add('flex');
        document.getElementById('soon-title').textContent = viewName;
        updateItemCount(0);
    }
}

function updateItemCount(count) {
    itemCount.textContent = count;
}

// --- KOTOBA LOGIC ---
// Bar atas halaman bab: kembali ke peta, bab sebelumnya / berikutnya
function renderKotobaCategories() {
    categoryNav.innerHTML = '';
    const idx = vocabData.findIndex(c => c.id === currentKotobaCategoryId);
    const cat = vocabData[idx];
    const mkBtn = (txt, cls, fn, disabled) => {
        const b = document.createElement('button');
        b.className = cls + (disabled ? ' opacity-30 pointer-events-none' : '');
        b.innerHTML = txt; b.onclick = fn;
        return b;
    };
    const base = 'border-2 border-black font-black text-xs uppercase hover:bg-black hover:text-white transition-colors';
    categoryNav.appendChild(mkBtn('&larr; Peta', base + ' px-2 py-1 whitespace-nowrap', () => { setKotobaMode('map'); applyKotobaMode(); }));
    const mid = document.createElement('div');
    mid.className = 'flex items-center gap-1 flex-1 justify-end min-w-0';
    mid.appendChild(mkBtn('&#9664;', base + ' px-2 py-1', () => selectKotobaCategory(vocabData[idx - 1].id), idx <= 0));
    const t = document.createElement('span');
    t.className = 'font-black text-sm truncate px-1';
    t.textContent = cat ? cat.title : '';
    mid.appendChild(t);
    mid.appendChild(mkBtn('&#9654;', base + ' px-2 py-1', () => selectKotobaCategory(vocabData[idx + 1].id), idx >= vocabData.length - 1));
    categoryNav.appendChild(mid);
}

function renderVocab(categoryId) {
    const category = vocabData.find(c => c.id === categoryId);
    if (!category) return;

    currentCategoryTitle.textContent = category.title.replace(/[0-9]/g, '').trim(); 
    updateItemCount(category.items.length);
    
    vocabGrid.innerHTML = '';
    category.items.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = 'border-2 border-black p-2 bg-white flex flex-col h-full hover:shadow-solid-sm transition-all relative group';
        
        let noteHtml = '';
        if (item.note) {
            noteHtml = `
                <div class="mt-2 pt-1 border-t-2 border-dashed border-gray-300">
                    <label class="cursor-pointer text-[9px] font-bold text-gray-500 uppercase tracking-wider block hover:text-black transition-colors text-center w-full">
                        <input type="checkbox" class="peer hidden note-toggle">
                        <span>[+] Info</span>
                        <div class="hidden peer-checked:block note-content mt-1 p-1 bg-gray-100 border border-black text-[10px] font-medium text-black normal-case leading-tight text-left">
                            ${item.note}
                        </div>
                    </label>
                </div>
            `;
        }
        
        card.innerHTML = `
            <div class="text-2xl md:text-3xl font-jp font-normal text-center mb-1 text-black tracking-widest break-words leading-tight">
                ${item.j}
            </div>
            <div class="romaji-text text-[10px] md:text-xs text-center text-gray-600 font-mono tracking-tighter mb-1.5 leading-none">
                ${item.r}
            </div>
            <div class="arti-text border-t-2 border-black pt-1 text-xs md:text-sm font-bold text-center mt-auto leading-tight">
                ${item.m}
            </div>
            ${noteHtml}
        `;
        const key = itemKey(category.id, idx);
        const isDone = doneSet.has(key);
        card.classList.add('pt-6');
        if (isDone) card.classList.add('bg-gray-100');
        card.insertAdjacentHTML('afterbegin', `<label class="absolute top-1 left-1 z-10 cursor-pointer p-0.5" title="Sudah dikuasai"><input type="checkbox" class="w-4 h-4 accent-black cursor-pointer block" ${isDone ? 'checked' : ''}></label>`);
        const cb = card.querySelector('input[type=checkbox]');
        const lab = cb.parentElement;
        lab.addEventListener('click', ev => ev.stopPropagation());
        cb.addEventListener('change', () => toggleItemDone(category.id, idx, card, cb.checked));
        card.classList.add('kanji-card');
        card.addEventListener('click', (ev) => {
            if (ev.target.closest('label, input')) return;
            openKanjiModal(item, category.id, idx);
        });
        vocabGrid.appendChild(card);
    });
    updateCategoryProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function selectKotobaCategory(id) {
    if (!canOpen('kotoba', id)) { openPremiumModal('Bab ini hanya tersedia untuk pengguna premium.'); return false; }
    currentKotobaCategoryId = id;
    try { localStorage.setItem('n5_kotobaCategory', id); } catch (e) {}
    setKotobaMode('chapter');
    renderKotobaCategories();
    renderVocab(id);
    applyKotobaMode();
    return true;
}

// --- BUNPOU LOGIC ---
function renderBunpouCategories() {
    bunpouCategoryNav.innerHTML = '';
    bunpouData.forEach(cat => {
        const btn = document.createElement('button');
        const isActive = cat.id === currentBunpouCategoryId;
        btn.className = `flex-shrink-0 px-3 py-1 border-2 border-black font-bold text-xs transition-colors ${
            isActive ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200'
        }`;
        btn.textContent = cat.title + (canOpen('bunpou', cat.id) ? '' : ' \uD83D\uDD12');
        btn.onclick = () => {
            selectBunpouCategory(cat.id);
            btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        };
        bunpouCategoryNav.appendChild(btn);
    });
}

function renderBunpou(categoryId) {
    const category = bunpouData.find(c => c.id === categoryId);
    if (!category) return;

    currentBunpouCategoryTitle.textContent = category.title.replace(/[0-9]/g, '').trim(); 
    updateItemCount(category.items.length);
    
    bunpouGrid.innerHTML = '';
    category.items.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'border-2 border-black p-3 bg-white hover:shadow-solid-sm transition-all flex flex-col gap-2';
        
        const cpB = colorPairB(item.j, item.m);
        card.innerHTML = `
            <div class="flex items-start gap-2">
                <span class="font-black text-xs mt-1 min-w-[20px] text-gray-400">${index + 1}.</span>
                <div class="w-full">
                    <div class="text-lg md:text-xl font-jp font-medium text-black leading-loose mb-1.5 break-words">
                        ${cpB.jp}
                    </div>
                    <div class="romaji-text text-xs md:text-sm text-gray-600 font-mono leading-tight mb-2">
                        ${item.r}
                    </div>
                    <div class="arti-text border-t-2 border-black pt-2 text-sm md:text-base font-bold leading-tight">
                        ${cpB.id}
                    </div>
                    <div class="partikel-box"></div>
                </div>
            </div>
        `;
        renderParticleBox(card.querySelector('.partikel-box'), item.r);
        bunpouGrid.appendChild(card);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function selectBunpouCategory(id) {
    if (!canOpen('bunpou', id)) { openPremiumModal('Bab Bunpou ini hanya tersedia untuk pengguna premium.'); return; }
    currentBunpouCategoryId = id;
    try { localStorage.setItem('n5_bunpouCategory', id); } catch (e) {}
    renderBunpouCategories();
    renderBunpou(id);
}

// ==========================================
// SETTINGS & LOCAL STORAGE
// ==========================================
// Pengaturan terpisah: k = Kotoba, b = Bunpou
const SETTING_DEFS = [
    { id: 'k-romaji', key: 'n5_k_showRomaji', old: 'n5_showRomaji', def: true,  cls: 'k-hide-romaji', invert: true },
    { id: 'k-arti',   key: 'n5_k_showArti',   old: 'n5_showArti',   def: true,  cls: 'k-hide-arti',   invert: true },
    { id: 'k-serif',  key: 'n5_k_useSerif',   old: 'n5_useSerif',   def: false, cls: 'k-serif',       invert: false },
    { id: 'k-color', key: 'n5_k_color', old: 'n5_k_color', def: true, cls: 'k-nocolor', invert: true },
    { id: 'b-romaji', key: 'n5_b_showRomaji', old: 'n5_showRomaji', def: true,  cls: 'b-hide-romaji', invert: true },
    { id: 'b-arti',   key: 'n5_b_showArti',   old: 'n5_showArti',   def: true,  cls: 'b-hide-arti',   invert: true },
    { id: 'b-serif',  key: 'n5_b_useSerif',   old: 'n5_useSerif',   def: false, cls: 'b-serif',       invert: false },
    { id: 'b-color', key: 'n5_b_color', old: 'n5_b_color', def: true, cls: 'b-nocolor', invert: true },
    { id: 'b-partikel', key: 'n5_b_openPartikel', old: 'n5_b_openPartikel', def: false, cls: 'b-open-partikel', invert: false },
];

function applySetting(d, checked) {
    // invert: kelas dipasang saat TIDAK dicentang (hide-*); non-invert: dipasang saat dicentang
    document.body.classList.toggle(d.cls, d.invert ? !checked : checked);
}

function loadSettings() {
    SETTING_DEFS.forEach(d => {
        const el = document.getElementById('toggle-' + d.id) || document.getElementById(d.id);
        let v = null;
        try { v = localStorage.getItem(d.key); if (v === null) v = localStorage.getItem(d.old); } catch (e) {}
        const checked = v === null ? d.def : v === 'true';
        el.checked = checked;
        applySetting(d, checked);
        el.addEventListener('change', (e) => {
            applySetting(d, e.target.checked);
            try { localStorage.setItem(d.key, e.target.checked); } catch (err) {}
        });
    });
}

// ==========================================
// INITIALIZATION
// ==========================================
loadSettings();

renderKotobaCategories();
renderVocab(currentKotobaCategoryId);

renderBunpouCategories();
renderBunpou(currentBunpouCategoryId);



// Scroll tombol kategori aktif ke tampilan setelah refresh
setTimeout(() => {
    document.querySelectorAll('#category-nav button, #bunpou-category-nav button').forEach(b => {
        if (b.className.includes('bg-black')) b.scrollIntoView({ inline: 'center', block: 'nearest' });
    });
}, 50);

// Mulai dari Home
initTheme();
refreshPremiumUI();
switchView('Home');
startAuth();
