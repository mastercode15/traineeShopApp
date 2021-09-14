import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, Image, Button, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";

const LoginScreen = ({ navigation }) => {
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
        else if (password != 0) {

            fetch('http://54.221.130.211:4005/clientes/login/' + ci + "/" + password, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },

            })
                .then(response => response.json())

                .then((respuestaJson) => {
                    console.log(respuestaJson);
                    if(respuestaJson.status == undefined){
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
                    source={{ uri: "https://lh3.googleusercontent.com/fife/AAWUweX136kdACYIe1jDdaeldiMtZbpcWpjMq3Lwxqt9m-9YWrYmT49Z-e2aKEXfsUubAE3-3KrvkBZei5HLwrjFdmJ3uf1BlLGB67JQlla4V7xT3snaeJC5_WdNU4YAIwKAw6x-ETsX2RKq02cpFHdzRIRnB52XVXiXmXN0QUgqu0ESPqCDvzgs36vkstKcer2DDHLlQA3A_s1JoYeoFIQn4hR8O4UAcvlJjbPsJski5VLVj3-NJbOoJmEb9dIktQ94qxvVQqTkuvg1lkc2la9-5j2A7bZM-aP2IcOo3JVRXy1klgRkgc6nl4RMiXybhWamhxnijADF5wWK_K_lMQ01ZbcWQTO4B-IqCqAnA7VqTvMA8oK3LxvntGU0MWwVXGPLSrvCMVx30VvfsdXSSou6PITk48PKIzvhXCZUgktYsWe9UEYSDo2I0_Mkq_iFTDQI1FwwDVbAQgL6WEleq7W6a92N84frnA58JEeEFAxzBeh2gVQG9tg4B-DE_5EwHKhAsEaDdVLkEfh3XklbId0HRd0tWw-ppj6hTujdqTzLmkyOl6COa3YhLKvTzH0PWGy5h-PtgdApw34d7GUcDV_J39ifCboZpP3Lt1xW-QRi4smWrVdwVLEoAYZJB6QddfPWjcYlnt7_64xm05D2pLUEsEbIb3wwmEhFXGByZwbwkyrt5IcFl79CSdfbv0mqahOCihoWH5w7BDLDyp2EdBC1qe6UB8sbFikZpg=w1920-h830-ft" }}

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
