import React, { Component } from 'react'
import { StyleSheet, ImageBackground, KeyboardAvoidingView, Text } from "react-native";
import { theme } from './theme';

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
//const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('window').height;

export default function Background({ children }) {
    return (
      
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          {children}
        </KeyboardAvoidingView>
    )
  }

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height:710,
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})