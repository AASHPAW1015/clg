// components/Settings.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, toggleTheme } from "../features/userSlice";

export function Settings() {
  const [inputName, setInputName] = useState("");

  const { isLoggedIn, theme } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: "20px" }}>
      <h3>Account Settings</h3>

      {/* 1. TOGGLE THEME BUTTON */}
      <button onClick={() => dispatch(toggleTheme())}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>

      <hr />

      {/* 2. LOGIN / LOGOUT UI */}
      {!isLoggedIn ? (
        <div>
          <input
            type="text"
            placeholder="Enter username..."
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
          <button onClick={() => dispatch(login(inputName))}>Log In</button>
        </div>
      ) : (
        <button onClick={() => dispatch(logout())}>Log Out</button>
      )}
    </div>
  );
}
