#!/usr/bin/env python3
"""Gabungkan template + partials + css + js menjadi satu file: dist/index.html
Berguna untuk dibuka langsung (file://) tanpa web server."""
import re, pathlib

root = pathlib.Path(__file__).parent
read = lambda p: (root / p).read_text(encoding='utf-8').rstrip('\n')
html = read('index.html')

# 1) partials
html = re.sub(r'<div data-include="([^"]+)"></div>',
              lambda m: read(m.group(1)), html)

# 2) css
html = re.sub(r'<link rel="stylesheet" href="(css/[^"]+)">',
              lambda m: '<style>\n' + read(m.group(1)) + '\n    </style>', html)

# 3) tailwind config
html = re.sub(r'<script src="(js/tailwind-config\.js)"></script>',
              lambda m: '<script>\n' + read(m.group(1)) + '\n    </script>', html)

# 4) loader + script aplikasi -> satu <script> inline
def inline_app(m):
    files = [f.strip() for f in m.group(1).split(',')]
    return '<script>\n' + '\n\n'.join(read(f) for f in files) + '\n</script>'
html = re.sub(r'<script src="js/include\.js"\s+data-scripts="([^"]+)"></script>', inline_app, html)

out = root / 'dist' / 'index.html'
out.parent.mkdir(exist_ok=True)
out.write_text(html + '\n', encoding='utf-8')
print('OK ->', out, f'({out.stat().st_size:,} bytes)')
