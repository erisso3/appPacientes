import { Container, Header, Content, Button, Text, Card, CardItem, Footer, FooterTab, Icon, Item } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import API from '../Utils/API'
import ItemCita from './ItemCita';

export default class MisCitas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listCitas: []
        };
    }

    registrarCita = () => {
        this.props.navigation.navigate('RegistroCita')
    }

    misCitas = () => {

        this.props.navigation.navigate('MisCitas')
    }

    perfil = () => {
        this.props.navigation.navigate('Perfil');
    }

    async componentDidMount() {
        let UserData = await AsyncStorage.getItem('userData');
        UserData = JSON.parse(UserData);
        let respnose = await API.getCitas(UserData.id_paciente);
        this.setState({ listCitas: respnose.lista });
        //console.log(respnose);
    }


    render() {
        let { listCitas } = this.state;

        return (
            <Container>
                <Header>
                    <Text style={styles.header}>Lista</Text>
                </Header>
                <Content>
                    <FlatList
                        data={listCitas}
                        keyExtractor={(x, i) => i.toString()}
                        renderItem={({ item }) => <ItemCita datos={item} navigation={this.props.navigation} />}
                    >

                    </FlatList>
                </Content>
                <Footer>
                <FooterTab>
                        <Button vertical onPress={this.registrarCita}>
                            <Icon name="newspaper" />
                            <Text>Registro</Text>
                        </Button>
                        <Button active vertical onPress={this.misCitas} >
                            <Icon name="clipboard" />
                            <Text>Citas</Text>
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
    btnenviar: {
        marginTop: '5%'
    },
    header: {
        color: '#fff',
        textAlignVertical: 'center',
        fontSize: 25
    }
});