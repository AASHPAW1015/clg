import './button.css'

const Button = (params) => {
  return (
    <>
      <div className="buttonMainContainer mainContainer">
        <button style={
          params.type === "Open" ? {backgroundColor:"blue"} : 
          params.type === "Ok" ? {backgroundColor:"green"} : 
          params.type === "Cancel" ? {backgroundColor:"red"} : 
          params.type === "Done" ? {backgroundColor:"white", color: "black"} : 
          params.type === "Back" ? {backgroundColor:"black"} : 
          {backgroundColor:"yellow"}
          } className='buttonComponent' onClick={()=>{
            params.clickFunc()
          }} >{params.text}</button>
      </div>
    </>
  );
};

export default Button;
