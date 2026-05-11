const ToggleTheme = ({ theme, toggleTheme }) => {
  return (
    <button className="toggle-theme-btn" onClick={toggleTheme}>
      {theme === "light" ? "DARK" : "LIGHT"}
    </button>
  );
};

export default ToggleTheme;
