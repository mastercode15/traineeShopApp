import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';

const IndexScreen = ({ navigation }) => {
    return (
        <View>
            <Text style={styles.text}>Hi there!</Text>
            <Button
                onPress={() => navigation.navigate('Register')}
                title="Registro"
            />
            <Button
                onPress={() => navigation.navigate('Login')}
                title="Login"
            />
                <Button
                onPress={() => navigation.navigate('Market')}
                title="Market"
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