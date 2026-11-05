"""Builds the home splash art from the client's reference image.

Removes the logo, name, tagline and spinner baked into the reference (the page
renders the real ones), then writes a landscape and a tablet version. The phone
version is the client's own portrait artwork with more of its sky added on top.

Usage: python -I scripts/prepare-splash-art.py <reference.png> <phone.png> public/brand
Needs Pillow and numpy.
"""
import sys

import numpy as np
from PIL import Image, ImageFilter

# Baked-in brand stack, as (left, top, right, bottom) in reference pixels.
BRAND_AREAS = [
    (470, 30, 1205, 395),  # WH mark, company name, tagline and rules
    (770, 390, 900, 496),  # spinner
]
# Phone crop: bottle to flask, and the rows from the hills down.
SCENE_LEFT, SCENE_RIGHT, SCENE_TOP = 360, 1356, 400
PORTRAIT_HEIGHT = 2150
SKY_BLEND = 160
# Tall enough for 20:9 phones, so the art always fits their width with no side crop.
PHONE_HEIGHT = 2090


def smooth(values, size):
    """Moving average along the first axis, so one odd row or column leaves no line."""
    kernel = np.ones(size) / size
    padded = np.pad(values, ((size // 2, size - size // 2 - 1), (0, 0)), mode="edge")
    return np.stack([np.convolve(padded[:, c], kernel, mode="valid") for c in range(3)], axis=1)


def erase(pixels, left, top, right, bottom):
    """Rebuilds a sky area from the colours either side of it."""
    margin = 8
    a = smooth(pixels[top:bottom, left - margin : left].mean(axis=1), 41)
    b = smooth(pixels[top:bottom, right : right + margin].mean(axis=1), 41)
    t = np.linspace(0, 1, right - left)[None, :, None]
    pixels[top:bottom, left:right] = a[:, None, :] * (1 - t) + b[:, None, :] * t


def retouch(reference):
    pixels = np.asarray(reference, dtype=np.float32).copy()
    mask = Image.new("L", reference.size, 0)
    for area in BRAND_AREAS:
        erase(pixels, *area)
        mask.paste(255, area)
    # Soften the edges of the erased areas so they leave no outline.
    clean = Image.fromarray(pixels.round().astype(np.uint8))
    soft = clean.filter(ImageFilter.GaussianBlur(18))
    return Image.composite(soft, clean, mask.filter(ImageFilter.GaussianBlur(14)))


def portrait(art):
    """Same art for tablets: the scene at the bottom, the sky stretched above it."""
    width = SCENE_RIGHT - SCENE_LEFT
    scene = art.crop((SCENE_LEFT, SCENE_TOP, SCENE_RIGHT, art.height))
    canvas = np.zeros((PORTRAIT_HEIGHT, width, 3), dtype=np.float32)

    # Sky: the art's own top colours, with its two corners (waves and dots) kept.
    half = width // 2
    corners = Image.new("RGB", (width, 330))
    corners.paste(art.crop((0, 0, half, 330)), (0, 0))
    corners.paste(art.crop((art.width - (width - half), 0, art.width, 330)), (half, 0))
    seam = Image.new("L", (width, 330), 0)
    seam.paste(255, (half - 90, 0, half + 90, 330))
    corners = Image.composite(
        corners.filter(ImageFilter.GaussianBlur(40)), corners, seam.filter(ImageFilter.GaussianBlur(40))
    )

    scene_top = PORTRAIT_HEIGHT - scene.height
    top_row = smooth(np.asarray(corners, dtype=np.float32)[-1], 81)
    bottom_row = smooth(np.asarray(scene, dtype=np.float32)[0], 81)
    # The sky between the corners and the scene fades from one edge to the other.
    fill_rows = scene_top - 330 + SKY_BLEND
    for y in range(fill_rows):
        t = y / max(fill_rows - 1, 1)
        canvas[330 + y] = top_row * (1 - t) + bottom_row * t
    canvas[:330] = np.asarray(corners, dtype=np.float32)

    scene_pixels = np.asarray(scene, dtype=np.float32)
    canvas[scene_top + SKY_BLEND :] = scene_pixels[SKY_BLEND:]
    for i in range(SKY_BLEND):
        t = i / (SKY_BLEND - 1)
        canvas[scene_top + i] = canvas[scene_top + i] * (1 - t) + scene_pixels[i] * t
    return Image.fromarray(canvas.round().astype(np.uint8))


def tall_phone(art):
    """Adds sky above the art in its own top colour."""
    pixels = np.asarray(art, dtype=np.float32)
    extra = PHONE_HEIGHT - art.height
    sky = np.repeat(smooth(pixels[:8].mean(axis=0), 81)[None, :, :], extra, axis=0)
    return Image.fromarray(np.vstack([sky, pixels]).round().astype(np.uint8))


def main(source, phone, out_dir):
    art = retouch(Image.open(source).convert("RGB"))
    art.save(f"{out_dir}/splash-scene.webp", "WEBP", quality=82, method=6)
    portrait(art).save(f"{out_dir}/splash-scene-portrait.webp", "WEBP", quality=80, method=6)
    tall_phone(Image.open(phone).convert("RGB")).save(f"{out_dir}/splash-scene-phone.webp", "WEBP", quality=82, method=6)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2], sys.argv[3])
