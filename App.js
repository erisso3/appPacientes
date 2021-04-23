
import React, {Component} from 'react'

//Para React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-native-paper'
import { theme } from './modules/components/theme'


// Para Native Base
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

// Modulos Propios


import Home from './modules/Home/Home';
import Description from './modules/Description/Description';
import Favorites from './modules/Favorites/Favorites';
import Inicio from './modules/Login/Inicio';
import Login from './modules/Login/Login';
import Register from './modules/Login/Register';
import Perfil from './modules/Perfil/perfil';

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
        <Provider theme={theme}>
          <NavigationContainer>
          <Stack.Navigator 
          initialRouteName="Inicio"
          screenOptions={{
            headerShown: false,
          }}>
            <Stack.Screen name="Favorites" component={Favorites} />
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Description" component={Description}/>
            <Stack.Screen name="Inicio" component={Inicio}/>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Register" component={Register}/>
            <Stack.Screen name="Perfil" component={Perfil}/>
          </Stack.Navigator>
        </NavigationContainer>
        </Provider>
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