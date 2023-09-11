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

const Tab = createMaterialTopTabNavigator();
const { Navigator, Screen } = createDrawerNavigator();


const TabIcon = (icon: string, active: boolean) => {
    return <Icon name={icon} size={32} fill={active ? wordsynk["color-primary-500"] : wordsynk["color-gray-500"]} />
};

const DrawerContent = ({ navigation, state }) => {
    const styles = useStyleSheet(themedStyles);

   /* const Header = () => (
        <Layout style={styles.header}>
            <View style={styles.profileContainer}>
                <Avatar
                    size="giant"
                    source={require("../assets/icon.png")}
                />
                <Text style={styles.profileName} category="h6">
                    Rocktech
                </Text>
            </View>
        </Layout>
    );*/

    return (
        <Drawer
            inverted={true}
        >
            <DrawerItem title='Users' />
            <DrawerItem title='Orders' />
            <DrawerItem title='Transactions' />
            <DrawerItem title='Settings' />
        </Drawer>
    )
};

const HomeDrawerNavigator = () => (
    <Navigator drawerContent={props => <DrawerContent {...props}/>}>
        <Screen name='Home' component={this}/>
        <Screen name='About' component={AboutScreen}/>
        <Screen name='Login' component={LoginScreen}/>
        <Screen name='Register' component={RegisterScreen}/>
    </Navigator>
);

export default () => {
    return (
        <>
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
            <StatusBar style="light" />
        </>
    );
}