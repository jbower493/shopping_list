import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../config";
import type { User, Credentials } from "./models";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl, credentials: "include" }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        getUser: builder.query<User, void>({
            query: () => "user",
            providesTags: ["User"],
        }),
        register: builder.mutation<void, Credentials>({
            query: (payload) => ({
                url: "register",
                method: "POST",
                body: payload,
            }),
        }),
        login: builder.mutation<void, Credentials>({
            query: (payload) => ({
                url: "login",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ['User']
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "logout",
                method: "GET",
            }),
            invalidatesTags: ['User']
        }),
    }),
});

export const { useGetUserQuery, useRegisterMutation, useLoginMutation, useLogoutMutation } = authApi;
