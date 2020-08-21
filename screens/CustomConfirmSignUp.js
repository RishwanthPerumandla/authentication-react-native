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
import { ConfirmSignUp } from 'aws-amplify-react-native/dist/Auth';

export default class CustomConfirmSignUp extends ConfirmSignUp {
  constructor(props) {
    super(props);
    this._validAuthStates = ['confirmSignUp'];
    this.handleConfirmSignUp = this.handleConfirmSignUp.bind(this);

    this.usernameRef = React.createRef;
    this.codeRef = React.createRef; 
  }

  handleConfirmSignUp(){
      this.confirm();

      this.setState({username : null});
      this.setState({code : null});
      this.setState({error : null});
      this.usernameRef.current.clear();
      this.codeRef.current.clear();
  }

  showComponent(theme){
      <Wrapper>
          <View style={theme.sectionBody}>
            <Text style={styles.textHeader}>CONFIRM CODE</Text>
            <View style={styles.inputContainerStyle}>
                <View style={styles.helpersWrapper}>
                        <HelperText
                        type="error"
                        visible={true}
                        style={styles.helper}
                        >{this.state.error}
                        </HelperText>
                    </View>
                    <TextInput
                        mode="outlined"
                        style={styles.inputContainerStyle}
                        label="Code"
                        autoCapitalize = "none"
                        ref = {this.usernameRef}
                        value = {this.state.username}
                        placeholder = {I18n.get("Enter Your Username")}
                        onChangeText={(text)=> {this.setState({username : text})}}
                        keyboardType = {Platform.OS === 'ios'?'ascii-capable' : 'visible-password'}
                    />
                </View>
                <View style={styles.inputContainerStyle}>
                    <TextInput
                        mode="outlined"
                        style={styles.inputContainerStyle}
                        label="Code"
                        ref = {this.codeRef}
                        autoCapitalize = "none"
                        value = {this.state.code}
                        placeholder = {I18n.get("Enter Your Code")}
                        onChangeText={(text)=> {this.setState({username : text})}}
                        keyboardType = "numeric"
                    />
                </View>
                <Button
                    mode="outlined"
                    style={!!(!this.state.code || !this.state.username) ?
                    styles.buttonDisabled : styles.button}
                    disabled={!!(!this.state.code || !this.state.username)}
                    onPress={this.handleConfirmSignUp}
                    color ={"#FFFFFF"} 
                    >
                    Confirm
                </Button>
                <TouchableHighlight
                    mode="outlined"
                    onPress={() => {this.changeState("signIn")}}
                    underlayColor='none'
                    style={styles.alreadyAccount}
                    color ={"#FFFFFF"}
                    >
                <Text style={styles.alreadyLogin}>{I18n.get("Sign In")}</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    mode="outlined"
                    onPress={() => {this.resend}}
                    underlayColor='none'
                    style={styles.alreadyAccount}
                    color ={"#FFFFFF"}
                    >
                <Text style={styles.alreadyLogin}>{I18n.get('Resend Code')}</Text>
                </TouchableHighlight>
                    <TouchableOpacity  >
                        <Text  style={styles.buttonText}>{I18n.get('SUBMIT')}</Text>
                    </TouchableOpacity>
                    <Text style={styles.textFooter} onPress={()=>this.changeState('signedIn')}>{I18n.get('SKIP')}</Text>
                    <Text style={styles.textError} >{I18n.get(this.state.error)}</Text>
          
          </View>
          <View >
                {!this.state.verifyAttr && this.verifyBody(theme)}
                {this.state.verifyAttr && this.submitBody(theme)}

          </View>
      </Wrapper>
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor : '#FFFFFF',
      marginTop : Constants.statusBarHeight,
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
      marginRight : 8,
      marginStart : 8,
      marginEnd : 8,
    },
    fontSize: {
      fontSize: 12,
    },
    button: {
      marginLeft: 12,
      marginRight : 12,
      marginStart : 12,
      marginEnd : 12,
      color : "#FFFFFF",
      backgroundColor : '#000000'
  },
  buttonDisabled: {
    marginLeft: 12,
    marginRight : 12,
    marginStart : 12,
    marginEnd : 12,
    color : "#FFFFFF",
    backgroundColor : '#FFFF00'
},
    avatar: {
      marginTop: 8,
      width: 100,
      height : 100,
  },
  buttonF : {
    marginLeft: 12,
    marginRight : 12,
    marginStart : 12,
    marginEnd : 12,
    marginTop : 18,
    color : "#FFFFFF",
    backgroundColor : '#3b5998'
  },
  buttonG: {
    marginHorizontal : 12,
    marginVertical : 18,
    color : "#FFFFFF",
    backgroundColor : '#CC3C3C'
  },alreadyAccount: {
  marginHorizontal : 16,
  marginVertical : 16,
  color : "#000000",  
  },
  registerHead : {
  fontSize : 35,
  marginBottom : 8,
  },  
  alreadyLogin :{
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize : 18,
  },
    radioGroup : {
      flex : 1,
      flexDirection : "row",  
      justifyContent : "space-around",
  },
  gender : {
      marginVertical : 6, 
  },
  buttonDOB : {
    marginHorizontal : 16,
    marginVertical : 8,
    fontStyle : "normal",
  },
  });