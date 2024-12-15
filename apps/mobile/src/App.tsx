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

function HomeScreen() {
    const navigation = useNavigation();

    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text>Home Screen</Text>
            <Button onPress={() => navigation.navigate("Lists")}>
                Lists Page
            </Button>
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
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text>Sign In Screen</Text>
        </View>
    );
}

function SplashScreen() {
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text style={{ color: "#ffffff", fontSize: 22 }}>
                Splash Screen
            </Text>
        </View>
    );
}

const SignInContext = createContext<boolean>(true);

function useIsSignedIn() {
    const isSignedIn = useContext(SignInContext);
    return isSignedIn;
}

function useIsSignedOut() {
    const isSignedIn = useContext(SignInContext);
    return !isSignedIn;
}

const RootStack = createNativeStackNavigator({
    screenOptions: {
        headerStyle: { backgroundColor: "tomato" },
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
    const isLoading = true;

    if (isLoading) {
        return <SplashScreen />;
    }

    return <Navigation />;
}

export function App() {
    const isSignedIn = false;

    return (
        <SignInContext.Provider value={isSignedIn}>
            <AuthWrapper />
        </SignInContext.Provider>
    );
}

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
