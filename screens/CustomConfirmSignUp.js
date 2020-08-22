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
import {
  TextInput,
  HelperText,
  Button,
  ThemeProvider,
} from 'react-native-paper';
import Amplify, { I18n } from 'aws-amplify';
import { Wrapper, VerifyContact } from 'aws-amplify-react-native';
import { ConfirmSignUp } from 'aws-amplify-react-native/dist/Auth';

export default class CustomConfirmSignUp extends ConfirmSignUp {
  constructor(props) {
    super(props);
    this._validAuthStates = ['confirmSignUp'];
    this.handleConfirmSignUp = this.handleConfirmSignUp.bind(this);

    this.usernameRef = React.createRef();
    this.codeRef = React.createRef();
  }

  handleConfirmSignUp() {
    this.confirm();

    this.setState({ username: null });
    this.setState({ code: null });
    this.setState({ error: null });

    this.usernameRef.current.clear();
    this.codeRef.current.clear();
  }

  showComponent(theme) {
    return (
      <Wrapper>
        <TextInputAvoidingView>
          <View style={styles.container}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image
                style={styles.avatar}
                source={require('../assets/exibits_logo.png')}
              />
              <Text style={styles.registerHead}>Confirm Code</Text>
              <Text>{this.state.error}</Text>
            </View>
            <View>
              <TextInput
                mode="outlined"
                style={styles.inputContainerStyle}
                label="UserName"
                value={this.state.username}
                ref={this.usernameRef}
                onChangeText={(text) => this.setState({ username: text })}
                placeholder={I18n.get('USERNAME')}
              />
              <TextInput
                mode="outlined"
                style={styles.inputContainerStyle}
                label="Code"
                value={this.state.code}
                ref={this.codeRef}
                onChangeText={(text) => this.setState({ code: text })}
                placeholder={I18n.get('CODE')}
              />
              <Button
                mode="outlined"
                style={
                  !!(!this.state.code || !this.state.username)
                    ? styles.buttonDisabled
                    : styles.button
                }
                disabled={!!(!this.state.code || !this.state.username)}
                onPress={this.handleConfirmSignUp}
                color={'#FFFFFF'}
              >
                Confirm
              </Button>
              <View style={{ flexDirection: 'row', marginHorizontal: 60 }}>
                <TouchableHighlight
                  mode="outlined"
                  onPress={() => {
                    this.resend;
                  }}
                  underlayColor="none"
                  style={[styles.alreadyAccount, { textAlign: 'left' }]}
                  color={'#FFFFFF'}
                >
                  <Text style={styles.alreadyLogin}>
                    {I18n.get('Resend Code')}
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  mode="outlined"
                  onPress={() => {
                    this.changeState('signIn');
                  }}
                  underlayColor="none"
                  style={[styles.alreadyAccount, { textAlign: 'right' }]}
                  color={'#FFFFFF'}
                >
                  <Text style={styles.alreadyLogin}>{I18n.get('Sign In')}</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </TextInputAvoidingView>
      </Wrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
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
    marginHorizontal: 30,
  },
  fontSize: {
    fontSize: 12,
  },
  button: {
    marginVertical: 12,
    marginHorizontal: 50,
    color: '#FFFFFF',
    backgroundColor: 'green',
  },
  buttonDisabled: {
    marginVertical: 12,
    marginHorizontal: 50,
    color: '#FFFFFF',
    backgroundColor: 'green',
  },
  avatar: {
    marginTop: 8,
    width: 100,
    height: 100,
  },

  alreadyAccount: {
    flex: 1,

    color: '#000000',
  },
  registerHead: {
    fontSize: 35,
    marginBottom: 8,
  },
  alreadyLogin: {
    fontStyle: 'normal',
    fontSize: 12,
  },
});

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
