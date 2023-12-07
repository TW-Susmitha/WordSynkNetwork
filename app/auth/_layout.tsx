import * as eva from '@eva-design/eva';
import {Slot} from 'expo-router';
import React, {Suspense} from "react";
import {Dimensions, StyleSheet, View} from "react-native";
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function HomeLayout() {

    const insets = useSafeAreaInsets();
    const height = Dimensions.get('window').height;

    return (
        <>
            <View style={{
                height,
                backgroundColor: '#dbf3fc'
            }}>
                <View style={{height: insets.top}}></View>
                <View style={styles.main}>
                    <Suspense>
                        <Slot/>
                    </Suspense>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff'
    }
});