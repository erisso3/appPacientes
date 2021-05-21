import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Text,
  Footer,
  FooterTab,
  Button,
  Icon,
} from "native-base";
import ButtonN from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Alert, Modal, Pressable, View,KeyboardAvoidingView,ToastAndroid, Platform } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import TextInput from "../components/TextInput";
import API from "../Utils/API";
import { emailValidator } from '../helpers/emailValidator';
import { passwordValidator } from '../helpers/passwordValidator';
import { nameValidator } from '../helpers/nameValidator';
import{ape_patValidator}from '../helpers/ape_patValidator';
import{ape_matValidator}from '../helpers/ape_matValidator';
import Item from "./Item";
export default class CardHeaderFooterExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: "",
        error: "",
      },
      ape_pat: {
        value: "",
        error: "",
      },
      ape_mat: {
        value: "",
        error: "",
      },
      email: {
        value: "",
        error: "",
      },
      password: {
        value: "",
        error: "",
      },
      id: {
        value: "",
        error: "",
      },
      users: "",
      modalVisible: false,
    };
  }
  registrarCita = () => {
    this.props.navigation.navigate("RegistroCita");
  };

  misCitas = () => {
    this.props.navigation.navigate("MisCitas");
  };

  perfil = () => {
    this.props.navigation.navigate('Perfil');
  }

  async componentDidMount() {
    let UserData = await AsyncStorage.getItem("userData");
    UserData = JSON.parse(UserData);
    this.setState({
      name: {
        ...this.state.name,
        value: UserData.name,
      },
    });

    this.setState({
      email: {
        ...this.state.email,
        value: UserData.email,
      },
    });

    this.setState({
      ape_pat: {
        ...this.state.ape_pat,
        value: UserData.ape_pat,
      },
    });

    this.setState({
      ape_mat: {
        ...this.state.ape_mat,
        value: UserData.ape_mat,
      },
    });

    this.setState({
      id: {
        ...this.state.id,
        value: UserData.id_paciente,
      },
    });
  }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  actualizardatos = async () => {

    const emailError = emailValidator(this.state.email.value)
    const passwordError = passwordValidator(this.state.password.value)
    const nameError=nameValidator(this.state.name.value);
    const ape_patError=ape_patValidator(this.state.ape_pat.value);
    const ape_matError=ape_matValidator(this.state.ape_mat.value);
    if(emailError||passwordError||nameError||ape_patError||ape_matError){
      this.setState({
        email: {
          ...this.state.email,
          error: emailError,
        }
      });
      this.setState({
        password: {
          ...this.state.password,
          error: passwordError,
        }
      });
      this.setState({
        name: {
          ...this.state.name,
          error: nameError,
        }
      });
      this.setState({
        ape_pat: {
          ...this.state.ape_pat,
          error: ape_patError,
        }
      });
      this.setState({
        ape_mat: {
          ...this.state.ape_mat,
          error: ape_matError,
        }
      });
      return
    }



    let userData = {
      name: this.state.name.value,
      email: this.state.email.value,
      password: this.state.password.value,
      ape_pat: this.state.ape_pat.value,
      ape_mat: this.state.ape_mat.value,
      id_paciente: this.state.id.value,
    };
    const data = new FormData();
    data.append("id_paciente", userData.id_paciente);
    data.append("nombre", userData.name);
    data.append("ape_pat", userData.ape_pat);
    data.append("ape_mat", userData.ape_mat);
    data.append("usuario", userData.email);
    data.append("password", userData.password);

    console.log("Id: " + userData.id_paciente);
    console.log("Nombre: " + userData.name);
    console.log("Ape_pat: " + userData.ape_pat);
    console.log("Ape_mat: " + userData.ape_mat);
    console.log("Usuario: " + userData.email);
    console.log("Password: " + userData.password);

    let respnose = await API.editarPaciente(data);
    console.log(respnose.result);
    if (respnose.result == true) {
      console.log("Todo bien");
      const datalogin = new FormData();
      datalogin.append("usuario", userData.email);
      datalogin.append("password", userData.password);
      let responselogin = await API.Login(datalogin);
      if (responselogin == "no") {
        console.log("Usuario no valido");
      } else {

        this.setModalVisible(false);
        userData.id_paciente = responselogin.paciente.id_paciente;
        AsyncStorage.setItem("userData", JSON.stringify(userData));
        this.setState({
          password: {
            ...this.state.password,
            value: '',
          },
        });
        this.props.navigation.navigate("Perfil");
      }
    } else {
      if(Platform.OS=='android'){
        ToastAndroid.showWithGravityAndOffset(
          "Error al editar",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      }else{
        if(Platform.OS === 'ios'){
          Alert.alert(
            "Error",
            "Ocurrio un error al editar su usuario",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
        }
      }
      console.log("Ocurrio un error");
    }
  };

  async componentDidUpdate() {
    // let categoriasUser = await AsyncStorage.getItem('categoriasUser');
    // categoriasUser = JSON.parse(categoriasUser);
    // if (categoriasUser) {
    //   categoriasUser.forEach(element => {
    //     if (element.email == this.state.email.value) {
    //       console.log("mis catg "+element.categorias);
    //       this.setState({ categoriasAdd: element.categorias });
    //     }
    //   });
    // }
  }
  render() {
    const { modalVisible } = this.state;
    return (
      <Container>
        <Header style={{ backgroundColor: "#5699DC" }}>
          <Text style={styles.header}>Perfil</Text>
        </Header>
        <Content>
          <Title>Datos del usuario</Title>
          <Card>
            <Card.Content>
              <Title>Nombre</Title>
              <Paragraph>{this.state.name.value}</Paragraph>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Title>Apellido Paterno</Title>
              <Paragraph>{this.state.ape_pat.value}</Paragraph>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Title>Apellido Materno</Title>
              <Paragraph>{this.state.ape_mat.value}</Paragraph>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Title>Email</Title>
              <Paragraph>{this.state.email.value}</Paragraph>
            </Card.Content>
          </Card>
          <ButtonN
            mode="contained"
            onPress={() => this.props.navigation.navigate("Inicio")}
          >
            Cerrar Sesión
          </ButtonN>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              this.setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Editar Perfil</Text>
                <KeyboardAvoidingView behavior='position'
        keyboardVerticalOffset={32}>
                <TextInput
                  label="Nombre"
                  returnKeyType="next"
                  value={this.state.name.value}
                  onChangeText={(name) =>
                    this.setState({
                      name: {
                        ...this.state.name,
                        value: name,
                      },
                    })
                  }
                  error={!!this.state.name.error}
                  errorText={this.state.name.error}
                  name="name"
                />
                <TextInput
                  label="Apellido Peterno"
                  returnKeyType="next"
                  value={this.state.ape_pat.value}
                  onChangeText={(ape_pat) =>
                    this.setState({
                      ape_pat: {
                        ...this.state.ape_pat,
                        value: ape_pat,
                      },
                    })
                  }
                  error={!!this.state.ape_pat.error}
                  errorText={this.state.ape_pat.error}
                  name="ape_pat"
                />
                <TextInput
                  label="Apellido Materno"
                  returnKeyType="next"
                  value={this.state.ape_mat.value}
                  onChangeText={(ape_mat) =>
                    this.setState({
                      ape_mat: {
                        ...this.state.ape_mat,
                        value: ape_mat,
                      },
                    })
                  }
                  error={!!this.state.ape_mat.error}
                  errorText={this.state.ape_mat.error}
                  name="ape_mat"
                />
                <TextInput
                  label="Correo electronico"
                  returnKeyType="next"
                  value={this.state.email.value}
                  onChangeText={(email) =>
                    this.setState({
                      email: {
                        ...this.state.email,
                        value: email,
                      },
                    })
                  }
                  error={!!this.state.email.error}
                  errorText={this.state.email.error}
                  autoCapitalize="none"
                  autoCompleteType="email"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                />
                <TextInput
                  label="Contraseña"
                  returnKeyType="next"
                  value={this.state.password.value}
                  onChangeText={(password) =>
                    this.setState({
                      password: {
                        ...this.state.password,
                        value: password,
                      },
                    })
                  }
                  error={!!this.state.password.error}
                  errorText={this.state.password.error}
                  name="password"
                />
                </KeyboardAvoidingView>
                <ButtonN
                  style={styles.buttonOpen}
                  onPress={this.actualizardatos}
                >
                  Editar Perfil
                </ButtonN>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => this.setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Cancelar</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          <Pressable onPress={() => this.setModalVisible(true)}>
            <ButtonN mode="contained">Editar Perfil</ButtonN>
          </Pressable>
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical onPress={this.registrarCita}>
              <Icon name="newspaper" />
              <Text>Registro</Text>
            </Button>
            <Button vertical onPress={this.misCitas}>
              <Icon name="clipboard" />
              <Text>Citas</Text>
            </Button>
            <Button active vertical onPress={this.perfil}>
              <Icon name="person" />
              <Text>User</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    color: "#fff",
    textAlignVertical: "center",
    fontSize: 30,
    fontStyle: "italic",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#94E84E",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
