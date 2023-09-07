import React from 'react';
import { Icon, IconElement, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import {ImageProps} from "react-native-svg";
import {useRouter} from "expo-router";

const BackIcon = (props : Partial<ImageProps> | undefined): IconElement => (
    <Icon
        {...props}
name='arrow-back'
    />
);

const SettingsIcon = (props : Partial<ImageProps> | undefined): IconElement => (
    <Icon
        {...props}
        name='settings-outline'
    />
);

const BackAction = (): React.ReactElement => {
    const router = useRouter();
    if(!router.canGoBack()){
        return (<></>);
    }
    return (
        <TopNavigationAction icon={BackIcon} onPress={()=>router.back()} />
    );
}

const SettingsAction = (): React.ReactElement => {
    const router = useRouter();
    return (
        <TopNavigationAction icon={SettingsIcon} onPress={() => router.push("/settings")} />
    );
}


export const ApplicationHeader = () => {
    return(
        <TopNavigation
            accessoryLeft={BackAction}
            accessoryRight={SettingsAction}
            title='WordSynk Network'
        />
    );
}