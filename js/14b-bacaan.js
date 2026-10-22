// ==========================================
// BACAAN PANJANG (長文読解) N5: tampilan, furigana, terjemahan, kosakata, soal
// ==========================================
const bcRuby = (s) => esc(s).replace(/\[([^\[\]|]+)\|([^\[\]]*)\]/g, '<ruby>$1<rt>$2</rt></ruby>');
let bcScore = {};
try { bcScore = JSON.parse(lsGet('n5_bacaanScore')) || {}; } catch (e) { bcScore = {}; }
let currentBacaan = parseInt(lsGet('n5_bacaanTab'), 10) || 1;
let bcFuri = lsGet('n5_bc_furi') !== '0';
let bcTrans = lsGet('n5_bc_trans') === '1';
let bcAns = [];
let bacaanRendered = false;
const bcGet = (id) => BACAAN.find(b => b.id === id) || BACAAN[0];
const BC_BTN = 'border-2 border-black px-3 py-1 font-bold text-xs uppercase transition-colors';

function renderBacaanNav() {
    const nav = document.getElementById('bacaan-nav');
    nav.innerHTML = '';
    BACAAN.forEach(b => {
        const locked = !canOpen('bacaan', b.id);
        const el = document.createElement('button');
        el.className = `flex-shrink-0 px-3 py-1 border-2 border-black font-bold text-xs transition-colors ${b.id === currentBacaan ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200'}`;
        el.textContent = `${b.id}. ${b.t}` + (locked ? ' \uD83D\uDD12' : (bcScore[b.id] != null ? ' \u2713' : ''));
        el.addEventListener('click', () => selectBacaan(b.id));
        nav.appendChild(el);
    });
    const act = nav.querySelector('.bg-black');
    if (act) act.scrollIntoView({ inline: 'center', block: 'nearest' });
}

function selectBacaan(id) {
    if (!canOpen('bacaan', id)) { openPremiumModal('Teks bacaan ini hanya tersedia untuk pengguna premium.'); return; }
    currentBacaan = id; bcAns = [];
    lsSet('n5_bacaanTab', id);
    renderBacaanNav(); renderBacaanContent();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderBacaanContent() {
    const b = bcGet(currentBacaan), box = document.getElementById('bacaan-content');
    document.getElementById('view-bacaan').classList.toggle('bc-nofuri', !bcFuri);
    const best = bcScore[b.id];
    box.innerHTML = `
        <div class="flex items-center justify-between gap-2 mb-1">
            <span class="text-[10px] font-black uppercase tracking-wider border-2 border-black px-2 py-0.5">${esc(b.tag)}</span>
            <span class="text-[10px] font-bold text-gray-500">${b.q.length} soal${best != null ? ` \u2022 skor terbaik ${best}/${b.q.length}` : ''}</span>
        </div>
        <h2 class="font-jp text-2xl md:text-3xl font-black leading-[1.9]">${bcRuby(b.jp)}</h2>
        <div class="text-sm font-bold text-gray-600 mb-3">${esc(b.t)}</div>
        <div class="flex gap-2 mb-3">
            <button id="bc-furi" class="${BC_BTN}"></button>
            <button id="bc-trans" class="${BC_BTN}"></button>
        </div>
        <article class="border-2 border-black bg-white shadow-solid p-4 mb-4 flex flex-col gap-3">
            ${b.p.map(p => `
            <div class="bc-p cursor-pointer">
                <p class="font-jp text-lg md:text-xl leading-[2.4]">${bcRuby(p.j)}</p>
                <p class="bc-tr text-sm font-bold text-gray-600 border-l-4 border-black pl-2 mt-1 ${bcTrans ? '' : 'hidden'}">${esc(p.m)}</p>
            </div>`).join('')}
            <p class="text-[10px] font-bold text-gray-500">Ketuk sebuah paragraf untuk melihat atau menyembunyikan terjemahannya.</p>
        </article>
        <section class="border-2 border-black bg-white shadow-solid p-4">
            <h3 class="font-black text-sm uppercase mb-2">Kosakata penting</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                ${b.v.map(v => `
                <div class="py-1.5 border-b border-dashed border-gray-300">
                    <div class="font-jp text-base font-bold">${bcRuby(v.w)}</div>
                    <div class="text-[11px] font-mono text-gray-500">${esc(v.r)}</div>
                    <div class="text-sm font-bold">${esc(v.a)}</div>
                </div>`).join('')}
            </div>
        </section>`;
    const sync = () => {
        document.getElementById('bc-furi').textContent = 'Furigana: ' + (bcFuri ? 'ON' : 'OFF');
        document.getElementById('bc-trans').textContent = 'Terjemahan: ' + (bcTrans ? 'TAMPIL' : 'SEMBUNYI');
        ['bc-furi', 'bc-trans'].forEach(id => {
            const on = id === 'bc-furi' ? bcFuri : bcTrans, bt = document.getElementById(id);
            bt.classList.toggle('bg-black', on); bt.classList.toggle('text-white', on); bt.classList.toggle('bg-white', !on);
        });
    };
    sync();
    document.getElementById('bc-furi').addEventListener('click', () => {
        bcFuri = !bcFuri; lsSet('n5_bc_furi', bcFuri ? '1' : '0');
        document.getElementById('view-bacaan').classList.toggle('bc-nofuri', !bcFuri); sync();
    });
    document.getElementById('bc-trans').addEventListener('click', () => {
        bcTrans = !bcTrans; lsSet('n5_bc_trans', bcTrans ? '1' : '0');
        box.querySelectorAll('.bc-tr').forEach(t => t.classList.toggle('hidden', !bcTrans)); sync();
    });
    box.querySelectorAll('.bc-p').forEach(p => p.addEventListener('click', () => p.querySelector('.bc-tr').classList.toggle('hidden')));
    renderBacaanQuiz();
}

function renderBacaanQuiz() {
    const b = bcGet(currentBacaan), box = document.getElementById('bc-quiz');
    const answered = bcAns.filter(x => x != null).length;
    const score = bcAns.reduce((s, x, i) => s + (x === b.q[i].a ? 1 : 0), 0);
    const nextId = BACAAN.find(x => x.id > b.id);
    box.innerHTML = `<h3 class="font-black text-sm uppercase mb-2">Soal pemahaman (${answered}/${b.q.length})</h3>` + b.q.map((q, qi) => {
        const sel = bcAns[qi], done = sel != null;
        return `
        <div class="border-2 border-black bg-white shadow-solid p-3 mb-3">
            <div class="text-[10px] font-black uppercase tracking-wider text-gray-500">Soal ${qi + 1}</div>
            <div class="font-jp text-lg leading-[2.2] mb-2">${bcRuby(q.q)}</div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                ${q.o.map((o, oi) => {
                    const cls = !done ? 'bg-white hover:bg-gray-200' : oi === q.a ? 'bg-black text-white' : oi === sel ? 'bg-gray-200 line-through' : 'bg-white';
                    return `<button data-q="${qi}" data-o="${oi}" ${done ? 'disabled' : ''} class="bc-opt text-left border-2 border-black px-3 py-2 font-jp text-base font-bold transition-colors ${cls}"><span class="font-mono text-xs mr-2">${oi + 1}.</span>${bcRuby(o)}</button>`;
                }).join('')}
            </div>
            ${done ? `<div class="mt-2 border-2 border-black bg-gray-50 p-2 text-sm">
                <div class="font-black uppercase text-xs mb-1">${sel === q.a ? 'Benar!' : 'Kurang tepat'}</div>
                <div class="font-bold text-gray-600">${esc(q.qm)}</div>
                <div class="mt-1 font-bold">${esc(q.e)}</div></div>` : ''}
        </div>`;
    }).join('') + (answered === b.q.length ? `
        <div class="border-2 border-black bg-white shadow-solid p-4 text-center">
            <div class="text-[10px] font-bold uppercase tracking-wider text-gray-500">Skor teks ini</div>
            <div class="text-5xl font-black my-1">${score}/${b.q.length}</div>
            <p class="text-sm font-bold mb-3">${score === b.q.length ? 'Sempurna! Pemahamanmu sudah bagus.' : score >= b.q.length / 2 ? 'Lumayan. Baca ulang bagian yang salah.' : 'Baca teksnya sekali lagi dengan teliti, lalu coba lagi.'}</p>
            <div class="flex gap-2">
                <button id="bc-retry" class="flex-1 ${BC_BTN} py-2 bg-white hover:bg-black hover:text-white">Ulangi soal</button>
                ${nextId ? `<button id="bc-next" class="flex-1 ${BC_BTN} py-2 bg-black text-white hover:bg-white hover:text-black">Teks berikutnya</button>` : ''}
            </div>
        </div>` : '');
    box.querySelectorAll('.bc-opt').forEach(btn => btn.addEventListener('click', () => {
        const qi = parseInt(btn.dataset.q, 10);
        if (bcAns[qi] != null) return;
        bcAns[qi] = parseInt(btn.dataset.o, 10);
        if (bcAns.filter(x => x != null).length === b.q.length) {
            const sc = bcAns.reduce((s, x, i) => s + (x === b.q[i].a ? 1 : 0), 0);
            if (bcScore[b.id] == null || sc > bcScore[b.id]) { bcScore[b.id] = sc; lsSet('n5_bacaanScore', JSON.stringify(bcScore)); renderBacaanNav(); }
        }
        renderBacaanQuiz();
    }));
    const rt = document.getElementById('bc-retry'), nx = document.getElementById('bc-next');
    if (rt) rt.addEventListener('click', () => { bcAns = []; renderBacaanQuiz(); box.scrollIntoView({ block: 'start' }); });
    if (nx) nx.addEventListener('click', () => selectBacaan(nextId.id));
}

function showBacaanView() {
    if (!canOpen('bacaan', currentBacaan) || !BACAAN.some(b => b.id === currentBacaan)) currentBacaan = 1;
    bacaanRendered = true;
    renderBacaanNav(); renderBacaanContent();
}
