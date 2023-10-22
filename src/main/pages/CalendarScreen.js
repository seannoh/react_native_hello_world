import { StyleSheet, View, Text } from 'react-native';

function CalendarScreen() {
    return (
        <View style={styles.centerView}>
            <Text style={styles.mainText}>CALENDAR</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    centerView: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainText: {
        fontSize: 40,
        color:'black'
    }
});

export default CalendarScreen;