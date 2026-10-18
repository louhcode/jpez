// ==========================================
// COLOR HIGHLIGHTING: PASANGAN KATA JEPANG - INDONESIA
// ==========================================
const CW = (function () {
    const KJ = /[\u4e00-\u9fff々]/;
    const HIRA = /[\u3041-\u3096]/;
    const NCOL = 10;
    const escH = (t) => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

    // ---------- stemmer Indonesia ringan ----------
    const PRE = ['meng', 'meny', 'mem', 'men', 'me', 'peng', 'peny', 'pem', 'pen', 'pe', 'ber', 'be', 'ter', 'te', 'di', 'ke', 'se', 'per'];
    const SUF = ['kan', 'an', 'i', 'nya', 'lah', 'kah'];
    const stemCache = new Map();
    function stems(w) {
        w = w.toLowerCase();
        if (stemCache.has(w)) return stemCache.get(w);
        const bases = [w];
        SUF.forEach(s => { if (w.endsWith(s) && w.length - s.length >= 3) bases.push(w.slice(0, -s.length)); });
        const out = new Set(bases);
        bases.forEach(b => PRE.forEach(p => {
            if (b.startsWith(p) && b.length - p.length >= 3) {
                const r = b.slice(p.length);
                out.add(r);
                if (p === 'meny' || p === 'peny') out.add('s' + r);
                if (p === 'mem' || p === 'pem') out.add('p' + r);
                if (p === 'men' || p === 'pen') out.add('t' + r);
                if (p === 'meng' || p === 'peng') out.add('k' + r);
            }
        }));
        stemCache.set(w, out);
        return out;
    }
    const wordRe = /[A-Za-z0-9\u00C0-\u00FF]+/g;
    function tokenize(text) {
        const t = []; let m;
        wordRe.lastIndex = 0;
        while ((m = wordRe.exec(text)) !== null) t.push({ w: m[0], s: m.index, e: m.index + m[0].length, st: stems(m[0]), used: /^(adalah|ialah|merupakan)$/i.test(m[0]) });
        return t;
    }
    function phraseTokens(p) {
        return (p.toLowerCase().replace(/\([^)]*\)/g, ' ').match(/[a-z0-9\u00C0-\u00FF]+/g) || []).map(w => ({ w, st: stems(w) }));
    }
    function meaningPhrases(m) {
        const full = String(m).split(/[,;\/]/).map(x => x.trim()).filter(Boolean)
            .map(phraseTokens).filter(p => p.length && p.length <= 4 && p.some(t => t.w.length >= 3 || /\d/.test(t.w) || t.w === 'pr'));
        const fb = [];
        full.forEach(p => { if (p.length > 1 && !p.some(t => /^(tidak|tdk|bukan|belum|jangan|tak|kurang)$/.test(t.w))) p.forEach(t => { if (t.w.length >= 4) fb.push([t]); }); });
        return { full, fb };
    }

    // ---------- leksikon dari data kotoba ----------
    const U_ROW = { 'い': 'う', 'き': 'く', 'ぎ': 'ぐ', 'し': 'す', 'ち': 'つ', 'に': 'ぬ', 'び': 'ぶ', 'み': 'む', 'り': 'る' };
    const A_ROW = { 'う': 'わ', 'く': 'か', 'ぐ': 'が', 'す': 'さ', 'つ': 'た', 'ぬ': 'な', 'ぶ': 'ば', 'む': 'ま', 'る': 'ら' };
    const TE = { 'う': 'って', 'つ': 'って', 'る': 'って', 'む': 'んで', 'ぶ': 'んで', 'ぬ': 'んで', 'く': 'いて', 'ぐ': 'いで', 'す': 'して' };
    const TA = { 'う': 'った', 'つ': 'った', 'る': 'った', 'む': 'んだ', 'ぶ': 'んだ', 'ぬ': 'んだ', 'く': 'いた', 'ぐ': 'いだ', 'す': 'した' };
    const MASU = ['ます', 'ません', 'ました', 'ませんでした', 'ましょう', 'ませんか', 'たい', 'たいです', 'たく', 'ながら', 'に'];


    // kosakata tambahan di luar daftar kotoba (agar pewarnaan lebih lengkap)
    const EXTRA = [
        ['友達', 'teman'], ['ともだち', 'teman'], ['日本語', 'bahasa Jepang'], ['日本', 'Jepang'], ['田中', 'Tanaka'], ['山田', 'Yamada'],
        ['東京', 'Tokyo'], ['京都', 'Kyoto'], ['大阪', 'Osaka'], ['名前', 'nama'], ['ご飯', 'nasi, makan'], ['昼ご飯', 'makan siang'], ['朝ご飯', 'sarapan'], ['晩ご飯', 'makan malam'],
        ['ペン', 'pulpen, pena'], ['ケーキ', 'kue'], ['テニス', 'tenis'], ['サッカー', 'sepak bola'], ['スープ', 'sup'], ['カレー', 'kari'], ['シャツ', 'kemeja'],
        ['プレゼント', 'hadiah'], ['トイレ', 'toilet'], ['スーパー', 'supermarket'], ['アルバイト', 'kerja sambilan'], ['パソコン', 'komputer'], ['ボール', 'bola'],
        ['ラーメン', 'ramen'], ['ジュース', 'jus'], ['テレビ', 'televisi'], ['ボタン', 'kancing'], ['ビザ', 'visa'], ['アプリ', 'aplikasi'], ['ミルク', 'susu'], ['チキン', 'ayam'],
        ['ジョギング', 'jogging'], ['コピー', 'fotokopi'], ['インドネシア', 'Indonesia'], ['アメリカ', 'Amerika'], ['休み', 'libur, istirahat'], ['電気', 'lampu, listrik'],
        ['旅行', 'perjalanan, bepergian, wisata'], ['一緒に', 'bersama'], ['いっしょに', 'bersama'], ['五十', 'lima puluh'], ['五百', 'lima ratus'], ['千円', 'seribu yen'],
        ['百円', 'seratus yen'], ['一万円', 'sepuluh ribu yen'], ['二十人', 'dua puluh orang'], ['十人', 'sepuluh orang'], ['五人', 'lima orang'], ['四人', 'empat orang'],
        ['三人', 'tiga orang'], ['二人', 'dua orang'], ['一人', 'satu orang, sendirian'], ['二回', 'dua kali'], ['三回', 'tiga kali'], ['一回', 'satu kali, sekali'], ['一時間', 'satu jam'],
        ['祖父', 'kakek'], ['祖母', 'nenek'], ['両親', 'orang tua'], ['大丈夫', 'baik-baik saja, tidak apa-apa'], ['週末', 'akhir pekan'], ['空港', 'bandara'], ['島', 'pulau'],
        ['田舎', 'desa, kampung'], ['高校生', 'siswa SMA'], ['小学生', 'siswa SD, anak SD'], ['自動車', 'mobil'], ['食事', 'makan'], ['動物', 'binatang, hewan'], ['試験', 'ujian'],
        ['暖房', 'pemanas'], ['居間', 'ruang tamu'], ['半分', 'setengah'], ['彼女', 'dia, pacar'], ['彼', 'dia'], ['先生', 'guru'], ['学生', 'pelajar, mahasiswa']
    ];
    // sinonim tambahan untuk kata kotoba yang artinya sering ditulis berbeda di terjemahan
    const SYN = { '上手': 'pandai, jago', '下手': 'tidak pandai, kurang pandai', '国': 'kampung halaman, negeri', '電気': 'lampu', '休みます': 'libur', '好き': 'suka', '背': 'tubuh', '歌': 'bernyanyi, lagu', '朝': 'pagi', '宿題': 'PR' };

    const lex = new Map(); // surf -> { surf, phr: [], kana }
    function addEntry(surf, mp) {
        if (!surf || !mp.full.length) return;
        const e = lex.get(surf);
        if (e) { mp.full.forEach(p => e.phr.push(p)); mp.fb.forEach(p => e.fb.push(p)); return; }
        lex.set(surf, { surf, phr: mp.full.slice(), fb: mp.fb.slice(), kana: !KJ.test(surf) && !/[\u30A0-\u30FF]/.test(surf) });
    }
    function surfaceVariants(seg) {
        const out = new Set();
        let s = seg.trim();
        if (!s) return [];
        const m1 = s.match(/^\(([^)]+)\)(.+)$/);       // (お)皿
        if (m1) { out.add(m1[1] + m1[2]); out.add(m1[2]); return [...out]; }
        const m2 = s.match(/^(.+?)\(([^)]+)\)$/);      // 二日(間)
        if (m2) { out.add(m2[1]); out.add(m2[1] + m2[2]); return [...out]; }
        out.add(s); return [...out];
    }
    function verbForms(surf, cat) {
        // surf berakhiran ます
        const sStem = surf.slice(0, -2);
        const forms = new Set([surf]);
        MASU.forEach(sf => forms.add(sStem + sf));
        if (cat === 36 && sStem.length > 1) {
            const last = sStem.slice(-1), pre = sStem.slice(0, -1), u = U_ROW[last];
            if (u) {
                const te = pre === '行' ? 'って' : TE[u], ta = pre === '行' ? 'った' : TA[u];
                forms.add(pre + u); forms.add(pre + te); forms.add(pre + ta); forms.add(pre + A_ROW[u] + 'ない');
            }
        } else if (cat === 37 || cat === 38) {
            ['る', 'て', 'た', 'ない'].forEach(sf => forms.add(sStem + sf));
        } else if (cat === 40) {
            const noun = surf.slice(0, -3);
            if (noun) ['する', 'して', 'した', 'しない', 'します', 'しません', 'しました', 'しましょう', 'したい'].forEach(sf => forms.add(noun + sf));
        } else if (cat === 39) {
            ['来る', '来て', '来た', '来ない', '来ます', '来ません', '来ました'].forEach(f => forms.add(f));
        }
        return [...forms];
    }
    function adjForms(surf) {
        const st = surf.slice(0, -1);
        return [surf, st + 'くない', st + 'く', st + 'かった', st + 'くなかった', st + 'くて'];
    }
    function build(vocab) {
        vocab.forEach(c => c.items.forEach(it => {
            it.j.split('、').forEach(seg => surfaceVariants(seg).forEach(sv => {
                const phr = meaningPhrases(it.m + (SYN[sv] ? ', ' + SYN[sv] : ''));
                if (!phr.full.length) return;
                if (/ます$/.test(sv)) verbForms(sv, c.id).forEach(f => addEntry(f, phr));
                else if ((c.id === 34 || c.id === 7) && /い$/.test(sv) && sv.length >= 2) adjForms(sv).forEach(f => addEntry(f, phr));
                else addEntry(sv, phr);
            }));
        }));
        EXTRA.forEach(x => addEntry(x[0], meaningPhrases(x[1])));
        // indeks per huruf pertama
        const idx = new Map();
        lex.forEach(e => { const k = e.surf[0]; if (!idx.has(k)) idx.set(k, []); idx.get(k).push(e); });
        idx.forEach(arr => arr.sort((a, b) => b.surf.length - a.surf.length));
        return idx;
    }
    let INDEX = null;

    // ---------- parser unit kalimat ----------
    // markup A: {kata} {kata|yomi} [kanji|yomi]   (Kotoba, Partikel)
    function parseA(str, item, buildFurigana, hasKanji) {
        const re = /\{([^{}|]+)(?:\|([^{}]*))?\}|\[([^\[\]|]+)\|([^\[\]]*)\]/g;
        const units = []; let last = 0, m;
        const pushPlain = (txt) => { for (const ch of txt) units.push({ surf: ch, html: escH(ch) }); };
        while ((m = re.exec(str)) !== null) {
            pushPlain(str.slice(last, m.index));
            if (m[3] !== undefined) {
                units.push({ surf: m[3], html: `<ruby>${escH(m[3])}<rt>${escH(m[4])}</rt></ruby>` });
            } else {
                let reading = m[2];
                if (!reading && item && hasKanji(m[1]) && m[1] === item.j && !item.j.includes('、')) reading = buildFurigana(item.j, item.r).kana;
                units.push({ surf: m[1], html: '<span class="ex-hl">' + (reading && hasKanji(m[1]) ? `<ruby>${escH(m[1])}<rt>${escH(reading)}</rt></ruby>` : escH(m[1])) + '</span>' });
            }
            last = re.lastIndex;
        }
        pushPlain(str.slice(last));
        return units;
    }
    // markup B: 【kata】 (Bunpou)
    function parseB(str) {
        const units = []; const re = /【(.*?)】/g; let last = 0, m;
        const pushPlain = (txt) => { for (const ch of txt) units.push({ surf: ch, html: escH(ch) }); };
        while ((m = re.exec(str)) !== null) {
            pushPlain(str.slice(last, m.index));
            units.push({ surf: m[1], html: `<span class="highlight-jp">${escH(m[1])}</span>` });
            last = re.lastIndex;
        }
        pushPlain(str.slice(last));
        return units;
    }

    // ---------- penyelarasan ----------
    function align(units, idText) {
        if (!INDEX) INDEX = build(vocabData);
        const S = units.map(u => u.surf).join('');
        const startAt = new Array(S.length + 1).fill(-1), endAt = new Array(S.length + 1).fill(-1);
        let off = 0;
        units.forEach((u, i) => { startAt[off] = i; off += u.surf.length; endAt[off] = i; });
        const toks = tokenize(idText);
        const matches = []; // {u0,u1,color,t0,t1}
        let pos = 0, col = 0;
        while (pos < S.length) {
            const cands = startAt[pos] >= 0 ? (INDEX.get(S[pos]) || []) : [];
            let hit = null;
            for (const e of cands) {
                const L = e.surf.length;
                if (!S.startsWith(e.surf, pos)) continue;
                if (endAt[pos + L] < 0) continue;
                if (e.kana && (L < 2 || (pos > 0 && HIRA.test(S[pos - 1]) && !/[はがをにでへともやか]/.test(S[pos - 1])))) continue;
                // cari pasangan Indonesia
                let found = null;
                for (const ph of e.phr.concat(e.fb)) {
                    for (let i = 0; i + ph.length <= toks.length && !found; i++) {
                        let ok = true;
                        for (let j = 0; j < ph.length; j++) {
                            const t = toks[i + j];
                            if (t.used) { ok = false; break; }
                            let hitst = false;
                            for (const s of ph[j].st) if (t.st.has(s)) { hitst = true; break; }
                            if (!hitst) { ok = false; break; }
                        }
                        if (ok) found = [i, i + ph.length - 1];
                    }
                    if (found) break;
                }
                if (found) { hit = { e, L, found }; break; }
            }
            if (hit) {
                for (let k = hit.found[0]; k <= hit.found[1]; k++) toks[k].used = true;
                matches.push({ u0: startAt[pos], u1: endAt[pos + hit.L], color: col % NCOL, t0: hit.found[0], t1: hit.found[1] });
                col++; pos += hit.L;
            } else pos++;
        }
        // render JP
        const starts = new Map(matches.map(m => [m.u0, m]));
        let jp = '';
        units.forEach((u, i) => {
            const m = starts.get(i);
            if (m) jp += `<span class="cw cw${m.color}">`;
            jp += u.html;
            if (matches.some(x => x.u1 === i)) jp += '</span>';
        });
        // render Indonesia
        let id = '', cur = 0;
        matches.slice().sort((a, b) => toks[a.t0].s - toks[b.t0].s).forEach(m => {
            const s = toks[m.t0].s, e = toks[m.t1].e;
            id += escH(idText.slice(cur, s)) + `<span class="cw cw${m.color}">` + escH(idText.slice(s, e)) + '</span>';
            cur = e;
        });
        id += escH(idText.slice(cur));
        return { jp, id, pairs: matches.length, list: matches.map(m => [S.slice(units.slice(0, m.u0).reduce((a, u) => a + u.surf.length, 0), units.slice(0, m.u1 + 1).reduce((a, u) => a + u.surf.length, 0)), idText.slice(toks[m.t0].s, toks[m.t1].e), m.color]) };
    }
    return { parseA, parseB, align, escH };
})();

// Pasangan siap pakai: kembalikan { jp, id } berwarna
function colorPairA(markup, item, idText) {
    const units = CW.parseA(markup, item, buildFurigana, hasKanji);
    return CW.align(units, idText);
}
function colorPairB(markup, idText) {
    return CW.align(CW.parseB(markup), idText);
}
