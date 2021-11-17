import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-paper';
import AppleLogin from '../components/AppleLogin';
import FacebookLogin from '../components/FacebookLogin';
import GoogleLogin from '../components/GoogleLogin';
import {setBadgeCount} from '../Utilities';

class LoginPage extends Component {
  render() {
    return (
      <>
        <Text style={styles.title}>Social Login</Text>
        <FacebookLogin label="Facebook Login" />
        <GoogleLogin label="Google Login" />
        <AppleLogin label="Apple Login" />
        <Button
          icon="plus"
          mode="outlined"
          onPress={() => setBadgeCount(4)}
          style={styles.button}>
          Set Badges
        </Button>
      </>
    );
  }
}

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

export default LoginPage;
