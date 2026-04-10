import "./inputField.css";
const InputField = (props) => {
  return (
    <>
      <div className="inputFieldMainContainer mainContainer">
        <input type={props.input_type} id={props.input_id} name={props.input_name} value={props.input_value} onChange={props.input_onchange} />
      </div>
    </>
  );
};

export default InputField;
