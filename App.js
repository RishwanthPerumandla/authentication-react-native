import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Linking,
  Image,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import { globalStyles, MyTheme } from './styles/global';
import Amplify, { Analytics } from 'aws-amplify';
import * as WebBrowser from 'expo-web-browser';
import config from './aws-exports';
import CustomSignIn from './screens/CustomSignIn';
import CustomSignUp from './screens/CustomSignUp';
import CustomConfirmSignUp from './screens/CustomConfirmSignUp';
import CustomVerifyContact from './screens/CustomVerfiyContact';
import CustomForgotPassword from './screens/CustomForgotPassword';

import {
  AuthPiece,
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
import HomeScreen from './screens/CustomHomeScreen';

async function urlOpener(url, redirectUrl) {
  const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
    url,
    redirectUrl,
  );

  if (type === 'success' && Platform.OS === 'ios') {
    WebBrowser.dismissBrowser();
    return Linking.openURL(newUrl);
  }
}

const oauth = {
  ...config.oauth,
  urlOpener: urlOpener,
  redirectSignIn: 'exp://192.168.0.112:19000',
  redirectSignOut: 'exp://192.168.0.112:19000',
};

Amplify.configure({ ...config, Analytics: { disabled: true }, oauth: oauth });

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
        <HomeScreen />
        {/* <Text>Open up App.js to start working on your app!</Text> */}
      </View>
    );
  } else {
    return null;
  }
}

// class App extends AuthPiece {
//   constructor(props) {
//     super(props);
//     this._validAuthStates = ['signedIn'];
//   }
//   showComponent(theme) {
//     console.log('Current State is .... ' + props.authState);
//     return (
//       <View style={styles.container}>
//         <Text>Open up App.js to start working on your app!</Text>
//       </View>
//     );
//   }
// }

export default function AuthApp() {
  const map = (message) => {
    if (/user.*not.*exist/i.test(message)) {
      return 'User Does Not Exist. SignUp';
    }

    return message;
  };
  return (
    <Authenticator hideDefault={true} errorMessage={map}>
      <CustomSignIn />
      <CustomSignUp />
      <CustomConfirmSignUp />
      <CustomVerifyContact />
      <App />
      <Greetings />
      <RequireNewPassword />
      <CustomForgotPassword />
      <ConfirmSignIn />
      <ConfirmSignUp />
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
