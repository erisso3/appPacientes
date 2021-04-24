import React from 'react'
import { List, ListItem, Text, Left, Content, Card, CardItem, Thumbnail, Button, Icon, Body } from "native-base"
import { Image, StyleSheet } from 'react-native'

import { TouchableOpacity } from 'react-native-gesture-handler';
import { max } from 'react-native-reanimated';

class ItemLayout extends React.Component {
  // console.log(props.datos);
  constructor(props) {
        super(props);
        this.state = {
          movie: this.props.datos
        }
    }

  description = () => {
    this.props.navigation.navigate('Description', {
      movie: this.state.movie
    });
  }
  
  render() {
    return (
      <TouchableOpacity onPress={this.description}>
        <List>
          <ListItem>
            <Content>
              <Card>
                <CardItem>
                  <Left>
                    <Thumbnail source={{ uri: this.props.datos.medium_cover_image }} />
                    <Body>
                      <Text style={styles.title}>{this.props.datos.title}</Text>
                      <Text note>{this.props.datos.rating}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image source={{ uri: this.props.datos.medium_cover_image }} style={{ height: 200, width: null, flex: 1 }} />
                </CardItem>
                <CardItem>
                  <Text>{this.props.datos.summary.substring(0, 100)}...</Text>
                </CardItem>
              </Card>
            </Content>
          </ListItem>
        </List>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    backgroundColor: 'white'
  }
});

export default ItemLayout;