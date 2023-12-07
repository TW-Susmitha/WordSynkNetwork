import {Animated, Button, Dimensions, FlatList, StyleSheet, Text, View} from "react-native";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import {ApplicationHeader} from "@/components/navigation/application-header";
import ScrollView = Animated.ScrollView;
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {wordsynk} from "@/theme/wordsynk";
import {format} from "date-fns";
import {RectButton} from "react-native-gesture-handler";
import {BookingCalendar} from "@/views/booking/booking-calendar";

type Booking = {
    reference: string,
    startDate: Date,
    endDate: Date,
    name: string,
    fromLanguage: string,
    toLanguage: string,
}

type DayView = {
    date: Date,
    bookings: Array<Booking>
}

const bookings : Array<Booking> = [{
    reference: "NPB10001",
    startDate: new Date('2023-09-12T09:00:00Z'),
    endDate: new Date('2023-09-12T10:00:00Z'),
    name: "Appointment One",
    fromLanguage: "English",
    toLanguage: "Dutch"
},
    {
        reference: "NPB10002",
        startDate: new Date(Date.parse('2023-09-12 12:00:00')),
        endDate: new Date(Date.parse('2023-09-12 13:00:00')),
        name: "Appointment Two",
        fromLanguage: "English",
        toLanguage: "Dutch"
    },
    {
        reference: "NPB10003",
        startDate: new Date(Date.parse('2023-09-12 15:00:00')),
        endDate: new Date(Date.parse('2023-09-12 17:00:00')),
        name: "Appointment Three",
        fromLanguage: "English",
        toLanguage: "Dutch"
    },

    {
        reference: "NPB10004",
        startDate: new Date(Date.parse('2023-09-14 09:00:00')),
        endDate: new Date(Date.parse('2023-09-14 10:00:00')),
        name: "Appointment One",
        fromLanguage: "English",
        toLanguage: "Dutch"
    },
    {
        reference: "NPB10005",
        startDate: new Date(Date.parse('2023-09-14 13:30:00')),
        endDate: new Date(Date.parse('2023-09-14 16:15:00')),
        name: "Appointment Two",
        fromLanguage: "English",
        toLanguage: "Dutch"
    },
    {
        reference: "NPB10006",
        startDate: new Date(Date.parse('2023-09-14 18:00:00')),
        endDate: new Date(Date.parse('2023-09-14 19:00:00')),
        name: "Appointment Three",
        fromLanguage: "English",
        toLanguage: "Dutch"
    },

    {
        reference: "NPB10007",
        startDate: new Date(Date.parse('2023-09-16 07:00:00')),
        endDate: new Date(Date.parse('2023-09-16 08:00:00')),
        name: "Appointment One",
        fromLanguage: "English",
        toLanguage: "Dutch"
    },
    {
        reference: "NPB10008",
        startDate: new Date(Date.parse('2023-09-16 11:00:00')),
        endDate: new Date(Date.parse('2023-09-16 14:00:00')),
        name: "Appointment Two",
        fromLanguage: "English",
        toLanguage: "Dutch"
    },
    {
        reference: "NPB10009",
        startDate: new Date(Date.parse('2023-09-21 07:00:00')),
        endDate: new Date(Date.parse('2023-09-21 08:00:00')),
        name: "Appointment Three",
        fromLanguage: "English",
        toLanguage: "Dutch"
    },
    {
        reference: "NPB10010",
        startDate: new Date(Date.parse('2023-09-15 07:00:00')),
        endDate: new Date(Date.parse('2023-09-15 13:00:00')),
        name: "Appointment Four",
        fromLanguage: "English",
        toLanguage: "Dutch"
    }

    ];

export const BookingHome = () => {

    const width= Dimensions.get("screen").width;

    const minDate = bookings.reduce((min, p) => p.startDate < min ? p.startDate : min, bookings[0].startDate);
    const maxDate = bookings.reduce((max, p) => p.startDate > max ? p.startDate : max, bookings[0].startDate);

    const groupBookingsByStartDate = (bookings: Booking[]): { [startDate: string]: Booking[] } => {
        return bookings.reduce((accumulator : Record<string, Array<Booking>>, booking) => {

            const  startDate = format(new Date(booking.startDate), "yyyy-MM-dd");

            if (!accumulator[startDate]) {
                accumulator[startDate] = [];
            }

            accumulator[startDate].push(booking);

            return accumulator;
        }, {});
    };

    const calendarDates = (startDate: Date, endDate: Date): Array<string> => {
        const dates : Array<string> = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            dates.push(format(currentDate, "yyyy-MM-dd"));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    }

    function addDays(date : Date, days: number) {
        date.setDate(date.getDate() + days);
        return date;
    }

    //console.log(calendarDates(addDays(minDate, -30), addDays(maxDate, 30)))

    console.log(minDate)
    console.log(maxDate)

    const grouped = groupBookingsByStartDate(bookings);

    const data = calendarDates(addDays(minDate, -30), addDays(maxDate, 30)).map((item) => {
        const day: DayView = {
          date: new Date(Date.parse(item)),
          bookings: grouped[item] ?? []
        };

        return day;
    })

    const renderLeftActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, width-50, (width-50)+1],
            outputRange: [-20, 0, 0, 1],
        });
        return (

                <Animated.View
                    style={{
                            width: width - 50,
                            transform: [{ translateX: trans }],
                        alignItems: "center",
                        backgroundColor: wordsynk["color-primary-10"]
                        }}>
                    <BookingCalendar />
                </Animated.View>

        );
    };

    return (
        <Swipeable containerStyle={{flex:1}} childrenContainerStyle={{flex:1}} renderLeftActions={renderLeftActions}>
        <View style={styles.container}>
            <View style={styles.swipehandle}>
                <Text style={{
                    width: 200,
                    height: 20,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: wordsynk["color-primary-900"],
                    letterSpacing: 2,
                    textAlign:'center',
                    transform: [
                        { rotate: '-90deg'},

                    ]}}>September 2023</Text>
            </View>
            <FlatList data={data} renderItem={(day)=>{

                return (
                    <View key={day.item.date.toISOString()} style={{ height: 100, width: width-40, flexDirection: 'row'}}>
                        <View style={{ width:50, backgroundColor: wordsynk["color-primary-200"], alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{flexDirection: 'row', transform: [{ rotate: '-90deg'}]}}>
                                <Text style={{textTransform: 'uppercase', }}>{format(day.item.date, "eee")}</Text><Text style={{fontWeight: 'bold'}}>{format(day.item.date, "dd")}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, paddingLeft:15, backgroundColor: (day.item.date.getDate() % 2) ? wordsynk["color-primary-10"] : wordsynk["color-primary-50"], alignItems: 'flex-start', justifyContent: 'center'}}>
                            {day.item.bookings.map((booking)=>{
                                return (
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Text style={{width:60, fontSize:10, textAlignVertical: 'center'}}> {format(booking.startDate, "h:mm aa")}</Text>
                                        <Text style={{width: 20,  fontWeight: 'bold', textAlignVertical: 'top'}}>•</Text>
                                        <Text style={{textAlignVertical: 'center', fontSize:12 }}>{booking.reference} - {booking.name}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>

                )
            }} />
        </View>

        </Swipeable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: wordsynk["color-primary-200"]
    },
    scroll: {

        flexDirection: "row"
    },
    swipehandle: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width:40,
        backgroundColor: wordsynk["color-primary-200"]
    },
});