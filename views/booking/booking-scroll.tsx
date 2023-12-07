import {Animated, Button, Dimensions, StyleSheet, Text, View, FlatList} from "react-native";
import ScrollView = Animated.ScrollView;
import {wordsynk} from "@/theme/wordsynk";
import {format} from "date-fns";

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
    startDate: new Date(Date.parse('2023-09-12 09:00:00')),
    endDate: new Date(Date.parse('2023-09-12 10:00:00')),
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
    }

    ];

export const BookingHome = () => {

    const width= Dimensions.get("screen").width;

    const minDate = bookings.reduce((min, p) => p.startDate < min ? p.startDate : min, bookings[0].startDate);
    const maxDate = bookings.reduce((max, p) => p.startDate > max ? p.startDate : max, bookings[0].startDate);

    const groupBookingsByStartDate = (bookings: Booking[]): { [startDate: string]: Booking[] } => {
        return bookings.reduce((accumulator : Record<string, Array<Booking>>, booking) => {

            const  startDate = format(new Date(booking.startDate), "yyyy-MM-dd");
            console.log(startDate)

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

    const grouped = groupBookingsByStartDate(bookings);

    const data = calendarDates(minDate, maxDate).map((item) => {
        const day: DayView = {
          date: new Date(Date.parse(item)),
          bookings: grouped[item] ?? []
        };

        return day;
    })


    return (
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
            <ScrollView style={styles.scroll}>
                {data.map((day) => {
                    return (
                        <View style={{ height: 100, width: width-40, flexDirection: 'row'}}>
                            <View style={{ width:50, backgroundColor: wordsynk["color-primary-200"], alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{flexDirection: 'row', transform: [{ rotate: '-90deg'}]}}>
                                    <Text style={{textTransform: 'uppercase', }}>{format(day.date, "eee")}</Text><Text style={{fontWeight: 'bold'}}>{format(day.date, "dd")}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, paddingLeft:15, backgroundColor: (day.date.getDate() % 2) ? wordsynk["color-primary-10"] : wordsynk["color-primary-50"], alignItems: 'flex-start', justifyContent: 'center'}}>
                                {day.bookings.map((booking)=>{
                                    return (
                                        <View style={{flexDirection: 'row'}}>
                                            <Text>{format(booking.startDate, "h:mm aa")}</Text>
                                            <Text>- {booking.name}</Text>
                                        </View>
                                        )
                                })}
                            </View>
                        </View>

                    )
                })}
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row"
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