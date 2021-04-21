import React, { Component } from 'react';
import { Text, View,Button } from 'react-native';
function HeadLayout(props){
    return(
        <View>
         
            {
                Platform.OS == 'android' ?
                  <Button title="Android"></Button>
                :
                  <Button title="IOS"></Button>
            }
              
            <Text> {props.data.nombre} </Text>
            <Text> {props.data.apellido} </Text>
            <Text>Edad: {props.data.edad}</Text>
        </View>
    )

}

export default HeadLayout