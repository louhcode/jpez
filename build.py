#!/usr/bin/env python3
"""Build JPEZ N5.

Sumber:  partials/*.html (urut nama)  +  css/*.css  +  js/*.js (urut nama)
Hasil:   index.html        -> versi dev  (CSS & JS terpisah, tinggal buka)
         dist/index.html   -> versi rilis satu file (CSS & JS di-inline)

Pakai:   python build.py
"""
import re, shutil
from pathlib import Path

ROOT = Path(__file__).parent
PARTIALS, JS, DIST = ROOT / "partials", ROOT / "js", ROOT / "dist"
ASSETS = ["jpez.svg"]  # file statis yang ikut disalin ke dist/ bila ada
HEAD, FOOT = "00-head.html", "99-foot.html"


def read(p): return Path(p).read_text(encoding="utf-8")


def assemble():
    body = [p for p in sorted(PARTIALS.glob("*.html")) if p.name not in (HEAD, FOOT)]
    # js/ dimuat berurutan: theme/config dulu di <head>, sisanya (angka 01-15) di akhir <body>
    app_js = sorted(JS.glob("[0-9]*.js"))
    scripts = "".join(f'    <script src="js/{f.name}"></script>\n' for f in app_js)
    parts = [read(PARTIALS / HEAD)] + [read(p) for p in body]
    return "\n".join(parts) + "\n" + scripts + "\n" + read(PARTIALS / FOOT)


def inline(html):
    """Ganti <link css> dan <script src> lokal dengan isinya."""
    def css(m):
        return "<style>\n" + read(ROOT / m.group(1)) + "</style>"

    def js(m):
        return "<script>\n" + read(ROOT / m.group(1)).replace("</script", "<\\/script") + "</script>"

    html = re.sub(r'<link rel="stylesheet" href="(css/[^"]+)">', css, html)
    return re.sub(r'<script src="(js/[^"]+)"></script>', js, html)


def main():
    html = assemble()
    (ROOT / "index.html").write_text(html, encoding="utf-8")
    DIST.mkdir(exist_ok=True)
    (DIST / "index.html").write_text(inline(html), encoding="utf-8")
    for a in ASSETS:
        if (ROOT / a).exists():
            shutil.copy(ROOT / a, DIST / a)
    print(f"index.html       {len(html)//1024} KB  (dev)")
    print(f"dist/index.html  {len(read(DIST/'index.html'))//1024} KB  (satu file)")


if __name__ == "__main__":
    main()
