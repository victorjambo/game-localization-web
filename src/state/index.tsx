import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit";

import games from "./games/slice";

export const store = configureStore({
  reducer: {
    gamesReducer: games,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true, serializableCheck: false }),
  devTools: true,
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, AppState, null, Action<string>>;