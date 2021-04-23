import React, { Component, useState } from 'react';
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo';
import Header from '../components/Header';
import TextInput from '../components/TextInput'
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { theme } from '../components/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {
        value:'',
        error:''
      },
      password: {
        value:'',
        error:''
      }
    };
  }


  LonLoginPressed = () => {
    const emailError = emailValidator(this.state.email.value)
    const passwordError = passwordValidator(this.state.password.value)
    if(emailError||passwordError){
      this.setState({
        email: {
          ...this.state.email,
          error: emailError,
        }
      });
      this.setState({
        password: {
          ...this.state.password,
          error: passwordError,
        }
      });
      return
    }
    
  }

  render() {

    return (
      <Background>
         <BackButton goBack={this.props.navigation.goBack}/>
          <Logo/>
          <Header>Bienvenido de nuevo</Header>
          <TextInput
        label="Correo electronico"
        returnKeyType="next"
        onChangeText={(email) => this.setState({
          email: {
            ...this.state.email,
            value: email,
          }
        })}
        value={this.state.email.value}
        error={!!this.state.email.error}
        errorText={this.state.email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Contraseña"
        returnKeyType="done"
        value={this.state.password.value}
        onChangeText={(password) => this.setState({
          password: {
            ...this.state.password,
            value: password,
          }
        })}
        error={!!this.state.password.error}
        errorText={this.state.password.error}
        secureTextEntry
      />
      <Button mode="contained" onPress={this.LonLoginPressed} >
      Iniciar sesión
      </Button>
      <View style={styles.row}>
        <Text>¿No tienes una cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Registrate</Text>
        </TouchableOpacity>
      </View>
      </Background>
    );
  }
}
 

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
