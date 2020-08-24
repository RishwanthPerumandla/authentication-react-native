import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Linking,
  Image,
  Text,
  View,
  Button,
  ImageBackground,
  WebView,
  Dimensions,
} from 'react-native';
import { globalStyles, MyTheme } from './styles/global';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
// import { ImagePicker } from 'react-native-image-picker';

import Amplify, { Analytics, Auth, Storage } from 'aws-amplify';
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
  const [CurrentUserName, setUserName] = useState('');
  const [CurrentEmail, setEmail] = useState('');

  //Current User Details
  Auth.currentAuthenticatedUser()
    .then((user) => {
      return user;
    })
    .then((data) => {
      setUserName(data.username);
      setEmail(data.attributes.email);
      // setEmailVerified(data.attributes.email_verified);
    })
    .catch((err) => console.log(err));
  const [image, setImage] = useState(null);

  // permission to access the user's phone library
  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };
  useEffect(() => {
    //Getch Image
    Storage.get('profilepic.jpeg', { level: 'private' })
      .then((result) => {
        console.log(result);
        setImage(result);
      })
      .catch((err) => console.log(err));
  }, []);
  //imagePicker
  useLibraryHandler = async () => {
    await askPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      uploadImage(image);
    }
  };

  //Uploadimage
  uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const fileName = 'profilepic.jpeg';
    await Storage.put(fileName, blob, {
      contentType: 'image/jpeg',
      level: 'private',
    })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  //Height and Width of Uploaded image
  let { height, width } = Dimensions.get('window');

  if (props.authState === 'signedIn') {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={styles.avatar}
            source={require('./assets/exibits_logo.png')}
          />
          <NamesView title="Username : " titletag={CurrentUserName} />
          {/* <NamesView title="Fullname : " titletag={FullName} /> */}
          {/* <NamesView title="EmailVerified : " titletag={CurrentEmailVerified} /> */}
          {/* <NamesView title="Gender : " titletag={Gender} /> */}
          <NamesView title="E-Mail : " titletag={CurrentEmail} />
          {/* <NamesView title="Phone Number : " titletag={phoneNo} /> */}
          {/* <NamesView title="Age : " titletag={Age} /> */}
          {/* Display Profile Pic */}
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: width, height: height / 2 }}
            />
          )}
          {/* <Button onPress={useLibraryHandler} 
           /> */}
          <Button
            mode="outlined"
            color={'#FFFFFF'}
            onPress={useLibraryHandler}
            title=" UPLOAD NEW PROFILE PICTURE"
          />

          <Button
            mode="outlined"
            color={'#000'}
            onPress={() => Auth.signOut({ global: true })}
            title="Signout"
          />
        </View>
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

const NamesView = ({ title, titletag }) => (
  <View style={styles.row}>
    <View style={styles.inputWrap1}>
      <Text style={styles.textStyle1}>{title}</Text>
    </View>
    <View style={styles.inputWrap}>
      <Text style={styles.textStyle}>{titletag}</Text>
    </View>
  </View>
);

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
