import Realm from "realm";
import Country from "@/models/core/Country";

export default class Venue extends Realm.Object<Venue> {
    id!: Realm.BSON.UUID;
    created!: Date;
    updated!: Date;
    isDeleted!: boolean;
    displayName!: string;
    addressLine1!: string;
    addressLine2!: string;
    locality!: string;
    town!: string;
    county!: string;
    postcode!: string;
    country!: Country;
    latitude?: number;
    longitude?: number;


    static schema = {
        name: "Venue",
        properties: {
            id: "uuid",
            created: "date",
            updated: "date",
            isDeleted: "bool",
            displayName: "string",
            addressLine1: "string",
            addressLine2: "string",
            locality: "string",
            town: "string",
            county: "string",
            postcode: "string",
            country: "Country",
            latitude: "float?",
            longitude: "float?",
        },
        primaryKey: "id"
    };
}