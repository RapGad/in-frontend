import { configureStore } from '@reduxjs/toolkit';
import { persistStore,persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';
import userReducer from './userInvestmentSlice';
import investmentReducer from './investmentSlice';
import purchaseReducer from './purchaseSlice';
import balanceReducer from './balanceSlice';
import transactionReducer from './transactionSlice';
import withdrawalReducer from './withdrawSlice';
import paymentReducer from './paymentSlice';


const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user']
}

const persistedReducer = persistReducer(persistConfig, authReducer)
export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    userDetails: userReducer,
    investment: investmentReducer,
    purchase: purchaseReducer,
    balance: balanceReducer,
    transaction: transactionReducer,
    withdrawal: withdrawalReducer,
    payment: paymentReducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export const persistor = persistStore(store)