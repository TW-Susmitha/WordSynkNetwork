
import {Slot} from 'expo-router';
import React, {Suspense} from "react";
import {NavigationTabs} from "../../components/navigation/navigation-tabs";
import {ApplicationHeader} from "../../components/navigation/application-header";
import {StyleSheet} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

export default function HomeLayout() {

    return (
        <>
            <SafeAreaView style={styles.main}>
                <ApplicationHeader />
                <Suspense>
                    <Slot />
                </Suspense>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff'
    },
});