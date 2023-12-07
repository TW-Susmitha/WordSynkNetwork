import {createRealmContext} from "@realm/react";
import BusinessUnit from "@/models/client/BusinessUnit";
import ClientContact from "@/models/client/ClientContact";
import Currency from "@/models/core/Currency";
import Country from "@/models/core/Country";
import Gender from "@/models/core/Gender";
import Identity from "@/models/identity/Identity";
import Language from "@/models/core/Language";
import Register from "@/models/booking/Register";
import Supplier from "@/models/supplier/Supplier";
import Venue from "@/models/core/Venue";
import Criteria from "@/models/booking/Criteria";
import CriteriaGroupCriteria from "@/models/booking/CriteriaGroupCriteria";
import Booking from "@/models/booking/Booking";


const AppRealmContext = createRealmContext({
    schema: [
        Booking,
        BusinessUnit,
        ClientContact,
        Country,
        Criteria,
        CriteriaGroupCriteria,
        Currency,
        Gender,
        Identity,
        Language,
        Register,
        Supplier,
        Venue
    ],
});

export const {
    RealmProvider: AppRealmProvider,
    useRealm: useAppRealm,
    useQuery: useAppQuery,
    useObject: useAppEntity
} = AppRealmContext;

