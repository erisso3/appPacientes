import { Col, List, ListItem, Row, Switch, Text } from "native-base";
import React from 'react';
import { Image, StyleSheet } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';

class Item extends React.Component {
    // console.log(props.datos);
    constructor(props) {
        super(props);
        this.state = {
            movie: this.props.datos,
            isEnabled: true
        }
    }

    toggleSwitch = async () => {
        var aux = this.state.isEnabled;

        this.setState({ isEnabled: !aux });
        
        let userData = await AsyncStorage.getItem('userData')
        userData = JSON.parse(userData);

        let userMovies = await AsyncStorage.getItem('userMovies');
        userMovies = JSON.parse(userMovies);
        
        console.log(!aux);
        if (!aux == false) {

            console.log("Eliminar de favs en favs");
            userMovies.forEach(element => {
                if (element.email == userData.email) {
                    //console.log("movies: " + element.movies);
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
            AsyncStorage.setItem('userMovies', JSON.stringify(userMovies));
            this.props.lista();
        }
        
    }

    render() {
        const { isEnabled } = this.state;
        return (
            <List>
                <ListItem>
                    <Row style={styles.row}>
                        <Col>
                            <Image style={{ width: 100, height: 100 }}
                                source={{ uri: this.props.datos.medium_cover_image }}
                            />
                        </Col>
                        <Col>
                            <Text style={styles.title}>{this.props.datos.title}</Text>
                            <Text>{this.props.datos.synopsis.substring(0, 100)}...</Text>
                        </Col>
                        <Col>
                        <Switch
                                trackColor={{ false: "#767577", true: "#0C9EC9" }}
                                thumbColor={isEnabled ? "#14E6C6" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={this.toggleSwitch}
                                value={isEnabled}
                            />
                        </Col>
                    </Row>
                </ListItem>
            </List>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        backgroundColor: 'gray'
    },
    image: {
    },
    row: {
        borderColor: 'gray',
        borderBottomWidth: 2
    }
});

export default Item;