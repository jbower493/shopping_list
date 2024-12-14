import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";
import PlaceholderImage from "@/assets/images/test-background-image.png";

export default function ListsScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <ImageViewer imgSource={PlaceholderImage} />
            </View>
            <View style={styles.footerContainer}>
                <Button label="Add New List" icon />
                <Button label="Do Something" />
            </View>
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
    imageContainer: {
        flex: 1,
        paddingTop: 28,
    },
    footerContainer: {
        flex: 1 / 3,
        alignItems: "center",
    },
});
