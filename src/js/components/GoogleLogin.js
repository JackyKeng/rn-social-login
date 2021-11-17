import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

const GoogleLogin = ({label}) => {
  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const googleLogin_Click = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error) {
      console.log('error: ', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <Button
      icon="google"
      mode="outlined"
      onPress={googleLogin_Click}
      style={styles.button}>
      {label}
    </Button>
  );
};

export default GoogleLogin;

const styles = StyleSheet.create({
  button: {
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 15,
  },
});
