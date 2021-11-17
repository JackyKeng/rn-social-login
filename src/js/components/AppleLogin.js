import appleAuth from '@invertase/react-native-apple-authentication';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

const AppleLogin = ({label}) => {
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
      console.log(credentialState);
    }
  };

  return (
    <>
      {appleAuth.isSupported && (
        <Button
          icon="apple"
          mode="outlined"
          onPress={appleLogin_Click}
          style={styles.button}>
          {label}
        </Button>
      )}
    </>
  );
};

export default AppleLogin;

const styles = StyleSheet.create({
  button: {
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 15,
  },
});
