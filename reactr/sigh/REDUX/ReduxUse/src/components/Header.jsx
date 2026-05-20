// components/Header.jsx
import React from "react";
import { useSelector } from "react-redux";

export function Header() {
  // Grab the specific pieces of state we need
  const { username, isLoggedIn, theme } = useSelector((state) => state.user);

  const headerStyle = {
    backgroundColor: theme === "dark" ? "#333" : "#f4f4f4",
    color: theme === "dark" ? "#fff" : "#000",
    padding: "15px",
  };

  return (
    <header style={headerStyle}>
      <h2>My Awesome App</h2>
      {isLoggedIn ? <p>Welcome back, {username}!</p> : <p>Please log in.</p>}
    </header>
  );
}
