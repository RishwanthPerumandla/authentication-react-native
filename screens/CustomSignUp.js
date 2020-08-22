import React from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  TouchableHighlight,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { TextInput, HelperText, Button } from 'react-native-paper';
import Amplify, { Auth, I18n, Logger } from 'aws-amplify';
import { withOAuth, Wrapper, SignUp } from 'aws-amplify-react-native';

export default class CustomSignUp extends SignUp {
  constructor(props) {
    super(props);
    this._validAuthStates = ['signUp'];

    this.handleSignUp = this.handleSignUp.bind(this);
    this._isUsernameValid = this._isUsernameValid.bind(this);
    this._isFullnameValid = this._isFullnameValid.bind(this);
    this._isMailIDValid = this._isMailIDValid.bind(this);
    this._isAgeValid = this._isAgeValid.bind(this);

    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();
    this.emailRef = React.createRef();
  }
  handleSignUp() {
    const signup_info = {
      username: this.state.username,
      password: this.state.password,
      attributes: {
        email: this.state.email,
      },
    };
    Auth.signUp(signup_info)
      .then((data) => {
        this.changeState('confirmSignUp', data.user.username);
      })
      .catch((err) => this.error(err));

    this.setState({ username: null });
    this.setState({ password: null });
    this.setState({ email: null });
    this.setState({ error: null });
    this.usernameRef.current.clear();
    this.passwordRef.current.clear();
    this.emailRef.current.clear();
  }

  _isUsernameValid = (name) => /^[a-zA-Z0-9._]*$/.test(name);

  _isFullnameValid = (name) => /^[a-zA-Z ]*$/.test(name);

  _isMailIDValid = (name) => /^[a-zA-Z0-9@._]*$/.test(name);

  _isAgeValid = (name) => /^[0-9]*$/.test(name);

  showComponent(theme) {
    return (
      <Wrapper>
        <TextInputAvoidingView>
          <StatusBar style="dark" />
          <ScrollView
            style={[styles.container, { backgroundColor: '#fff' }]}
            keyboardShouldPersistTaps={'always'}
            removeClippedSubviews={false}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Image
                style={styles.avatar}
                source={require('../assets/exibits_logo.png')}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Text style={styles.registerHead}>Register</Text>
            </View>

            <View style={styles.inputContainerStyle}>
              <View style={styles.helpersWrapper}>
                <HelperText type="error" visible={true} style={styles.helper}>
                  {this.state.error}
                </HelperText>
              </View>
              <TextInput
                mode="outlined"
                style={styles.inputContainerStyle}
                error={!this._isUsernameValid(this.state.username)}
                label="UserName"
                ref={this.usernameRef}
                autoCapitalize="none"
                value={this.state.username}
                placeholder={I18n.get('Enter Your Username')}
                maxLength={20}
                onChangeText={(text) => this.setState({ username: text })}
              />
              <View style={styles.helpersWrapper}>
                <HelperText
                  type="error"
                  visible={!this._isUsernameValid(this.state.username)}
                  style={styles.helper}
                >
                  Error: special characters are not allowed
                </HelperText>
                <HelperText type="info" visible style={styles.counterHelper}>
                  {0} / {20}
                </HelperText>
              </View>
            </View>

            <View style={styles.inputContainerStyle}>
              <TextInput
                mode="outlined"
                style={styles.inputContainerStyle}
                label="Password"
                autoCapitalize="none"
                value={this.state.password}
                ref={this.passwordRef}
                placeholder={I18n.get('Enter Your Password')}
                onChangeText={(text) => this.setState({ password: text })}
                secureTextEntry
              />
            </View>

            <View style={styles.inputContainerStyle}>
              <TextInput
                mode="outlined"
                error={!this._isMailIDValid(this.state.email)}
                style={styles.inputContainerStyle}
                label="Mail ID"
                ref={this.emailRef}
                value={this.state.email}
                placeholder={I18n.get('Enter Your Email')}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(text) => this.setState({ email: text })}
              />
              <View style={styles.helpersWrapper}>
                <HelperText
                  type="error"
                  visible={!this._isMailIDValid(this.state.email)}
                  style={styles.helper}
                >
                  Error: special characters are not allowed
                </HelperText>
              </View>
            </View>
            <Button
              mode="outlined"
              onPress={this.handleSignUp}
              style={
                !!(
                  !this.state.username ||
                  !this.state.password ||
                  !this.state.email
                )
                  ? styles.buttonDisabled
                  : styles.button
              }
              disabled={
                !!(
                  !this.state.username ||
                  !this.state.password ||
                  !this.state.email
                )
                  ? true
                  : false
              }
              color={'#fff'}
            >
              Sign Up
            </Button>
            <TouchableHighlight
              mode="outlined"
              onPress={() => {
                this.changeState('confirmSignUp');
              }}
              underlayColor="none"
              style={styles.alreadyAccount}
              color={'#FFFFFF'}
            >
              <Text style={styles.alreadyLogin}>Confirm Code</Text>
            </TouchableHighlight>
            <TouchableHighlight
              mode="outlined"
              onPress={() => {
                this.changeState('signIn');
              }}
              underlayColor="none"
              style={styles.alreadyAccount}
              color={'#FFFFFF'}
            >
              <Text style={styles.alreadyLogin}>Have an Account? Login</Text>
            </TouchableHighlight>
          </ScrollView>
        </TextInputAvoidingView>
      </Wrapper>
    );
  }
}

function TextInputAvoidingView({ children }) {
  return Platform.OS === 'ios' ? (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior="padding"
      keyboardVerticalOffset={80}
    >
      {children}
    </KeyboardAvoidingView>
  ) : (
    <>{children}</>
  );
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
    marginLeft: 12,
    marginRight: 12,
    marginStart: 12,
    marginEnd: 12,
    color: '#FFFFFF',
    backgroundColor: '#000000',
  },
  avatar: {
    marginTop: 8,
    width: 100,
    height: 100,
  },
  buttonDisabled: {
    marginHorizontal: 12,
    marginBottom: 12,
    color: '#fff',
    backgroundColor: '#ff990080',
  },
  buttonF: {
    marginLeft: 12,
    marginRight: 12,
    marginStart: 12,
    marginEnd: 12,
    marginTop: 18,
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
  radioGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  gender: {
    marginVertical: 6,
  },
  buttonDOB: {
    marginHorizontal: 16,
    marginVertical: 8,
    fontStyle: 'normal',
  },
});
