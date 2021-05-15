import { Container, Content, Form, Item, Input, Label, Header, Text, Button, Footer, FooterTab, Icon } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, Picker, ToastAndroid } from 'react-native';
import DatePicker from 'react-native-datepicker'
import AsyncStorage from '@react-native-async-storage/async-storage';

import API from '../Utils/API'

export default class FormCita extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id_paciente:1,
            listDoctores: [],
            doctor: 0,
            date: "",
            minDate:'',
            hora: '9:00 A.M',
            observacion: '',
            error:''
        };
    }

    registrarCita = () => {
        this.props.navigation.navigate('RegistroCita')
    }

    misCitas = () => {

        this.props.navigation.navigate('MisCitas')
    }

    perfil = () => {
        this.props.navigation.navigate('Perfil');
    }

    enviarCita = async() => {
        console.log("Enviando datos...");
        if((this.state.doctor != 0) && (this.state.observacion.length>5)){
            console.log("doctor: " + this.state.doctor);
            console.log("fecha: " + this.state.date);
            console.log("hora: " + this.state.hora);
            console.log("observacion: " + this.state.observacion);
            var formato = this.state.date.toString().split('-');
            var fecha = formato[2]+'-'+formato[1]+'-'+formato[0];

            var datos = {
                id_paciente: this.state.id_paciente,
                id_doctor: this.state.doctor,
                fecha: fecha,
                hora: Number.parseInt(this.state.hora),
                observacion: this.state.observacion
            }
            let respnose = await API.sendCita(datos);
            console.log(respnose);
            if(respnose.toString() === "exito"){
                this.setState({observacion:''});
                this.setState({hora:'9:00 A.M'});
                this.getDateNow();

                ToastAndroid.showWithGravityAndOffset(
                    "Cita registrada exitosamente",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                  );
            }
        }else{
            this.setState({error:'Le hace falta seleccionar el doctor o la descipción del padecimiento es muy corta'});
            ToastAndroid.showWithGravityAndOffset(
                "!Faltan datos! :(",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
              );
        }

        

        
    }

    async componentDidMount() {
        let respnose = await API.getDoctores();
        this.setState({ listDoctores: respnose.lista });
        this.getDateNow();
        let UserData = await AsyncStorage.getItem('userData');
        UserData = JSON.parse(UserData);
        this.setState({id_paciente:UserData.id_paciente});
        //console.log(respnose.lista);
    }

    getDateNow = () =>{
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        var formato =hoy.toLocaleDateString().split('/');
        var dia = Number.parseInt(formato[1]);
        var mes = Number.parseInt(formato[0]);
        var anio = hoy.getFullYear();
        var fecha = dia+'-'+mes+'-'+anio;
        this.setState({date:fecha});
        this.setState({minDate:fecha});
    }


    render() {
        let { doctor, hora, date, observacion,minDate, listDoctores,error } = this.state;

        return (
            <Container>
                <Header style={{ backgroundColor: '#5699DC' }}>
                    <Text style={styles.header}>Registrar cita</Text>
                </Header>
                <Content>
                    <Form style={styles.form}>
                        <Text></Text>
                        <Item style={styles.elementos}>
                            <Text>Doctor: </Text>
                            <Picker
                                selectedValue={doctor}
                                style={{ width: '60%' }}
                                onValueChange={(itemValue, itemIndex) => this.setState({ doctor: itemValue })}
                            >
                                {
                                    listDoctores.map((item,key) => {
                                        return (<Picker.Item label={item.nombre} value={item.id_usuario} />);
                                    })
                                }
                            </Picker>
                        </Item>
                        <Item style={styles.elementos} >
                            <Text>Fecha: </Text>
                            <DatePicker
                                style={{ width: 200 }}
                                date={date}
                                mode="date"
                                placeholder="select date"
                                format="DD-MM-YYYY"
                                minDate={minDate}
                                maxDate="2021-12-31"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    },
                                }}
                                onDateChange={(date) => { this.setState({ date: date }) }}
                            />
                        </Item>
                        <Item style={styles.elementos}>
                            <Text>Hora: </Text>
                            <Picker
                                selectedValue={hora}
                                style={{ width: '60%' }}
                                onValueChange={(itemValue, itemIndex) => this.setState({ hora: itemValue })}
                            >
                                <Picker.Item label="9:00 A.M." value="9" />
                                <Picker.Item label="10:00 A.M" value="10" />
                                <Picker.Item label="11:00 A.M" value="11" />
                                <Picker.Item label="12:00 P.M" value="12" />
                                <Picker.Item label="1:00 P.M" value="13" />
                                <Picker.Item label="2:00 P.M" value="14" />
                                <Picker.Item label="3:00 P.M" value="15" />
                                <Picker.Item label="4:00 P.M" value="16" />
                            </Picker>
                        </Item>
                        <Item floatingLabel>
                            <Label>Padecimiento</Label>
                            <Input onChangeText={(value) => this.setState({ observacion: value })} />
                        </Item>
                        <Button block style={{ width: '70%', alignSelf: 'center', marginTop: 60 }} onPress={this.enviarCita}>
                            <Text style={{ fontSize: 10 }}>Enviar</Text>
                        </Button>
                        <Text></Text>
                        <Text style={styles.error}>{error}</Text>
                        
                    </Form>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button active vertical onPress={this.registrarCita}>
                            <Icon name="newspaper" />
                            <Text>Registro</Text>
                        </Button>
                        <Button vertical onPress={this.misCitas} >
                            <Icon name="clipboard" />
                            <Text>Citas</Text>
                        </Button>
                        <Button vertical onPress={this.perfil}>
                            <Icon name="person" />
                            <Text>User</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    form: {
        width: '90%',
        alignSelf: 'center',
    },
    header: {
        color: '#fff',
        textAlignVertical: 'center',
        fontSize: 30,
        fontStyle: 'italic'
    },
    elementos: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 25,
        marginBottom: 25
    },
    error:{
        textAlign:'center',
        color:'red'
    }
});