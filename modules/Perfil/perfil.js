import React, { Component } from 'react';
import { Container, Header, Content, Text, Footer, FooterTab, Button, Icon} from 'native-base';
import ButtonN from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

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
      categoriasAdd: this.props.route.params.categorias ? this.props.route.params.categorias: []
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

  perfil = async() => {
    let dataMovies = await AsyncStorage.getItem('dataMovies');
    dataMovies = JSON.parse(dataMovies);
    let userData = await AsyncStorage.getItem('userData')
    userData = JSON.parse(userData);

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
    console.log("CATEGORIAS EXISTENTES "+categorias);
    this.setState({ categorias: categorias });

    var auxiliar = [];
    let categoriasUser = await AsyncStorage.getItem('categoriasUser');
    categoriasUser = JSON.parse(categoriasUser);
    if (categoriasUser) {
      categoriasUser.forEach(element => {
        if (element.email == userData.email) {
          auxiliar = element.categorias;
        }
      });
    }
    console.log("CATEGORIAS USUARIO "+ auxiliar);
    this.props.navigation.navigate('Perfil',{categorias: auxiliar});
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
    console.log("CATEGORIAS EXISTENTES "+categorias);
    this.setState({ categorias: categorias });


    // let categoriasUser = await AsyncStorage.getItem('categoriasUser');
    // categoriasUser = JSON.parse(categoriasUser);
    // if (categoriasUser) {
    //   categoriasUser.forEach(element => {
    //     if (element.email == this.state.email.value) {
    //       this.setState({ categoriasAdd: element.categorias });
    //     }
    //   });
    // }
    // console.log("CATEGORIAS USUARIO "+ this.state.categoriasAdd);

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
        this.state.categoriasAdd[0] = categoria;
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
    //victoe
    var bandera = false;
    if (categoriasUser) {
      categoriasUser.forEach(element => {
        if (element.email == this.state.email.value) {
          bandera= true;
          element.categorias = this.state.categoriasAdd;
        }
      });
      if(!bandera){
        categoriasUser[categoriasUser.length] = {
          email: this.state.email.value,
          categorias: this.state.categoriasAdd
        }
      }
      this.setState({ categoriasUser: categoriasUser });
    } else {
      categoriasUser = [];
      categoriasUser[0] = {
        email: this.state.email.value,
        categorias: this.state.categoriasAdd
      }
    }


    AsyncStorage.setItem('categoriasUser', JSON.stringify(categoriasUser));
    console.log("nuevas categorias "+this.state.categoriasAdd);
    this.props.navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: '#5699DC'}}> 
          <Text style={styles.header}>Perfil</Text>
        </Header>
        <Content>
        <Title>Datos del usuario</Title>
        <Card>
          <Card.Content>
            <Title>Nombre</Title>
            <Paragraph>{this.state.name.value}</Paragraph>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Title>Email</Title>
            <Paragraph>{this.state.email.value}</Paragraph>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Title>Contraseña</Title>
            <Paragraph>{this.state.password.value}</Paragraph>
          </Card.Content>
        </Card>
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
              <Icon name="heart" onPress={this.favs} />
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







const styles = StyleSheet.create({
  header: {
    color: '#fff',
    textAlignVertical: 'center',
    fontSize: 30,
    fontStyle: 'italic'
  }
});