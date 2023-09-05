
import {Slot} from 'expo-router';
import React, {Suspense} from "react";
import {NavigationTabs} from "../../components/navigation/navigation-tabs";
import {ApplicationHeader} from "../../components/navigation/application-header";
import {StyleSheet, View} from "react-native";

export default function HomeLayout() {

    return (
        <>
            <View style={styles.foo}>
                <ApplicationHeader />
                <Suspense>
                    <Slot />
                </Suspense>
                <NavigationTabs />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    foo: {
        flex: 1,
        backgroundColor: '#fff'
    },
});