import { createContext, useState } from 'react'
import { calculateBMI, getCategory } from '../Utils/bmiUtils.js'

export const CalcContext = createContext()

export function CalcProvider({ children }) {
  const [BMI, setBMI] = useState(null)
  const [unit, setUnit] = useState('metric')
  const [category, setCategory] = useState(null)

  function handleCalculate(weight, height, unit, age) {
    const result = calculateBMI(weight, height, unit)
    setBMI(result)

    const cat = getCategory(result, age)
    setCategory(cat)
  }

  return (
    <CalcContext.Provider value={{ BMI, unit, setUnit, category, handleCalculate }}>
      {children}
    </CalcContext.Provider>
  )
}
