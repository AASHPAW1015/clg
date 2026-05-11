import { useContext } from "react";
import { CalcContext } from "../../Context/CalcContext";

const TopDisplay = () => {
  const { BMI, category } = useContext(CalcContext);

  return (
    <div style={{ color: category ? category.color : "black" }}>
      {BMI ? BMI : "--"}
    </div>
  );
};

export default TopDisplay;
