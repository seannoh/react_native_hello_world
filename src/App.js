/**
 * React Native Hello World App
 *
 * @format
 */

import React, { useState, useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import EncryptedStorage from 'react-native-encrypted-storage';


import HomeScreen from './main/pages/HomeScreen';
import SigninScreen from './main/pages/SigninScreen';
import SplashScreen from './main/pages/SplashScreen';
import CalendarScreen from './main/pages/CalendarScreen';
import ChatScreen from './main/pages/ChatScreen';
import AuthContext from './main/context/AuthContext';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '1030381352952-ee9ti00cphj8j3blqiu4epcf95101dai.apps.googleusercontent.com',
});


function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        userToken = await EncryptedStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async () => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
        // Check if your device supports Google Play

        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        const userCredential = await auth().signInWithCredential(googleCredential);

        const idTokenResult = await userCredential.user.getIdTokenResult();

        console.log(idTokenResult);

        try {
          // set token stored in `SecureStore` or any other encrypted storage
          await EncryptedStorage.setItem('userToken', JSON.stringify(idTokenResult));
        } catch (e) {
          // set token failed
        }

        dispatch({ type: 'SIGN_IN', token: idTokenResult });
      },
      signOut: async () => {
        await GoogleSignin.signOut();
        try {
          // remove token stored in `SecureStore` or any other encrypted storage
          await EncryptedStorage.removeItem('userToken');
        } catch (e) {
          // remove token failed
        }
        dispatch({ type: 'SIGN_OUT' });
      }
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.isLoading ?
          (
            <Stack.Navigator>
              <Stack.Screen name='Splash' component={SplashScreen} />
            </Stack.Navigator>
          ) : state.userToken != null ?
            (
              <Tab.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
                <Tab.Screen name='Calendar' component={CalendarScreen} />
                <Tab.Screen name='Home' component={HomeScreen} />
                <Tab.Screen name='Chat' component={ChatScreen} />
              </Tab.Navigator>
            ) :
            (
              <Stack.Navigator initialRouteName='Sign In'>
                <Stack.Screen name='Sign In' component={SigninScreen} />
              </Stack.Navigator>
            )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}


export default App;
