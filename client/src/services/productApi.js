import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1/products/`,
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    latestProduct: builder.query({
      query: "latest",
      providesTags: ["product"],
    }),
    allProducts: builder.query({
      query: ({
        price,
        search,
        sort,
        brand,
        category,
        page,
        parentCategory,
      }) => {
        let base = `all?search=${search}`;

        if (page) base += `&page=${page}`;
        if (price) base += `&price=${price}`;
        if (parentCategory) base += `&parentCategory=${parentCategory}`;
        if (sort) base += `&sort=${sort}`;
        if (category) base += `&category=${category}`;
        if (brand) base += `&brand=${brand}`;

        return base;
      },
      providesTags: ["product"],
    }),
    getProduct: builder.query({
      query: (id) => `${id}`,
      providesTags: ["product"],
    }),
  }),
});

export const {
  useAllProductsQuery,
  useLatestProductQuery,
  useGetProductQuery,
} = productApi;
