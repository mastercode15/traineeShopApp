import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, Image, Button, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";

const LoginScreen = ({navigation}) => {
    const [ci, setCi] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState([])
    const handleSubmit = () => {
        if ( !ci || !password ) {
            alert("Por favor llene todos los campos");
        }
        else if (ci.length > 10) {
            alert("contraseña y/o usuario incorrecto");
        }
        else if (password != 0 ) {

            fetch('http://54.221.130.211:4005/clientes/login/'+  ci +"/"+ password, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },

            })
                .then(response => response.json())
                .then((respuestaJson) => {
                    setLogin(respuestaJson);
                    if(respuestaJson != null){
                        navigation.navigate('Market', {login: respuestaJson})
                    }else{
                        alert("contraseña y/o usuario incorrecto");
                    }

                });


        }
    }
    return (

        <SafeAreaView style={styles.container} >
            <ScrollView>

            <Image
        style={styles.tinyLogo}
        source={require('./image/logo.png')}
      />


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
                 
                <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
                    <Text style={styles.loginText}>Iniciar sesión</Text>
                </TouchableOpacity>
                <Button
                onPress={() => navigation.navigate('Register')}
                title="Registro"
            />
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
    tinyLogo: {
        alignSelf: "center",
        width: 300,
        height: 200,
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

export default LoginScreen;
