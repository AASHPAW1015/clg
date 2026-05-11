import { useContext, useState } from "react";
import InputBox from "../../InputBox";
import CalculateButton from "../../Buttons/CalculateButton";
import { CalcContext } from "../../../Context/CalcContext";

const Metric = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");

  const { handleCalculate } = useContext(CalcContext);

  function onCalculate() {
    handleCalculate(weight, height, "metric", age);
  }

  return (
    <div>
      <InputBox field="height" unit="metric" onChange={setHeight} />
      <InputBox field="weight" unit="metric" onChange={setWeight} />
      <InputBox field="age" unit="metric" onChange={setAge} />
      <CalculateButton onClick={onCalculate} />
    </div>
  );
};

export default Metric;
