import { Switch, Row, Col } from 'native-base';
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEnabled: false,
            email: this.props.user,
            categorias: []
        }
    }
    async componentDidMount() {
        
        this.setState({ categorias: this.props.categorias });
        
        console.log("Item "+this.props.categorias +"   dato: "+this.props.datos);
        if (this.props.categorias.length > 0){
            if (this.props.categorias.includes(this.props.datos)) {
                console.log("Entre "+ this.props.datos);
                this.setState({ isEnabled: true });
            }
        }
    }

    toggleSwitch = async () => {
        var aux = this.state.isEnabled;

        this.setState({ isEnabled: !aux });
        
        this.props.metodo(!aux,this.props.datos)
    }

    render() {
        const { isEnabled } = this.state;
        return (
            <Row style={styles.item}>
                <Col>
                    <Text>{this.props.datos}</Text>
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
        )
    }
}

const styles = StyleSheet.create({
    item: {
        display: 'flex',
        padding: 15,
        margin: 5,
        width: '90%',
        alignSelf: 'center',
        borderColor: '#2a4944',
        borderWidth: 1,
        backgroundColor: '#d2f7f1'
    }
});

export default Item;
