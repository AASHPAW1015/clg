// features/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  isLoggedIn: false,
  theme: "light", // 'light' or 'dark'
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action 1: Log the user in
    login: (state, action) => {
      state.username = action.payload; // The payload will be the username string
      state.isLoggedIn = true;
    },
    // Action 2: Log the user out
    logout: (state) => {
      state.username = "";
      state.isLoggedIn = false;
    },
    // Action 3: Toggle between light and dark mode
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

// Export the actions so our components can dispatch them
export const { login, logout, toggleTheme } = userSlice.actions;

// Export the reducer so the store can use it
export default userSlice.reducer;
