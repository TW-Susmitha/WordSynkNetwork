import Realm from "realm";

export default class Currency extends Realm.Object<Currency> {
    id!: Realm.BSON.UUID;
    displayName!: string;
    currencyCode!: string;
    symbol!: string;

    static schema = {
        name: "Currency",
        properties: {
            id: "uuid",
            displayName: "string",
            currencyCode: "string",
            symbol: "string",
        },
        primaryKey: "id"
    };
}