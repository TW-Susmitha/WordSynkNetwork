import * as React from 'react';
import {Button, SafeAreaView} from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {GetTokensAsync} from "./lib/auth/wordsynk-auth";


WebBrowser.maybeCompleteAuthSession();
const redirectUri = AuthSession.makeRedirectUri({
  scheme: "wordsynknetwork",
  path: "auth"
});

export default function App() {
  const [token, setToken] = React.useState<string | undefined>(undefined);
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

  return (
    <View style={styles.container}>
      <Text>{redirectUri}</Text>
      <SafeAreaView>
        <Button
            disabled={!request}
            title="Login"
            onPress={() => {
              promptAsync().then(async (response) => {
                  if (request && response?.type === 'success' && discovery) {
                      const tokens = await GetTokensAsync(request, response, discovery);
                      setToken(tokens?.access_token)
                  }
              });
            }}
        />
        <Text>Token: {token}</Text>
      </SafeAreaView>
      <StatusBar style="auto" />
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
