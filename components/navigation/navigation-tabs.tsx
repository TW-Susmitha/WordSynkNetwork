import {router} from 'expo-router';
import {BottomNavigation, BottomNavigationTab, Icon, IconElement} from '@ui-kitten/components';
import React, {useEffect} from "react";
import {useAtom} from "jotai";
import {useAuthEntity} from "@/data/AuthRealm";
import AccessToken from "@/models/auth/AccessToken";
import {isBefore} from "date-fns";
import {utcToZonedTime} from "date-fns-tz";

export const NavigationTabs = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    let isRendered = false;

    /*useEffect(()=>{
        router.push(navigationItems[selectedIndex].link);
    },[selectedIndex])
*/
    const navigationItems = [
        {
            link: "/main/bookings",
            title: "Bookings",
            icon: "calendar-outline"
        },
        {
            link: "/main/offers",
            title: "Offers",
            icon: "inbox-outline"
        },
        {
            link: "/main/invoices",
            title: "Invoices",
            icon: "file-text-outline"
        },
        {
            link: "/main/settings",
            title: "Settings",
            icon: "settings-outline"
        },
    ]

    const token = useAuthEntity(AccessToken, 'AccessToken');
    if (token == null) {
        return(<></>);
    }

    return (
        <BottomNavigation
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}
        >
            {navigationItems.map(item => {
                return (<BottomNavigationTab key={item.title} title={item.title} icon={
                    <Icon
                        name={item.icon}
                    />
                } />);
            })}
        </BottomNavigation>
    );
}