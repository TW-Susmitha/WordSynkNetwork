import {Drawer, DrawerItem, Icon, Layout, IconElement, List, ListItem, Divider } from "@ui-kitten/components";
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

interface IListItem {
    title: string;
    icon: string;
    description: string;
    action: Function;
}

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

    const renderItemIcon = (name: string): IconElement => (
        <Icon name={name} />
    );

    const renderItem = ({item, index} : {item: IListItem, index: number}) => (
        <ListItem
            title={`${item.title}`}
            description={`${item.description}`}
            accessoryLeft={renderItemIcon(item.icon)}
            onPress={() =>item.action()}
            //accessoryRight={renderItemAccessory}
        />
    )

    const data : Array<IListItem>  = [
        {
            title: "Settings",
            icon: 'settings-outline',
            description:  "Manage application settings",
            action: ()  => router.push('/settings')
        },
        {
            title: "Profile",
            icon: 'person-outline',
            description:  "View and edit your profile",
            action: ()  => router.push('/profile')
        },
        {
            title: "About",
            icon: 'cube-outline',
            description:  "WordSynk Network information",
            action: ()  => router.push('/about')
        },
        {
            title: "Sign Out",
            icon: 'log-out-outline',
            description:  "Sign out of WordSynk Network",
            action: ()  => signOut()
        }
    ]

    return (
        <List renderItem={renderItem} data={data} ItemSeparatorComponent={Divider}>

        </List>
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