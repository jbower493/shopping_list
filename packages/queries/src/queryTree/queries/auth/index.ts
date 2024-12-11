import { useQuery } from "@tanstack/react-query";
import { userQueryKey } from "queryTree/utils/keyFactory";
import { QueryResponse } from "queryTree/utils/types";
import { User, UserDataAdditionalUser } from "./types";
import { createContext, useContext } from "react";

const fetchContext = createContext({
    request: {
        get: (url: string) => {},
        post: () => {},
        put: () => {},
        delete: () => {},
    },
});

/***** Get user *****/
export function useGetUserQuery() {
    const { request } = useContext(fetchContext);

    const getUser = (): Promise<
        QueryResponse<{
            user: User;
            additional_user: UserDataAdditionalUser | null;
        }>
    > => request.get("/user");

    return useQuery({
        queryKey: userQueryKey,
        queryFn: getUser,
        select: (response) => response.data,
    });
}
