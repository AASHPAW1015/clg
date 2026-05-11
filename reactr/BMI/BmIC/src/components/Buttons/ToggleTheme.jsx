const ToggleTheme = ({ theme, toggleTheme }) => {
  return (
    <button onClick={toggleTheme}>
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ToggleTheme;
