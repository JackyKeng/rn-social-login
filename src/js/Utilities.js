import PushNotification from 'react-native-push-notification';

export const setBadgeCount = number => {
  PushNotification.setApplicationIconBadgeNumber(number);
};
