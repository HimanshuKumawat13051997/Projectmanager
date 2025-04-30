import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { projectSlice } from "./slices/projectSlice";
import { taskSlice } from "./slices/taskSlice";


export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    project: projectSlice.reducer,
    task: taskSlice.reducer
  },
});
