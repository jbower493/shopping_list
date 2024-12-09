import { useQuery } from "@tanstack/react-query";

function getServices(): Promise<{ services: { id: number; name: string }[] }> {
    return new Promise((resolve) =>
        resolve({
            services: [
                {
                    id: 1,
                    name: "My first service",
                },
                {
                    id: 2,
                    name: "My second service",
                },
                {
                    id: 3,
                    name: "My third service",
                },
            ],
        })
    );
}

export function useServicesQuery() {
    return useQuery({
        queryKey: ["SERVICES"],
        queryFn: getServices,
    });
}
