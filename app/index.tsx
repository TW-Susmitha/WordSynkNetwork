import * as React from 'react';
import {Button, StyleSheet} from 'react-native';
import {Redirect, useRootNavigationState} from "expo-router";

export default function Page() {

    const rootNavigationState = useRootNavigationState();

    if (!rootNavigationState?.key) return null;

    return <Redirect href={'/bookings'} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
