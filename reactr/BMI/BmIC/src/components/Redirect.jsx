const Redirect = ({ position, text, link, hoverText }) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "16px",
        left: position === "left" ? "16px" : "auto",
        right: position === "right" ? "16px" : "auto",
      }}
    >
      <a href={link} title={hoverText} target="_blank" rel="noreferrer">
        {text}
      </a>
    </div>
  );
};

export default Redirect;
