from pathlib import Path
import subprocess
import cv2
import imageio_ffmpeg
root = Path('dist/assets')
source = root / 'lagos-capital.mp4'
output = root / 'lagos-capital-optimized.mp4'
subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(), '-y', '-i', str(source), '-t', '12', '-an',
    '-vf', 'scale=1280:-2', '-r', '25', '-c:v', 'libx264', '-preset', 'medium', '-crf', '25',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(output)], check=True,
    stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
output.replace(source)
capture = cv2.VideoCapture(str(source))
assert capture.isOpened()
ok, frame = capture.read()
assert ok
cv2.imwrite(str(root / 'lagos-capital-poster.jpg'), frame)
print('Prepared Lagos city film:', source.stat().st_size, 'bytes;',
      capture.get(cv2.CAP_PROP_FRAME_WIDTH), '×', capture.get(cv2.CAP_PROP_FRAME_HEIGHT),
      capture.get(cv2.CAP_PROP_FRAME_COUNT) / capture.get(cv2.CAP_PROP_FPS), 'seconds')
