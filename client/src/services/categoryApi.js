import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1/categories/`,
  }),
  tagTypes: ["category"],
  endpoints: (builder) => ({
    allCategories: builder.query({
      query: () => "",
      providesTags: ["category"],
    }),
  }),
});

export const { useAllCategoriesQuery } = categoryApi;
