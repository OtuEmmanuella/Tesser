import { Issue } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IssueState = {
  issues: Record<string, Issue>;
};

export const initialState: IssueState = {
  issues: {},
};

const issueSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    addIssue: (
      state: IssueState,
      { payload }: PayloadAction<{ id: string; issue: Issue }>
    ) => {
      state.issues = { ...state.issues, [payload.id]: payload.issue };
    },
    removeIssue: (
      state: IssueState,
      { payload }: PayloadAction<{ id: string }>
    ) => {
      const { [payload.id]: removeIssue, ...issues } = state.issues;

      state.issues = issues;
    },
  },
});

export const { addIssue, removeIssue } = issueSlice.actions;

export default issueSlice.reducer;
