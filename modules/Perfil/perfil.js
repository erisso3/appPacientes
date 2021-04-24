import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body,Footer, FooterTab,Button, Icon } from 'native-base';
import ButtonN from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class CardHeaderFooterExample extends Component {
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
  favs = () => {
    this.props.navigation.navigate('Favorites')
  }

  home = () => {
    console.log('Home');
    console.log(this.props);
    this.props.navigation.navigate('Home')
}

  perfil = () => {
    this.props.navigation.navigate('Perfil')
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
      <Container>
        <Header />
        <Content>
          <Card>
            <CardItem header>
              <Text>Datos del usuario</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  Nombre: {this.state.name.value}
                </Text>
                <Text>
                  Email: {this.state.email.value}
                </Text>
                <Text>
                  Password: {this.state.password.value}
                </Text>
                <ButtonN
                mode="contained"
                onPress={()=>this.props.navigation.navigate('Inicio')}
                >
              Cerrar Sesión
          </ButtonN>
              </Body>
            </CardItem>
            <CardItem footer>
              
            </CardItem>
         </Card>
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical >
              <Icon name="home" onPress={this.home}/>
              <Text>Home</Text>
            </Button>
            <Button vertical >
              {/* <Badge ><Text>51</Text></Badge> */}
              <Icon name="person" onPress={this.favs}/>
              <Text>Favs</Text>
            </Button>
            <Button active vertical >
              <Icon name="person" onPress={this.perfil}/>
              <Text>User profile</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}











/*
import React, { Component } from 'react';
import Background from '../components/Background'
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, Content, ButtonNB, Text, Card, CardItem, Footer, FooterTab, Icon, Item } from 'native-base';

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

      favs = () => {
        this.props.navigation.navigate('Favorites')
      }
    
      home = () => {
        console.log('Home');
        console.log(this.props);
        this.props.navigation.navigate('Home')
    }
    
      perfil = () => {
        this.props.navigation.navigate('Perfil')
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
*/
/* 
<Paragraph>Estas en el perfil</Paragraph>
          <Paragraph>{users[ultimousuario].name}</Paragraph>
          <Paragraph>{users[ultimousuario].email}</Paragraph>
          <Paragraph>{users[ultimousuario].password}</Paragraph>



          let ultimousuario = await AsyncStorage.getItem('ultimoUsuario');
        console.log("Usuarios: "+users[ultimousuario].name);



*/