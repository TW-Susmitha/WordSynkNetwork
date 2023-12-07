import Realm from "realm";

export default class Criteria extends Realm.Object<Criteria> {
    id!: Realm.BSON.UUID;
    created!: Date;
    updated!: Date;
    isDeleted!: boolean;
    name!: string;

    static schema = {
        name: "Criteria",
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