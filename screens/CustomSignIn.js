import React from 'react';
import {
  Text,
  touchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';

import Amplify, { Auth, I18n, Logger } from 'aws-amplify';
import { Wrapper, SignIn } from 'aws-amplify-react-native';

export default class CustomSignIn extends SignIn {
  constructor(props) {
    super(props);
    this._validAuthStates = ['signIn', 'signedOut', 'signedUp'];

    this.handleSignIn = this.handleSignIn.bind(this);

    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();
  }
  handleSignIn() {
    this.signIn();

    this.setState({ username: null });
    this.setState({ password: null });

    this.usernameRef.current.clear();
    this.passwordRef.current.clear();
  }
  showComponent(theme) {
    return (
      <Wrapper>
        <View style={theme.section}>
          <View style={theme.sectionBody}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/exibits_logo.png')}
                style={{ width: 150, height: 150 }}
              />
              <Text> Exibits Landing Page</Text>
              <Text style={{ color: 'red' }}>{this.state.error}</Text>
            </View>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              ref={this.usernameRef}
              onChangeText={(text) => this.setState({ username: text })}
              placeholder={I18n.get('USERNAME')}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              ref={this.passwordRef}
              onChangeText={(text) => this.setState({ password: text })}
              placeholder={I18n.get('PASSWORD')}
              secureTextEntry
            />
            <TouchableOpacity
              style={
                !!(!this.state.username || !this.state.password)
                  ? styles.buttonDisabled
                  : styles.button
              }
              disabled={!!(!this.state.username || !this.state.password)}
              onPress={this.handleSignIn}
            >
              <Text style={styles.buttonText}>SIGN IN </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Wrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    marginTop: Constants.statusBarHeight,
  },
  helpersWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapper: {
    flex: 1,
  },
  helper: {
    flexShrink: 1,
  },
  counterHelper: {
    textAlign: 'right',
  },
  inputContainerStyle: {
    marginLeft: 8,
    marginRight: 8,
    marginStart: 8,
    marginEnd: 8,
  },
  fontSize: {
    fontSize: 12,
  },
  button: {
    marginHorizontal: 12,
    marginBottom: 12,
    color: '#FFFFFF',
    backgroundColor: '#000000',
  },
  avatar: {
    marginTop: 8,
    width: 100,
    height: 100,
  },
  buttonF: {
    marginHorizontal: 12,
    marginVertical: 18,
    color: '#FFFFFF',
    backgroundColor: '#3b5998',
  },
  buttonG: {
    marginHorizontal: 12,
    marginVertical: 18,
    color: '#FFFFFF',
    backgroundColor: '#CC3C3C',
  },
  alreadyAccount: {
    marginHorizontal: 16,
    marginVertical: 16,
    color: '#000000',
  },
  registerHead: {
    fontSize: 35,
    marginBottom: 8,
  },
  alreadyLogin: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
  },
  forgotPassword: {
    marginHorizontal: 16,
    marginBottom: 8,
    color: '#000000',
  },
});
