import { StyleSheet, View, Text, Button } from 'react-native';
import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import auth from '@react-native-firebase/auth'

function HomeScreen() {
    const {signOut} = useContext(AuthContext);

    const name = auth().currentUser.displayName

    return (
        <View style={styles.centerView}>
            <Text style={styles.mainText}>{name}</Text>
            <Button title='Sign Out' onPress={signOut}/>
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
        color: 'black'
    }
});

export default HomeScreen;