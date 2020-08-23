import React from 'react';
import {
  Text,
  StyleSheet,
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
    return Platform.OS === 'web' ? (
      <View
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
          <Text style={styles.registerHead}>RESET PASSWORD</Text>
        </View>
        <View style={styles.inputContainerStyleWeb}>
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
            !!!this.state.username ? styles.buttonDisabledWeb : styles.buttonWeb
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
          style={styles.alreadyAccountWeb}
          color={'#FFFFFF'}
        >
          <Text style={styles.alreadyLogin}>{I18n.get('Sign In')}</Text>
        </TouchableHighlight>
      </View>
    ) : (
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
    return Platform.OS === 'web' ? (
      <View
        style={[styles.container, { backgroundColor: background }]}
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
          <Text style={styles.registerHead}>RESET PASSWORD</Text>
        </View>
        <View style={styles.inputContainerStyleWeb}>
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
        <View style={styles.inputContainerStyleWeb}>
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
              ? styles.buttonDisabledWeb
              : styles.buttonWeb
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
          style={styles.alreadyAccountWeb}
          color={'#FFFFFF'}
        >
          <Text style={styles.alreadyLogin}>{I18n.get('Sign In')}</Text>
        </TouchableHighlight>
      </View>
    ) : (
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
