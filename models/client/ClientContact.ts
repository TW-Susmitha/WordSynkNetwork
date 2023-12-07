import Realm from "realm";
import Identity from "@/models/identity/Identity";

export default class ClientContact extends Realm.Object<ClientContact> {
    id!: Realm.BSON.UUID;
    created!: Date;
    updated!: Date;
    isDeleted!: boolean;
    identity!: Identity;
    phoneNumber!: string;
    emailAddress!: string;

    static schema = {
        name: "ClientContact",
        properties: {
            id: "uuid",
            created: "date",
            updated: "date",
            isDeleted: "bool",
            identity: "Identity",
            phoneNumber: "string",
            emailAddress: "string"
        },
        primaryKey: "id"
    };
}