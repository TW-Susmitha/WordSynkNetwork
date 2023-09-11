import React, {useState} from 'react';
import { TopNavigation,  Drawer, DrawerItem, IndexPath } from '@ui-kitten/components';

import {ImageProps} from "react-native-svg";
import {Text} from "react-native";
import {useRouter} from "expo-router";
import {wordsynk} from "@/theme/wordsynk";

import { createDrawerNavigator } from '@react-navigation/drawer';
export const ApplicationMenu = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

    return (
        <Drawer
            selectedIndex={selectedIndex}
            inverted={true}

            onSelect={index => setSelectedIndex(index)}
        >
            <DrawerItem title='Users' />
            <DrawerItem title='Orders' />
            <DrawerItem title='Transactions' />
            <DrawerItem title='Settings' />
        </Drawer>
    );
}