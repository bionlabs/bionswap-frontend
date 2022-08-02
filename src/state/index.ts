import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import themeReducer from "./theme/reducer";
import swapReducer from "./swap/reducer";
import listsReducer from "./lists/reducer";
import multicallReducer from "./multicall/reducer";
import userReducer from "./user/reducer";
import transactionsReducer from "./transactions/reducer";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    multicall: multicallReducer,
    swap: swapReducer,
    lists: listsReducer,
    user: userReducer,
    transactions: transactionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: true,
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV === "development",
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
