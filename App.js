import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import PushNotification from 'react-native-push-notification';
import LoginPage from './src/js/pages/LoginPage';

const App = () => {
  useEffect(() => {
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
      <LoginPage />
    </SafeAreaView>
  );
};
export default App;
