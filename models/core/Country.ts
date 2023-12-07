import Realm from "realm";

export default class Country extends Realm.Object<Country> {
    id!: Realm.BSON.UUID;
    created!: Date;
    updated!: Date;
    isDeleted!: boolean;
    displayName!: string;

    static schema = {
        name: "Country",
        properties: {
            id: "uuid",
            created: "date",
            updated: "date",
            isDeleted: "bool",
            displayName: "string"
        },
        primaryKey: "id"
    };
}