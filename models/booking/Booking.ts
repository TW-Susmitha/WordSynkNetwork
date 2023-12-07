import Realm from "realm";
import Identity from "@/models/identity/Identity";
import BusinessUnit from "@/models/client/BusinessUnit";
import ClientContact from "@/models/client/ClientContact";

export default class Booking extends Realm.Object<Booking> {
    id!: Realm.BSON.UUID;
    created!: Date;
    updated!: Date;
    isDeleted!: boolean;
    createdBy!: Identity;
    businessUnit!: BusinessUnit;
    requestedBy!: ClientContact;
    status!: string;
    purchaseOrderNumber!: string;
    bookingReference!: string;
    externalReference!: string;
    cancelledAt?: Date;

    static schema = {
        name: "Booking",
        properties: {
            id: "uuid",
            created: "date",
            updated: "date",
            isDeleted: "bool",
            createdBy: "Identity",
            businessUnit: "BusinessUnit",
            requestedBy: "ClientContact",
            status: "string",
            purchaseOrderNumber: "string",
            bookingReference: "string",
            externalReference: "string",
            cancelledAt: "Date?",
        },
        primaryKey: "id"
    };
}