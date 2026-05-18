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
      {/* theme toggle — fixed top right */}
      <div
        style={{ position: "fixed", top: "16px", right: "16px", zIndex: 10 }}
      >
        <ToggleTheme theme={theme} toggleTheme={toggleTheme} />
      </div>

      {/* bmi number */}
      <TopDisplay />

      {/* gauge */}
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

      {/* input section */}
      <div style={{ width: "563px", marginTop: "12px" }}>
        {/* tabs sit on top of panel */}
        <div className="unit-toggle">
          <UnitToggle />
        </div>
        {/* panel body */}
        <div className="panel-body">
          {unit === "imperial" ? <Imperial /> : <Metric />}
        </div>
      </div>

      {/* weight converter — slides from right edge */}
      <Sidebar />

      {/* footer */}
      <Redirect
        position="left"
        text="© AASHPAW"
        link="https://opensource.org/licenses/MIT"
        hoverText="License"
      />
      <Redirect
        position="right"
        text="↗DOCS"
        link="https://github.com/AASHPAW1015/clg/tree/main/reactr/BMI/BmIC"
        hoverText="GitHub"
      />
    </>
  );
}

export default App;
