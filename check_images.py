import io
import urllib.request

from PIL import Image, ImageStat

CANDIDATES = [
    "1462275646964-a0e3386b89fa",
    "1497250681960-ef046c08a56e",
    "1487530811176-3780de880c2d",
    "1509038631554-3c74eee1c1b3",
    "1494336934272-f0efcedfc8a7",
    "1465146344425-f00d5f5c8f07",
    "1518709268805-4e9042af9f23",
    "1525310072745-f49212b5ac6d",
    "1562690868-60bbe7293e94",
    "1577083552431-6e5fd01aa342",
]

for photo_id in CANDIDATES:
    url = f"https://images.unsplash.com/photo-{photo_id}?auto=format&fit=crop&w=400&q=70"
    try:
        with urllib.request.urlopen(url, timeout=20) as response:
            data = response.read()
        image = Image.open(io.BytesIO(data)).convert("RGB")
        stat = ImageStat.Stat(image)
        mean = tuple(round(v) for v in stat.mean)
        stddev = tuple(round(v) for v in stat.stddev)
        small = image.resize((40, 40))
        pixels = list(small.getdata())
        white = sum(1 for r, g, b in pixels if r > 235 and g > 235 and b > 235) / len(pixels)
        print(f"{photo_id} size={image.size} mean={mean} std={stddev} white={white:.0%}")
    except Exception as exc:
        print(f"{photo_id} ERROR {exc}")
