import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/v1/users/`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: "new",
        method: "POST",
        body: user,
      }),
    }),
    logout: builder.mutation({
      query: (id) => ({
        url: id,
        method: "POST",
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const getUser = async (id) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/users/${id}`,
      { withCredentials: true }
    );
    return response.data.userData;
  } catch (error) {
    throw error;
  }
};

export const { useRegisterMutation, useLogoutMutation, useLoginMutation } =
  userApi;
