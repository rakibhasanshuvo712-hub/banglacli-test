import io
import os
import urllib.request

from PIL import Image

IMAGES = {
    "1561181286-d3fee7d55364": 900,
    "1490750967868-88aa4486c946": 900,
    "1494972308805-463bc619d34e": 900,
    "1519378058457-4c29a0a2efac": 900,
    "1523438885200-e635ba2c371e": 900,
    "1487070183336-b863922373d4": 900,
    "1508610048659-a06b669e3321": 1200,
    "1526047932273-341f2a7631f9": 500,
    "1518895949257-7621c3c786d7": 500,
    "1457089328109-e5d9bd499191": 1100,
    "1468327768560-75b778cbb551": 1000,
    "1462275646964-a0e3386b89fa": 1100,
}

OUT_DIR = "nextjs-website/public/images"
os.makedirs(OUT_DIR, exist_ok=True)

for photo_id, width in IMAGES.items():
    url = f"https://images.unsplash.com/photo-{photo_id}?fit=crop&w={width}&q=88&fm=jpg"
    with urllib.request.urlopen(url, timeout=30) as response:
        data = response.read()
    image = Image.open(io.BytesIO(data)).convert("RGB")
    path = os.path.join(OUT_DIR, f"{photo_id}.webp")
    image.save(path, "WEBP", quality=84, method=6)
    print(f"{photo_id}.webp {image.size} {os.path.getsize(path) // 1024} KB")
