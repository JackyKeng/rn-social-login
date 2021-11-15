import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Button} from 'react-native-paper';

const fbLogin_Click = () => {
  LoginManager.logInWithPermissions(['public_profile']).then(
    function (result) {
      if (result.isCancelled) {
        console.log('Login cancelled');
      } else {
        console.log(result);
        AccessToken.getCurrentAccessToken().then(data => {
          console.log(data);
          const infoRequest = new GraphRequest(
            '/me?fields=name,email,picture.type(large)',
            null,
            responseInfoCallback,
          );
          // Start the graph request.
          new GraphRequestManager().addRequest(infoRequest).start();
        });
      }
    },
    function (error) {
      console.log('Login fail with error: ' + error);
    },
  );
};

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

const App = () => {
  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  return (
    <SafeAreaView>
      <Text style={styles.title}>Social Login</Text>
      <Button
        icon="facebook"
        mode="outlined"
        onPress={fbLogin_Click}
        style={styles.button}>
        Facebook Login
      </Button>
      <Button
        icon="google"
        mode="outlined"
        onPress={googleLogin_Click}
        style={styles.button}>
        Google Login
      </Button>
    </SafeAreaView>
  );
};

const responseInfoCallback = (error, result) => {
  if (error) {
    console.log('Error fetching data: ' + error.toString());
  } else {
    console.log(result);
  }
};

export default App;

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 15,
  },
  button: {
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 15,
  },
});
