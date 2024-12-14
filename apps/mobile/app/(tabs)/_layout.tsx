import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#10b981",
                headerStyle: {
                    backgroundColor: "#ffffff",
                    borderBottomColor: "#d1d5db",
                    borderBottomWidth: 1,
                },
                headerShadowVisible: false,
                headerTintColor: "#10b981",
                tabBarStyle: {
                    backgroundColor: "#ffffff",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "home-sharp" : "home-outline"}
                            color={color}
                            size={24}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="lists"
                options={{
                    title: "Lists",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "list" : "list"}
                            color={color}
                            size={24}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="recipes"
                options={{
                    title: "Recipes",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "fast-food" : "fast-food"}
                            color={color}
                            size={24}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
