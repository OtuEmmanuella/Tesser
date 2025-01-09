import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import issueReducer from "./issues";
import ticketReducer from "./tickets";
import projectReducer from "./projects";
import notificationReducer from "./notifications";

const rootReducer = combineReducers({
  issues: issueReducer,
  tickets: ticketReducer,
  notifications: notificationReducer,
  projects: projectReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: "Tesser",
  version: 1,
  storage,
  blacklist: ["notifications"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});
