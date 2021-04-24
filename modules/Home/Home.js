import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, Card, CardItem, Footer, FooterTab, Icon, Item } from 'native-base';
import { StyleSheet } from 'react-native';

import API from '../Utils/API'
import { FlatList } from 'react-native';
import ItemLayout from './ItemLayout'

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      result: ''
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
    let respnose = await API.getData();
    //console.log(respnose.data.movies);
    
    /*
    var generoMovies = [];
    respnose.data.movies.forEach(mov =>{
      mov.genres.forEach(aux =>{
          if(cat1 === aux || cat2 === aux || cat3 === aux){
            generoMovies.push(mov);
          }
      });
    });
    this.setState({ result: generoMovies })
    */
    this.setState({ result: respnose.data.movies })

    AsyncStorage.removeItem('movies');
    //console.log(this.props);
  }


  render() {

    return (
      <Container>
        <Header>
          <Text style={styles.header}>Peliculas populares</Text>
        </Header>
        <Content>
          <FlatList
            data={this.state.result}
            keyExtractor={(x, i) => i.toString()}
            renderItem={({ item }) => <ItemLayout datos={item} navigation={this.props.navigation} />}
          >

          </FlatList>
        </Content>
        <Footer>
          <FooterTab>
            <Button active vertical onPress={this.home}>
              <Icon name="home" />
              <Text>Home</Text>
            </Button>
            <Button vertical onPress={this.favs} >
              {/* <Badge ><Text>51</Text></Badge> */}
              <Icon name="person" />
              <Text>Favs</Text>
            </Button>
            <Button vertical onPress={this.perfil}>
              <Icon name="person" />
              <Text>User profile</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  btnenviar: {
    marginTop: '5%'
  },
  header: {
    color: '#fff',
    textAlignVertical: 'center',
    fontSize: 30,
    fontStyle: 'italic'
  }
});