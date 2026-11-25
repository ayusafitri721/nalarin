"""Prepare the one raster asset that comes from the user-supplied source file.

All other landing illustrations are original SVG assets written by this project
and live in public/assets/nalarin/landing/*.svg (copies kept in screenshots/).
"""

from pathlib import Path
from PIL import Image

DOWNLOADS = Path.home() / "Downloads"
OUT = Path(__file__).resolve().parents[1] / "public" / "assets" / "nalarin" / "landing"
OUT.mkdir(parents=True, exist_ok=True)

HERO_FILE = DOWNLOADS / "Whimsical Astronaut Fantasy Island.png"
hero = Image.open(HERO_FILE).convert("RGBA")
hero.thumbnail((1200, 1200), Image.LANCZOS)
alpha = hero.split()[3]
bbox = alpha.getbbox()
if bbox:
    hero = hero.crop(bbox)
hero.save(OUT / "hero-universe.webp", "WEBP", quality=92, method=6)
print(f"hero-universe.webp: {hero.size}")
