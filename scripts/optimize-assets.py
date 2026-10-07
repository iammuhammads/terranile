from pathlib import Path
from PIL import Image

source = Path(__file__).resolve().parents[2] / 'generated-assets'
destination = Path(__file__).resolve().parents[1] / 'dist' / 'assets'
for name in ('terranile-hero', 'avan-architecture', 'helios-microscopy', 'opex-intelli-v3', 'research-people-v3', 'infrastructure-people-v3'):
    with Image.open(source / f'{name}.png') as image:
        image = image.convert('RGB')
        image.save(destination / f'{name}.webp', 'WEBP', quality=87, method=6)
        small = image.copy()
        small.thumbnail((900, 900))
        small.save(destination / f'{name}-mobile.webp', 'WEBP', quality=83, method=6)
        print(f'{name}: {image.width} x {image.height}, {(destination / (name + ".webp")).stat().st_size:,} bytes')
