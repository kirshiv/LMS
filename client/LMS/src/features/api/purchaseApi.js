import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const PURCHASE_URL = "https://lms-wwi2.onrender.com/api/v1/purchase";

export const purchaseAPI = createApi({
  reducerPath: "purchaseAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: PURCHASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (courseId) => ({
        url: "/checkout/create-checkout-session",
        method: "POST",
        body: { courseId },
      }),
    }),
    getCourseDetailPurchase: builder.query({
      query: (courseId) => ({
        url: `/course/${courseId}/detail-with-status`,
        method: "GET",
      }),
    }),
    getAllPurchasedCourses: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useGetCourseDetailPurchaseQuery,
  useGetAllPurchasedCoursesQuery,
} = purchaseAPI;
