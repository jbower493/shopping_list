import { QueryClient } from "@tanstack/react-query";

export function getQueryClient() {
    return new QueryClient();
}

export function add(one: number, two: number): number {
    return one + two;
}
