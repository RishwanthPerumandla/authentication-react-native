import React from 'react';
import {
  Text,
  Image,
  View,
  TouchableHighlight,
  ScrollView,
  Platform,
} from 'react-native';
import TextInputAvoidingView from './TextInputAvoidView';
import { styles } from '../styles/globalStyles';
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
    return Platform.OS === 'web' ? (
      <Wrapper>
        <ScrollView
          style={[styles.container, { backgroundColor: '#fff' }]}
          keyboardShouldPersistTaps={'always'}
          removeClippedSubviews={false}
        >
          <View style={styles.imageView}>
            <Image
              style={styles.avatar}
              source={require('../assets/exibits_logo.png')}
            />
          </View>
          <View style={styles.imageView}>
            <Text style={styles.registerHead}>Register</Text>
          </View>

          <View style={styles.inputContainerStyleWeb}>
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

          <View style={styles.inputContainerStyleWeb}>
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
                ? styles.buttonDisabledWeb
                : styles.buttonWeb
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
            style={styles.alreadyAccountWeb}
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
            style={styles.alreadyAccountWeb}
            color={'#FFFFFF'}
          >
            <Text style={styles.alreadyLogin}>Have an Account? Login</Text>
          </TouchableHighlight>
        </ScrollView>
      </Wrapper>
    ) : (
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
