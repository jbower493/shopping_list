import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../config";
import type { User, Credentials } from "./models";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl, credentials: "include" }),
    endpoints: (builder) => ({
        getUser: builder.query<User, void>({
            query: () => "user",
        }),
        login: builder.mutation<void, Credentials>({
            query: (payload) => ({
                url: "login",
                method: "POST",
                body: payload,
            }),
        }),
    }),
});

export const { useGetUserQuery, useLoginMutation } = authApi;
