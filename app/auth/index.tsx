import * as React from 'react';
import {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {useAuth} from "@/auth/AuthProvider"
import {useAuthEntity} from "@/data/AuthRealm";
import AccessToken from "@/models/auth/AccessToken";
import {Redirect} from "expo-router";
import LoginBackground from "@/assets/login.svg";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Button, Spinner} from "@ui-kitten/components";

export default function Page() {

    const {signIn} = useAuth();
    const token = useAuthEntity(AccessToken, 'AccessToken');
    const [signInActive, setSignInActive] = useState(false);

    const insets = useSafeAreaInsets();
    const width = Dimensions.get('window').width;

    useEffect(() => {
        setSignInActive(false);
    }, []);

    const initiateSignIn = async () => {
        setSignInActive(true);
        const success = await signIn();
        if (!success) {
            setSignInActive(false);
        }
    }

    if (token != null) {
        return <Redirect href="/home"/>
    }

    return (
        <View style={styles.container}>
            <View style={{aspectRatio: 1}}>
                <LoginBackground width="100%" height="100%"/>
            </View>
            <View style={{marginHorizontal: 20}}>
                {!signInActive &&
                    <>
                        <Text style={{textAlign: "center", fontWeight: "bold", fontSize: 18, marginBottom: 20}}>
                            Are you registered with WordSynk?
                        </Text>
                        <Button style={{borderRadius: 10, marginBottom: 10}}
                                size="large"
                                onPress={() => initiateSignIn()}>
                            Login
                        </Button>
                        <Button style={{borderRadius: 10}}
                                     size="large"
                                     appearance="outline">
                        Register
                        </Button>
                    </>
                }
                {signInActive &&
                    <>
                        <Text style={{textAlign: "center", fontWeight: "bold", fontSize: 18, marginBottom: 20}}>Signing in</Text>
                    <View style={styles.spinner}>
                        <Spinner size="giant" />
                    </View>
                    </>
                }

            </View>

            <StatusBar translucent={true}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flex: 1,
        justifyContent: 'flex-start'
    },
    spinner : {
        backgroundColor: '#FFF',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

