import React from 'react';
import { Icon, IconElement, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import {ImageProps} from "react-native-svg";

const BackIcon = (props : Partial<ImageProps> | undefined): IconElement => (
    <Icon
        {...props}
name='arrow-back'
    />
);

const BackAction = (): React.ReactElement => (
    <TopNavigationAction icon={BackIcon} />
);

export const ApplicationHeader = () => {
    return(
        <TopNavigation
            accessoryLeft={BackAction}
            title='WordSynk Network'
        />
    );
}