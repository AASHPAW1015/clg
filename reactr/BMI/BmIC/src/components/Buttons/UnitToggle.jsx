import { useContext } from "react";
import { CalcContext } from "../../Context/CalcContext";

const UnitToggle = () => {
  const { unit, setUnit } = useContext(CalcContext);

  return (
    <>
      <button
        className={unit === "metric" ? "active" : ""}
        onClick={() => setUnit("metric")}
      >
        Metric
      </button>
      <button
        className={unit === "imperial" ? "active" : ""}
        onClick={() => setUnit("imperial")}
      >
        Imperial
      </button>
    </>
  );
};

export default UnitToggle;
