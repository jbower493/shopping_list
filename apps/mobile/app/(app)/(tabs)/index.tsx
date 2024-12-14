import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Index() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>My Home Screen</Text>
            <Link href="/lists" style={styles.button}>
                Lists screen
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#ffffff",
    },
    button: {
        fontSize: 20,
        textDecorationLine: "underline",
        color: "#ffffff",
    },
});
