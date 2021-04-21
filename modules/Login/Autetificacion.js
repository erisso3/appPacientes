import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button,Text, Card,CardItem, Footer, FooterTab, Icon} from 'native-base';
import { StyleSheet } from 'react-native';
import { Ionicons,AntDesign,FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class StackedLabelExample extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      correo:'', 
      contra:'',
      nombres:'',
      ap:'',
      am:'',
      isLogin: false
    };
    console.log("entre a autentificación");
  }

  async componentDidMount() {
    console.log("entre a autentificación");
    console.log("LoginComponent: ", this.props.route.params)
    let userData = await AsyncStorage.getItem('userData')
    userData = JSON.parse(userData)
    if(userData){
      console.log('LoginComponent', userData)
      this.setState(
          {
            correo : userData.correo,
            contra : userData.contra ,
            nombres:userData.nombres,
            ap:userData.ap,
            am:userData.am,
            isLogin : userData.isLogin
          })
    }else{
      console.log('LoginComponent', "userData: is null");
    }
    console.log('nombres'+this.state.nombres);
  }
  formulario=()=>{
    this.props.navigation.navigate('Formulario')
  }
  limpiar=()=>{
    AsyncStorage.removeItem('userData')
  }
  inicio=()=>{
    this.props.navigation.navigate('Inicio')
  }
  render() {
    let{correo}=this.state;
    let{contra}=this.state;
    return (
      <Container>
        <Header />
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text>Login</Text>
            </CardItem>
            <Form>
            <Item floatingLabel>
              <Label>Usuario  <FontAwesome name="user" size={20} color="black" /></Label>
              <Input defaultValue=''  onChangeText={ (correo)=>this.setState({correo}) }/>
            </Item>
            <Item floatingLabel last>
              <Label>Contraseña</Label>
              <Input secureTextEntry={true} defaultValue='' onChangeText={ (contra)=>this.setState({contra}) }/>
            </Item>
              <Button full success style={styles.btnenviar} onPress={this.formulario}>
                <Text>Entrar</Text>
              </Button>
              <Button full success style={styles.btnenviar} onPress={this.limpiar}>
                <Text>Limpiar </Text>
              </Button>
              <CardItem header bordered>
              <Text>Datos enviados con AsyncStorage</Text>
            </CardItem>
              <Item>
                <Text>Correo: {this.state.correo}</Text>
              </Item>
              <Item>
                <Text>Contraseña: {this.state.contra}</Text>
              </Item>
              <Item>
                <Text>Nombres: {this.state.nombres}</Text>
              </Item>
              <Item>
                <Text>Apellido Paterno: {this.state.ap}</Text>
              </Item>
              <Item>
                <Text>Apellido Materno: {this.state.am}</Text>
              </Item>
              <Item>
                <Text>Estado del login: {this.state.isLogin ? 'Autentificado' : 'No Autentificado'}</Text>
              </Item>
            </Form>
          </Card>
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical onPress={this.inicio}>
              <Icon name="home">
                <Text>Inico</Text>
              </Icon>
            </Button>
            <Button vertical active>
              <Icon name="person">
                <Text>Login</Text>
              </Icon>
            </Button>
            <Button vertical onPress={this.formulario}>
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