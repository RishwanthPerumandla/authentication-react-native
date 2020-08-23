import React from 'react';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export const styles = StyleSheet.create({
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
  imageView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  fontSize: {
    fontSize: 12,
  },
  button: {
    marginHorizontal: 12,
    marginBottom: 12,
    marginVertical: 12,
    color: '#FFFFFF',
    backgroundColor: '#000000',
  },
  buttonDisabled: {
    marginHorizontal: 12,
    marginVertical: 12,
    color: '#fff',
    backgroundColor: '#ff990080',
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
  lineSeperator: {
    flex: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 4,
    marginHorizontal: '30%',
  },
  inputContainerStyleWeb: {
    marginHorizontal: '30%',
  },
  buttonWeb: {
    marginHorizontal: '30%',
    marginVertical: 12,
    color: '#FFFFFF',
    backgroundColor: '#000000',
  },
  buttonDisabledWeb: {
    marginHorizontal: '30%',
    marginVertical: 12,
    color: '#fff',
    backgroundColor: '#ff990080',
  },
  buttonFWeb: {
    marginHorizontal: '30%',
    marginVertical: 18,
    color: '#FFFFFF',
    backgroundColor: '#3b5998',
  },
  buttonGWeb: {
    marginHorizontal: '30%',
    marginVertical: 18,
    color: '#FFFFFF',
    backgroundColor: '#CC3C3C',
  },
  alreadyAccountWeb: {
    marginHorizontal: '30%',
    marginVertical: 16,
    color: '#000000',
  },
  alreadyLoginWeb: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
  },
  forgotPasswordWeb: {
    marginHorizontal: '30%',
    marginBottom: 8,
    color: '#000000',
  },
});
