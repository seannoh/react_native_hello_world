import { View, Text, StyleSheet } from "react-native";

function SplashScreen() {
    return (
        <View style={styles.centerView}>
            <Text style={styles.nameText}>COOOORRRAALL</Text>
            <Text>LOADING.....</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    centerView: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'lightpink'
    },
    nameText: {
        fontSize: 40,

    }
});

export default SplashScreen;