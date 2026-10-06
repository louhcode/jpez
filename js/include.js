// Loader template: mengganti <div data-include="..."> dengan isi file partial,
// lalu memuat script aplikasi secara berurutan.
(async function () {
    const self = document.currentScript;
    const scripts = (self.dataset.scripts || '').split(',').map(s => s.trim()).filter(Boolean);

    async function loadIncludes() {
        const slots = document.querySelectorAll('[data-include]');
        await Promise.all([...slots].map(async (slot) => {
            const url = slot.dataset.include;
            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
                slot.outerHTML = await res.text();
            } catch (err) {
                console.error('Gagal memuat partial:', url, err);
                slot.outerHTML = '<div class="p-4 font-bold text-red-600">Gagal memuat ' + url +
                    '. Jalankan lewat web server (bukan file://) atau pakai dist/index.html.</div>';
            }
        }));
    }

    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = src;
            s.onload = resolve;
            s.onerror = () => reject(new Error('Gagal memuat ' + src));
            document.body.appendChild(s);
        });
    }

    await loadIncludes();
    for (const src of scripts) await loadScript(src); // urutan penting
})();
