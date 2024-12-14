import { Text, View, StyleSheet } from "react-native";
import { useGetUserQuery } from "@repo/queries";

export default function RecipesScreen() {
    const { data, error, isLoading } = useGetUserQuery();

    console.log(error);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Recipes screen</Text>
            <Text>
                {isLoading ? "loading..." : JSON.stringify(data || "Error")}
            </Text>
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
