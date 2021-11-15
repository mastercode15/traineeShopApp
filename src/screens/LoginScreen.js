import React, { useState } from 'react';
import { SafeAreaView, Image, StyleSheet, ScrollView, Alert, View } from "react-native";
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = ({ navigation }) => {
    const [ci, setCi] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState([])
    const handleSubmit = () => {

        if (!ci || !password) {
            Alert.alert("Por favor llene todos los campos");

        }
        else if (ci.length > 10) {
            Alert.alert("contraseña y/o usuario incorrecto");
        }
        else if (password != 0) {

            fetch('http://ab4e31fc37b904197aff9ec9a1204cef-937989777.us-east-1.elb.amazonaws.com:4005/clientes/login/' + ci + "/" + password, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },

            })
                .then(response => response.json())

                .then((respuestaJson) => {
                    console.log(respuestaJson);
                    if (respuestaJson != null) {
                        navigation.navigate('Market', { login: respuestaJson })

                    } else {

                        Alert.alert("contraseña y/o usuario incorrecto");
                    }


                });



        }
    }
    return (

        <SafeAreaView style={styles.container} key='login' >
            <ScrollView>

                <Image
                    style={styles.tinyLogo}
                    source={{ uri: "https://scontent.fuio1-2.fna.fbcdn.net/v/t39.30808-6/242192074_4353530924695055_1133008269259118753_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeH1tJW_Z9YsDbITxzL0BK5ReUlXfTXPzSJ5SVd9Nc_NItebx9FHVTXxRA3sbstTV6A82tuFPhd2AyMdadhZlhJU&_nc_ohc=bQfY-2Z0Af8AX9BoBWd&_nc_ht=scontent.fuio1-2.fna&oh=509be03104f70c7608fab24509d92294&oe=61973D9A" }}
                />
                <Input
                    maxLength={10}

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
                    leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color='black'
                        />
                    }
                />
                <Input
                    maxLength={20}
                    secureTextEntry={true}

                    placeholder="Contraseña"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={password}
                    onChangeText={(newValue) => setPassword(newValue)}
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color='black'
                        />
                    }
                />
                <View style={styles.fixToText}>
                    <Button
                        onPress={handleSubmit}
                        title="Iniciar sesión"
                        buttonStyle={{ borderRadius: 10, marginLeft: 10, marginRight: 10, marginBottom: 20, marginTop: 30, backgroundColor: '#FF6666', width: 150, height: 50, alignSelf: "center" }}
                    />
                    <Button
                        onPress={() => navigation.navigate('Register')}
                        title="Registro"
                        buttonStyle={{ borderRadius: 10, marginLeft: 10, marginRight: 10, marginBottom: 15, marginTop: 30, backgroundColor: '#000000', width: 150, height: 50, alignSelf: "center" }}
                    />
                </View>

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
        marginTop: 150,
        marginBottom: 50,
        alignSelf: "center",
        width: 250,
        height: 250,
    },
    loginButton: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        margin: 12,
        padding: 10,

    },
    title: {
        marginLeft: 12,
        fontSize: 20,
        fontWeight: "bold"
    },
    fixToText: {
        flexDirection: 'row',
        alignSelf: "center",
    },
});

export default LoginScreen;
