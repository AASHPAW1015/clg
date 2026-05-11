export function calculateBMI(weight, height, unit) {
  if (!weight || !height || height === 0) return null;

  if (unit === "imperial") {
    const w = weight * 0.453592;
    const h = height * 0.0254;
    return parseFloat((w / (h * h)).toFixed(2));
  }

  // metric — convert cm to metres
  const h = height / 100;
  return parseFloat((weight / (h * h)).toFixed(2));
}

export function getNeedleAngle(bmi) {
  // just rename it
  if (bmi === null) return 90;
  const clamped = Math.min(Math.max(bmi, 10), 40);
  const angle = ((clamped - 10) / 30) * 180;
  return angle;
}

export function getCategory(bmi, age) {
  if (bmi === null) return null;

  if (age <= 17) {
    // TODO: CDC percentile lookup
    return { label: "See a pediatrician", color: "gray" };
  }

  if (age >= 60) {
    if (bmi < 22) return { label: "Underweight", color: "blue" };
    if (bmi < 27) return { label: "Normal", color: "green" };
    if (bmi < 30) return { label: "Overweight", color: "yellow" };
    return { label: "Obese", color: "red" };
  }

  // standard adult (20–59)
  if (bmi < 18.5) return { label: "Underweight", color: "blue" };
  if (bmi < 25) return { label: "Normal", color: "green" };
  if (bmi < 30) return { label: "Overweight", color: "yellow" };
  return { label: "Obese", color: "red" };
}
