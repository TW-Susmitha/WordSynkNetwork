import {router} from 'expo-router';
import {BottomNavigation, BottomNavigationTab, Icon, IconElement} from '@ui-kitten/components';
import React, {useEffect} from "react";
import {useAuthEntity} from "@/data/AuthRealm";
import AccessToken from "@/models/auth/AccessToken";

export const NavigationTabs = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    let isRendered = false;

    useEffect(()=>{
        router.push(navigationItems[selectedIndex].link);
    },[selectedIndex])

    const navigationItems = [
        {
            link: "/bookings",
            title: "Bookings",
            icon: "calendar-outline"
        },
        {
            link: "/offers",
            title: "Offers",
            icon: "inbox-outline"
        },
        {
            link: "/invoices",
            title: "Invoices",
            icon: "file-text-outline"
        },
        {
            link: "/insights",
            title: "Insights",
            icon: "bulb-outline"
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