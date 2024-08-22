import { appReducer } from "./app-slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppSliceInitialState } from "../misc/types";

export interface StoreStateType {
  app: AppSliceInitialState;
}

const rootPersistConfig = {
  key: "nftversewallet-root",
  storage: AsyncStorage,
};

const appPersistConfig = {
  key: "nftversewallet-app",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  app: persistReducer(appPersistConfig, appReducer),
});

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
export type RootDispatch = ReturnType<typeof store.dispatch>;
