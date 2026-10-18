// ==========================================
// PETA BAB KOTOBA (gaya Duolingo)
// ==========================================
const KOTOBA_UNITS = [
    { t: 'ANGKA & WAKTU', ids: [1, 2, 3, 4, 5, 6] },
    { t: 'WARNA, SATUAN & PRONOMINA', ids: [7, 8, 9] },
    { t: 'MANUSIA & KELUARGA', ids: [10, 11] },
    { t: 'ALAM, MUSIM & BINATANG', ids: [12, 13, 14] },
    { t: 'BENDA, PAKAIAN & MAKANAN', ids: [15, 16, 17] },
    { t: 'HOBI, KOTA & TRANSPORTASI', ids: [18, 19, 20] },
    { t: 'SEKOLAH & BANGUNAN', ids: [21, 22] },
    { t: 'RUMAH & PERALATAN', ids: [23, 24, 25, 26, 27] },
    { t: 'KERJA, ARAH & PERTANYAAN', ids: [28, 29, 30, 31] },
    { t: 'KATA SAMBUNG & KETERANGAN', ids: [32, 33] },
    { t: 'KATA SIFAT', ids: [34, 35] },
    { t: 'KATA KERJA', ids: [36, 37, 38, 39, 40] }
];
let kotobaMode = 'map';
try { if (localStorage.getItem('n5_kotobaMode') === 'chapter') kotobaMode = 'chapter'; } catch (e) {}
function setKotobaMode(m) {
    kotobaMode = m;
    try { localStorage.setItem('n5_kotobaMode', m); } catch (e) {}
}

function renderKotobaMap() {
    const ROW = 132, W = 300, OFFS = [0, 58, 86, 58, 0, -58, -86, -58];
    const root = document.getElementById('kotoba-map');
    root.innerHTML = '';
    let gIdx = 0, allDone = 0, allTotal = 0;
    let started = false;
    try { started = localStorage.getItem('n5_kotobaCategory') !== null; } catch (e) {}
    const used = new Set(KOTOBA_UNITS.flatMap(u => u.ids));
    const units = KOTOBA_UNITS.concat(vocabData.filter(c => !used.has(c.id)).length ? [{ t: 'LAINNYA', ids: vocabData.filter(c => !used.has(c.id)).map(c => c.id) }] : []);

    units.forEach((u, ui) => {
        const cats = u.ids.map(id => vocabData.find(c => c.id === id)).filter(Boolean);
        if (!cats.length) return;
        const uDone = cats.filter(c => catDoneCount(c) === c.items.length).length;
        const sec = document.createElement('section');
        sec.className = 'mb-6';
        const head = document.createElement('div');
        head.className = 'bg-black text-white border-2 border-black px-3 py-2 flex items-center justify-between gap-2 mb-2';
        head.innerHTML = `<div><div class="text-[10px] font-bold uppercase tracking-wider text-gray-300">Bagian ${ui + 1}</div><div class="font-black text-sm leading-tight uppercase">${esc(u.t)}</div></div><div class="font-mono font-black text-xs whitespace-nowrap">${uDone}/${cats.length}</div>`;
        sec.appendChild(head);

        const H = cats.length * ROW + 10;
        const wrap = document.createElement('div');
        wrap.className = 'relative mx-auto';
        wrap.style.cssText = `width:${W}px;height:${H}px`;

        const pts = cats.map((c, i) => ({ x: W / 2 + OFFS[(gIdx + i) % OFFS.length], y: i * ROW + 52 }));
        let d = `M ${pts[0].x} ${pts[0].y}`;
        for (let i = 1; i < pts.length; i++) {
            const p = pts[i - 1], q = pts[i], m = (p.y + q.y) / 2;
            d += ` C ${p.x} ${m}, ${q.x} ${m}, ${q.x} ${q.y}`;
        }
        wrap.insertAdjacentHTML('beforeend', `<svg class="absolute inset-0 pointer-events-none" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><path d="${d}" fill="none" style="stroke:var(--ink)" stroke-width="4" stroke-dasharray="2 10" stroke-linecap="round"/></svg>`);

        cats.forEach((c, i) => {
            const done = catDoneCount(c), total = c.items.length;
            allDone += done; allTotal += total;
            const pct = total ? Math.round(done / total * 100) : 0;
            const complete = total > 0 && done === total;
            const locked = !canOpen('kotoba', c.id);
            const isCur = !locked && c.id === currentKotobaCategoryId;
            const num = (c.title.match(/^\d+/) || [''])[0];
            const name = c.title.replace(/^\d+\s*/, '');
            const { x, y } = pts[i];
            const node = document.createElement('div');
            node.className = 'absolute';
            node.style.cssText = `left:${x - 42}px;top:${y - 42}px;width:84px;height:84px`;
            node.innerHTML = `
                ${isCur ? `<div class="map-bounce absolute left-1/2 -translate-x-1/2 -top-9 z-10 whitespace-nowrap"><div class="bg-black text-white text-[10px] font-black uppercase px-2 py-1 border-2 border-black">${started || done > 0 ? 'Lanjut' : 'Mulai'}</div><div class="mx-auto w-0 h-0" style="border-left:6px solid transparent;border-right:6px solid transparent;border-top:7px solid var(--ink)"></div></div>` : ''}
                <button class="map-node w-full h-full rounded-full border-2 border-black p-[5px]" style="background:${locked ? 'var(--track)' : `conic-gradient(var(--ink) ${pct}%, var(--track) 0)`};box-shadow:${locked ? '2px 2px 0 #9ca3af' : '4px 4px 0 var(--ink)'}" aria-label="${esc(c.title)}">
                    <span class="w-full h-full rounded-full border-2 ${locked ? 'border-gray-400 border-dashed text-gray-400 bg-gray-100' : 'border-black'} flex flex-col items-center justify-center leading-none ${locked ? '' : (complete ? 'bg-black text-white' : 'bg-white text-black')}">
                        <span class="font-black text-xl">${esc(num)}</span>
                        <span class="text-[11px] font-black mt-0.5">${locked ? '\uD83D\uDD12' : (complete ? '&#10003;' : pct + '%')}</span>
                    </span>
                </button>
                <div class="absolute left-1/2 -translate-x-1/2 top-[92px] w-[130px] text-center text-[10px] font-black uppercase leading-tight">${esc(name)}<span class="block font-mono text-gray-500">${locked ? 'Premium' : done + '/' + total}</span></div>`;
            node.querySelector('button').addEventListener('click', () => { selectKotobaCategory(c.id); window.scrollTo({ top: 0 }); });
            if (isCur) node.dataset.current = '1';
            wrap.appendChild(node);
        });
        gIdx += cats.length;
        sec.appendChild(wrap);
        root.appendChild(sec);
    });
    document.getElementById('km-free-note').classList.toggle('hidden', PREMIUM);
    document.getElementById('km-total-text').textContent = allDone + '/' + allTotal;
    document.getElementById('km-total-bar').style.width = (allTotal ? allDone / allTotal * 100 : 0) + '%';
}

function applyKotobaMode() {
    const map = document.getElementById('kotoba-map-wrap');
    const chap = document.getElementById('kotoba-chapter-wrap');
    if (kotobaMode === 'map') {
        chap.classList.add('hidden'); map.classList.remove('hidden');
        renderKotobaMap();
        const cur = document.querySelector('#kotoba-map [data-current]');
        if (cur) setTimeout(() => cur.scrollIntoView({ block: 'center' }), 30);
        else window.scrollTo({ top: 0 });
    } else {
        map.classList.add('hidden'); chap.classList.remove('hidden');
    }
}
// Tombol navbar Kotoba: bila sudah di dalam bab, kembali ke peta
function navKotoba() {
    const v = document.getElementById('view-kotoba');
    if (!v.classList.contains('hidden') && kotobaMode === 'chapter') { setKotobaMode('map'); applyKotobaMode(); return; }
    switchView('Kotoba');
}
