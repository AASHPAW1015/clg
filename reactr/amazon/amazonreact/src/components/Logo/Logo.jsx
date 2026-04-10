import React from "react";
import amazonLogo from "../../assets/amazonLogo.jpg"

const Logo = () => {
    console.log(amazonLogo);
    
  return (
    <>
      <div>
        <img width={"100px"} src={amazonLogo} alt="" />
      </div>
    </>
  );
};

export default Logo;
