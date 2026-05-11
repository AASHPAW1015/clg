import { useContext, useState } from "react";
import InputBox from "../../InputBox";
import CalculateButton from "../../Buttons/CalculateButton";
import { CalcContext } from "../../../Context/CalcContext";

const Imperial = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");

  const { handleCalculate } = useContext(CalcContext);

  function onCalculate() {
    console.log("weight:", weight);
    console.log("height:", height);
    console.log("age:", age);
    handleCalculate(weight, height, "imperial", age);
  }

  function onCalculate() {
    handleCalculate(weight, height, "imperial", age);
  }

  return (
    <div>
      <InputBox field="height" unit="imperial" onChange={setHeight} />
      <InputBox field="weight" unit="imperial" onChange={setWeight} />
      <InputBox field="age" unit="imperial" onChange={setAge} />
      <CalculateButton onClick={onCalculate} />
    </div>
  );
};

export default Imperial;
