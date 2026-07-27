import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { ivbaApi } from "@ivba/api-client";

import { sessionReducer } from "./sessionSlice";

export function makeStore() {
  const store = configureStore({
    reducer: {
      session: sessionReducer,
      [ivbaApi.reducerPath]: ivbaApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(ivbaApi.middleware),
  });

  setupListeners(store.dispatch);
  return store;
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export { sessionReducer, setSessionView, clearSession } from "./sessionSlice";
export { ivbaApi } from "@ivba/api-client";
