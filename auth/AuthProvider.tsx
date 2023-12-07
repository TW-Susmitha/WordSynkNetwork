import {router, useRootNavigation, useSegments} from 'expo-router';
import React, {useState} from 'react';
import {useAuthEntity, useAuthQuery, useAuthRealm} from "@/data/AuthRealm";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import AccessToken from "@/models/auth/AccessToken";
import {isBefore} from "date-fns";
import {utcToZonedTime} from "date-fns-tz";
import {GetTokensAsync, OIDCToken} from "@/lib/auth/wordsynk-auth";
import jwt_decode from "jwt-decode";

WebBrowser.maybeCompleteAuthSession();
const redirectUri = AuthSession.makeRedirectUri({
    scheme: "wordsynknetwork",
    path: "auth"
});

export interface IAuthContext {
    signIn: () => Promise<boolean>;
    signOut: () => Promise<void>;
}

type providerProps = {
    children: React.ReactNode
}

const AuthContext = React.createContext<IAuthContext>({
    signIn: async () : Promise<boolean> => { return false; },
    signOut: async () => {},
});

// This hook can be used to access the signIn and signOut methods.
export function useAuth() {
    return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(token: AccessToken | null) {
    const segments = useSegments();
    const [isNavigationReady, setNavigationReady] = useState(false);
    const rootNavigation = useRootNavigation();

    // Listen for the Navigation Service becoming available.
    React.useEffect(() => {
        const unsubscribe = rootNavigation?.addListener("state", (event) => {
            setNavigationReady(true);
        });
        return function cleanup() {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [rootNavigation]);

    React.useEffect(() => {
        if (!isNavigationReady) {
            return;
        }
        const inMain = segments[0] === "(main)";

        if (!token && inMain) {
            // Redirect to the sign-in page.
            router.replace("/auth");
            return;
        }
    }, [token, segments, isNavigationReady]);
}

export function AuthProvider(props: providerProps) {
    const authRealm = useAuthRealm();

    // Set up a filtered query on the Access Token. This creates a listener on the 'collection' of Access Tokens
    // even though there will only ever be one Access Token in the database. If we were to use useObject (useAuthEntity) here
    // then the listener would be discarded when the record is deleted (on sign out) resulting in an infinite redirect loop.
    const token = useAuthQuery<AccessToken>('AccessToken').filtered("_id == 'AccessToken'")[0];
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

    //ToDo: display a message to the user if the auth process fails.
    const signIn = async () : Promise<boolean> => {
        const response = await promptAsync();
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
                return true;
            }
        }
        return false;
    };

    const signOut = async () => {
        deleteToken();
    };

    const deleteToken = () => {
        authRealm.write(() =>{
            authRealm.delete(token);
        });
    }

    if (token && isBefore(token.expiry, utcToZonedTime(new Date(), 'UTC'))) {
        deleteToken();
    }

    useProtectedRoute(token);

    return (
        <AuthContext.Provider
            value={{
                signIn: () => signIn(),
                signOut: () => signOut()
            }}>
            {props.children}
        </AuthContext.Provider>
    );
}

