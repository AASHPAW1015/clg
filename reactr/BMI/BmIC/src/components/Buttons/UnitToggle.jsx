import { useContext } from "react";
import { CalcContext } from "../../Context/CalcContext";

const UnitToggle = () => {
  const { unit, setUnit } = useContext(CalcContext);

  return (
    <div style={{ display: "flex" }}>
      <button
        onClick={() => setUnit("metric")}
        style={{
          fontWeight: unit === "metric" ? "bold" : "normal",
          borderBottom: unit === "metric" ? "2px solid black" : "none",
        }}
      >
        Metric
      </button>
      <button
        onClick={() => setUnit("imperial")}
        style={{
          fontWeight: unit === "imperial" ? "bold" : "normal",
          borderBottom: unit === "imperial" ? "2px solid black" : "none",
        }}
      >
        Imperial
      </button>
    </div>
  );
};

export default UnitToggle;
