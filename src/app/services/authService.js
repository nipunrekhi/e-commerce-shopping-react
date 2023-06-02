import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8089",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      headers.set("credentials", "include");
      return headers;
    },
  }),
  endpoints: (build) => ({
    getUserProfile: build.query({
      query: () => ({
        url: "/userProfile",
        method: "GET",
      }),
      onSuccess: (data, { dispatch }) => {
        dispatch(setCredentials(data)); // Set profile data in setCredentials slice reducer
      },
    }),
  }),
});
// export react hook
export const { useGetUserProfileQuery } = authApi;
