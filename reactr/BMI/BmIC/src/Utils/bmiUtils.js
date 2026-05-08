export function calculateBMI(weight, height, unit) {
  if (!weight || !height || height === 0) return null;

  const BMI = unit === 'imperial'
    ? (weight / (height ** 2)) * 703
    : (weight / (height ** 2));

  return parseFloat(BMI.toFixed(2));
}

export function calculateNeedleAngle(bmi) {
  if (bmi === null) return 90;
  const rounder = Math.min(Math.max(bmi,10),40);
  const angle = ((rounder - 10)/30) * 180;

  return angle;
}

export function getCategory(bmi, age) {
  if (bmi === null) return null

  if (age < 20) {
    // TODO: CDC percentile lookup
    return { label: 'See a pediatrician', color: 'gray' }
  }

  if (age >= 60) {
    if (bmi < 22) return { label: 'Underweight', color: 'blue' }
    if (bmi < 27) return { label: 'Normal', color: 'green' }
    if (bmi < 30) return { label: 'Overweight', color: 'yellow' }
    return         { label: 'Obese', color: 'red' }
  }

  // standard adult (20–59)
  if (bmi < 18.5) return { label: 'Underweight', color: 'blue' }
  if (bmi < 25)   return { label: 'Normal', color: 'green' }
  if (bmi < 30)   return { label: 'Overweight', color: 'yellow' }
  return           { label: 'Obese', color: 'red' }
}
