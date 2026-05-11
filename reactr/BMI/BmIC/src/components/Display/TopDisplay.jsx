import { useContext } from "react";
import { CalcContext } from "../../Context/CalcContext";

const colorMap = {
  blue: "#0067C1",
  green: "#34C759",
  yellow: "#FFCC00",
  orange: "#FF6B1C",
  red: "#FF0000",
  gray: "#888888",
};

const TopDisplay = () => {
  const { BMI, category } = useContext(CalcContext);

  const displayColor = category ? colorMap[category.color] || "#888888" : "#888888";

  return (
    <div className="bmi-display" style={{ color: displayColor }}>
      {BMI !== null ? BMI : "--"}
    </div>
  );
};

export default TopDisplay;
