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
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    }
});

export default IndexScreen;
