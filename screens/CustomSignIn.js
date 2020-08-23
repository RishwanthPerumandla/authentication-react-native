import React from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import TextInputAvoidingView from './TextInputAvoidView';
import { styles } from '../styles/globalStyles';
import { StatusBar } from 'expo-status-bar';
import { TextInput, HelperText, Button } from 'react-native-paper';
import Amplify, { Auth, I18n, Logger } from 'aws-amplify';
import { withOAuth, Wrapper, SignIn } from 'aws-amplify-react-native';

class CustomSignIn extends SignIn {
  constructor(props) {
    super(props);
    this._validAuthStates = ['signIn', 'signedOut', 'signedUp'];

    this.handleSignIn = this.handleSignIn.bind(this);

    this._isUsernameValid = this._isUsernameValid.bind(this);

    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  _isUsernameValid(name) {
    return /^[a-zA-Z0-9._]*$/.test(name);
  }

  handleSignIn() {
    this.signIn();

    this.setState({ username: null });
    this.setState({ password: null });

    this.usernameRef.current.clear();
    this.passwordRef.current.clear();
  }
  showComponent(theme) {
    return Platform.OS === 'web' ? (
      <Wrapper>
        <View
          style={styles.container}
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
            <Text style={styles.registerHead}>Login</Text>
          </View>

          <View style={styles.inputContainerStyleWeb}>
            <View style={styles.helpersWrapper}>
              <HelperText type="error" visible={true} style={styles.helper}>
                {this.state.error}
              </HelperText>
              {/* <HelperText type="info" visible style={styles.counterHelper}>
                  {0} /20
                </HelperText> */}
            </View>
            <TextInput
              mode="outlined"
              style={styles.inputContainerStyle}
              error={!this._isUsernameValid(this.state.userName)}
              label="User Name"
              placeholder={I18n.get('USERNAME')}
              value={this.state.username}
              maxLength={20}
              autoCapitalize="none"
              ref={this.usernameRef}
              onChangeText={(text) => this.setState({ username: text })}
            />
          </View>
          <View style={styles.inputContainerStyleWeb}>
            <TextInput
              mode="outlined"
              error={!true}
              style={styles.inputContainerStyle}
              label="Password"
              value={this.state.password}
              autoCapitalize="none"
              ref={this.passwordRef}
              onChangeText={(text) => this.setState({ password: text })}
              placeholder={I18n.get('PASSWORD')}
              secureTextEntry
            />
            <View style={styles.helpersWrapper}>
              <HelperText type="error" visible={false} style={styles.helper}>
                Invalid Credentials
              </HelperText>
            </View>
          </View>

          <Button
            mode="outlined"
            style={
              !!(!this.state.username || !this.state.password)
                ? styles.buttonDisabledWeb
                : styles.buttonWeb
            }
            disabled={!!(!this.state.username || !this.state.password)}
            onPress={this.handleSignIn}
            // style={styles.button}
            color={'#FFFFFF'}
          >
            LOGIN
          </Button>

          <TouchableHighlight
            mode="outlined"
            onPress={() => this.changeState('forgotPassword')}
            underlayColor="none"
            style={styles.forgotPassword}
            color={'#FFFFFF'}
          >
            <Text style={styles.alreadyLogin}>FORGOT PASSWORD?</Text>
          </TouchableHighlight>

          <View style={{ flexDirection: 'row' }}>
            <View style={styles.lineSeperator} />
          </View>
          <Button
            mode="outlined"
            onPress={() => Auth.federatedSignIn({ provider: 'Facebook' })}
            style={styles.buttonF}
            color={'#FFFFFF'}
            icon={({ size }) => (
              <Image
                source={require('../assets/facebook.png')}
                style={{ width: size * 1.5, height: size * 1.5 }}
              />
            )}
          >
            Sign In with facebook
          </Button>

          <View style={{ flexDirection: 'row' }}>
            <View style={styles.lineSeperator} />
          </View>

          <Button
            mode="outlined"
            onPress={() => Auth.federatedSignIn({ provider: 'Google' })}
            style={styles.buttonG}
            color={'#FFFFFF'}
            icon={({ size }) => (
              <Image
                source={require('../assets/google.png')}
                style={{ width: size * 1.5, height: size * 1.5 }}
              />
            )}
          >
            Sign In With Google
          </Button>

          <View style={{ flexDirection: 'row' }}>
            <View style={styles.lineSeperator} />
          </View>

          <TouchableHighlight
            mode="outlined"
            onPress={() => this.changeState('signUp')}
            underlayColor="none"
            style={styles.alreadyAccountWeb}
            color={'#FFFFFF'}
          >
            <Text style={styles.alreadyLogin}>
              Don't have an Account? REGISTER
            </Text>
          </TouchableHighlight>
        </View>
      </Wrapper>
    ) : (
      <Wrapper>
        <TextInputAvoidingView>
          <StatusBar style="auto" />
          <ScrollView
            style={styles.container}
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
              <Text style={styles.registerHead}>Login</Text>
            </View>

            <View style={styles.inputContainerStyle}>
              <View style={styles.helpersWrapper}>
                <HelperText type="error" visible={true} style={styles.helper}>
                  {this.state.error}
                </HelperText>
                {/* <HelperText type="info" visible style={styles.counterHelper}>
                {0} /20
              </HelperText> */}
              </View>
              <TextInput
                mode="outlined"
                style={styles.inputContainerStyle}
                error={!this._isUsernameValid(this.state.userName)}
                label="User Name"
                placeholder={I18n.get('USERNAME')}
                value={this.state.username}
                maxLength={20}
                autoCapitalize="none"
                ref={this.usernameRef}
                onChangeText={(text) => this.setState({ username: text })}
              />
            </View>
            <View style={styles.inputContainerStyle}>
              <TextInput
                mode="outlined"
                error={!true}
                style={styles.inputContainerStyle}
                label="Password"
                value={this.state.password}
                autoCapitalize="none"
                ref={this.passwordRef}
                onChangeText={(text) => this.setState({ password: text })}
                placeholder={I18n.get('PASSWORD')}
                secureTextEntry
              />
              <View style={styles.helpersWrapper}>
                <HelperText type="error" visible={false} style={styles.helper}>
                  Invalid Credentials
                </HelperText>
              </View>
            </View>

            <Button
              mode="outlined"
              style={
                !!(!this.state.username || !this.state.password)
                  ? styles.buttonDisabled
                  : styles.button
              }
              disabled={!!(!this.state.username || !this.state.password)}
              onPress={this.handleSignIn}
              // style={styles.button}
              color={'#FFFFFF'}
            >
              LOGIN
            </Button>

            <TouchableHighlight
              mode="outlined"
              onPress={() => this.changeState('forgotPassword')}
              underlayColor="none"
              style={styles.forgotPassword}
              color={'#FFFFFF'}
            >
              <Text style={styles.alreadyLogin}>FORGOT PASSWORD?</Text>
            </TouchableHighlight>

            <View style={{ flexDirection: 'row' }}>
              <View style={styles.lineSeperator} />
            </View>
            <Button
              mode="outlined"
              onPress={() => Auth.federatedSignIn({ provider: 'Facebook' })}
              style={styles.buttonF}
              color={'#FFFFFF'}
              icon={({ size }) => (
                <Image
                  source={require('../assets/facebook.png')}
                  style={{ width: size * 1.5, height: size * 1.5 }}
                />
              )}
            >
              Sign In with facebook
            </Button>

            <View style={{ flexDirection: 'row' }}>
              <View style={styles.lineSeperator} />
            </View>

            <Button
              mode="outlined"
              onPress={() => Auth.federatedSignIn({ provider: 'Google' })}
              style={styles.buttonG}
              color={'#FFFFFF'}
              icon={({ size }) => (
                <Image
                  source={require('../assets/google.png')}
                  style={{ width: size * 1.5, height: size * 1.5 }}
                />
              )}
            >
              Sign In With Google
            </Button>

            <View style={{ flexDirection: 'row' }}>
              <View style={styles.lineSeperator} />
            </View>

            <TouchableHighlight
              mode="outlined"
              onPress={() => this.changeState('signUp')}
              underlayColor="none"
              style={styles.alreadyAccount}
              color={'#FFFFFF'}
            >
              <Text style={styles.alreadyLogin}>
                Don't have an Account? REGISTER
              </Text>
            </TouchableHighlight>
          </ScrollView>
        </TextInputAvoidingView>
      </Wrapper>
    );
  }
}

export default withOAuth(CustomSignIn);
