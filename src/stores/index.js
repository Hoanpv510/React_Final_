import { configureStore } from "@reduxjs/toolkit";

import LoaiReducer from "./LoaiReducer";

const store = configureStore({
  reducer: {
    loai: LoaiReducer,
  },
});

export default store;
