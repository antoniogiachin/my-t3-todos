import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "./slicers/themeSlice";
import appStatusReducer from "./slicers/appStatusSlice";
import modalReducer from "./slicers/modalSlice";
import userReducer from "./slicers/userSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    appStatus: appStatusReducer,
    user: userReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["modal/SET_MODAL"],
        // Ignore these field paths in all actions
        //ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["modal"],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
