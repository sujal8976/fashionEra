import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1/reviews/`,
    credentials: "include",
  }),
  tagTypes: ["review"],
  endpoints: (builder) => ({
    newReview: builder.mutation({
      query: (productId, userId, review) => ({
        url: `${userId}/${productId}`,
        method: "POST",
        body: review,
      }),
    }),
    getReview: builder.query({
      query: (productId) => `${productId}`,
      providesTags: ["review"],
    }),
  }),
});

export const { useNewReviewMutation, useGetReviewQuery } = reviewApi;
