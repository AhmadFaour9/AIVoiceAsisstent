import { configureStore } from "@reduxjs/toolkit";
import itemSlice from "./itemSlice";

const store = configureStore({
  reducer: {
    item1: itemSlice,
  },
});

export default store;