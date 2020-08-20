import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Image, Text, View, ImageBackground } from 'react-native';
import { globalStyles, MyTheme } from './styles/global';
import Amplify, { Analytics } from 'aws-amplify';
import config from './aws-exports';
import CustomSignIn from './screens/CustomSignIn';
import {
  Greetings,
  ConfirmSignIn,
  ConfirmSignUp,
  ForgotPassword,
  SignIn,
  SignUp,
  RequireNewPassword,
  VerifyContact,
  withAuthenticator,
} from 'aws-amplify-react-native';
import { Authenticator } from 'aws-amplify-react-native/dist/Auth';

Amplify.configure({ ...config, Analytics: { disabled: true } });

// class MyGreetings extends Greetings {
//   render() {
//     return (
//       <View style={globalStyles.imageContainer}>
//         <Image
//           source={require('./assets/exibits_logo.png')}
//           style={globalStyles.image}
//         />
//       </View>
//     );
//   }
// }

function App(props) {
  console.log('Current State is .... ' + props.authState);
  if (props.authState === 'signedIn') {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  } else {
    return null;
  }
}

export default function AuthApp() {
  const map = (message) => {
    if (/user.*not.*exist/i.test(message)) {
      return 'User Does Not Exist. SignUp';
    }

    return message;
  };
  return (
    <Authenticator hideDefault={true} errorMessage={map}>
      <App />
      <CustomSignIn />
      <Greetings />
    </Authenticator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// export default withAuthenticator(
//   App,
//   false,
//   [
//     <MyGreetings />,
//     <ConfirmSignIn />,
//     <ConfirmSignUp />,
//     <ForgotPassword />,
//     <RequireNewPassword />,
//     <SignIn />,
//     <SignUp />,
//     <VerifyContact />,
//   ],
//   null,
//   MyTheme,
// );
