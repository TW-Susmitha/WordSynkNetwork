import {createRealmContext} from "@realm/react";
import AccessToken from "@/models/auth/AccessToken";

const AuthRealmContext = createRealmContext({
    schema: [AccessToken],
});

export const {
    RealmProvider: AuthRealmProvider,
    useRealm: useAuthRealm,
    useQuery: useAuthQuery,
    useObject: useAuthEntity
} = AuthRealmContext;

