import React, {useState} from 'react';
import { View, TextInput, StyleSheet, Text, Picker, Button, Modal, Pressable, CheckBox } from 'react-native';

//Local payments saved for testing purpouses
const savedpays = [{type : 0, bid: 0, foot : "1234"},{type : 1, bid: 0, foot : "5678"}];

//La aplicación en sí
const PayPage = () => {
    const [selectedType, setSelectedType] = useState("banks");
    const [selectedBank, setSelectedBank] = useState("bank1");
    const [modalOpen, setModalOpen] = useState(false);
    const [btnDis, setBtnDis] = useState(false);
    const [saveCheck, setSaveCheck] = useState(false);
    const [putPM, setPutPM] = useState(true);
    const [selPay, setSelPay] = useState(0);

    //Funcion para mostar metodos de pago guardados, si esque existen
    const savedPM = () => {

      if (!putPM && savedpays.length > 0){

        const list = []

        for (var i = 0; i < savedpays.length; i++){
          const acc = savedpays[i];
          const head = acc.type === 0 ? "Cuenta " : "Tarjeta ";
          const body = "del " + (acc.bid === 0 ? "Banco A" : (acc.bid === 1 ? "Banco B" : "Banco C"));
          const foot = " que termina en " + acc.foot;
          list.push(<Picker.Item label={head+body+foot} value={i} />)
        }

        return (
          <View>
            <Text>Métodos de pago guardados</Text>
              <Picker selectedValue = {selPay} onValueChange={(itemValue, itemIndex) => setSelPay(itemValue)}>
                {list}
              </Picker>
            <Button onPress={() => {setPutPM(true);}} title="Añadir nuevo método de pago"/>
          </View>
        )
      }
    }

    //Funcion para añadir un nuevo método de pago
    const newPM = () => {

      const savedP = []

      if(savedpays.length > 0)
        savedP.push(<Button onPress={() => {setPutPM(false);}} title="Usar métodos de pago guardados"/>)

      if (putPM){
        return(
          <View>
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
            <CheckBox value={saveCheck} onValueChange={setSaveCheck} />
            <Text>Guardar método de pago</Text>  

            {savedP}         

          </View>
        )
      }
    }


    //La página en sí
    return (
        <View>
        
            <Modal animationType="slide" transparent={true} visible={modalOpen} onRequestClose={() => { setModalOpen(!modalOpen); }}> 
              <View>
                <Text>Aquí sale el mensaje sobre el método de pago</Text>
                <Pressable onPress={() => {setModalOpen(!modalOpen);setBtnDis(!btnDis);}}>
                  <Text>OK</Text>
                </Pressable>
              </View>
            </Modal>

            <Text>Dirección:</Text>
            <TextInput maxLength={100} placeholder="Escriba aquí la dirección para la factura"/>

            <Text>Valor a pagar:</Text>
            <TextInput value = "$150.00" editable = {false} />

            {savedPM()}

            {newPM()}

            <Button disabled = {btnDis} onPress={() => {setModalOpen(!modalOpen);setBtnDis(!btnDis);}} title="Realizar pago" />

        </View>
    );
};

export default PayPage;
