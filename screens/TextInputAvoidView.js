import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

export default function TextInputAvoidingView({ children }) {
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
