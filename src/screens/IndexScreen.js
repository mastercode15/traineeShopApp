import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';

const IndexScreen = ({ navigation }) => {
    return (
        <View>
            <Text style={styles.text}>(Aquí iría el carrito de pago)</Text>
            <Button
                onPress={() => navigation.navigate('Payment')}
                title="Pagar"
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
