// ==========================================
// APP LOGIC
// ==========================================
let currentKotobaCategoryId = 1;
let currentBunpouCategoryId = 1;

const categoryNav = document.getElementById('category-nav');
const vocabGrid = document.getElementById('vocab-grid');
const currentCategoryTitle = document.getElementById('current-category-title');

const bunpouCategoryNav = document.getElementById('bunpou-category-nav');
const bunpouGrid = document.getElementById('bunpou-grid');
const currentBunpouCategoryTitle = document.getElementById('current-bunpou-category-title');

const itemCount = document.getElementById('item-count');
const headerTitle = document.getElementById('header-title');

// Parse Japanese String with 【 】 into styled HTML
function formatJapaneseText(text) {
    return text.replace(/【(.*?)】/g, '<span class="highlight-jp">$1</span>');
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
    } else if (viewName === 'Bunpou') {
        headerTitle.textContent = "N5 BUNPOU";
        document.getElementById('view-bunpou').classList.remove('hidden');
        document.getElementById('view-bunpou').classList.add('block');
        updateItemCount(bunpouData.find(c => c.id === currentBunpouCategoryId).items.length);
    } else if (viewName === 'Settings') {
        headerTitle.textContent = "SETTINGS";
        document.getElementById('view-settings').classList.remove('hidden');
        document.getElementById('view-settings').classList.add('flex');
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
function renderKotobaCategories() {
    categoryNav.innerHTML = '';
    vocabData.forEach(cat => {
        const btn = document.createElement('button');
        const isActive = cat.id === currentKotobaCategoryId;
        btn.className = `flex-shrink-0 px-3 py-1 border-2 border-black font-bold text-xs transition-colors ${
            isActive ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200'
        }`;
        btn.textContent = cat.title;
        btn.onclick = () => {
            selectKotobaCategory(cat.id);
            btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        };
        categoryNav.appendChild(btn);
    });
}

function renderVocab(categoryId) {
    const category = vocabData.find(c => c.id === categoryId);
    if (!category) return;

    currentCategoryTitle.textContent = category.title.replace(/[0-9]/g, '').trim(); 
    updateItemCount(category.items.length);

    vocabGrid.innerHTML = '';
    category.items.forEach((item) => {
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
        vocabGrid.appendChild(card);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function selectKotobaCategory(id) {
    currentKotobaCategoryId = id;
    renderKotobaCategories();
    renderVocab(id);
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
        btn.textContent = cat.title;
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

        card.innerHTML = `
            <div class="flex items-start gap-2">
                <span class="font-black text-xs mt-1 min-w-[20px] text-gray-400">${index + 1}.</span>
                <div class="w-full">
                    <div class="text-lg md:text-xl font-jp font-medium text-black leading-snug mb-1.5 break-words">
                        ${formatJapaneseText(item.j)}
                    </div>
                    <div class="romaji-text text-xs md:text-sm text-gray-600 font-mono leading-tight mb-2">
                        ${item.r}
                    </div>
                    <div class="arti-text border-t-2 border-black pt-2 text-sm md:text-base font-bold leading-tight">
                        ${item.m}
                    </div>
                </div>
            </div>
        `;
        bunpouGrid.appendChild(card);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function selectBunpouCategory(id) {
    currentBunpouCategoryId = id;
    renderBunpouCategories();
    renderBunpou(id);
}

// ==========================================
// SETTINGS & LOCAL STORAGE
// ==========================================
const toggleRomaji = document.getElementById('toggle-romaji');
const toggleArti = document.getElementById('toggle-arti');

function loadSettings() {
    const saveRomaji = localStorage.getItem('n5_showRomaji');
    const saveArti = localStorage.getItem('n5_showArti');

    // Default is true if not set
    const isRomajiVisible = saveRomaji === null ? true : saveRomaji === 'true';
    const isArtiVisible = saveArti === null ? true : saveArti === 'true';

    toggleRomaji.checked = isRomajiVisible;
    if(!isRomajiVisible) document.body.classList.add('hide-romaji');

    toggleArti.checked = isArtiVisible;
    if(!isArtiVisible) document.body.classList.add('hide-arti');
}

toggleRomaji.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
        document.body.classList.remove('hide-romaji');
    } else {
        document.body.classList.add('hide-romaji');
    }
    localStorage.setItem('n5_showRomaji', isChecked);
});

toggleArti.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
        document.body.classList.remove('hide-arti');
    } else {
        document.body.classList.add('hide-arti');
    }
    localStorage.setItem('n5_showArti', isChecked);
});

// ==========================================
// INITIALIZATION
// ==========================================
loadSettings();

renderKotobaCategories();
renderVocab(currentKotobaCategoryId);

renderBunpouCategories();
renderBunpou(currentBunpouCategoryId);

// Start di Kotoba by default
switchView('Kotoba');
