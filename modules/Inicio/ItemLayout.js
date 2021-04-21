import React from 'react'
import { List, ListItem, Text, Left,  Content, Card, CardItem, Thumbnail, Button, Icon, Body} from "native-base"
import { Image, StyleSheet } from 'react-native'

import { TouchableOpacity } from 'react-native-gesture-handler';
import { max } from 'react-native-reanimated';

function ItemLayout(props){
    // console.log(props.datos);
    return(
        <TouchableOpacity onPress={()=> console.log("Nada")}>
        <List>
            <ListItem>
            <Content>
            <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri:props.datos.medium_cover_image}}/>
                <Body>
                <Text style={styles.title}>{props.datos.title}</Text>
                  <Text note>{props.datos.id}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri:props.datos.medium_cover_image}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
            <Text>{props.datos.summary.substring(0,100)}...</Text>
            </CardItem>
          </Card>
          </Content>
                
            
            </ListItem>
        </List>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    title:{
        backgroundColor : 'white'
    }
});

export default ItemLayout