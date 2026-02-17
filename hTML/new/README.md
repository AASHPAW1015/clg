# WebKit CSS Properties Demo

A simple HTML + CSS project demonstrating **20 WebKit-specific CSS properties**.

## Files

- `html2.html` — Main demo page with labeled sections for each property
- `style.css` — Stylesheet containing all 20 `-webkit-` properties

## Properties Covered

| #  | Property                        | What It Does                                      |
|----|---------------------------------|---------------------------------------------------|
| 1  | `-webkit-text-fill-color`       | Sets the fill color of text                       |
| 2  | `-webkit-text-stroke`           | Shorthand for text stroke                         |
| 3  | `-webkit-text-stroke-width`     | Thickness of text stroke                          |
| 4  | `-webkit-text-stroke-color`     | Color of text stroke                              |
| 5  | `-webkit-font-smoothing`        | Controls font anti-aliasing                       |
| 6  | `-webkit-tap-highlight-color`   | Tap highlight color on mobile                     |
| 7  | `-webkit-overflow-scrolling`    | Momentum scrolling on iOS                         |
| 8  | `-webkit-line-clamp`            | Truncates text to N lines                         |
| 9  | `-webkit-box-orient`            | Box orientation (used with line-clamp)            |
| 10 | `-webkit-mask-image`            | Applies an image/gradient as a mask               |
| 11 | `-webkit-mask-size`             | Size of the mask                                  |
| 12 | `-webkit-mask-position`         | Position of the mask                              |
| 13 | `-webkit-mask-repeat`           | Whether the mask repeats                          |
| 14 | `-webkit-mask-composite`        | How multiple masks are composited                 |
| 15 | `-webkit-text-security`         | Obscures text input (disc/circle/square)          |
| 16 | `-webkit-touch-callout`         | Disables long-press callout on iOS                |
| 17 | `-webkit-text-size-adjust`      | Prevents mobile browsers from auto-resizing text  |
| 18 | `-webkit-marquee-direction`     | Direction for marquee-style scrolling             |
| 19 | `-webkit-print-color-adjust`    | Preserves colors when printing                    |
| 20 | `-webkit-backface-visibility`   | Hides the back face of a 3D-flipped element       |

## How to Use

1. Open `html2.html` in a WebKit-based browser (Safari or Chrome).
2. Each section demonstrates one or more properties with a visible example.
3. Some properties (tap highlight, touch callout, overflow scrolling) are best tested on a **mobile device**.

## Browser Support

These properties are specific to **WebKit/Blink** engines:
- ✅ Safari
- ✅ Chrome / Edge / Opera
- ❌ Firefox (most won't work)
