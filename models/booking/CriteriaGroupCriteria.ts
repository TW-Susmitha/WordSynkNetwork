import Realm from "realm";
import Criteria from "@/models/booking/Criteria";

export default class CriteriaGroupCriteria extends Realm.Object<CriteriaGroupCriteria> {
    id!: Realm.BSON.UUID;
    created!: Date;
    updated!: Date;
    isDeleted!: boolean;
    criteria?: Criteria;
    order!: number;
    minimumPercentageTimeToSource!: number;
    minimumRemainingTime!: number;

    static schema = {
        name: "CriteriaGroupCriteria",
        properties: {
            id: "uuid",
            created: "date",
            updated: "date",
            isDeleted: "bool",
            order: "int",
            minimumPercentageTimeToSource: "int",
            minimumRemainingTime: "int",
        },
        primaryKey: "id"
    };
}