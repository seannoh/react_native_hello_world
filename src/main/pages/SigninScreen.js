import { View, TextInput, Button } from 'react-native';
import React, {useContext} from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AuthContext from '../context/AuthContext';



function SigninScreen() {
  const {signIn} = useContext(AuthContext)
  return (
  <>
    <Button
      title="Google Sign-In"
      onPress={() => signIn()}
    />
  </>
  );
}

export default SigninScreen;