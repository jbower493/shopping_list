import { Slot, Stack } from "expo-router";
import { SessionProvider } from "./authContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { FetchContext } from "@repo/queries";
import { axiosInstance } from "@/utils/axiosInstance";
import { queryClient } from "@/utils/queryClient";

export default function RootLayout() {
    return (
        <FetchContext.Provider value={{ axiosInstance }}>
            <QueryClientProvider client={queryClient}>
                <SessionProvider>
                    <Slot />
                    {/* This part below is not right */}
                    {/* <Stack>
                        <Stack.Screen
                            name="sign-in"
                            options={{
                                presentation: "modal",
                            }}
                        />
                    </Stack> */}
                </SessionProvider>
            </QueryClientProvider>
        </FetchContext.Provider>
    );
}
