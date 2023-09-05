import {StyleSheet, Text, View} from "react-native";

export default function Invoices() {

    return(
        <View style={styles.container}>
            <Text>Invoices</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});