import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, Card, CardItem, Footer, FooterTab, Icon, Row, Col, Switch } from 'native-base';
import { Image, StyleSheet } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';

class Description extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: '',
            isEnabled: false,
            email: '',
            isLogin: false,
            userMovies: []
        }
    }
    async componentDidMount() {
        let userData = await AsyncStorage.getItem('userData')
        userData = JSON.parse(userData)
        if (userData) {
            this.setState(
                {
                    email: userData.email,
                    isLogin: userData.isLogin
                });
        }
        console.log("DescriptionComponent: ", userData)
        this.setState({ movie: this.props.route.params.movie });
        let userMovies = await AsyncStorage.getItem('userMovies');
        userMovies = JSON.parse(userMovies);
        if (userMovies) {
            this.setState({ userMovies: userMovies });

            userMovies.forEach(element => {
                if (element.email == userData.email) {
                    element.movies.forEach(aux => {
                        if (aux.id == this.state.movie.id) {
                            var aux2 = this.state.isEnabled;
                            this.setState({ isEnabled: !aux2 });
                        }
                    });
                }
            });
        } else {
            console.log('Aun no hay nada en favs');
        }
    }

    favs = () => {
        this.props.navigation.navigate('Favorites')
    }

    home = () => {
        console.log('Home');
        console.log(this.props);
        this.props.navigation.navigate('Home');
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

    generos = (params) => {
        var aux = '';
        if (params == null) {
            console.log('vacio')
        } else {
            params.forEach(element => {
                aux += ' ' + element + ',';
            });
        }
        aux = aux.substring(0, aux.length - 1);
        return aux;
    }
    toggleSwitch = async () => {
        var aux = this.state.isEnabled;

        this.setState({ isEnabled: !aux });
        var bandera = false;
        console.log(!aux);
        if (!aux) {
            console.log("agregar a favs");
            if(this.state.userMovies.length > 0){
                this.state.userMovies.forEach(element => {
                    if (element.email == this.state.email) {
                        console.log("correo encontrado "+element.correo);
                        bandera = true;
                        if (element.movies) {
                            element.movies[element.movies.length] = this.state.movie;
                        } else {
                            element.movies = [];
                            element.movies[0] = this.state.movie;
                        }
                    }
                });

                if(!bandera){
                    var movi = [];
                    movi[0] = this.state.movie;
                    this.state.userMovies[this.state.userMovies.length]={
                        email: this.state.email,
                        movies: movi
                    }
                }
            }else{
                console.log("era null");
                var mov= [];
                mov[0] = this.state.movie;
                this.state.userMovies[0]={
                    email: this.state.email,
                    movies: mov
                };
            }
            
        } else {
            console.log("Eliminar de favs");
            this.state.userMovies.forEach(element => {
                if (element.email == this.state.email) {
                    console.log("movies: " + element.movies);
                    console.log("movies size: " + element.movies.length);
                    var index = 0;
                    for (var i = 0; i < element.movies.length; i++) {
                        if (element.movies[i].id == this.state.movie.id) {
                            console.log(element.movies[i].title);
                            index = i + 1;
                        }
                        element.movies[i] = element.movies[index];
                        index++;
                    }
                    element.movies.pop();
                }
            });
        }

        AsyncStorage.setItem('userMovies', JSON.stringify(this.state.userMovies));

    }

    render() {
        const { isEnabled } = this.state;
        return (
            <Container>
                <Header style={{ backgroundColor: '#5699DC'}}>
                    <Text style={styles.header}>Detalles</Text>
                </Header>
                <Content>
                    <Row style={styles.row}>
                        <Col>
                            <Image
                                source={{ uri: this.state.movie.medium_cover_image }}
                                style={{ height: 200, width: null, flex: 1 }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Text style={styles.title} >{this.state.movie.title}</Text>
                            <Text style={styles.summary} >{this.state.movie.summary}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Text style={styles.summary} >Category:{this.generos(this.state.movie.genres)}</Text>
                            <Text style={styles.summary} >Rating: {this.state.movie.rating}</Text>

                            <Text style={styles.summary}>Favorito:    <Switch
                                trackColor={{ false: "#767577", true: "#0C9EC9" }}
                                thumbColor={isEnabled ? "#14E6C6" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={this.toggleSwitch}
                                value={isEnabled}
                            />
                            </Text>
                        </Col>
                    </Row>
                </Content>
                <Footer>
          <FooterTab>
            <Button active vertical onPress={this.home}>
              <Icon name="home" />
              <Text>Home</Text>
            </Button>
            <Button vertical onPress={this.favs} >
              {/* <Badge ><Text>51</Text></Badge> */}
              <Icon name="heart" />
              <Text>Favs</Text>
            </Button>
            <Button vertical onPress={this.perfil}>
              <Icon name="person" />
              <Text>User</Text>
            </Button>
          </FooterTab>
        </Footer>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        backgroundColor: 'gray',
        color: '#fff',
        fontSize: 25,
        height: 35,
        margin: 'auto',
        textAlignVertical: 'center',
        textAlign: 'center'
    },
    image: {
    },
    row: {
        borderColor: 'gray',
        borderBottomWidth: 2
    },
    summary: {
        paddingTop: 8,
        paddingBottom: 6,
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: 'justify',
        fontSize: 20
    },
    header: {
        color: '#fff',
        textAlignVertical: 'center',
        fontSize: 30,
        fontStyle: 'italic'
    }
});

export default Description;
