import React from 'react';
import { Icon, IconElement, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import {ImageProps} from "react-native-svg";
import {Text} from "react-native";
import {useNavigation, usePathname, useRouter} from "expo-router";
import {wordsynk} from "@/theme/wordsynk";
import {DrawerActions} from "@react-navigation/native"

const MenuIcon = (props : Partial<ImageProps> | undefined): IconElement => (
    <Icon {...props} name='menu-outline' fill="#fff" size={32}  />
);


const DrawerAction = (): React.ReactElement => {
    const navigation = useNavigation();
    const router = useRouter();
    return (
        <TopNavigationAction icon={MenuIcon} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
    );
}


export const ApplicationHeader = () => {
const route = usePathname();
console.log(route)
    return(
        <TopNavigation
            style={{
                backgroundColor: wordsynk["color-primary-500"]
            }}
            title={() =>{
                return <Text style={{color: "#fff", fontSize: 20}}>Bookings</Text>
            }}
            alignment="center"
            accessoryRight={DrawerAction}
        />
    );
}