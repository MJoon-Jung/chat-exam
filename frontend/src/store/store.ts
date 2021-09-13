import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import logger from "redux-logger";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: { userSlice },
  middleware: getDefaultMiddleware().concat(logger),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
