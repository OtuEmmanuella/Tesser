import { RootState } from "@/slices";

export const ticketSlice = (state: RootState) => state.tickets;
export const issueSlice = (state: RootState) => state.issues;
export const notificationsSlice = (state: RootState) => state.notifications;
export const projectSlice = (state: RootState) => state.projects;
