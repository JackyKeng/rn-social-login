import React from 'react';
import {StyleSheet} from 'react-native';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import {Button} from 'react-native-paper';

const FacebookLogin = ({label, onSuccess, onFail}) => {
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
              (error, result) =>
                responseInfoCallback(error, result, onSuccess, onFail),
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

  const responseInfoCallback = (error, result, onSuccess, onFail) => {
    if (error) {
      console.log('Error fetching data: ' + error.toString());
      if (onFail) onFail();
    } else {
      console.log(result);
      if (onSuccess) onSuccess();
    }
  };

  return (
    <Button
      icon="facebook"
      mode="outlined"
      onPress={fbLogin_Click}
      style={styles.button}>
      {label}
    </Button>
  );
};

export default FacebookLogin;

const styles = StyleSheet.create({
  button: {
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 15,
  },
});
