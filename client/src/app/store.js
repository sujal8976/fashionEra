import { configureStore } from "@reduxjs/toolkit";
import { onPageCategorySlice } from "@/features/onPageCategorySlice.js";
import { userApi } from "@/services/userApi.js";
import { userSlice } from "@/features/userSlice.js";
import { productApi } from "@/services/productApi";
import { categoryApi } from "@/services/categoryApi";
import { brandApi } from "@/services/brandApi";
import { cartSlice } from "@/features/cartSlice";
import { confirmUserSlice } from "@/features/confirmUserSlice";
import { reviewApi } from "@/services/reviewApi";

export const store = configureStore({
  reducer: {
    [onPageCategorySlice.name]: onPageCategorySlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
    [confirmUserSlice.name]: confirmUserSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
  },
  // middleware: (mid) => [...mid(), userApi.middleware, productApi.middleware],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      userApi.middleware,
      productApi.middleware,
      categoryApi.middleware,
      brandApi.middleware,
      reviewApi.middleware,
    ]),
});
