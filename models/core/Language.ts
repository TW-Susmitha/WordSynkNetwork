import Realm from "realm";

export default class Language extends Realm.Object<Language> {
    id!: Realm.BSON.UUID;
    created!: Date;
    updated!: Date;
    isDeleted!: boolean;
    name!: string;

    static schema = {
        name: "Language",
        properties: {
            id: "uuid",
            created: "date",
            updated: "date",
            isDeleted: "bool",
            name: "string"
        },
        primaryKey: "id"
    };
}