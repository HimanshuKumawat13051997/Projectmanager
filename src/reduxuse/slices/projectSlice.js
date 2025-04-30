import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  projects: [],
  error: null,
  success: false,
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    getProjects: (state, action) => {
      state.projects = action.payload;
      state.loading = false;
      state.error = null;
      state.success = true;
    },
  },
});

export const { getProjects  } = projectSlice.actions;

export default projectSlice.reducer;
