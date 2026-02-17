# 20 WebKit CSS Properties — Detailed Reference

---

## 1. `-webkit-text-fill-color`

- **Year:** ~2006 (Safari 3 / early WebKit)
- **Syntax:**
  ```css
  -webkit-text-fill-color: <color>;
  ```
- **Purpose:** Sets the foreground fill color of text. Commonly paired with `-webkit-background-clip: text` to create gradient text effects.
- **Example:**
  ```css
  h1 {
      background: linear-gradient(to right, red, blue);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
  }
  ```
- **Browser Support:** Chrome ✅ | Safari ✅ | Edge ✅ | Firefox ✅ | Opera ✅
- **Reference:** [MDN — -webkit-text-fill-color](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-text-fill-color)

---

## 2. `-webkit-text-stroke`

- **Year:** ~2006 (Safari 3 / early WebKit)
- **Syntax:**
  ```css
  -webkit-text-stroke: <width> <color>;
  ```
- **Purpose:** Shorthand to add an outline stroke around text characters. Combines stroke-width and stroke-color.
- **Example:**
  ```css
  h1 {
      -webkit-text-stroke: 2px black;
      -webkit-text-fill-color: white;
  }
  ```
- **Browser Support:** Chrome ✅ | Safari ✅ | Edge ✅ | Firefox ✅ | Opera ✅
- **Reference:** [MDN — -webkit-text-stroke](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-text-stroke)

---

## 3. `-webkit-text-stroke-width`

- **Year:** ~2006 (Safari 3 / early WebKit)
- **Syntax:**
  ```css
  -webkit-text-stroke-width: <length>;
  ```
- **Purpose:** Sets the thickness of the text stroke independently from its color.
- **Example:**
  ```css
  p {
      -webkit-text-stroke-width: 1px;
      -webkit-text-stroke-color: #333;
  }
  ```
- **Browser Support:** Chrome ✅ | Safari ✅ | Edge ✅ | Firefox ✅ | Opera ✅
- **Reference:** [MDN — -webkit-text-stroke-width](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-text-stroke-width)

---

## 4. `-webkit-text-stroke-color`

- **Year:** ~2006 (Safari 3 / early WebKit)
- **Syntax:**
  ```css
  -webkit-text-stroke-color: <color>;
  ```
- **Purpose:** Sets the color of the text stroke independently from its width.
- **Example:**
  ```css
  p {
      -webkit-text-stroke-width: 2px;
      -webkit-text-stroke-color: red;
  }
  ```
- **Browser Support:** Chrome ✅ | Safari ✅ | Edge ✅ | Firefox ✅ | Opera ✅
- **Reference:** [MDN — -webkit-text-stroke-color](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-text-stroke-color)

---

## 5. `-webkit-font-smoothing`

- **Year:** ~2009 (Safari 4 / macOS WebKit)
- **Syntax:**
  ```css
  -webkit-font-smoothing: none | antialiased | subpixel-antialiased;
  ```
- **Purpose:** Controls font rendering and anti-aliasing on macOS. `antialiased` makes text appear thinner and sharper on Retina displays.
- **Example:**
  ```css
  body {
      -webkit-font-smoothing: antialiased;
  }
  ```
- **Browser Support:** Chrome (macOS) ✅ | Safari ✅ | Edge (macOS) ✅ | Firefox ❌ (uses `-moz-osx-font-smoothing`) | Opera (macOS) ✅
- **Reference:** [MDN — font-smooth](https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth)

---

## 6. `-webkit-tap-highlight-color`

- **Year:** ~2007 (Mobile Safari / iOS WebKit)
- **Syntax:**
  ```css
  -webkit-tap-highlight-color: <color>;
  ```
- **Purpose:** Sets the color of the translucent highlight that appears when a user taps a link or clickable element on mobile. Set to `transparent` to remove it.
- **Example:**
  ```css
  a {
      -webkit-tap-highlight-color: transparent;
  }
  ```
- **Browser Support:** Chrome (Android) ✅ | Safari (iOS) ✅ | Edge (mobile) ✅ | Firefox ❌ | Opera ✅
- **Reference:** [MDN — -webkit-tap-highlight-color](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-tap-highlight-color)

---

## 7. `-webkit-overflow-scrolling`

- **Year:** ~2012 (iOS 5 Safari)
- **Syntax:**
  ```css
  -webkit-overflow-scrolling: auto | touch;
  ```
- **Purpose:** Enables momentum-based (inertial) scrolling on iOS for overflow containers. `touch` gives the native rubber-band scroll feel.
- **Example:**
  ```css
  .scroll-container {
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
  }
  ```
- **Browser Support:** Safari (iOS) ✅ | Chrome ❌ (not needed) | Firefox ❌ | Edge ❌
- **Reference:** [MDN — -webkit-overflow-scrolling](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-overflow-scrolling)

---

## 8. `-webkit-line-clamp`

- **Year:** ~2010 (WebKit); standardized as `line-clamp` in CSS Overflow Module Level 4 (draft)
- **Syntax:**
  ```css
  -webkit-line-clamp: <integer>;
  ```
- **Purpose:** Limits the number of visible lines in a block container and adds an ellipsis (...) after the last visible line. Requires `display: -webkit-box` and `-webkit-box-orient: vertical`.
- **Example:**
  ```css
  .truncate {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
  }
  ```
- **Browser Support:** Chrome ✅ | Safari ✅ | Edge ✅ | Firefox ✅ | Opera ✅
- **Reference:** [MDN — -webkit-line-clamp](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp)

---

## 9. `-webkit-box-orient`

- **Year:** ~2009 (old CSS Flexible Box spec / WebKit)
- **Syntax:**
  ```css
  -webkit-box-orient: horizontal | vertical;
  ```
- **Purpose:** Sets the orientation of a flex container using the old flexbox model. Still required as a companion to `-webkit-line-clamp`.
- **Example:**
  ```css
  .truncate {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
  }
  ```
- **Browser Support:** Chrome ✅ | Safari ✅ | Edge ✅ | Firefox ✅ | Opera ✅
- **Reference:** [MDN — box-orient](https://developer.mozilla.org/en-US/docs/Web/CSS/box-orient)

---

## 10. `-webkit-mask-image`

- **Year:** ~2008 (Safari 4); CSS Masking Level 1 spec (2012)
- **Syntax:**
  ```css
  -webkit-mask-image: <image> | none;
  ```
- **Purpose:** Applies an image or gradient as a mask to an element. Transparent parts of the mask hide the element, opaque parts reveal it.
- **Example:**
  ```css
  .fade-out {
      -webkit-mask-image: linear-gradient(to right, black, transparent);
  }
  ```
- **Browser Support:** Chrome ✅ | Safari ✅ | Edge ✅ | Firefox ✅ (unprefixed) | Opera ✅
- **Reference:** [MDN — mask-image](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image)

---

## 11. `-webkit-mask-size`

- **Year:** ~2008 (Safari 4); CSS Masking Level 1 spec
- **Syntax:**
  ```css
  -webkit-mask-size: <length> | <percentage> | cover | contain;
  ```
- **Purpose:** Sets the size of the mask image, similar to `background-size`.
- **Example:**
  ```css
  .masked {
      -webkit-mask-image: url(mask.png);
      -webkit-mask-size: 100% 100%;
  }
  ```
- **Browser Support:** Chrome ✅ | Safari ✅ | Edge ✅ | Firefox ✅ (unprefixed) | Opera ✅
- **Reference:** [MDN — mask-size](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-size)

---

## 12. `-webkit-mask-position`

- **Year:** ~2008 (Safari 4); CSS Masking Level 1 spec
- **Syntax:**
  ```css
  -webkit-mask-position: <position>;
  ```
- **Purpose:** Sets the initial position of the mask image, similar to `background-position`.
- **Example:**
  ```css
  .masked {
      -webkit-mask-image: url(mask.png);
      -webkit-mask-position: center center;
  }
  ```
- **Browser Support:** Chrome ✅ | Safari ✅ | Edge ✅ | Firefox ✅ (unprefixed) | Opera ✅
- **Reference:** [MDN — mask-position](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-position)

---

## 13. `-webkit-mask-repeat`

- **Year:** ~2008 (Safari 4); CSS Masking Level 1 spec
- **Syntax:**
  ```css
  -webkit-mask-repeat: repeat | repeat-x | repeat-y | no-repeat | space | round;
  ```
- **Purpose:** Controls whether the mask image repeats, similar to `background-repeat`.
- **Example:**
  ```css
  .masked {
      -webkit-mask-image: url(dots.png);
      -webkit-mask-repeat: no-repeat;
  }
  ```
- **Browser Support:** Chrome ✅ | Safari ✅ | Edge ✅ | Firefox ✅ (unprefixed) | Opera ✅
- **Reference:** [MDN — mask-repeat](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-repeat)

---

## 14. `-webkit-mask-composite`

- **Year:** ~2008 (Safari 4); CSS Masking Level 1 spec
- **Syntax:**
  ```css
  -webkit-mask-composite: clear | copy | source-over | source-in | source-out | source-atop |
                           destination-over | destination-in | destination-out | destination-atop | xor;
  ```
- **Purpose:** Defines how multiple mask layers are composited (combined) together. WebKit uses different keywords than the standard `mask-composite`.
- **Example:**
  ```css
  .double-mask {
      -webkit-mask-image: url(mask1.png), url(mask2.png);
      -webkit-mask-composite: source-over;
  }
  ```
- **Browser Support:** Chrome ✅ | Safari ✅ | Edge ✅ | Firefox ✅ (unprefixed, different keywords: `add`, `subtract`, `intersect`, `exclude`) | Opera ✅
- **Reference:** [MDN — mask-composite](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-composite)

---

## 15. `-webkit-text-security`

- **Year:** ~2007 (early WebKit)
- **Syntax:**
  ```css
  -webkit-text-security: none | circle | disc | square;
  ```
- **Purpose:** Replaces text characters with shapes (disc, circle, square) to obscure content, similar to a password field but on any text input or element.
- **Example:**
  ```css
  input.hidden-text {
      -webkit-text-security: disc;
  }
  ```
- **Browser Support:** Chrome ✅ | Safari ✅ | Edge ✅ | Firefox ❌ | Opera ✅
- **Reference:** [MDN — -webkit-text-security](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-text-security)

---

## 16. `-webkit-touch-callout`

- **Year:** ~2007 (Mobile Safari / iOS)
- **Syntax:**
  ```css
  -webkit-touch-callout: default | none;
  ```
- **Purpose:** Controls whether the default callout (context menu) is shown when the user long-presses a target on iOS (e.g., links, images).
- **Example:**
  ```css
  img {
      -webkit-touch-callout: none;
  }
  ```
- **Browser Support:** Safari (iOS) ✅ | Chrome ❌ | Firefox ❌ | Edge ❌ | Opera ❌
- **Reference:** [MDN — -webkit-touch-callout](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-touch-callout)

---

## 17. `-webkit-text-size-adjust`

- **Year:** ~2007 (Mobile Safari); CSS Mobile Text Size Adjustment Module Level 1 (draft)
- **Syntax:**
  ```css
  -webkit-text-size-adjust: auto | none | <percentage>;
  ```
- **Purpose:** Prevents mobile browsers from automatically inflating/resizing text when the viewport changes or in landscape mode. `100%` keeps text at the authored size.
- **Example:**
  ```css
  body {
      -webkit-text-size-adjust: 100%;
  }
  ```
- **Browser Support:** Chrome (Android) ✅ | Safari (iOS) ✅ | Edge (mobile) ✅ | Firefox ❌ (uses `-moz-text-size-adjust`) | Opera ✅
- **Reference:** [MDN — text-size-adjust](https://developer.mozilla.org/en-US/docs/Web/CSS/text-size-adjust)

---

## 18. `-webkit-marquee-direction`

- **Year:** ~2006 (Safari 3); CSS Marquee Module Level 3 (abandoned draft)
- **Syntax:**
  ```css
  -webkit-marquee-direction: forwards | backwards | ahead | reverse | left | right | up | down | auto;
  ```
- **Purpose:** Sets the direction of scrolling content in a marquee-style element. Part of an abandoned CSS spec for marquee behavior.
- **Example:**
  ```css
  .marquee {
      -webkit-marquee-direction: reverse;
  }
  ```
- **Browser Support:** Safari ✅ (limited) | Chrome ❌ | Firefox ❌ | Edge ❌ | Opera ❌
- **Reference:** [W3C — CSS Marquee Module Level 3 (Abandoned)](https://www.w3.org/TR/css3-marquee/)

---

## 19. `-webkit-print-color-adjust`

- **Year:** ~2010 (WebKit); standardized as `print-color-adjust` in CSS Color Adjustment Module Level 1 (2022)
- **Syntax:**
  ```css
  -webkit-print-color-adjust: economy | exact;
  ```
- **Purpose:** Controls whether the browser is allowed to adjust (strip) colors and background images when printing. `exact` forces the browser to preserve them.
- **Example:**
  ```css
  .print-safe {
      background: #00b894;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
  }
  ```
- **Browser Support:** Chrome ✅ | Safari ✅ | Edge ✅ | Firefox ✅ (unprefixed) | Opera ✅
- **Reference:** [MDN — print-color-adjust](https://developer.mozilla.org/en-US/docs/Web/CSS/print-color-adjust)

---

## 20. `-webkit-backface-visibility`

- **Year:** ~2010 (Safari 5); standardized as `backface-visibility` in CSS Transforms Module Level 2 (2013)
- **Syntax:**
  ```css
  -webkit-backface-visibility: visible | hidden;
  ```
- **Purpose:** Determines whether the back face of an element is visible when it is rotated in 3D space. Essential for card-flip animations.
- **Example:**
  ```css
  .card-front, .card-back {
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
  }
  .card-back {
      transform: rotateY(180deg);
  }
  ```
- **Browser Support:** Chrome ✅ | Safari ✅ | Edge ✅ | Firefox ✅ | Opera ✅
- **Reference:** [MDN — backface-visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/backface-visibility)

---

## Summary Table

| # | Property | Year | Still Prefixed Only? |
|---|----------|------|----------------------|
| 1 | `-webkit-text-fill-color` | ~2006 | ✅ Yes |
| 2 | `-webkit-text-stroke` | ~2006 | ✅ Yes |
| 3 | `-webkit-text-stroke-width` | ~2006 | ✅ Yes |
| 4 | `-webkit-text-stroke-color` | ~2006 | ✅ Yes |
| 5 | `-webkit-font-smoothing` | ~2009 | ✅ Yes |
| 6 | `-webkit-tap-highlight-color` | ~2007 | ✅ Yes |
| 7 | `-webkit-overflow-scrolling` | ~2012 | ✅ Yes (iOS only) |
| 8 | `-webkit-line-clamp` | ~2010 | ✅ Yes (standard in draft) |
| 9 | `-webkit-box-orient` | ~2009 | ✅ Yes (legacy flexbox) |
| 10 | `-webkit-mask-image` | ~2008 | Partially (Firefox unprefixed) |
| 11 | `-webkit-mask-size` | ~2008 | Partially |
| 12 | `-webkit-mask-position` | ~2008 | Partially |
| 13 | `-webkit-mask-repeat` | ~2008 | Partially |
| 14 | `-webkit-mask-composite` | ~2008 | Partially (different keywords) |
| 15 | `-webkit-text-security` | ~2007 | ✅ Yes |
| 16 | `-webkit-touch-callout` | ~2007 | ✅ Yes (iOS only) |
| 17 | `-webkit-text-size-adjust` | ~2007 | Partially (standard in draft) |
| 18 | `-webkit-marquee-direction` | ~2006 | ✅ Yes (abandoned spec) |
| 19 | `-webkit-print-color-adjust` | ~2010 | No (standardized 2022) |
| 20 | `-webkit-backface-visibility` | ~2010 | No (standardized 2013) |
