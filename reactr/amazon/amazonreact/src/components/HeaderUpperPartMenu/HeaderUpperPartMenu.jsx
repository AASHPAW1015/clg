import React from "react";

const HeaderUpperPartMenu = (props) => {
  return (
    <>
      <div>
        <p>{props.upperText}</p>
        <h5>{props.lowerText}</h5>
      </div>
    </>
  );
};

export default HeaderUpperPartMenu;
