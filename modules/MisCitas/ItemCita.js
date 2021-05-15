import React from 'react'
import { List, ListItem, Text, Content, Card, CardItem, Body, Row, Col } from "native-base"
import { Image, StyleSheet } from 'react-native'


class ItemCita extends React.Component {
    // console.log(props.datos);
    constructor(props) {
        super(props);
        this.state = {
            cita: this.props.datos
        }
    }

    obtenerStatus = (status) => {
        switch (status) {
            case 0:
                return "Pendiente";
            case 1:
                return "Aceptada";
            case 2:
                return "Rechazada";
            case 3:
                return "Finalizada";
            default:
                return "";
        }
    }

    obtenerHora = (hora) => {
        switch (hora) {
            case 9:
                return "9:00 A.M.";
            case 10:
                return "10:00 A.M.";
            case 11:
                return "11:00 A.M.";
            case 12:
                return "12:00 P.M.";
            case 13:
                return "1:00 P.M.";
            case 14:
                return "2:00 P.M.";
            case 15:
                return "3:00 P.M.";
            case 16:
                return "4:00 P.M.";
            default:
                return "";
        }
    }

    render() {
        let { cita } = this.state;
        return (
            <List>
                <ListItem>
                    <Content>
                        <Card>
                            <CardItem>
                                <Body>
                                    <Row>
                                        <Col>
                                            <Text note>Doctor</Text>
                                            <Text style={styles.title}>{cita.doctor}</Text>
                                        </Col>
                                        <Col>
                                            <Text note style={{ alignSelf: 'flex-end' }}>Fecha</Text>
                                            <Text style={{ alignSelf: 'flex-end' }}>{cita.fecha}</Text>
                                        </Col>
                                    </Row>
                                </Body>
                            </CardItem>
                            <CardItem cardBody>
                                <Image source={{ uri: 'http://hospitalclinicaalfalab.com/wp-content/uploads/2017/12/citas-medicas.png' }} style={{ height: 200, width: null, flex: 1 }} />
                            </CardItem>
                            <CardItem>
                                <Text>{cita.observacion.substring(0, 100)}...</Text>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    <Row>
                                        <Col>
                                            <Text note>Estado</Text>
                                            <Text style={styles.title}>{this.obtenerStatus(cita.status)}</Text>
                                        </Col>
                                        <Col>
                                            <Text note style={{ alignSelf: 'flex-end' }}>Hora</Text>
                                            <Text style={{ alignSelf: 'flex-end' }}>{cita.horag.Hours + ':00:00 hrs'}</Text>
                                        </Col>
                                    </Row>
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>
                </ListItem>
            </List>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        backgroundColor: 'white'
    }
});

export default ItemCita;