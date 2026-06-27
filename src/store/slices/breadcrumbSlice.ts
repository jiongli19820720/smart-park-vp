import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ReactNode } from "react";

interface BreadcrumbState {
  labels: ReactNode[];
}

const initialState: BreadcrumbState = {
  labels: [],
};

const breadcrumbSlice = createSlice({
  name: "breadcrumb",
  initialState,
  reducers: {
    setBreadcrumbLabels: (state, action: PayloadAction<ReactNode[]>) => {
      state.labels = action.payload;
    },
  },
});

export const { setBreadcrumbLabels } = breadcrumbSlice.actions;

export default breadcrumbSlice.reducer;
