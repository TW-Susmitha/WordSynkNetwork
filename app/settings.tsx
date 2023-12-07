import {Button, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import {useAuth} from "@/auth/AuthProvider";
import {BlurView} from "expo-blur";
import {SafeAreaView} from "react-native-safe-area-context";
import {useRouter} from "expo-router";

export default function Settings() {
    const {signOut} = useAuth();
    const router = useRouter();
    return(
        <BlurView intensity={40} style={styles.container}>
            <SafeAreaView>
                <View style={{ flex:1, backgroundColor: 'white'}}>
                    <Text>Hey</Text>
                    <Button
                        title="Back"
                        onPress={() => router.back()}
                    />
                </View>
            </SafeAreaView>
        </BlurView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});