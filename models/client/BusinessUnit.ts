import Realm from "realm";

export default class BusinessUnit extends Realm.Object<BusinessUnit> {
    id!: Realm.BSON.UUID;
    created!: Date;
    updated!: Date;
    isDeleted!: boolean;
    name!: string;
    parent?: BusinessUnit

    static schema = {
        name: "BusinessUnit",
        properties: {
            id: "uuid",
            created: "date",
            updated: "date",
            isDeleted: "bool",
            name: "string",
            parent: "BusinessUnit?"
        },
        primaryKey: "id"
    };
}