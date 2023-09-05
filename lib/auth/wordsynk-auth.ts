import * as AuthSession from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';
import { atom } from 'jotai'

export type TokenResponse = {
    access_token: string,
    scope: string,
    token_type: string
}

export type OIDCToken = {
    sub: string;
    email: string;
    ws_client: string;
    ws_subs: string;
    ws_perm: string;
    oi_prst: string;
    oi_au_id: string;
    client_id: string;
    oi_tkn_id: string;
    exp: number;
    iss: string;
    iat: number;
}

//export const AccessToken = atom<string|null>(null);

/*export const AccessToken = atom(
    async (get) =>  await SecureStore.getItemAsync("access-token") || undefined,
    async (get, set, token: string) => await SecureStore.setItemAsync("access-token", token)
);*/


export const GetTokensAsync = async (request: AuthSession.AuthRequest, response: AuthSession.AuthSessionResult, discovery: AuthSession.DiscoveryDocument) => {
    if (request && response?.type === 'success' && discovery) {
        const params : Record<string, string> = {};
        params["state"] = request.state;
        if(request.codeVerifier) params["code_verifier"] = request.codeVerifier;
        if(!discovery?.tokenEndpoint){
            console.log("error");
            return;
        }
        const result = await fetch(
            discovery.tokenEndpoint,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `client_secret=${"119425d8-e9e9-4ecd-9496-fe11461d84af"}&grant_type=authorization_code&code=${response.params?.code}&redirect_uri=${request.redirectUri}&client_id=${encodeURIComponent("wordsynk-network-gateway")}&code_verifier=${request?.codeVerifier}`
            });

        const tokens : TokenResponse = await result.json();
        return tokens;
    }
}