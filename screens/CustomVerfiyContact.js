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

export default class CustomVerifyContact extends VerifyContact {
  constructor(props) {
    super(props);
    this._validAuthStates = ['verifyContact'];
  }

  verifybody(theme) {
    if (!this.props.authData) {
      logger.debug('no unverified contact');
      return null;
    }
    return (
      <View style={[styles.container, { backgroundColor: '#fff' }]}>
        <StatusBar style="dark" />
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
          <Text style={styles.registerHead}>VERIFY CONTACT</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Text style={styles.registerHead}>
            {I18n.get('SEND the VERIFICATION CODE TO YOUR MAIL')}
          </Text>
        </View>

        <TouchableHighlight
          mode="outlined"
          onpress={this.verify}
          underlayColor="none"
          style={styles.alreadyAccount}
          color={'#FFFFFF'}
        >
          <Text style={styles.alreadyLogin}>{I18n.get('VERIFY')}</Text>
        </TouchableHighlight>
        <Text
          style={styles.textFooter}
          onPress={() => this.changeState('signedIn')}
        >
          {I18n.get('SKIP')}
        </Text>
      </View>

      /* <View style={theme.sectionBody}>
<Text style={styles.textHeader}>VERIFY CONTACT</Text>
<Text style={styles.textFooter}>{I18n.get('SEND the VERIFICATION CODE TO YOUR MAIL')}</Text>
<TouchableOpacity style={styles.button} onpress={this.verify}>
  <Text  style={styles.buttonText} >{I18n.get('VERIFY')}</Text>
</TouchableOpacity>
<Text style={styles.textFooter} onPress={()=>this.changeState('signedIn')}>{I18n.get('SKIP')}</Text>
</View> */
    );
  }
  submitBody(theme) {
    return (
      <TextInputAvoidingView>
        <StatusBar style="dark" />
        <ScrollView
          style={[styles.container, { backgroundColor: '#fffs' }]}
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
            <Text style={styles.registerHead}>VERIFY CONTACT</Text>
          </View>
          <View style={styles.inputContainerStyle}>
            <TextInput
              mode="outlined"
              style={styles.inputContainerStyle}
              label="Enter Code"
              keyboardType={'numeric'}
              value={this.state.code}
              maxLength={6}
              onChangeText={(text) => this.setState({ code: text })}
              placeholder={I18n.get('ENTER CODE')}
            />
            <View style={styles.helpersWrapper}>
              <HelperText type="error" visible={true} style={styles.helper}>
                {I18n.get(this.state.error)}
              </HelperText>
            </View>
          </View>
          <Button
            mode="outlined"
            style={!!!this.state.code ? styles.buttonDisabled : styles.button}
            disabled={!!!this.state.code}
            onPress={this.submit}
            color={'#FFFFFF'}
          >
            {I18n.get('SUBMIT')}
          </Button>
          <TouchableHighlight
            mode="outlined"
            onPress={() => this.changeState('signedIn')}
            underlayColor="none"
            style={styles.alreadyAccount}
            color={'#FFFFFF'}
          >
            <Text style={styles.alreadyLogin}>{I18n.get('SKIP')}</Text>
          </TouchableHighlight>
        </ScrollView>
      </TextInputAvoidingView>

      //     <View style={theme.sectionBody}>
      //       <Text style={styles.textHeader}></Text>
      //       <TextInput style={styles.input} keyboardType={'numeric'}
      //         onChangeText={text=>this.setState({code:text})}
      //         placeholder={I18n.get('ENTER CODE')} />
      //        <TouchableOpacity
      //         style={!!(!this.stat.code) ? styles.buttonDisabled : styles.button}
      //         disabled={!!(!this.state.code)}
      //         onPress={this.submit} >
      // <Text  style={styles.buttonText}>{I18n.get('SUBMIT')}</Text>
      //        </TouchableOpacity>
      //        <Text style={styles.textFooter}
      //        onPress={()=>this.changeState('signedIn')}>{I18n.get('SKIP')}</Text>
      //        <Text style={styles.textError} >{I18n.get(this.state.error)}</Text>
      //     </View>
    );
  }
  showComponent(theme) {
    return (
      <Wrapper>
        <View style={styles.container}>
          {!this.state.verifyAttr && this.verifyBody(theme)}
          {this.state.verifyAttr && this.submitBody(theme)}
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
