import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../config";
import type { List } from "./models";

export const listsApi = createApi({
    reducerPath: "listsApi",
    baseQuery: fetchBaseQuery({ baseUrl, credentials: "include" }),
    endpoints: (builder) => ({
        getLists: builder.query<List[], void>({
            query: () => "lists",
        }),
    }),
});

export const { useGetListsQuery } = listsApi;
