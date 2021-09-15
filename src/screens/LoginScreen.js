import React, {  useState } from 'react';
import { SafeAreaView,  Image,  StyleSheet, ScrollView, Alert } from "react-native";
import { Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = ({ navigation }) => {
    const [ci, setCi] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState([])
    const handleSubmit = () => {

        if ( !ci || !password ) {
            Alert.alert("Por favor llene todos los campos");

        }
        else if (ci.length > 10) {
            Alert.alert("contraseña y/o usuario incorrecto");
        }
        else if (password != 0) {

            fetch('http://a3d60ef8193dd4fd68ff8781f2c4e0be-1837864183.us-west-1.elb.amazonaws.com:4005/clientes/login/' + ci + "/" + password, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },

            })
                .then(response => response.json())

                .then((respuestaJson) => {
                    console.log(respuestaJson);
                    if(respuestaJson != null){
                        navigation.navigate('Market', {login: respuestaJson})

                    }else{

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
                    source={{ uri: "https://lh3.googleusercontent.com/fife/AAWUweX136kdACYIe1jDdaeldiMtZbpcWpjMq3Lwxqt9m-9YWrYmT49Z-e2aKEXfsUubAE3-3KrvkBZei5HLwrjFdmJ3uf1BlLGB67JQlla4V7xT3snaeJC5_WdNU4YAIwKAw6x-ETsX2RKq02cpFHdzRIRnB52XVXiXmXN0QUgqu0ESPqCDvzgs36vkstKcer2DDHLlQA3A_s1JoYeoFIQn4hR8O4UAcvlJjbPsJski5VLVj3-NJbOoJmEb9dIktQ94qxvVQqTkuvg1lkc2la9-5j2A7bZM-aP2IcOo3JVRXy1klgRkgc6nl4RMiXybhWamhxnijADF5wWK_K_lMQ01ZbcWQTO4B-IqCqAnA7VqTvMA8oK3LxvntGU0MWwVXGPLSrvCMVx30VvfsdXSSou6PITk48PKIzvhXCZUgktYsWe9UEYSDo2I0_Mkq_iFTDQI1FwwDVbAQgL6WEleq7W6a92N84frnA58JEeEFAxzBeh2gVQG9tg4B-DE_5EwHKhAsEaDdVLkEfh3XklbId0HRd0tWw-ppj6hTujdqTzLmkyOl6COa3YhLKvTzH0PWGy5h-PtgdApw34d7GUcDV_J39ifCboZpP3Lt1xW-QRi4smWrVdwVLEoAYZJB6QddfPWjcYlnt7_64xm05D2pLUEsEbIb3wwmEhFXGByZwbwkyrt5IcFl79CSdfbv0mqahOCihoWH5w7BDLDyp2EdBC1qe6UB8sbFikZpg=w1920-h830-ft" }}

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
                <Button
                   onPress={handleSubmit}
                    title="Iniciar sesión"
                    buttonStyle={{borderRadius: 10, marginLeft: 10, marginRight: 10, marginBottom: 20, backgroundColor:'#F337C2', width: 200,height: 30,  alignSelf: "center" }}
                />

                <Button
                    onPress={() => navigation.navigate('Register')}
                    title="Registro"
                    buttonStyle={{borderRadius: 10, marginLeft: 10, marginRight: 10, marginBottom: 15, backgroundColor:'#000000', width: 100,height: 30, alignSelf: "center"}}
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
        padding: 10,

    },
    title: {
        marginLeft: 12,
        fontSize: 20,
        fontWeight: "bold"
    }
});

export default LoginScreen;
