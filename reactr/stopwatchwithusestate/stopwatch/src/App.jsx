import { useState } from 'react'


function App() {
  const [time, setTime] = useState(0)
  const stopwatch = () => {
    const Interval = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
    };


  return (
    <>
      <button onClick={stopwatch}> start </button>
      <h1>{time}</h1>
    </>
  )
}

export default App
