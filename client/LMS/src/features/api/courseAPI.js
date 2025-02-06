import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_URL = "http://localhost:8080/api/v1/course";

export const courseAPI = createApi({
    reducerPath: "courseAPI",
    tagTypes:['REFETCH_COURSES'],
    baseQuery: fetchBaseQuery({
        baseUrl: COURSE_URL,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: ({ courseTitle, category }) => ({
                url: "/",
                method: "POST",
                body: { courseTitle, category },
            }),
            invalidatesTags:['REFETCH_COURSES']
        }),
        getPublishedCourse: builder.query({
            query: () => ({
                url: "/published-courses",
                method: "GET",
            }),
              providesTags:['REFETCH_COURSES']
        }),
        getUpdateCourse: builder.mutation({
            query: ({ formData, courseId }) => ({
               url: `/${courseId}`,
                method: "PUT",
                body:formData
            }),
            invalidatesTags:['REFETCH_COURSES']
            }),
        getCourse: builder.query({
            query: (courseId) => ({
                url: `/${courseId}`,
                method:"GET"
            })  
        }) 
    })
});

export const {
    useCreateCourseMutation,
    useGetPublishedCourseQuery,
    useGetUpdateCourseMutation,
    useGetCourseQuery
} = courseAPI;
