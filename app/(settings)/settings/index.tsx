import {Button, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import {useAuth} from "@/auth/AuthProvider";

export default function Settings() {
    const {signOut} = useAuth();
    return(
        <View style={styles.container}>
            <Text>Settings</Text>
            <Button
                title="Logout"
                onPress={() => signOut()}
            />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});