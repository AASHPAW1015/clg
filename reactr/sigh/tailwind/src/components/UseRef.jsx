import { useRef } from "react";

const FocusInput = () => {
  const inputRef = useRef(null);
  const focusInput = () => {
    inputRef.current.focus();
    console.log("The focus rn is:", inputRef.current.value)

  };



  return (
    <div className = "p-8 flex flex-col gap-8 align-center justify-center">
      <input ref={inputRef} type="text" placeholder="Click here to type!"/>
      <button onClick={focusInput} className = "border w-1/4">CLick me!</button>

    </div>
  );
}

export default FocusInput;

