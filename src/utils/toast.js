import Toast from 'react-native-root-toast';

function showToast(message = 'This is a message', duration = 'LONG', position = 'BOTTOM' ) {
  const toast = Toast.show(message, {
    duration: `Toast.durations.${duration}`,
    position: `Toast.positions.${position}`,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
  });

  return toast;
}

export default showToast;