import { Project } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProjectState = {
  projects: Record<string, Project>;
};

export const initialState: ProjectState = {
  projects: {},
};

const issueSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (
      state: ProjectState,
      { payload }: PayloadAction<{ id: string; title: string; lead: string }>
    ) => {
      state.projects = { ...state.projects, [payload.id]: payload };
    },
    removeProject: (
      state: ProjectState,
      { payload }: PayloadAction<{ id: string }>
    ) => {
      const { [payload.id]: removeProject, ...projects } = state.projects;

      state.projects = projects;
    },
  },
});

export const { addProject, removeProject } = issueSlice.actions;

export default issueSlice.reducer;
