import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
            // Defaults to 0. If 0, duplicate queries will always refetch the data even if it already exists
            staleTime: 1000 * 60 * 5,
        },
        mutations: {
            onError: (err) => {},
        },
    },
});
