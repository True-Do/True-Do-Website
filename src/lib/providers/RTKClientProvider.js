'use client';
import { Provider } from 'react-redux';
import store from '../store';
import { useRef } from 'react';
import { makeStore } from '../store';
import { PersistGate } from 'redux-persist/integration/react';

const RTKProvider = ({ children }) => {
  let storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={storeRef.current.__persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default RTKProvider;
