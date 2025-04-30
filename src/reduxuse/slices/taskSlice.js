import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  task: [],
  error: null,
  success: false,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    getTasks: (state, action) => {
      state.task = action.payload;
      state.loading = false;
      state.error = null;
      state.success = true;
    },
  },
});

export const { getTasks } = taskSlice.actions;

export default taskSlice.reducer;
