import {Button, StyleSheet, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {ApplicationHeader} from "@/components/navigation/application-header";
export const BookingHome = () => {
    return (
        <View style={styles.container}>
            <Text>Bookings</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});