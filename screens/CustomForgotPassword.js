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
import Amplify, { I18n } from 'aws-amplify';
import { Wrapper, VerifyContact } from 'aws-amplify-react-native';
import { ForgotPassword } from 'aws-amplify-react-native/dist/Auth';

export default class CustomForgotPassword extends ForgotPassword {
  constructor(props) {
    super(props);
    this._validAuthStates = ['forgotPassword'];
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    this.submit();

    this.setState({ delivery: null });
    this.setState({ password: null });
    this.setState({ code: null });
  }

  forgotBody(theme) {
    return (
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
            <Text style={styles.registerHead}>RESET PASSWORD</Text>
          </View>
          <View style={styles.inputContainerStyle}>
            <TextInput
              mode="outlined"
              style={styles.inputContainerStyle}
              label="UserName"
              autoCapitalize="null"
              ref={this.usernameRef}
              value={this.state.username}
              onChangeText={(text) => this.setState({ username: text })}
              placeholder={I18n.get('Enter your Username')}
            />
            <View style={styles.helpersWrapper}>
              <HelperText type="error" visible={true} style={styles.helper}>
                {I18n.get(this.state.error)}
              </HelperText>
            </View>
          </View>
          <Button
            mode="outlined"
            style={
              !!!this.state.username ? styles.buttonDisabled : styles.button
            }
            disabled={!!!this.state.username}
            onPress={this.send}
            color={'#FFFFFF'}
          >
            {I18n.get('SEND')}
          </Button>
          <TouchableHighlight
            mode="outlined"
            onPress={() => this.changeState('signIn')}
            underlayColor="none"
            style={styles.alreadyAccount}
            color={'#FFFFFF'}
          >
            <Text style={styles.alreadyLogin}>{I18n.get('Sign In')}</Text>
          </TouchableHighlight>
        </ScrollView>
      </TextInputAvoidingView>
    );
  }
  submitBody(theme) {
    return (
      <TextInputAvoidingView>
        <StatusBar style="dark" />
        <ScrollView
          style={[styles.container, { backgroundColor: background }]}
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
            <Text style={styles.registerHead}>RESET PASSWORD</Text>
          </View>
          <View style={styles.inputContainerStyle}>
            <TextInput
              mode="outlined"
              style={styles.inputContainerStyle}
              label="Full Name"
              autoCapitalize="null"
              ref={this.codeRef}
              value={this.state.code}
              onChangeText={(text) => this.setState({ code: text })}
              placeholder={I18n.get('Enter Code')}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainerStyle}>
            <TextInput
              mode="outlined"
              style={styles.inputContainerStyle}
              label="Password"
              autoCapitalize="null"
              ref={this.passwordRef}
              value={this.state.password}
              onChangeText={(text) => this.setState({ password: text })}
              placeholder={I18n.get('Enter Password')}
              secureTextEntry
              autoCapitalize="none"
            />
            <View style={styles.helpersWrapper}>
              <HelperText type="error" visible={true} style={styles.helper}>
                {I18n.get(this.state.error)}
              </HelperText>
            </View>
          </View>
          <Button
            mode="outlined"
            style={
              !!(!this.state.code || !this.state.password)
                ? styles.buttonDisabled
                : styles.button
            }
            disabled={!!(!this.state.code || !this.state.password)}
            onPress={this.haldleSubmit}
            color={'#FFFFFF'}
          >
            {I18n.get('Confirm')}
          </Button>
          <TouchableHighlight
            mode="outlined"
            onPress={() => this.changeState('signIn')}
            underlayColor="none"
            style={styles.alreadyAccount}
            color={'#FFFFFF'}
          >
            <Text style={styles.alreadyLogin}>{I18n.get('Sign In')}</Text>
          </TouchableHighlight>
        </ScrollView>
      </TextInputAvoidingView>
    );
  }
  showComponent(theme) {
    return (
      <Wrapper>
        <View>
          {!this.state.delivery && this.forgotBody(theme)}
          {this.state.delivery && this.submitBody(theme)}
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
