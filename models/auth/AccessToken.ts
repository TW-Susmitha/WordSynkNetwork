import Realm from "realm";

export default class AccessToken extends Realm.Object<AccessToken> {
    _id: string = "AccessToken";
    expiry!: Date;
    token!: string;
    static schema = {
        name: "AccessToken",
        properties: {
            _id: "string",
            expiry: "date",
            token: "string"
        },
        primaryKey: "_id"
    };
}