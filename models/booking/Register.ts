import Realm from "realm";

export default class Register extends Realm.Object<Register> {
    id!: Realm.BSON.UUID;
    created!: Date;
    updated!: Date;
    isDeleted!: boolean;
    displayName!: string;

    static schema = {
        name: "Register",
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