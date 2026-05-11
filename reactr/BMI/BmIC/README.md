# BmIC — BMI Calculator

A clean, minimal BMI calculator built with React JS. Features a typewriter aesthetic, animated gauge needle, dark/light mode, and support for both metric and imperial units across all age groups.

---

## Live Demo

https://unbenignant-dottily-thurman.ngrok-free.dev/
(on-demand)

---

## Screenshots
<img width="1510" height="934" alt="image" src="https://github.com/user-attachments/assets/fe7111d7-c5ec-477f-88dc-d9d0a9ab2289" />

<img width="1510" height="934" alt="image" src="https://github.com/user-attachments/assets/6d748fed-7fe0-477c-b093-cdd2a58d45f8" />

<img width="1510" height="934" alt="image" src="https://github.com/user-attachments/assets/9a4e9d6f-cfe8-4d2d-a5ce-9b79b46f79c0" />

---

## Features

- **Animated arc gauge** — semicircular SVG gauge with 5 colour-coded segments (underweight → obese class 2), needle rotates smoothly to the calculated BMI
- **Metric & Imperial** — toggle between metric (cm/kg) and imperial (ft/in/lbs) inputs
- **Age-aware categories** — standard adult cutoffs (20–59), adjusted ranges for elderly (60+), and a stub for CDC percentile lookup for children (2–19)
- **Dark / Light mode** — warm typewriter paper light mode, dark mode with full theme context
- **Weight converter** — sidebar tag to convert kg ↔ lbs on the fly, with a copy button
- **Typewriter aesthetic** — Courier New throughout, monospace instrument panel feel

---

## Tech Stack

- React JS (Vite)
- Context API — `CalcContext` for BMI state, `ThemeContext` for dark/light
- Pure SVG — arc and needle drawn without any chart library
- Plain CSS — no CSS framework

---

## Project Structure

```
src/
├── Context/
│   ├── CalcContext.jsx       — bmi, unit, category state + handleCalculate()
│   └── ThemeContext.jsx      — dark/light toggle
│
├── Utils/
│   └── bmiUtils.js           — calculateBMI(), getNeedleAngle(), getCategory()
│
├── components/
│   ├── Buttons/
│   │   ├── CalculateButton.jsx
│   │   ├── ToggleTheme.jsx
│   │   └── UnitToggle.jsx
│   │
│   ├── Display/
│   │   ├── SVGs/
│   │   │   ├── Arc/Arc.jsx         — coloured arc segments
│   │   │   └── Arrow/Arrow.jsx     — animated needle
│   │   └── TopDisplay.jsx          — BMI number display
│   │
│   ├── Tabs/
│   │   ├── Imperial/Imperial.jsx
│   │   └── Metric/Metric.jsx
│   │
│   ├── InputBox.jsx          — reusable input, handles ft+in split for imperial
│   ├── Sidebar.jsx           — kg ↔ lbs converter tag
│   └── Redirect.jsx          — footer links (© + DOCS)
│
└── App.jsx
```

---

## BMI Formula

**Metric:** `BMI = weight(kg) / height(m)²`

**Imperial:** `BMI = (weight(lbs) / height(in)²) × 703`

### Categories (Adults 20–59)

| BMI Range | Category | Colour |
|---|---|---|
| < 18.5 | Underweight | Blue |
| 18.5 – 24.9 | Normal | Green |
| 25 – 29.9 | Overweight | Yellow |
| 30 – 34.9 | Obese Class 1 | Orange |
| ≥ 35 | Obese Class 2 | Red |

### Categories (Elderly 60+)

| BMI Range | Category |
|---|---|
| < 22 | Underweight |
| 22 – 26.9 | Normal |
| 27 – 29.9 | Overweight |
| ≥ 30 | Obese |

### Children (2–19)
CDC percentile lookup — stubbed, coming in a future update.

---

## Gauge — Angle Mapping

The needle maps BMI to a 0°–180° arc:

```
angle = ((bmi - 10) / 30) × 180

BMI 10  →   0°  (far left)
BMI 25  →  90°  (straight up)
BMI 40  → 180°  (far right)
```

Values outside 10–40 are clamped to the edges.

---

## Getting Started

```bash
# clone the repo
git clone https://github.com/AASHPAW1015/clg.git

# navigate to project
cd clg/reactr/BMI/BmIC

# install dependencies
npm install

# run dev server
npm run dev
```

---

## License

MIT © [AASHPAW](https://github.com/AASHPAW1015)

---

## Author

**AASHPAW**
[GitHub](https://github.com/AASHPAW1015/clg/tree/main/reactr/BMI/BmIC)
