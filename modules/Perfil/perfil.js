import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body, Footer, FooterTab, Button, Icon, Switch } from 'native-base';
import ButtonN from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ScrollView, StyleSheet, StatusBar, FlatList } from 'react-native';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';

import Item from './Item';
export default class CardHeaderFooterExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: '',
        error: ''
      },
      email: {
        value: '',
        error: ''
      },
      password: {
        value: '',
        error: ''
      },
      users: '',
      categorias: [],
      categoriasAdd: []
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

    let dataMovies = await AsyncStorage.getItem('dataMovies');
    dataMovies = JSON.parse(dataMovies);

    var categorias = [];

    dataMovies.forEach(element => {
      if (element.genres) {
        element.genres.forEach(genero => {
          if (!categorias.includes(genero)) {
            categorias.push(genero);
          }
        });
      }
    });
    console.log(categorias);
    this.setState({ categorias: categorias });


    let categoriasUser = await AsyncStorage.getItem('categoriasUser');
    categoriasUser = JSON.parse(categoriasUser);
    if (categoriasUser) {
      categoriasUser.forEach(element => {
        if (element.email == this.state.email.value) {
          console.log("mis catg "+element.categorias);
          this.setState({ categoriasAdd: element.categorias });
        }
      });
    }
    console.log("catADD "+ this.state.categoriasAdd);

  }
  async componentDidUpdate(){
    // let categoriasUser = await AsyncStorage.getItem('categoriasUser');
    // categoriasUser = JSON.parse(categoriasUser);
    // if (categoriasUser) {
    //   categoriasUser.forEach(element => {
    //     if (element.email == this.state.email.value) {
    //       console.log("mis catg "+element.categorias);
    //       this.setState({ categoriasAdd: element.categorias });
    //     }
    //   });
    // }
  }

  AddRemoveCategoria = async (aux, categoria) => {
    console.log(categoria + "  " + aux);
    if (aux) {
      console.log("add");
      if (this.state.categoriasAdd.length > 0) {
        this.state.categoriasAdd[this.state.categoriasAdd.length] = categoria;
      } else {
        this.state.categoriasAdd = [];
        this.state.categoriasAdd[this.state.categoriasAdd.length] = categoria;
      }

    } else {
      this.state.categoriasAdd.forEach(element => {
        if (element == categoria) {
          var i = this.state.categoriasAdd.indexOf(element);
          this.state.categoriasAdd.splice(i, 1);

        }
      });
    }
    this.setState({ categoriasAdd: this.state.categoriasAdd });
    let categoriasUser = await AsyncStorage.getItem('categoriasUser');
    categoriasUser = JSON.parse(categoriasUser);

    if (categoriasUser) {
      categoriasUser.forEach(element => {
        if (element.email == this.state.email.value) {
          element.categorias = this.state.categoriasAdd;
        }
      });
      this.setState({ categoriasUser: categoriasUser });
    } else {
      categoriasUser = [];
      categoriasUser[0] = {
        email: this.state.email.value,
        categorias: this.state.categoriasAdd
      }
    }


    AsyncStorage.setItem('categoriasUser', JSON.stringify(categoriasUser));
    console.log(this.state.categoriasAdd);
    this.props.navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>

          <Text>Datos del usuario</Text>

          <Text>
            Nombre: {this.state.name.value}
          </Text>
          <Text>
            Email: {this.state.email.value}
          </Text>
          <Text>
            Password: {this.state.password.value}
          </Text>

          <FlatList
            data={this.state.categorias}
            extraData={this.state.categorias}
            keyExtractor={(x, i) => i.toString()}
            renderItem={({ item }) => <Item datos={item} user={this.state.email.value} categorias={this.state.categoriasAdd} metodo={this.AddRemoveCategoria} />}
          >

          </FlatList>

          <ButtonN
            mode="contained"
            onPress={() => this.props.navigation.navigate('Inicio')}
          >
            Cerrar Sesión
                </ButtonN>

        </Content>
        <Footer>
          <FooterTab>
            <Button vertical >
              <Icon name="home" onPress={this.home} />
              <Text>Home</Text>
            </Button>
            <Button vertical >
              {/* <Badge ><Text>51</Text></Badge> */}
              <Icon name="person" onPress={this.favs} />
              <Text>Favs</Text>
            </Button>
            <Button active vertical >
              <Icon name="person" onPress={this.perfil} />
              <Text>User profile</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}





