import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Button} from 'react-native-paper';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import PushNotification from 'react-native-push-notification';

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

const appleLogin_Click = async () => {
  // performs login request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  // get current authentication state for user
  // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
  const credentialState = await appleAuth.getCredentialStateForUser(
    appleAuthRequestResponse.user,
  );

  // use credentialState response to ensure the user is authenticated
  if (credentialState === appleAuth.State.AUTHORIZED) {
    // user is authenticated
    console.log(appleAuthRequestResponse);
  }
};

const setBadges_Click = () => {
  PushNotification.getApplicationIconBadgeNumber(count => {
    PushNotification.setApplicationIconBadgeNumber(count + 1);
  });
};

const App = () => {
  useEffect(() => {
    GoogleSignin.configure();
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
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
      {appleAuth.isSupported && (
        <Button
          icon="apple"
          mode="outlined"
          onPress={appleLogin_Click}
          style={styles.button}>
          Apple Login
        </Button>
      )}
      <Button
        icon="plus"
        mode="outlined"
        onPress={setBadges_Click}
        style={styles.button}>
        Set Badges
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
