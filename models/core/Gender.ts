import Realm from "realm";

export default class Gender extends Realm.Object<Gender> {
    id!: Realm.BSON.UUID;
    created!: Date;
    updated!: Date;
    isDeleted!: boolean;
    displayName!: string;

    static schema = {
        name: "Gender",
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