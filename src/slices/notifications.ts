import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

import { Notification } from "@/types";

interface NotificationState {
  notifications: Notification[];
}

export const initialState: NotificationState = {
  notifications: [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (
      state: NotificationState,
      { payload }: PayloadAction<Omit<Notification, "id">>
    ) => {
      state.notifications = [
        ...state.notifications,
        { ...payload, id: nanoid() },
      ];
    },

    dismissNotification: (
      state: NotificationState,
      { payload }: PayloadAction<string>
    ) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== payload
      );
    },
  },
});

export const { addNotification, dismissNotification } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
