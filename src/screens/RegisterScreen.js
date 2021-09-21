import React, { useState } from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";

import { Input, Text, Button } from 'react-native-elements';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [direction, setDirection] = useState('');
    const [ci, setCi] = useState('');
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');

    const handleSubmit = () => {
        if (!name || !phone || !email || !direction || !ci || !password || !password1) {
            Alert.alert("Por favor llene todos los campos para registrarse");
        } else if (phone.length < 10) {
            Alert.alert("Número de celular incorrecto");
        }
        else if (ci.length < 10) {
            Alert.alert("Número de cédula incorrecto");
        }
        else if (password == password1) {
            fetch('http://ab8be0d726b87422f9d9d4eb75bee11a-215326113.us-west-1.elb.amazonaws.com:4003/clientes/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombreCliente: name,
                    cedula: ci,
                    passwordCliente: password,
                    direccionCliente: direction,
                    emailCliente: email,
                    celularCliente: phone
                })


            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.status == undefined) {
                        Alert.alert("Creación de cuenta exitosa");
                        navigation.goBack();
                    } else {
                        Alert.alert("No se pudo crear su cuenta", "Ya existe una cuenta con el número de cédula o el correo ingrasado");
                    }
                });

        } else {
            Alert.alert("Las contraseñas no coinciden");
        }
    }
    return (
        <SafeAreaView style={styles.container} >
            <ScrollView>
                <Text style={styles.title}>Información Personal</Text>

                <Input
                    maxLength={20}
                    leftIcon={{ type: 'font-awesome', name: 'user' }}
                    placeholder="Nombre y Apellido"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={name}
                    onChangeText={(newValue) => setName(newValue)}
                // onSubmitEditing={}
                />
                <Input
                    //ref="phone"
                    maxLength={10}
                    leftIcon={{ type: 'font-awesome', name: 'mobile' }}
                    style={styles.input}
                    placeholder="Celular"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={phone}
                    onChangeText={(newValue) => {
                        if (/^\d+$/.test(newValue) || newValue === '') {
                            setPhone(newValue)
                        }
                    }}
                    keyboardType="phone-pad"
                />
                <Input
                    maxLength={35}
                    leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                    style={styles.input}
                    placeholder="Email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={(newValue) => setEmail(newValue)}
                />
                <Text style={styles.title}>Información de Envío</Text>
                <Input
                    maxLength={100}
                    leftIcon={{ type: 'font-awesome', name: 'map-marker' }}
                    style={styles.input}
                    placeholder="Dirección"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={direction}
                    onChangeText={(newValue) => setDirection(newValue)}
                />
                <Text style={styles.title}>Información de Inicio de Sesión</Text>
                <Input
                    maxLength={10}
                    leftIcon={{ type: 'font-awesome', name: 'id-card' }}
                    style={styles.input}
                    placeholder="Cédula"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={ci}
                    onChangeText={(newValue) => {
                        if (/^\d+$/.test(newValue) || newValue === '') {
                            setCi(newValue)
                        }
                    }}
                    keyboardType="phone-pad"
                />
                <Input
                    maxLength={20}
                    leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    secureTextEntry={true}
                    style={styles.input}
                    placeholder="Contraseña"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={password}
                    onChangeText={(newValue) => setPassword(newValue)}
                />
                <Input
                    maxLength={20}
                    leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    secureTextEntry={true}
                    style={styles.input}
                    placeholder="Confirmar contraseña"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={password1}
                    onChangeText={(newValue) => setPassword1(newValue)}
                />
                <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
                    <Text style={styles.sendButton}>Registrase</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        flex: 1,
        // flexDirection: "column",
        justifyContent: "space-around",
    },
    input: {
    },
    loginButton: {
        alignItems: "center",
        backgroundColor: "#FF6D4D",
        margin: 12,
        padding: 10
    },
    title: {
        marginLeft: 5,
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10
    },
    sendButton: {
        color: "white"
    }
});

export default RegisterScreen;
