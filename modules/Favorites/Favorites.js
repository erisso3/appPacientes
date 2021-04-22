import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, Card, CardItem, Footer, FooterTab, Icon } from 'native-base';
import { StyleSheet } from 'react-native';


import { FlatList } from 'react-native';
import Item from './Item';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Favorites extends Component {

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


    async componentDidMount() {
        let movies = await AsyncStorage.getItem('movies');
        movies = JSON.parse(movies);
        console.log("movies favs: "+movies);
        this.setState({ result: movies });
    }
    
    updateData = async() => {
        let movies = await AsyncStorage.getItem('movies');
        movies = JSON.parse(movies);
        console.log("Update: ");
        this.setState({ result: movies });
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
                        extraData={this.state.result}
                        keyExtractor={(x, i) => i.toString()}
                        renderItem={({ item }) => <Item datos={item} lista={this.updateData} navigation={this.props.navigation} />}
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
                        <Button vertical >
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