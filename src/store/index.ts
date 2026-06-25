import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import breadcrumbReducer from "./slices/breadcrumbSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    breadcrumb: breadcrumbReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
