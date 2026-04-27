import { useState } from "react";
import { ThemeContext } from "./ThemeContext.jsx";

const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState("light");

  const ToggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"))
  }

  return (
    <ThemeContext.Provider value = {{theme, ToggleTheme}}>
      <div style={{
        backgroundColor: theme === "light" ? "#ffffff" : "#000000",
        color: theme === "light" ? "#000000" : "#ffffff",
        transition: "background-color 0.3s ease, color 0.3s ease"
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
