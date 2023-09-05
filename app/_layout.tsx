
import * as eva from '@eva-design/eva';
import {router, Slot} from 'expo-router';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import React, {Suspense, useEffect} from "react";
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {StyleSheet} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import {AuthRealmProvider, useAuthEntity, useAuthRealm} from "@/data/AuthRealm";
import AccessToken from "@/models/auth/AccessToken";
import {isBefore} from "date-fns";
import {utcToZonedTime} from "date-fns-tz";

export default function HomeLayout() {

    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <AuthRealmProvider>
                <ApplicationProvider {...eva} theme={eva.light}>
                    <SafeAreaView style={styles.foo}>
                        <Suspense>
                            <Slot />
                        </Suspense>
                    </SafeAreaView>
                </ApplicationProvider>
            </AuthRealmProvider>
        </>
    );
}

const styles = StyleSheet.create({
    foo: {
        flex: 1,
        backgroundColor: '#fff'
    },
});