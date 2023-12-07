import {Dimensions, View, StyleSheet} from "react-native";
import {wordsynk} from "@/theme/wordsynk";
import { Calendar, Layout, RangeCalendar, Text } from '@ui-kitten/components';
import React from "react";

export const BookingCalendar = () => {
    const width= Dimensions.get("screen").width;
    const [date, setDate] = React.useState(new Date());
    const [range, setRange] = React.useState({});
    return (
    <Layout
        style={styles.container}
        level='1'
    >

        <View style={styles.calendarContainer}>
            <Calendar
                date={date}
                onSelect={nextDate => setDate(nextDate)}
            />
        </View>
    </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: wordsynk["color-primary-10"]
    },
    calendarContainer: {
        margin: 2,
    },
    text: {
        marginVertical: 8,
    },
});
