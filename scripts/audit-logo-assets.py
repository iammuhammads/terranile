from pathlib import Path
from PIL import Image
for path in Path('dist/assets').glob('*logo-clean.png'):
    with Image.open(path) as image:
        assert image.mode == 'RGBA', path
        assert image.getchannel('A').getextrema() == (0, 255), path
        print(path.name, image.size, 'transparent background verified')
