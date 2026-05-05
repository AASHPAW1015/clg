import { useRef, useState, useEffect } from "react";

const FocsInput = () => {
  const inputRef = useRef(null);
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("RE-RENDERED — text is:", text);
  }, [text]);

  return (
    <div className="p-8 flex flex-col gap-8">
      {/* useRef input — onChange doesn't touch state, so useEffect never fires */}
      <input
        ref={inputRef}
        type="text"
        onChange={() => console.log("ref input changed, but did React re-render? check above...")}
        placeholder="useRef input"
      />

      {/* useState input — fires useEffect every keystroke */}
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="useState input"
      />
    </div>
  );
};

export default FocsInput

