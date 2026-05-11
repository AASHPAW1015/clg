import { useContext } from "react";
import { CalcContext } from "../../../../Context/CalcContext";
import { getNeedleAngle } from "../../../../Utils/bmiUtils";
import "./Arrow.css";

const Arrow = () => {
  const { BMI } = useContext(CalcContext);
  const angle = getNeedleAngle(BMI);

  return (
    <svg
      width="24"
      height="205"
      viewBox="0 0 24 205"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="arrow"
      style={{
        position: "absolute",
        left: "50%",
        bottom: "0px",
        transformOrigin: "12px 194px",
        transform: `translateX(-12px) rotate(${angle - 90}deg)`,
        transition: "transform 0.6s ease",
      }}
    >
      <path
        d="M13.4332 204.666C19.3239 204.606 24.0505 199.782 23.9903 193.891C23.9301 188 19.106 183.274 13.2152 183.334C7.3245 183.394 2.59791 188.218 2.65811 194.109C2.7183 200 7.54248 204.726 13.4332 204.666ZM11.3418 -1.85517e-06L-0.000243187 20.1169L23.0926 19.881L11.3418 -1.85517e-06ZM13.3242 194L15.3241 193.98L13.5256 17.9786L11.5257 17.9991L9.52583 18.0195L11.3243 194.02L13.3242 194Z"
        fill="#1A1A1A"
      />
    </svg>
  );
};

export default Arrow;
