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
  responseType: 'code',
  urlOpener: urlOpener,
  redirectSignIn: 'exp://192.168.0.112:19000/',
  redirectSignOut: 'exp://192.168.0.112:19000/',
};

Amplify.configure({ ...config, Analytics: { disabled: true }, oauth: oauth });

function App(props) {
  console.log('Current State is .... ' + props.authState);
  if (props.authState === 'signedIn') {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={styles.avatar}
            source={require('./assets/exibits_logo.png')}
          />
        </View>
        {/* <HomeScreen /> */}
        <Text>Open up App.js to start working on your app!</Text>
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
      <App />
      <Greetings
        inGreeting={(username) => 'Hello ' + username}
        outGreeting="Please sign in..."
      />
      <VerifyContact />
      <RequireNewPassword />
      <CustomForgotPassword />
      <ConfirmSignIn />
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
  avatar: {
    marginTop: 8,
    width: 100,
    height: 100,
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
