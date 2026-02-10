# -*- coding: utf-8 -*-
"""
ALTERNATE Marketing Asset Generator
Creates poster, social crops from hero image
"""

from PIL import Image, ImageDraw, ImageFont, ImageEnhance
import os

# Paths
BASE_DIR = r"C:\Users\Nightgalem\clawd\projects\alternate"
HERO_PATH = os.path.join(BASE_DIR, "assets", "hero-image.jpg")
OUTPUT_DIR = os.path.join(BASE_DIR, "output")

os.makedirs(OUTPUT_DIR, exist_ok=True)

# Load hero image
hero = Image.open(HERO_PATH)
print(f"Hero image loaded: {hero.size}")

# === 1. MAIN POSTER (with title) ===
def create_poster():
    poster = hero.copy()
    draw = ImageDraw.Draw(poster)
    
    try:
        title_font = ImageFont.truetype("C:/Windows/Fonts/impact.ttf", 100)
        subtitle_font = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 36)
    except:
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
    
    w, h = poster.size
    title = "ALTERNATE"
    
    bbox = draw.textbbox((0, 0), title, font=title_font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    
    x = (w - text_w) // 2
    y = h - text_h - 60
    
    # Shadow
    draw.text((x+3, y+3), title, font=title_font, fill=(0, 0, 0))
    # Main text
    draw.text((x, y), title, font=title_font, fill=(255, 255, 255))
    
    # Date
    subtitle = "FEBRUARY 14"
    bbox2 = draw.textbbox((0, 0), subtitle, font=subtitle_font)
    sub_w = bbox2[2] - bbox2[0]
    draw.text(((w - sub_w) // 2, y + text_h + 10), subtitle, font=subtitle_font, fill=(255, 200, 100))
    
    poster.save(os.path.join(OUTPUT_DIR, "poster-main.jpg"), quality=95)
    print("[OK] Main poster created")

# === 2. SOCIAL CROPS ===
def create_social_crops():
    w, h = hero.size
    
    # Instagram Square (1:1)
    min_dim = min(w, h)
    left = (w - min_dim) // 2
    top = (h - min_dim) // 2
    square = hero.crop((left, top, left + min_dim, top + min_dim))
    square = square.resize((1080, 1080), Image.LANCZOS)
    square.save(os.path.join(OUTPUT_DIR, "social-instagram-square.jpg"), quality=95)
    print("[OK] Instagram square (1080x1080)")
    
    # Story vertical (9:16)
    target_ratio = 9/16
    current_ratio = w/h
    if current_ratio > target_ratio:
        new_w = int(h * target_ratio)
        left = (w - new_w) // 2
        vertical = hero.crop((left, 0, left + new_w, h))
    else:
        new_h = int(w / target_ratio)
        top = (h - new_h) // 2
        vertical = hero.crop((0, top, w, top + new_h))
    vertical = vertical.resize((1080, 1920), Image.LANCZOS)
    vertical.save(os.path.join(OUTPUT_DIR, "social-story-vertical.jpg"), quality=95)
    print("[OK] Story vertical (1080x1920)")
    
    # Twitter header (1500x500)
    target_ratio = 1500/500
    new_h = int(w / target_ratio)
    top = (h - new_h) // 2
    header = hero.crop((0, max(0, top), w, min(h, top + new_h)))
    header = header.resize((1500, 500), Image.LANCZOS)
    header.save(os.path.join(OUTPUT_DIR, "social-twitter-header.jpg"), quality=95)
    print("[OK] Twitter header (1500x500)")
    
    # Wide 16:9
    target_ratio = 16/9
    new_h = int(w / target_ratio)
    top = (h - new_h) // 2
    wide = hero.crop((0, max(0, top), w, min(h, top + new_h)))
    wide = wide.resize((1920, 1080), Image.LANCZOS)
    wide.save(os.path.join(OUTPUT_DIR, "social-wide-16x9.jpg"), quality=95)
    print("[OK] Wide 16:9 (1920x1080)")

# === 3. CHARACTER CROPS ===
def create_character_crops():
    w, h = hero.size
    
    # Left character
    left_char = hero.crop((0, 0, int(w*0.35), h))
    left_char.save(os.path.join(OUTPUT_DIR, "character-left.jpg"), quality=95)
    print("[OK] Character: Left")
    
    # Center character
    center_char = hero.crop((int(w*0.25), 0, int(w*0.65), h))
    center_char.save(os.path.join(OUTPUT_DIR, "character-center.jpg"), quality=95)
    print("[OK] Character: Center")
    
    # Right character
    right_char = hero.crop((int(w*0.55), 0, int(w*0.85), h))
    right_char.save(os.path.join(OUTPUT_DIR, "character-right.jpg"), quality=95)
    print("[OK] Character: Right")

# === 4. VARIANTS ===
def create_variants():
    # Dark version
    dark = hero.copy()
    dark = dark.point(lambda p: int(p * 0.6))
    dark.save(os.path.join(OUTPUT_DIR, "teaser-dark.jpg"), quality=95)
    print("[OK] Dark variant")
    
    # High contrast
    enhancer = ImageEnhance.Contrast(hero)
    contrast = enhancer.enhance(1.4)
    contrast.save(os.path.join(OUTPUT_DIR, "teaser-contrast.jpg"), quality=95)
    print("[OK] High contrast variant")

# Run all
print("\n=== ALTERNATE Asset Generation ===\n")
create_poster()
create_social_crops()
create_character_crops()
create_variants()

print("\n[DONE] All assets saved to:", OUTPUT_DIR)
print("\nGenerated files:")
for f in sorted(os.listdir(OUTPUT_DIR)):
    fpath = os.path.join(OUTPUT_DIR, f)
    size = os.path.getsize(fpath) // 1024
    print(f"  - {f} ({size}KB)")
