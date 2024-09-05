import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1/products/`,
  }),
  tagTypes: ["brand"],
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: () => "brand",
      providesTags: ["brand"],
    }),
  }),
});

export const { useGetBrandsQuery } = brandApi;
