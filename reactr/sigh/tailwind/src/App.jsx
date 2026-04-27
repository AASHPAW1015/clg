import { useState } from 'react'
import './App.css'
import Practical from './components/Practical'
import Call from './components/Call.jsx'
import EffectHook from './components/EffectHook.jsx'
import ThemeProvider from './components/ContextHook/ThemeProvider.jsx'
import Navbar from './components/Navbar.jsx'

function App() {

  return (
    <>
      <ThemeProvider>
        <Navbar />
        <Practical/>
        <Call/>
        <EffectHook/>
      </ThemeProvider>


    </>
  )
}

export default App
