import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "./slicers/themeSlice";
import appStatusReducer from "./slicers/appStatusSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    appStatus: appStatusReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
