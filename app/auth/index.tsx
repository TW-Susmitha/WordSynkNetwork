import * as React from 'react';
import { Dimensions, StyleSheet, Text, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {useAuth} from "@/auth/AuthProvider"
import {useAuthEntity} from "@/data/AuthRealm";
import AccessToken from "@/models/auth/AccessToken";
import {Redirect} from "expo-router";
import LoginBackground from "@/assets/login.svg";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Button} from "@ui-kitten/components";

export default function Page() {

 const {signIn} = useAuth();
 const token = useAuthEntity(AccessToken, 'AccessToken');
    const insets = useSafeAreaInsets();
 console.log("in auth/index")

 if(token != null){
     console.log("Redirect to /bookings from Auth")
     return <Redirect href="/bookings" />
 }

    const width = Dimensions.get('window').width;

    return (
        <View style={styles.container}>
            <View style={{ aspectRatio: 1 }}>
                <LoginBackground width="100%" height="100%" />
            </View>
            <View style={{marginHorizontal: 20}}>
                <Text style={{textAlign:"center", fontWeight: "bold", fontSize: 18, marginBottom: 20}}>Are you registered with WordSynk?</Text>
                <Button style={{borderRadius: 10, marginBottom:10}}
                        size="large"
                    onPress={() => signIn()}>
                    Login
                </Button>
                <Button style={{borderRadius: 10}}
                        size="large"
                appearance="outline">
                    Register
                </Button>
            </View>

        <StatusBar translucent={true} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flex: 1,
        justifyContent: 'flex-start'
    },
    rectangle: {
        height: 100,
        backgroundColor: '#333',
    }
});


/*
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
*/
