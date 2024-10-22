// https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/
// https://blog.logrocket.com/use-redux-next-js/

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice';
import { templateReducer } from './slices/templateSlice';
import { todoReducer } from './slices/todoSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  auth: authReducer,
  template: templateReducer,
  todo: todoReducer,
});

// Can replace with cookie storage
// and also session storage
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Return a regular reducer for server
const makeServerStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export const makeStore = () => {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    return makeServerStore();
  }

  // The serializable check breaks everything if
  // it's not specified
  let store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }),
  });

  // passing the persistor to the persist gate using
  // our own variable to store the persistor.
  store.__persistor = persistStore(store);
  return store;
};
