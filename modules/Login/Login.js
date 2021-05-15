import React, { Component, useState } from 'react';
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo';
import Header from '../components/Header';
import TextInput from '../components/TextInput'
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import { TouchableOpacity, StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { theme } from '../components/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, Content } from 'native-base';
import API from '../Utils/API'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:{
        value:'',
        error:''
    },
    ape_pat:{
      value:'',
      error:''
    },
    ape_mat:{
      value:'',
      error:''
    },
      email: {
        value: '',
        error: ''
      },
      password: {
        value: '',
        error: ''
      }
    };
  }


  LonLoginPressed = async () => {
    const emailError = emailValidator(this.state.email.value)
    const passwordError = passwordValidator(this.state.password.value)
    if (emailError || passwordError) {
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
    let userData = {
        name:'',
        email:'',
        password:'',
        ape_pat:'',
        ape_mat:'',
        id_paciente:0
    }

    console.log('Email: ' + this.state.email.value);
    console.log('Password: ' + this.state.password.value);
    const data = new FormData();
    data.append('usuario', this.state.email.value);
    data.append('password', this.state.password.value);
    let response = await API.Login(data);
    console.log(response);
    if(response=="no"){
      console.log("Usuario no valido");
    }else{
      console.log("Usario valido");
      console.log(response.paciente);
      console.log(response.paciente.nombre);
      userData.name=response.paciente.nombre;
      console.log("Nombre"+userData.name);
      userData.email=response.paciente.usuario;
      userData.password=response.paciente.password;
      userData.ape_pat=response.paciente.ape_pat;
      userData.ape_mat=response.paciente.ape_mat;
      userData.id_paciente=response.paciente.id_paciente;
      AsyncStorage.setItem('userData',JSON.stringify(userData));
      console.log(JSON.stringify(userData));
      this.props.navigation.navigate('Perfil');

    }
    
    
    /*let users = await AsyncStorage.getItem('users');
    users = JSON.parse(users);
    var i = 0
    var redirreccion = false;
    for (i = 0; i < users.length; i++) {
      if (users[i].email == this.state.email.value && users[i].password == this.state.password.value) {
        console.log("Usuario registrado");
        AsyncStorage.setItem('userData', JSON.stringify(users[i]));
        redirreccion = true;
      } else {
        console.log("Usuiario no valido");
      }
    }
    if (redirreccion == true) {
      this.props.navigation.navigate('Home');
    }*/

  }

  render() {
    return (
      // <Container>
      //   <Content>
          <Background>

            <BackButton goBack={this.props.navigation.goBack} />
            <Logo />
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
              <TouchableOpacity onPress={() => this.props.navigation.replace('Register')}>
                <Text style={styles.link}>Registrate</Text>
              </TouchableOpacity>
            </View>

          </Background>
      //   </Content>
      // </Container>
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
