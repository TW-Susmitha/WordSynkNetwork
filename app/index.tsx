import * as React from 'react';
import {useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import {StatusBar} from 'expo-status-bar';
import {GetTokensAsync, OIDCToken} from "@/lib/auth/wordsynk-auth";
import {router} from "expo-router";
import {useAuthEntity, useAuthRealm} from "@/data/AuthRealm";
import AccessToken from "@/models/auth/AccessToken";
import {isBefore} from "date-fns";
import {utcToZonedTime} from "date-fns-tz";
import jwt_decode from "jwt-decode";

WebBrowser.maybeCompleteAuthSession();
const redirectUri = AuthSession.makeRedirectUri({
    scheme: "wordsynknetwork",
    path: "auth"
});

console.log(`Redirect URI: ${redirectUri}`)

export default function Page() {

    const authRealm = useAuthRealm();
    const discovery = AuthSession.useAutoDiscovery("https://secure-qa.wordsynk.com");

    // Create and load an auth request
    const [request, result, promptAsync] = AuthSession.useAuthRequest(
        {
            clientId: 'wordsynk-network-gateway',
            clientSecret: '119425d8-e9e9-4ecd-9496-fe11461d84af',
            redirectUri,
            usePKCE: true,
            scopes: ['openid', 'profile', 'api-gateway', 'offline_access'],
        },
        discovery
    );

    const token = useAuthEntity(AccessToken, 'AccessToken');
    if (token != null && isBefore(token.expiry, utcToZonedTime(new Date(), 'UTC'))) {
        authRealm.delete(token);
    }

    useEffect(() => {
        if (token != null) {

            router.push("/main/bookings");
        }
    }, [token]);

    return (
        <View style={styles.container}>
            <Text>Hello</Text>
            <Button
                disabled={!request}
                title="Login"
                onPress={() => {
                    promptAsync().then(async (response) => {
                        if (request && response?.type === 'success' && discovery) {
                            const tokenResponse = await GetTokensAsync(request, response, discovery);
                            if (tokenResponse != undefined) {
                                const oidcToken: OIDCToken = jwt_decode(tokenResponse.access_token);
                                authRealm.write(() => {
                                   authRealm.create<AccessToken>("AccessToken", {
                                       _id: "AccessToken",
                                       expiry: new Date(oidcToken.exp * 1000),
                                       token: tokenResponse.access_token
                                   })
                                });
                            }
                        }
                    });
                }}
            />
            <StatusBar style="auto"/>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
