import { StyleSheet, View, Text } from 'react-native';

function ChatScreen() {
    return (
        <View style={styles.centerView}>
            <Text style={styles.mainText}>CHAT</Text>
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

export default ChatScreen;