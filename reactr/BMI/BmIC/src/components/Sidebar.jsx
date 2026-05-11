import { useState } from "react";

const Sidebar = () => {
  const [kg, setKg] = useState("");
  const [lbs, setLbs] = useState("");
  const [result, setResult] = useState(null);
  const [mode, setMode] = useState("kgToLbs");

  function handleConvert() {
    if (mode === "kgToLbs" && kg) {
      setResult((parseFloat(kg) * 2.20462).toFixed(2) + " lbs");
    } else if (mode === "lbsToKg" && lbs) {
      setResult((parseFloat(lbs) / 2.20462).toFixed(2) + " kg");
    }
  }

  return (
    <div
      className="sidebar"
      style={{
        position: "absolute",
        right: "-145px",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
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
        <div style={{ marginTop: "4px" }}>
          {result}
          <button
            style={{ marginTop: "4px" }}
            onClick={() => navigator.clipboard.writeText(result)}
          >
            copy
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
