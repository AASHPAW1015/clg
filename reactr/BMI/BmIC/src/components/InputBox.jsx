import { useState } from "react";

const InputBox = ({ field, unit, onChange }) => {
  const [value, setValue] = useState("");
  const [ft, setFt] = useState("");
  const [inches, setInches] = useState("");

  function handleChange(e) {
    setValue(e.target.value);
    onChange(e.target.value);
  }

  // imperial height — ft and in side by side
  if (field === "height" && unit === "imperial") {
    return (
      <div className="input-row">
        <label>Height</label>
        <input
          type="number"
          placeholder="ft"
          value={ft}
          onChange={(e) => {
            setFt(e.target.value);
            onChange(Number(e.target.value) * 12 + Number(inches));
          }}
        />
        <span className="sub-label">ft</span>
        <input
          type="number"
          placeholder="in"
          value={inches}
          onChange={(e) => {
            setInches(e.target.value);
            onChange(Number(ft) * 12 + Number(e.target.value));
          }}
        />
        <span className="sub-label">in</span>
      </div>
    );
  }

  // standard single input
  const placeholders = {
    metric: { weight: "kg", height: "cm", age: "yrs" },
    imperial: { weight: "lbs", age: "yrs" },
  };

  return (
    <div className="input-row">
      <label>{field}</label>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        placeholder={placeholders[unit]?.[field] || ""}
      />
    </div>
  );
};

export default InputBox;
