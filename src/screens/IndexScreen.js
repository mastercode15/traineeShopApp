import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';

const IndexScreen = ({ navigator}) => {
    return (
        <View>
            <Text style={styles.text}>(Aquí iría el carrito de pago)</Text>
            <Button
                onPress={() => navigation.navigate('Pagos')}
                title="Pagar"
            />
            <Button
                onPress={() => navigation.navigate('Login')}
                title="Login"
            />
                <Button
                onPress={() => navigation.navigate('Market')}
                title="Market"
            />
            <Button
                onPress={() => navigation.navigate('CarritoScreen')}
                title="CarritoScreen"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    }
});

export default IndexScreen;