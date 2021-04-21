
import React, {Component} from 'react'

//Para React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


// Para Native Base
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

// Modulos Propios
import Formulario from './modules/User/Formulario';
import Autetificacion from './modules/Login/Autetificacion';
import Inicio from './modules/Inicio/inicio';

const Stack = createStackNavigator();
// const MyContext = React.createContext();

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      correo:'', 
       contra:''
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }
  
    render(){
      if (!this.state.isReady) {
        return <AppLoading />;
      }
      return(
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Inicio">
            <Stack.Screen name="Autetificacion" component={Autetificacion} />
            <Stack.Screen name="Formulario" component={Formulario} />
            <Stack.Screen name="Inicio" component={Inicio}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

}

export default App;


// Instalar para React Navigation
/* npm install @react-navigation/native

expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

npm install @react-navigation/stack


//Instalar para Native Base
yarn add native-base --save

expo install expo-font */

//Reinstalar para reemplazar archivos eliminados