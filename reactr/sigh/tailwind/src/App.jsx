import { useState } from 'react'
import './App.css'
import Practical from './components/Practical'
import Call from './components/Call.jsx'
import EffectHook from './components/EffectHook.jsx'
import ThemeProvider from './components/ContextHook/ThemeProvider.jsx'
import Navbar from './components/Navbar.jsx'
import FocusInput from './components/UseRef.jsx'
import FocsInput from './components/Test.jsx'
import CustomHookUse from './components/CustomHook/CustomHookUse.jsx'
import Input from './components/CustomHook/Input.jsx'

function App() {

  return (
    <>
      <ThemeProvider>
        <Navbar />
        <Practical/>
        <Call/>
        <EffectHook/>
        <FocusInput/>
      </ThemeProvider>
      <FocsInput/>
      <CustomHookUse/>
      <Input />




    </>
  )
}

export default App
