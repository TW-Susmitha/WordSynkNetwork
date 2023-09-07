import {Button, StyleSheet, Text, View} from "react-native";
import * as React from "react";

export default function Bookings() {

    return(
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