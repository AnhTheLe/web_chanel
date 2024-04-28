import {
  addListener,
  combineReducers,
  configureStore,
  createListenerMiddleware,
  TypedAddListener,
  TypedStartListening
} from '@reduxjs/toolkit';
import { getPersistConfig } from 'redux-deep-persist';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import themeReducer from '../theme/slice';

export const listenerMiddleware = createListenerMiddleware();
export type AppStartListening = TypedStartListening<AppState, AppDispatch>;

export const addAppListener = addListener as TypedAddListener<AppState, AppDispatch>;
export const startAppListening = listenerMiddleware.startListening as AppStartListening;

const locationReducerConfig = {
  key: 'sapo-pos-v3-location',
  storage,
  whitelist: ['currentLocation']
};

const reducers = combineReducers({
  theme: themeReducer
});

const rootReducerConfig = getPersistConfig({
  key: 'sapo-pos-v3',
  storage,
  whitelist: ['authContext'],
  rootReducer: reducers
});

const persistedReducer = persistReducer(rootReducerConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).prepend(listenerMiddleware.middleware),
  devTools: import.meta.env.REACT_APP_ENV !== 'production'
});
const persistor = persistStore(store);

export const storeProvider = { persistor, store };

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export function dispatch(action: any) {
  return store.dispatch(action);
}
