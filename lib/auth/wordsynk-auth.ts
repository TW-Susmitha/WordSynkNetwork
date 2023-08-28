import * as AuthSession from 'expo-auth-session';

export type TokenResponse = {
    access_token: string,
    scope: string,
    token_type: string
}

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
        console.log(tokens)
        return tokens;
    }
}