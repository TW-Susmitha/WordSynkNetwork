
import {Slot} from 'expo-router';
import React, {Suspense} from "react";
import {StyleSheet, View} from "react-native";
import {ApplicationHeader} from "@/components/navigation/application-header";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {wordsynk} from "@/theme/wordsynk";
import 'react-native-gesture-handler';
import {ApplicationMenu} from "@/components/navigation/application-menu";

export default function HomeLayout() {
    const insets = useSafeAreaInsets();
    return (
        <View style={{
            paddingTop: insets.top,
            flex:1,
            backgroundColor: wordsynk["color-primary-500"]
        }}>
            <ApplicationHeader />
            <Suspense>
                <Slot />
            </Suspense>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff'
    }
});