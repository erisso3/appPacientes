import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, Card, CardItem, Footer, FooterTab, Icon, Row, Col, Switch } from 'native-base';
import { Image, StyleSheet } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';

class Description extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: '',
            isEnabled: false
        }
    }
    async componentDidMount() {

        console.log("DescriptionComponent: ", this.props)
        this.setState({ movie: this.props.route.params.movie });
        let movies = await AsyncStorage.getItem('movies');
        movies = JSON.parse(movies);
        if(movies){
            movies.forEach(element =>{
                if(element.id == this.state.movie.id){
                    var aux = this.state.isEnabled;
                    this.setState({ isEnabled: !aux });
                }
            });
        }else{
            console.log('Aun no hay nada en favs');
        }
        
    }

    favs = () => {
        this.props.navigation.navigate('Favorites')
    }

    home = () => {
        console.log('Home');
        console.log(this.props);
        this.props.navigation.navigate('Home')
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

        let movies = await AsyncStorage.getItem('movies');
        movies = JSON.parse(movies);
        console.log(!aux);
        if (!aux) {

            if (movies) {
                movies[movies.length] = this.state.movie;
            } else {
                console.log("is " + null);
                movies = [];
                movies[0] = this.state.movie;
            }

        } else {
            console.log("movies: " + movies);
            console.log("movies size: " + movies.length);
            var index = 0;
            for (var i = 0; i < movies.length; i++) {
                if (movies[i].id == this.state.movie.id) {
                    console.log(movies[i].title);
                    index = i + 1;
                }
                movies[i] = movies[index];
                index++;
            }
            movies.pop();
        }

        AsyncStorage.setItem('movies', JSON.stringify(movies));

    }

    render() {
        const { isEnabled } = this.state;
        return (
            <Container>
                <Header>
                    <Text style={styles.header}>Peliculas populares</Text>
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
                            <Icon name="person" />
                            <Text>Favs</Text>
                        </Button>
                        <Button vertical >
                            <Icon name="person" />
                            <Text>User profile</Text>
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
