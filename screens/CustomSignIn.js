import React from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  Image,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import Amplify, { Auth, I18n, Logger } from 'aws-amplify';
import { Wrapper, SignIn } from 'aws-amplify-react-native';

export default class CustomSignIn extends SignIn {
  constructor(props) {
    super(props);
    this._validAuthStates = ['signIn', 'signedOut', 'signedUp'];

    this.handleSignIn = this.handleSignIn.bind(this);

    this._isUsernameValid = this._isUsernameValid.bind(this);

    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  _isUsernameValid(name){return(/^[a-zA-Z0-9._]*$/.test(name))};

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
      <TextInputAvoidingView>
        <StatusBar style="auto" />
        <ScrollView
            style={styles.container}
            keyboardShouldPersistTaps={'always'}
            removeClippedSubviews={false}
        >
        <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
            <Image
              style={styles.avatar}
              source={require('../assets/exhibits.png')}
            />
            <Text style={{ color: 'red' }}>{this.state.error}</Text>
        </View>
        <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={styles.registerHead}>Login</Text>
        </View>
        <View style={styles.inputContainerStyle}>
            <TextInput
                mode="outlined"
                style={styles.inputContainerStyle}
                error={!this._isUsernameValid(userName)}
                label="User Name"
                placeholder={I18n.get('USERNAME')}
                value={this.state.username}
                maxLength={MAX_LENGTH}
                autoCapitalize="none"
                ref={this.usernameRef}
                onChangeText={(text) => this.setState({ username: text })}
            />
            <View style={styles.helpersWrapper}>
                <HelperText
                  type="error"
                  visible={!this._isUsernameValid(userName)}
                  style={styles.helper}
                >Error: special characters are not allowed
                </HelperText>
                <HelperText type="info" visible style={styles.counterHelper}>
                  {userName.length} / {MAX_LENGTH}
                </HelperText>
              </View>
            </View>
            <View style={styles.inputContainerStyle}>
                <TextInput
                  mode="outlined"
                  error = {!true}
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
                  <HelperText
                    type="error"
                    visible={false}
                    style={styles.helper}
                  >Invalid Credentials
                  </HelperText>
                </View>
            </View>

            <Button
                mode="outlined"
                onPress = {() => {}}
                style={styles.button}
                color ={"#FFFFFF"}
                >
                LOGIN
            </Button>
        {/* <View style={theme.section}>
          <View style={theme.sectionBody}>
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
        </View> */}

        <TouchableHighlight
            mode="outlined"
            onPress={() => {}}
            underlayColor='none'
            style={styles.forgotPassword}
            color ={"#FFFFFF"}
            >
          <Text style={styles.alreadyLogin}>FORGOT PASSWORD?</Text>
        </TouchableHighlight>

        <View style = {{flexDirection : "row"}}>
            <View
              style={{
                flex:11,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                marginVertical : 8,
                marginHorizontal : 8,
              }}
            />
            <Text style={{flex:1}}>or</Text>
            <View
              style={{
                flex :11,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                marginVertical : 8,
                marginHorizontal : 8,
              }}
            />
        </View>
        <Button
            mode="outlined"
            onPress = {() => {}}
            style={styles.buttonF}
            color ={"#FFFFFF"}
            icon={({ size }) => (
              <Image
                  source={require('../assets/facebook.png')}
                  style={{ width: size*1.5, height: size*1.5}}
              />
            )}
            >
            Sign In with facebook
        </Button>

        <View style = {{flexDirection : "row"}}>
            <View
              style={{
                flex:11,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                marginVertical : 8,
                marginHorizontal : 8,
              }}
            />
            <Text style={{flex:1}}>or</Text>
            <View
              style={{
                flex :11,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                marginVertical : 8,
                marginHorizontal : 8,
              }}
            />
        </View>

        <Button
            mode="outlined"
            onPress={() => {}}
            style={styles.buttonG}
            color ={"#FFFFFF"}
            icon={({ size }) => (
              <Image
                  source={require('../assets/google.png')}
                  style={{ width: size*1.5, height: size*1.5}}
              />
            )}
            >
            Sign In With Google
        </Button>

        <View style = {{flexDirection : "row"}}>
            <View
              style={{
                flex:11,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                marginVertical : 8,
                marginHorizontal : 8,
              }}
            />
            <Text style={{flex:1}}>or</Text>
            <View
              style={{
                flex :11,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                marginVertical : 8,
                marginHorizontal : 8,
              }}
            />
        </View>

        <TouchableHighlight
            mode="outlined"
            onPress={() => {}}
            underlayColor='none'
            style={styles.alreadyAccount}
            color ={"#FFFFFF"}
            >
          <Text style={styles.alreadyLogin}>Don't have an Account? REGISTER</Text>
        </TouchableHighlight>
    </ScrollView>
  </TextInputAvoidingView>
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

function TextInputAvoidingView({ children }){
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
};