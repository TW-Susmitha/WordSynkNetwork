import {StyleSheet, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {ApplicationHeader} from "@/components/navigation/application-header";

export const OffersHome = () => {

    return(
        <View style={styles.container}>
            <Text>Offers</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});