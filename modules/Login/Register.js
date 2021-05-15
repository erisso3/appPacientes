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
import { nameValidator } from '../helpers/nameValidator'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, Content } from 'native-base';
import API from '../Utils/API'


export default class Register extends Component {
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
        value:'',
        error:''
      },
      password: {
        value:'',
        error:''
      },
      users:''
    };
  }


  LonRegisterPressed =async () => {
    const emailError = emailValidator(this.state.email.value)
    const passwordError = passwordValidator(this.state.password.value)
    const nameError=nameValidator(this.state.name.value);
    if(emailError||passwordError||nameError){
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
      this.setState({
        name: {
          ...this.state.name,
          error: nameError,
        }
      });
      return
    }

    
    let userData={
        name:this.state.name.value,
        email:this.state.email.value,
        password:this.state.password.value,
        ape_pat:this.state.ape_pat.value,
        ape_mat:this.state.ape_mat.value,
        id_paciente:0
    }
    const data = new FormData();
    data.append('nombre', userData.name);
    data.append('ape_pat', userData.ape_pat);
    data.append('ape_mat', userData.ape_mat);
    data.append('usuario', userData.email);
    data.append('password', userData.password);
    console.log('Nombre: '+userData.name);
    console.log('Ape_pat: '+userData.ape_pat);
    console.log('Ape_mat: '+userData.ape_mat);
    console.log('Usuario: '+userData.email);
    console.log('Password: '+userData.password);
    let respnose = await API.agregarPaciente(data);
    console.log(respnose.result);
    if(respnose.result==true){
      console.log("Todo bien");
      const datalogin = new FormData();
      datalogin.append('usuario', userData.email);
      datalogin.append('password', userData.password);
      let responselogin = await API.Login(datalogin);
      if(responselogin=="no"){
        console.log("Usuario no valido");
      }else{
        userData.id_paciente=responselogin.paciente.id_paciente;
        AsyncStorage.setItem('userData',JSON.stringify(userData));
        this.props.navigation.navigate('Perfil');
  
      }
    }else{
      console.log("Ocurrio un error");
    }
    //AsyncStorage.setItem('userData',JSON.stringify(userData));
    //this.props.navigation.navigate('Perfil')
    /*
    let users = await AsyncStorage.getItem('users');
    let numaux=0;
    users = JSON.parse(users);
    if(users){
        users[users.length] = userData;
        console.log('No soy nuevo');
        numaux=users.length-1;
    }else{

        console.log('Soy nuevo');
        users = [];
        users[0] = userData;
        numaux=0;
    }
    AsyncStorage.setItem('users',JSON.stringify(users));
    AsyncStorage.setItem('userData',JSON.stringify(users[numaux]));
    console.log('Usuario guardado'); 
    this.props.navigation.navigate('Home')
    */
  }

  render() {

    return (
      // <Container>
      //   <Content>
      <Background>
         <BackButton goBack={this.props.navigation.goBack}/>
          <Logo/>
          <Header>Crear una cuenta</Header>
          <TextInput
            label="Nombre"
            returnKeyType="next"
            value={this.state.name.value}
            onChangeText={(name) => this.setState({
                name: {
                  ...this.state.name,
                  value: name,
                }
              })}
            error={!!this.state.name.error}
            errorText={this.state.name.error}
            name="name"
        />
        <TextInput
            label="Apellido Peterno"
            returnKeyType="next"
            value={this.state.ape_pat.value}
            onChangeText={(ape_pat) => this.setState({
                ape_pat: {
                  ...this.state.ape_pat,
                  value: ape_pat,
                }
              })}
            error={!!this.state.ape_pat.error}
            errorText={this.state.ape_pat.error}
            name="ape_pat"
        />
        <TextInput
            label="Apellido Materno"
            returnKeyType="next"
            value={this.state.ape_mat.value}
            onChangeText={(ape_mat) => this.setState({
                ape_mat: {
                  ...this.state.ape_mat,
                  value: ape_mat,
                }
              })}
            error={!!this.state.ape_mat.error}
            errorText={this.state.ape_mat.error}
            name="ape_mat"
        />
        <TextInput
            label="Correo electronico"
            returnKeyType="next"
            value={this.state.email.value}
            onChangeText={(email) => this.setState({
            email: {
                ...this.state.email,
                value: email,
            }
            })}
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
      <Button mode="contained" onPress={this.LonRegisterPressed} >
      Iniciar sesión
      </Button>
      <View style={styles.row}>
        <Text>¿No tienes una cuenta? </Text>
        <TouchableOpacity onPress={() => this.props.navigation.replace('Login')}>
          <Text style={styles.link}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
      </Background>
      // </Content>
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
