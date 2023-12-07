import {Drawer, DrawerItem, Icon, Layout} from "@ui-kitten/components";
import React from "react";
import {wordsynk} from "@/theme/wordsynk";
import {StatusBar} from "expo-status-bar";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {BottomTabs} from "@/components/navigation/bottom-tabs";
import {Text, View} from "react-native";
import { Image } from 'expo-image';
import {useAuth} from "@/auth/AuthProvider";
import {useRouter} from "expo-router";


const { Navigator, Screen } = createDrawerNavigator();



const DrawerContent = ({ navigation, state }) => {

   /*const Header = () => (
        <Layout>
            <View>
                <Image source={require('/assets/book/cover.png')}/>
            </View>
        </Layout>
    );*/

    const {signOut} = useAuth();
    const router = useRouter();

    return (
        <Drawer>
            <DrawerItem title="Settings" onPress={() => router.push("/settings")} accessoryLeft={<Icon name="settings-outline" />}  accessoryRight={<Icon name="chevron-right-outline" />} />
            <DrawerItem title="Profile"  accessoryLeft={<Icon name="person-outline" />} accessoryRight={<Icon name="chevron-right-outline" />} />
            <DrawerItem title="About"  accessoryLeft={<Icon name="cube-outline" />} accessoryRight={<Icon name="chevron-right-outline" />} />
            <DrawerItem title="Logout"  onPress={() => signOut()} accessoryLeft={<Icon name="log-out-outline" />} accessoryRight={<Icon name="chevron-right-outline" />} />
        </Drawer>
    )
};

const HomeDrawerNavigator = () => (
    <Navigator screenOptions={{
        headerShown: false,
        drawerPosition: "right"
    }} drawerContent={props => <DrawerContent {...props}/>}>
        <Screen name='Home' component={BottomTabs}/>
    </Navigator>
);

export default () => {
    return (
        <>
            <HomeDrawerNavigator />
            <StatusBar style="light" />
        </>
    );
}