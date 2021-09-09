import React, {useState} from 'react';
import { View, TextInput, StyleSheet, Text, Picker, Modal, TouchableOpacity, CheckBox, SafeAreaView } from 'react-native';
import { NavigationEvents } from 'react-navigation';

//Local payments saved for testing purpouses
const savedpays = [{type : 0, bid: 0, foot : "1234"},{type : 1, bid: 0, foot : "5678"}];
const defaultmsg = "Ingresar mensaje aquí";

//La aplicación en sí
const PayPage = () => {
    const [selectedType, setSelectedType] = useState("banks");
    const [selectedBank, setSelectedBank] = useState("bank1");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMsg, setModalMsg] = useState(defaultmsg);
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
          list.push(<Picker.Item label={head+body+foot} value={i} key={i}/>)
        }

        return (
          <View>
            <Text>Métodos de pago guardados</Text>
              <Picker selectedValue = {selPay} onValueChange={(itemValue, itemIndex) => setSelPay(itemValue)}>
                {list}
              </Picker>

            <TouchableOpacity style={!btnDis ? styles.spaybtn_style : styles.spaybtn_dis_style} disabled = {btnDis} onPress={() => {setPutPM(true);}} >
              <Text style= {styles.paytxt_style}>Añadir nuevo método de pago</Text>
            </TouchableOpacity>
          </View>
        )
      }
    }

    //Funcion para añadir un nuevo método de pago
    const newPM = () => {

      const savedP = []

      if(savedpays.length > 0)
        savedP.push(
          //<Button onPress={() => {setPutPM(false);}} title="Usar métodos de pago guardados"/>
          <TouchableOpacity style={!btnDis ? styles.spaybtn_style : styles.spaybtn_dis_style} disabled = {btnDis} onPress={() => {setPutPM(false);}} >
            <Text style= {styles.paytxt_style}>Métodos de pago guardados</Text>
          </TouchableOpacity>
        );

      if (putPM){
        return(
          <View>
            <Text>Tipo de pago:</Text>
            <Picker selectedValue = {selectedType} onValueChange={(itemValue, itemIndex) => setSelectedType(itemValue)}>
                <Picker.Item label="Transferencia Bancaria" value="banks" key="banks"/>
                <Picker.Item label="Tarjeta Débito/Crédito" value="cards" key="cards"/>
            </Picker>

            <Text>Seleccione Banco/Proveedor:</Text>
            <Picker selectedValue = {selectedBank} onValueChange={(itemValue, itemIndex) => setSelectedBank(itemValue)}>
              <Picker.Item label="Banco A" value="bank1" key="bank1"/>
              <Picker.Item label="Banco B" value="bank2" key="bank2"/>
              <Picker.Item label="Banco C" value="bank3" key="bank3"/>
            </Picker>

            <Text>Ingrese su cuenta o tarjeta:</Text>
            <TextInput maxLength={16} keyboardType={'numeric'} placeholder="Ej: 1000000000 / 4500123412341234"/>
            
            <View style={{flexDirection:"row", alignItems:"center"}}>
              <CheckBox value={saveCheck} onValueChange={setSaveCheck}/>
              <Text >Guardar método de pago</Text>
            </View>  

            {savedP}         

          </View>
        )
      }
    }


    //La página en sí
    return (
        <SafeAreaView style={{backgroundColor: "#FFFFFF", flex:1}}>
        
            <Modal animationType="fade" transparent={true} visible={modalOpen} onRequestClose={() => { setModalOpen(!modalOpen); }}> 
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>{modalMsg}</Text>
                        <Text></Text> 
                        <TouchableOpacity style={styles.modalbtn_style} onPress={() => {setModalOpen(!modalOpen);setBtnDis(!btnDis);}} >
                            <Text style= {styles.modaltxt_style}>Entendido</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Text>Nombre del cliente:</Text>
            <TextInput value = "Danu Jhonson" editable = {false} />

            <Text>Dirección:</Text>
            <TextInput maxLength={100} placeholder="Escriba aquí la dirección para la factura"/>

            <Text>Valor a pagar:</Text>
            <TextInput value = "$150.00" editable = {false} />

            {savedPM()}

            {newPM()}


            <TouchableOpacity style={!btnDis ? styles.paybtn_style : styles.paybtn_dis_style} disabled = {btnDis} onPress={() => {setModalOpen(!modalOpen);setBtnDis(!btnDis);}} >
                <Text style= {styles.paytxt_style}>Realizar el pago</Text>
            </TouchableOpacity>


        </SafeAreaView>
    );
};

//2196F3
//Cambiaras acorde, ya que hay valores sacados del internet
const styles = StyleSheet.create({
    paybtn_style: {
      marginHorizontal: '27.5%',
      marginVertical: 5,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F337C2FF",
      width: '45%',
      height: 50,
    },
    paybtn_dis_style: {
      marginHorizontal: '27.5%',
      marginVertical: 5,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F337C211",
      width: '45%',
      height: 50,
    },

    spaybtn_style: {
      marginHorizontal: '15%',
      marginVertical: 15,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#2196F3FF",
      width: '70%',
      height: 50,
    },
    spaybtn_dis_style: {
      marginHorizontal: '15%',
      marginVertical: 15,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#2196F311",
      width: '70%',
      height: 50,
    },

    paytxt_style: {
      fontSize: 17,
      color: "#FFFFFF"
    },

    modalbtn_style: {
      marginHorizontal: '25%',
      marginVertical: 10,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F337C2",
      width: 100,
      height: 45,
    },
    modaltxt_style: {
      fontSize: 15,
    },
    centeredView: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: '50%'
    },
    modalView: {
      margin: 30,
      backgroundColor: "#FFFFFFDD",
      borderRadius: 25,
      padding: 35,
      alignItems: "center",
    },
});


export default PayPage;
