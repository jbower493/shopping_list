// In App.js in a new project

import React, { useContext, createContext } from "react";
import { View, Text } from "react-native";
import {
    createStaticNavigation,
    StaticParamList,
    useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "@react-navigation/elements";
import { SessionProvider, useSession } from "@/utils/authContext";

function HomeScreen() {
    const navigation = useNavigation();
    const { signOut } = useSession();

    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text>Home Screen</Text>
            <Button onPress={() => navigation.navigate("Lists")}>
                Lists Page
            </Button>
            <Button onPress={() => signOut()}>Sign Out</Button>
        </View>
    );
}

function ListsScreen() {
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text>Lists Screen</Text>
        </View>
    );
}

function SignInScreen() {
    const { signIn } = useSession();

    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text>Sign In Screen</Text>
            <Button onPress={() => signIn()}>Sign In</Button>
        </View>
    );
}

function SplashScreen() {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#10b981",
            }}
        >
            <Text style={{ color: "#ffffff", fontSize: 22 }}>
                Splash Screen
            </Text>
        </View>
    );
}

function useIsSignedIn() {
    const { session } = useSession();
    return !!session;
}

function useIsSignedOut() {
    const { session } = useSession();

    return !session;
}

const RootStack = createNativeStackNavigator({
    screenOptions: {
        headerStyle: { backgroundColor: "#10b981" },
    },
    screens: {
        // Common screens
    },
    groups: {
        SignedIn: {
            if: useIsSignedIn,
            screens: {
                Home: {
                    screen: HomeScreen,
                    options: {
                        title: "Overview",
                    },
                },
                Lists: ListsScreen,
            },
        },
        SignedOut: {
            if: useIsSignedOut,
            screens: {
                SignIn: SignInScreen,
                // SignUp: SignUpScreen,
                // ResetPassword: ResetPasswordScreen,
            },
        },
    },
});

const Navigation = createStaticNavigation(RootStack);

function AuthWrapper() {
    const { isLoading } = useSession();

    if (isLoading) {
        return <SplashScreen />;
    }

    return <Navigation />;
}

export function App() {
    return (
        <SessionProvider>
            <AuthWrapper />
        </SessionProvider>
    );
}

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
