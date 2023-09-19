import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {BookingHome} from "@/views/booking/booking-home";
import {OffersHome} from "@/views/offers/offers-home";
import {InvoicesHome} from "@/views/invoices/invoices-home";
import {InsightsHome} from "@/views/insights/insights-home";
import {Drawer, DrawerItem, Icon} from "@ui-kitten/components";
import React from "react";
import {wordsynk} from "@/theme/wordsynk";
import {StatusBar} from "expo-status-bar";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {BookingCalendar} from "@/views/booking/booking-calendar";
import {TouchableOpacity, View, StyleSheet} from "react-native";

const Tab = createMaterialTopTabNavigator();
const TabIcon = (icon: string, active: boolean) => {
    return <Icon name={icon} size={32} fill={active ? wordsynk["color-primary-500"] : wordsynk["color-gray-500"]} />
};
export const BottomTabs = () => {
    return (
        <Tab.Navigator tabBarPosition="bottom" initialRouteName="Bookings" screenOptions={{
            tabBarStyle : {
                paddingBottom: 5
            },
            tabBarIndicatorStyle: {
                top: 0,
                backgroundColor: wordsynk["color-primary-500"]
            },
            tabBarInactiveTintColor: wordsynk["color-gray-500"],
            tabBarActiveTintColor: wordsynk["color-primary-500"],
            tabBarLabelStyle: {
                textTransform: "capitalize",
                textAlign: "center"
            }
        }}>
            <Tab.Screen name="Bookings" component={BookingHome} options={{
                tabBarIcon: (item) => TabIcon("calendar-outline", item.focused)
            }} />
            <Tab.Screen name="Offers" component={OffersHome} options={{
                tabBarIcon: (item) => TabIcon("inbox-outline", item.focused)
            }} />
            <Tab.Screen name="Invoices" component={InvoicesHome} options={{
                tabBarIcon: (item) => TabIcon("file-text-outline", item.focused)
            }} />
            <Tab.Screen name="Insights" component={InsightsHome} options={{
                tabBarIcon: (item) => TabIcon("bulb-outline", item.focused)
            }} />
        </Tab.Navigator>
    );
}


const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: 'row',
        backgroundColor: '#F5F5F5',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 16,
    },
    tabText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});