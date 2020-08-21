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
import { TextInput, HelperText, Button, ThemeProvider } from 'react-native-paper';
import Amplify, { I18n } from 'aws-amplify';
import { Wrapper, VerifyContact } from 'aws-amplify-react-native';

export default class CustomVerifyContact extends VerifyContact {
  constructor(props) {
    super(props);
    this._validAuthStates = ['verifyContact'];
  }

  verifybody(theme){
      if(!this.props.authData){
          logger.debug('no unverified contact');
          return null;
      }
      return(
          <View style={theme.sectionBody}>
              <Text style={styles.textHeader}>VERIFY CONTACT</Text>
              <Text style={styles.textFooter}>I18n.get('SEND the VERIFICATION CODE TO YOUR MAIL')</Text>
            <TouchableOpacity style={styles.button} onpress={this.verify}>
      <Text  style={styles.buttonText} >{I18n.get('VERIFY')}</Text>
            </TouchableOpacity>
      <Text style={styles.textFooter} onPress={()=>this.changeState('signedIn')}>{I18n.get('SKIP')}</Text>
          </View>
      )
  }
  submitBody(theme){
      return(
          <View style={theme.sectionBody}>
            <Text style={styles.textHeader}>VERIFy CONTACT</Text>
            <TextInput style={styles.input} keyboardType={'numeric'} onChangeText={text=>this.setState({code:text})}
             placeholder={I18n.get('ENTER CODE')} />
             <TouchableOpacity style={!!(!this.stat.code) ? styles.buttonDisabled : styles.button}
              disabled={!!(!this.state.code)}
              onPress={this.submit} >
      <Text  style={styles.buttonText}>{I18n.get('SUBMIT')}</Text>
             </TouchableOpacity>
             <Text style={styles.textFooter} onPress={()=>this.changeState('signedIn')}>{I18n.get('SKIP')}</Text>
             <Text style={styles.textError} >{I18n.get(this.state.error)}</Text>
          
          </View>
      )
  }
  showComponent{
      <Wrapper>
          <View >
                {!this.state.verifyAttr && this.verifyBody(theme)}
                {this.state.verifyAttr && this.submitBody(theme)}

          </View>
      </Wrapper>
  }
}
