import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

const App = () => {
  return (
    <SafeAreaView>
      <Text>Hello World</Text>
      <LoginButton
        permissions={['email']}
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('login has error: ' + result.error);
          } else if (result.isCancelled) {
            console.log('login is cancelled.');
          } else {
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
        }}
        onLogoutFinished={() => console.log('logout.')}
      />
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
