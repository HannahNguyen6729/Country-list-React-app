import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit";
import countryReducer from "./slice/countrySlice";

import cartReducer from "./slice/cartSlice";
export const store = configureStore({
  reducer: {
    countryReducer: countryReducer,
    cartReducer: cartReducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
