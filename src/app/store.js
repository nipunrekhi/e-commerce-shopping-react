import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/cart/cartSlice";
import { authApi } from "./services/authService";
import paymentSlice from "../features/payment/paymentSlice";
import promoSlice from "../features/promocode/promoSlice";

// Combine your individual reducers
const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  cart: cartReducer,
  payment: paymentSlice,
  promocode: promoSlice,
  [authApi.reducerPath]: authApi.reducer,

  // Add more reducers as needed
});
const store = configureStore({
  reducer: rootReducer,

  middleware: (getdefaultMiddleware) => {
    return getdefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware);
  },
});

const LOGOUT = "logout";

// Create a special reducer to handle the logout action
const rootReducerWithLogout = (state, action) => {
  if (action.type === LOGOUT) {
    localStorage.removeItem("userToken");
    localStorage.removeItem("paymentMethod");
    localStorage.removeItem("orderDetails");
    localStorage.removeItem("address");
    state = undefined; // Reset the state to undefined
  }
  return rootReducer(state, action);
};

// Update the store's reducer with the rootReducerWithLogout
store.replaceReducer(rootReducerWithLogout);

export const logout = () => ({ type: LOGOUT });

export default store;
