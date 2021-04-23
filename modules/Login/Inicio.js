import React, { Component } from 'react';
import { Text } from 'native-base';
import Background from '../components/Background'
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';


export default class Home extends Component {
  render() {

    return (
      <Background>
          <Logo/>
          <Header>Bienvenido</Header>
          <Paragraph>Elige una Opción</Paragraph>
          <Button
          mode="contained"
          onPress={()=>this.props.navigation.navigate('Login')}
          >
              Iniciar sesión
          </Button>
          <Button
          mode="outlined"
          onPress={()=>this.props.navigation.navigate('Register')}
          >
              Registrarse
          </Button>
      </Background>
    );
  }
}
