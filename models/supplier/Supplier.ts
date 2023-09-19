import Realm from "realm";
import Identity from "@/models/identity/Identity";
import Gender from "@/models/core/Gender";
import Currency from "@/models/core/Currency";

export default class Supplier extends Realm.Object<Supplier> {
    id!: Realm.BSON.UUID;
    created!: Date;
    updated!: Date;
    isDeleted!: boolean;
    identity!: Identity;
    reference!: string;
    isPartner!: boolean;
    isAuthorised!: boolean;
    gender!: Gender;
    currency!: Currency
    profilePictureId?: Realm.BSON.UUID;
    supplierStatus?: number;


    static schema = {
        name: "Supplier",
        properties: {
            id: "uuid",
            created: "date",
            updated: "date",
            isDeleted: "bool",
            identity: "Identity",
            isPartner: "bool",
            isAuthorised: "bool",
            gender: "Gender",
            currency: "Currency",
            profilePictureId: "uuid?",
            supplierStatus: "int?"
        },
        primaryKey: "id"
    };
}