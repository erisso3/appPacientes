import React, { Component } from 'react';
import { Text } from 'native-base';
import Background from '../components/Background'
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
        name:{
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
    async componentDidMount() {
        let UserData = await AsyncStorage.getItem('userData');
        UserData = JSON.parse(UserData);
        this.setState({
            name: {
              ...this.state.name,
              value: UserData.name,
            }
        });

        this.setState({
            email: {
              ...this.state.email,
              value: UserData.email,
            }
        });

        this.setState({
            password: {
              ...this.state.password,
              value: UserData.password,
            }
        });
        
    }

  render() {

    return (
      <Background>
          <Logo/>
          <Header>Bienvenido</Header>
          <Paragraph>{this.state.name.value}</Paragraph>
          <Paragraph>{this.state.email.value}</Paragraph>
          <Paragraph>{this.state.password.value}</Paragraph>
      </Background>
    );
  }
}

/* 
<Paragraph>Estas en el perfil</Paragraph>
          <Paragraph>{users[ultimousuario].name}</Paragraph>
          <Paragraph>{users[ultimousuario].email}</Paragraph>
          <Paragraph>{users[ultimousuario].password}</Paragraph>



          let ultimousuario = await AsyncStorage.getItem('ultimoUsuario');
        console.log("Usuarios: "+users[ultimousuario].name);



*/