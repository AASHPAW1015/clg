import { useContext } from "react";
import "./App.css";
import Arc from "./components/Display/SVGs/Arc/Arc";
import Arrow from "./components/Display/SVGs/Arrow/Arrow";
import TopDisplay from "./components/Display/TopDisplay";
import Imperial from "./components/Tabs/Imperial/Imperial";
import Metric from "./components/Tabs/Metric/Metric";
import Sidebar from "./components/Sidebar";
import Redirect from "./components/Redirect";
import ToggleTheme from "./components/Buttons/ToggleTheme";
import { CalcProvider, CalcContext } from "./Context/CalcContext";
import { ThemeProvider, useTheme } from "./Context/ThemeContext";
import UnitToggle from "./components/Buttons/UnitToggle";

function App() {
  return (
    <ThemeProvider>
      <CalcProvider>
        <AppContent />
      </CalcProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const { unit } = useContext(CalcContext);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <ToggleTheme theme={theme} toggleTheme={toggleTheme} />
      <TopDisplay />
      <div
        className="gauge-wrapper"
        style={{
          position: "relative",
          width: "563px",
          height: "286px",
          overflow: "visible",
        }}
      >
        <Arc />
        <Arrow />
      </div>
      <div className="input-panel" style={{ position: "relative" }}>
        <UnitToggle />
        {unit === "imperial" ? <Imperial /> : <Metric />}
        <Sidebar />
      </div>
      <Redirect
        position="left"
        text="© AASHPAW"
        link="your-license-link"
        hoverText="License"
      />
      <Redirect
        position="right"
        text="DOCS"
        link="your-github-link"
        hoverText="GitHub Documentation"
      />
    </>
  );
}

export default App;
