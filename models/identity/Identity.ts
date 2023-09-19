import Realm from "realm";

export default class Identity extends Realm.Object<Identity> {
    id!: Realm.BSON.UUID;
    created!: Date;
    updated!: Date;
    isDeleted!: boolean;
    externalId!: string;
    firstName!: string;
    lastName!: string;

    static schema = {
        name: "Identity",
        properties: {
            id: "uuid",
            created: "date",
            updated: "date",
            isDeleted: "bool",
            externalId: "string",
            firstName: "string",
            lastName: "string",
        },
        primaryKey: "id"
    };
}