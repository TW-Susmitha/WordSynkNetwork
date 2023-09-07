
import * as eva from '@eva-design/eva';
import {router, Slot} from 'expo-router';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import React, {Suspense, useEffect} from "react";
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {Dimensions, StyleSheet, View} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {AuthRealmProvider, useAuthEntity, useAuthRealm} from "@/data/AuthRealm";
import {AuthProvider} from "@/auth/AuthProvider";
import {wordsynk} from "@/theme/wordsynk";

export default function HomeLayout() {

    const insets = useSafeAreaInsets();
    const height = Dimensions.get('window').height;

    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <AuthRealmProvider>
                <AuthProvider>
                    <ApplicationProvider {...eva} theme={wordsynk}>
                        <Suspense>
                            <Slot />
                        </Suspense>
                    </ApplicationProvider>
                </AuthProvider>
            </AuthRealmProvider>
        </>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#ff9'
    },
    status: {
        backgroundColor: '#f76',
        height: 200
    },
});