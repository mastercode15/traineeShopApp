import React, {useState} from 'react';
import { View, TextInput, StyleSheet, Text, Picker, Button } from 'react-native';

const PayPage = () => {
    const [selectedType, setSelectedType] = useState("banks");
    const [selectedBank, setSelectedBank] = useState("bank1");

    return (
        <View>
            <Text>Dirección:</Text>
            <TextInput maxLength={100} placeholder="Escriba la dirección para la factura"/>

            <Text>Valor a pagar:</Text>
            <TextInput value = "$150.00" editable = {false} />

            <Text>Tipo de pago:</Text>
            <Picker selectedValue = {selectedType} onValueChange={(itemValue, itemIndex) => setSelectedType(itemValue)}>
                <Picker.Item label="Transferencia Bancaria" value="banks" />
                <Picker.Item label="Tarjeta Débito/Crédito" value="cards" />
            </Picker>

            <Text>Seleccione Banco/Proveedor:</Text>
            <Picker selectedValue = {selectedBank} onValueChange={(itemValue, itemIndex) => setSelectedBank(itemValue)}>
                <Picker.Item label="Banco A" value="bank1" />
                <Picker.Item label="Banco B" value="card2" />
                <Picker.Item label="Banco C" value="card3" />
            </Picker>

            <Text>Ingrese su cuenta o tarjeta:</Text>
            <TextInput maxLength={16} keyboardType={'numeric'} placeholder="Ej: 1000000000 / 4500123412341234"/>

            <Button title="Verificar" />

            <Button title="Pagar" />

        </View>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        marginVertical: 50
    }
});

export default PayPage;
