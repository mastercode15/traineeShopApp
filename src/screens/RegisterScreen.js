import React, { useState } from 'react';
import { SafeAreaView, Button, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [direction, setDirection] = useState('');
    const [ci, setCi] = useState('');
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');

    const handleSubmit = () => {
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

        }).then(response => response.json()).then(data => { console.log(data); alert(data) });
    }
    return (
        <SafeAreaView style={styles.container} >
            <Text style={styles.title}>Información Personal</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre y Apellido"
                autoCapitalize="none"
                autoCorrect={false}
                value={name}
                onChangeText={(newValue) => setName(newValue)}
            />
            <TextInput
                style={styles.input}
                placeholder="Celular"
                autoCapitalize="none"
                autoCorrect={false}
                value={phone}
                onChangeText={(newValue) => setPhone(newValue)}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={(newValue) => setEmail(newValue)}
            />
            <Text style={styles.title}>Información de Envío</Text>
            <TextInput
                secureTextEntry={true}
                style={styles.input}
                placeholder="Dirección"
                autoCapitalize="none"
                autoCorrect={false}
                value={direction}
                onChangeText={(newValue) => setDirection(newValue)}
            />
            <Text style={styles.title}>Información de Inicio de Sesión</Text>
            <TextInput
                secureTextEntry={true}
                style={styles.input}
                placeholder="Cédula"
                autoCapitalize="none"
                autoCorrect={false}
                value={ci}
                onChangeText={(newValue) => setCi(newValue)}
            />
            <TextInput
                secureTextEntry={true}
                style={styles.input}
                placeholder="Contraseña"
                autoCapitalize="none"
                autoCorrect={false}
                value={password}
                onChangeText={(newValue) => setPassword(newValue)}
            />
            <TextInput
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
});

export default RegisterScreen;
