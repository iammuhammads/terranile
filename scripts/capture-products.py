"""Refresh actual public product homepages. Requires Pillow; review captures before publishing."""
import io
import json
import time
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from PIL import Image

products = {
    'avan': 'https://dist-peach-ten-62.vercel.app/',
    'avanbnb': 'https://www.avanbnb.com/',
    'opex': 'https://opex-intelli-frontend-iegh.vercel.app/',
}
assets = Path(__file__).resolve().parents[1] / 'public' / 'assets'
manifest = {}
for slug, url in products.items():
    endpoint = 'https://s.wordpress.com/mshots/v1/' + urllib.parse.quote(url, safe='') + '?w=1440&h=900'
    for attempt in range(12):
        request = urllib.request.Request(endpoint, headers={'User-Agent': 'Terranile public product capture'})
        with urllib.request.urlopen(request, timeout=30) as response:
            raw = response.read()
        image = Image.open(io.BytesIO(raw)).convert('RGB')
        if image.width >= 1000 and image.height >= 600:
            break
        if attempt == 11:
            raise RuntimeError(f'{slug}: screenshot service still returned its loading placeholder; existing preview preserved')
        time.sleep(10)
    image.save(assets / f'{slug}-homepage.webp', 'WEBP', quality=88, method=6)
    image.resize((900, round(image.height*900/image.width)), Image.Resampling.LANCZOS).save(assets / f'{slug}-homepage-mobile.webp', 'WEBP', quality=86, method=6)
    manifest[slug] = {'url': url, 'capturedAt': datetime.now(timezone.utc).isoformat(), 'width': image.width, 'height': image.height}
    print(f'Captured {slug}: {image.width}x{image.height}. Review for overlays, authentication or error pages.')
(assets / 'product-captures.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
