import { useState } from "react";

const Sidebar = () => {
  const [kg, setKg] = useState("");
  const [lbs, setLbs] = useState("");
  const [result, setResult] = useState(null);
  const [copyVal, setCopyVal] = useState("");
  const [mode, setMode] = useState("kgToLbs");
  const [open, setOpen] = useState(false);

  function handleConvert() {
    if (mode === "kgToLbs" && kg) {
      const val = (parseFloat(kg) * 2.20462).toFixed(2);
      setResult(val + " lbs");
      setCopyVal(val);
    } else if (mode === "lbsToKg" && lbs) {
      const val = (parseFloat(lbs) / 2.20462).toFixed(2);
      setResult(val + " kg");
      setCopyVal(val);
    }
  }

  return (
    <div
      className="sidebar-drawer"
      style={{
        position: "fixed",
        top: "50%",
        right: open ? "0px" : "-160px",
        transform: "translateY(-50%)",
        display: "flex",
        alignItems: "stretch",
        zIndex: 20,
        transition: "right 0.4s ease",
      }}
    >
      <button
        className="sidebar-tab"
        onClick={() => setOpen(!open)}
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          flexShrink: 0,
        }}
      >
        {open ? "CLOSE" : "WEIGHT"}
      </button>
      <div className="sidebar-panel">
        <div className="sidebar-content">
          <button
            onClick={() => setMode(mode === "kgToLbs" ? "lbsToKg" : "kgToLbs")}
          >
            {mode === "kgToLbs" ? "kg → lbs" : "lbs → kg"}
          </button>
          {mode === "kgToLbs" ? (
            <input
              type="number"
              placeholder="kg"
              value={kg}
              onChange={(e) => setKg(e.target.value)}
            />
          ) : (
            <input
              type="number"
              placeholder="lbs"
              value={lbs}
              onChange={(e) => setLbs(e.target.value)}
            />
          )}
          <button onClick={handleConvert}>Convert</button>
          {result && (
            <div>
              <div className="result">{result}</div>
              <button
                className="copy-btn"
                onClick={() => navigator.clipboard.writeText(copyVal)}
              >
                Copy
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
