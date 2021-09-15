import React, {  useState } from 'react';
import { SafeAreaView,  Image,  StyleSheet, ScrollView, Alert, View } from "react-native";
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
                    source={{ uri: "https://southcentralus1-mediap.svc.ms/transform/thumbnail?provider=spo&inputFormat=png&cs=fFNQTw&docid=https%3A%2F%2Fudlaec-my.sharepoint.com%3A443%2F_api%2Fv2.0%2Fdrives%2Fb!Y7YUHgYySEqIHeEcCzRo6FwccGidoi1Iuc4VDVVw6ymhAQ0I_p25S5OzrwpMahut%2Fitems%2F01J72QG4YXSIKWXQ57RFHIDP2K5DGGEPIX%3Fversion%3DPublished&access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvdWRsYWVjLW15LnNoYXJlcG9pbnQuY29tQDU4NWE0ZDkyLWRiMWQtNGJiYi1iNWFjLWM1Mjk5ZTM4OTRlMyIsImlzcyI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMCIsIm5iZiI6IjE2MzE3MTgwMDAiLCJleHAiOiIxNjMxNzM5NjAwIiwiZW5kcG9pbnR1cmwiOiJjd0tENHRaenRIOW9ieTk0cFNMTXZFSDd2cnAzeDA4NlZFM04yOGtrWnlrPSIsImVuZHBvaW50dXJsTGVuZ3RoIjoiMTE2IiwiaXNsb29wYmFjayI6IlRydWUiLCJ2ZXIiOiJoYXNoZWRwcm9vZnRva2VuIiwic2l0ZWlkIjoiTVdVeE5HSTJOak10TXpJd05pMDBZVFE0TFRnNE1XUXRaVEV4WXpCaU16UTJPR1U0IiwibmFtZWlkIjoiMCMuZnxtZW1iZXJzaGlwfHVybiUzYXNwbyUzYWFub24jMTNmZDIwMTk5MTIwZDQ5YzUxMjdhYmVhMWQ0NjZkNTdhNjIxYWJlYjk4NDJmMjc5NTJkY2MzNDcyZTczODYyYyIsIm5paSI6Im1pY3Jvc29mdC5zaGFyZXBvaW50IiwiaXN1c2VyIjoidHJ1ZSIsImNhY2hla2V5IjoiMGguZnxtZW1iZXJzaGlwfHVybiUzYXNwbyUzYWFub24jMTNmZDIwMTk5MTIwZDQ5YzUxMjdhYmVhMWQ0NjZkNTdhNjIxYWJlYjk4NDJmMjc5NTJkY2MzNDcyZTczODYyYyIsInNoYXJpbmdpZCI6InprdzB2dUEyVFVHQ1orWCtZZE1iR2ciLCJ0dCI6IjAiLCJ1c2VQZXJzaXN0ZW50Q29va2llIjoiMiJ9.WFJNSHNCeWVDQnA1anEyU3ExUzR2VUlNMzdONSttRmRLRjZFUURsM3pMOD0&cTag=%22c%3A%7B6B159217-BFC3-4E89-81BF-4AE8CC623D17%7D%2C1%22&encodeFailures=1&width=1600&height=755&srcWidth=&srcHeight=" }}
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
                        buttonStyle={{borderRadius: 10, marginLeft: 10, marginRight: 10, marginBottom: 20, marginTop: 30, backgroundColor:'#FF6666', width: 150, height: 50,  alignSelf: "center" }}
                    />
                    <Button
                        onPress={() => navigation.navigate('Register')}
                        title="Registro"
                        buttonStyle={{borderRadius: 10, marginLeft: 10, marginRight: 10, marginBottom: 15, marginTop: 30, backgroundColor:'#000000', width: 150, height: 50, alignSelf: "center"}}
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
