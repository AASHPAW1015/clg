import { useState } from "react";

const InputBox = ({ field, unit, onChange }) => {
  const [value, setValue] = useState("");
  const [ft, setFt] = useState("");
  const [inches, setInches] = useState("");

  function handleChange(e) {
    setValue(e.target.value);
    onChange(e.target.value);
  }

  if (field === "height" && unit === "imperial") {
    return (
      <div>
        <label>ft</label>
        <input
          type="number"
          value={ft}
          onChange={(e) => {
            setFt(e.target.value);
            onChange(Number(e.target.value) * 12 + Number(inches));
          }}
        />
        <label>in</label>
        <input
          type="number"
          value={inches}
          onChange={(e) => {
            setInches(e.target.value);
            onChange(Number(ft) * 12 + Number(e.target.value));
          }}
        />
      </div>
    );
  }

  return (
    <div>
      <label>{field}</label>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        placeholder={
          unit === "imperial"
            ? field === "weight"
              ? "lbs"
              : field === "age"
                ? "yrs"
                : ""
            : field === "weight"
              ? "kg"
              : field === "height"
                ? "cm"
                : field === "age"
                  ? "yrs"
                  : ""
        }
      />
    </div>
  );
};

export default InputBox;
