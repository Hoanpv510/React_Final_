import { createSlice } from "@reduxjs/toolkit";

const loaiSlice = createSlice({
  name: "loai",
  initialState: {
    loading: false,
    loai: null,
    error: null,
  },
  reducers: {},
});

export default loaiSlice.reducer;
