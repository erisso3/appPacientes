import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button,Text, Card,CardItem, Footer, FooterTab, Icon} from 'native-base';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Ionicons,AntDesign,FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class StackedLabelExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: props.navigation,
      correo: '',
      contra: '',
      nombres: '',
      ap:'',
      am:''

    };
  }
  componentDidMount() {

    console.log("LoginComponent: ", this.props)
    
    }

    inicio=()=>{
      this.props.navigation.navigate('Inicio')
    }
    autetificacion=()=>{
      this.props.navigation.navigate('Autetificacion')
    }

    autetificacion_con_AsyncStorage = async()=>{
      console.log('Entre');
      let userData = {
        correo : this.state.correo, 
        contra: this.state.contra,
        nombres:this.state.nombres,
        ap:this.state.ap,
        am:this.state.am,
        isLogin: true
      } 
      AsyncStorage.setItem('userData', JSON.stringify(userData))
      
      this.props.navigation.navigate('Autetificacion')
    }
  render() {
    return (
      <Container>
       
        <Content padder>
        <KeyboardAvoidingView behavior="padding" enabled>
          <Card>
            <CardItem header bordered>
              <Text>FORMULARIO DE REGISTRO</Text>
            </CardItem>
            <Form>
            <Item floatingLabel>
              <Label>Nombres  <FontAwesome name="user" size={20} color="black" /></Label>
              <Input onChangeText={(nombres)=>this.setState({nombres})}/>
            </Item>
            <Item floatingLabel last>
              <Label>Apellido Paterno</Label>
              <Input onChangeText={(ap)=>this.setState({ap})}/>
            </Item>
            <Item floatingLabel last>
              <Label>Apellido Materno</Label>
              <Input onChangeText={(am)=>this.setState({am})}/>
            </Item>
            <Item floatingLabel>
              <Label>Correo Electronico  <FontAwesome name="user" size={20} color="black" /></Label>
              <Input onChangeText={(correo)=>this.setState({correo})}/>
            </Item>
            <Item floatingLabel>
              <Label>Contraseña  <FontAwesome name="user" size={20} color="black" /></Label>
              <Input onChangeText={(contra)=>this.setState({contra})}/>
            </Item>
              <Button full success style={styles.btnenviar} onPress={this.autetificacion_con_AsyncStorage}>
                <Text>Registrarse</Text>
              </Button>
            </Form>
          </Card>
          </KeyboardAvoidingView>
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical onPress={this.inicio}>
              <Icon name="home">
                <Text>Inico</Text>
              </Icon>
            </Button>
            <Button vertical onPress={this.autetificacion}> 
              <Icon name="person">
                <Text>Login</Text>
              </Icon>
            </Button>
            <Button vertical active>
              <Icon name="document">
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