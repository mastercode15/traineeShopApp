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
<<<<<<< HEAD
                onPress={() => navigation.navigate('Monitor')}
                title="Monitor"
=======
                onPress={() => navigation.navigate('Market')}
                title="Market"
>>>>>>> 4e7676389b62ec8ba1eec78287aed4587038b22a
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