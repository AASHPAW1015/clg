import { useState } from 'react'

function App() {
  const [iN, setIn] = useState("")
  const [time, setTime] = useState(0)
  const [iD, setID] = useState(null)

  const start = () => {
    let count = Number(iN)
    setTime(count)

    const id = setInterval(() => {
      count = count - 1
      setTime(count)

      if (count <= 0) {
        clearInterval(id)
        setID(null)
        setTimeout(() => {
          alert("Time's up!!!!")  
        }, 5);
      }
    }, 1000)

    setID(id)
  }

  const stop = () => {
    clearInterval(iD)
    setID(null)
  }

  const reset = () => {
    clearInterval(iD)
    setID(null)
    setTime(Number(iN))
  }

  return (
    <>
      <input type="number" value={iN} onChange={(e) => setIn(e.target.value)} />
      <h1>{time}</h1>
      <button onClick={start}> start </button>
      <button onClick={stop}> stop </button>
      <button onClick={reset}> reset </button>
    </>
  )
}

export default App
