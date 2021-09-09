import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";

const RegisterScreen = ({navigation}) => {
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
            fetch('http://34.227.98.168:4003/clientes/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombreCliente: name,
                    cedula: ci,
                    passwordCliente: password,
                    direccionCliente: direction
                })


            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.status == undefined) {
                        Alert.alert("Creación de cuenta exitosa");
                    } else {
                        Alert.alert("No se pudo crear su cuenta", "Ya existe una cuenta con el número de cédula ingrasado");
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
                <TextInput
                    maxLength={20}
                    style={styles.input}
                    placeholder="Nombre y Apellido"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={name}
                    onChangeText={(newValue) => setName(newValue)}
                />
                <TextInput
                    maxLength={10}
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
                <TextInput
                    maxLength={35}
                    style={styles.input}
                    placeholder="Email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={(newValue) => setEmail(newValue)}
                />
                <Text style={styles.title}>Información de Envío</Text>
                <TextInput
                    maxLength={100}
                    style={styles.input}
                    placeholder="Dirección"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={direction}
                    onChangeText={(newValue) => setDirection(newValue)}
                />
                <Text style={styles.title}>Información de Inicio de Sesión</Text>
                <TextInput
                    maxLength={10}
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
                <TextInput
                    maxLength={20}
                    secureTextEntry={true}
                    style={styles.input}
                    placeholder="Contraseña"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={password}
                    onChangeText={(newValue) => setPassword(newValue)}
                />
                <TextInput
                    maxLength={20}
                    secureTextEntry={true}
                    style={styles.input}
                    placeholder="Confirmar contraseña"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={password1}
                    onChangeText={(newValue) => setPassword1(newValue)}
                />
                <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
                    <Text style={styles.loginText}>Iniciar sesión</Text>
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
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    loginButton: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        margin: 12,
        padding: 10
    },
    title: {
        marginLeft: 12,
        fontSize: 20,
        fontWeight: "bold"
    }
});

export default RegisterScreen;
