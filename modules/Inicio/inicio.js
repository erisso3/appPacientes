import React, { Component } from 'react';
import { Container, Header, Content, Button,Text, Card,CardItem, Footer, FooterTab, Icon, Item} from 'native-base';
import { StyleSheet } from 'react-native';
import { Ionicons,AntDesign,FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import API from '../Utils/API'
import { FlatList } from 'react-native';
import ItemLayout from './ItemLayout'

export default class StackedLabelExample extends Component {

    constructor(props) {
        super(props);
        this.state = {
          correo:'', 
          contra:'',
          nombres:'',
          ap:'',
          am:'',
          isLogin: false,
          result:''
        };
      }
  formulario=()=>{
    this.props.navigation.navigate('Formulario', { 
      correo : this.state.correo,
      contra : this.state.contra 
    })
  }
  autetificacion=()=>{
    this.props.navigation.navigate('Autetificacion')
  }

  getDta=async()=>{
    let respnose= await API.getData();
    
    console.log(respnose.data.movies);
    this.setState({result:respnose.data.movies})
  }


  render() {

    const row=({item})=>{
      return(
        <Item></Item>
      )
    }
    return (
      <Container>
        
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text >inicio</Text>
              <Button onPress={this.getDta}><Text>Get Data</Text></Button>
            </CardItem>
            
          </Card>
          
          <FlatList
          data = {this.state.result}
          keyExtractor = {(x,i) => i.toString()}
          renderItem = {({item}) => <ItemLayout datos={item}  />}
        >
              
          </FlatList>
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical active>
              <Icon name="home">
                <Text>Inicio</Text>
              </Icon>
            </Button>
            <Button vertical onPress={this.autetificacion}>
              <Icon name="person">
                <Text>Login</Text>
              </Icon>
            </Button>
            <Button vertical onPress={this.formulario}> 
              <Icon name="document" >
                <Text>Formulario</Text>
              </Icon>
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
  }
});