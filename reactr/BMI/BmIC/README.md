# BmIC — BMI Calculator

A clean, typewriter-aesthetic BMI calculator built with React + Vite.

## Features

- **BMI Calculation** — metric (kg/cm) and imperial (lbs/ft+in) support
- **Arc Gauge** — color-coded semicircular gauge with animated needle
- **Age-Aware Categories** — adjusts BMI ranges for adults (20–59), seniors (60+), and flags pediatric cases
- **Weight Converter** — pull-out sidebar for quick kg ↔ lbs conversion
- **Dark / Light Mode** — calm sea blue theme with smooth transitions

## Tech Stack

- React 19
- Vite 8
- Vanilla CSS

## Run Locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173/`

## Project Structure

```
src/
├── Context/          # CalcContext, ThemeContext
├── Utils/            # bmiUtils (calculate, needle angle, category)
├── components/
│   ├── Buttons/      # CalculateButton, ToggleTheme, UnitToggle
│   ├── Display/      # TopDisplay, Arc SVG, Arrow SVG
│   ├── Tabs/         # Metric, Imperial input forms
│   ├── Sidebar.jsx   # Weight converter drawer
│   ├── InputBox.jsx  # Reusable input row
│   └── Redirect.jsx  # Footer links
├── App.jsx
├── App.css
└── main.jsx
```

## License

[MIT](https://opensource.org/licenses/MIT) © AASHPAW
