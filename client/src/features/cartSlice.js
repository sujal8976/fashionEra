import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  loading: false,
  cartItems: [],
  tax: 0,
  subTotal: 0,
  discount: 0,
  shipping: 0,
  total: 0,
};

export const cartSlice = createSlice({
  name: "cartReducer",
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action) => {
      state.loading = true;

      const index = state.cartItems.findIndex(
        (i) => i.productId === action.payload.productId
      );

      if (index !== -1) {
        state.cartItems[index] = action.payload;
      } else {
        state.cartItems.push(action.payload);
      }
      state.loading = false;
    },

    removeCartItem: (state, action) => {
      state.loading = true;
      state.cartItems = state.cartItems.filter(
        (i) => i.productId !== action.payload
      );
      state.loading = false;
    },

    calculatePrice: (state) => {
      state.subTotal = state.cartItems.reduce(
        (total, item) => total + item.sellingPrice * item.quantity,
        0
      );
      state.shipping = state.subTotal < 1000 ? 0 : 150;
      state.tax = Math.round(state.subTotal * 0.18);
      state.total = state.subTotal + state.tax + state.shipping;
      state.discount = state.cartItems.reduce(
        (total, item) => total + item.oldPrice * item.quantity,
        0
      );
    },
    resetCart: () => initialCartState,
  },
});

export const { addToCart, removeCartItem, calculatePrice, resetCart } =
  cartSlice.actions;
