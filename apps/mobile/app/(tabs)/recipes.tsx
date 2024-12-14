import { Text, View, StyleSheet } from "react-native";

export default function RecipesScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Recipes screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#ffffff",
    },
});
