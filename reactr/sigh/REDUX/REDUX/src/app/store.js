import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "src/features/Counter/CounterSlice";

export default configureStore({
  reducer: {
    counter: counterSlice,
  },
});
