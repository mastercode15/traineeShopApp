import React, {useState} from 'react';
import { View, TextInput, StyleSheet, Text, Picker, Modal, TouchableOpacity, SafeAreaView, LogBox } from 'react-native';
import { NavigationEvents } from 'react-navigation';

//Local payments saved for testing purpouses
const savedpays = [];

const modalTypes = {'OK':0,'NOUSER':1,'IERROR':2,'NOBANK':3,'NOFUNDS':4,'TERROR':5,'NOMARKET':6};
const payType = {'banks':0,'cards':1}
const payBank = {'bank1':0,'bank2':1,'bank3':2}

//const delay = ms => new Promise(res => setTimeout(res, ms));

const bAPIUH = "http://18.220.242.63:5000/users?token="
const bAPIPH = "http://18.220.242.63:5000/pays?token="

const mAPIBH = "http://a023291782606449f9d8c725d620b519-1771971827.us-west-1.elb.amazonaws.com:8081/api/crearfactura?"
const mAPIDH = "http://a023291782606449f9d8c725d620b519-1771971827.us-west-1.elb.amazonaws.com:8081/api/creardetalle/?"

const defaultmsg = "Ingresar mensaje aquí";
const noFillmsg = "Llene todos los campos que faltan";
const badAcc = "Cuenta de contener 10 dígitos";
const badCard = "Tarjeta de contener 16 dígitos";

const succMsg = "Su compra se ha realizado con éxito";

const noUser = "Usuario o cuenta/tarjeta no existen";
const intError = "Error interno del sistema"
const noBank = "Error al contactar al banco"
const noFunds = "No tiene fondos suficientes para esta compra"
const tranError = "El método de pago ha sido rechazado"
const noMarket = "El mercado no se encuentra disponible"

const accReg = /^\d{10}$/;
const cardReg = /^\d{16}$/;

//La aplicación en sí
const PayPage = ({navigation}) => {
    const [selectedType, setSelectedType] = useState("banks");
    const [selectedBank, setSelectedBank] = useState("bank1");
    const [modalOpen, setModalOpen] = useState(false);
    const [btnDis, setBtnDis] = useState(false);
    const [saveCheck, setSaveCheck] = useState(false);
    const [putPM, setPutPM] = useState(true);
    const [selPay, setSelPay] = useState(0);

    const [usrAddr, setUsrAddr] = useState("");
    const [usrAcc, setUsrAcc] = useState("");
    const [modalMsg, setModalMsg] = useState(defaultmsg);

    
    const savedPrice = navigation.state.params.total;
    const savedMark = navigation.state.params.idSuper;
    const savedID = navigation.state.params.login['clienteId'];
    const savedDNI = navigation.state.params.login['cedula'];
    const savedName = navigation.state.params.login['nombreCliente'];
    const proList = navigation.state.params.resultado; //Array of dicts
    
    LogBox.ignoreAllLogs();

    /*
    const savedPrice = 12.50;
    const savedMark = 1;
    const savedID = 1;
    const savedDNI = "0603420563";
    const savedName = "Danu Jhonson"
    const proList = null; //Array of dicts
    */

    //console.log(savedPrice, savedMark, savedID, savedDNI, proList);

    //Revisa si al ingresar un nuevo metodo de pago se han llenado los campos correctamente
    const frontCheck = () => {
      if (usrAddr.trim() == "" || usrAcc.trim() == ""){
        setModalMsg(noFillmsg);
        return false;
      }
      
      if (selectedType === "banks" && !accReg.test(usrAcc.trim())){
        setModalMsg(badAcc);
        return false;
      }
      
      if (selectedType === "cards" && !cardReg.test(usrAcc.trim())){
        setModalMsg(badCard);
        return false;
      }
      
      return true;

    }

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
            <Text style={styles.labeltxt_style}>Métodos de pago guardados</Text>
              <Picker enabled ={!btnDis} selectedValue = {selPay} onValueChange={(itemValue, itemIndex) => setSelPay(itemValue)}>
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

      if(savedpays.length > 0){
        //savedP.push(<Text />)
        savedP.push(
          //<Button onPress={() => {setPutPM(false);}} title="Usar métodos de pago guardados"/>
          <TouchableOpacity style={!btnDis ? styles.spaybtn_style : styles.spaybtn_dis_style} disabled = {btnDis} onPress={() => {setPutPM(false);}} >
            <Text style= {styles.paytxt_style}>Métodos de pago guardados</Text>
          </TouchableOpacity>
        );
      }
      else{
        savedP.push(<Text key="Pay"/>)
      }

      if (putPM){
        return(
          <View>
            <Text style={styles.labeltxt_style}>Tipo de pago:</Text>
            <Picker enabled ={!btnDis} selectedValue = {selectedType} onValueChange={(itemValue, itemIndex) => setSelectedType(itemValue)}>
                <Picker.Item label="Transferencia Bancaria" value="banks" key="banks"/>
                <Picker.Item label="Tarjeta Débito/Crédito" value="cards" key="cards"/>
            </Picker>
            <Text />

            <Text style={styles.labeltxt_style}>Seleccione Banco/Proveedor:</Text>
            <Picker enabled ={!btnDis} selectedValue = {selectedBank} onValueChange={(itemValue, itemIndex) => setSelectedBank(itemValue)}>
              <Picker.Item label="Banco A" value="bank1" key="bank1"/>
              <Picker.Item label="Banco B" value="bank2" key="bank2"/>
              <Picker.Item label="Banco C" value="bank3" key="bank3"/>
            </Picker>
            <Text />

            <Text style={styles.labeltxt_style}>Ingrese su cuenta o tarjeta:</Text>
            <TextInput editable ={!btnDis} onChangeText={(value) => setUsrAcc(value)} maxLength={16} keyboardType={'numeric'} placeholder="Ej: 1000000000 / 4500123412341234"/>
            <Text />

            {savedP}         

          </View>
        )
      }
    }

    /*
    
    <View style={{flexDirection:"row", alignItems:"center"}}>
              <CheckBox disabled ={btnDis} value={saveCheck} onValueChange={setSaveCheck}/>
              <Text >  Guardar método de pago para futuro uso</Text>
            </View>  
    
    */

    const rndBill = () =>{
      return Math.floor(Math.random() * 9901 + 100)
    }

    const modalRaise = (code) => {
      
      if(code == 0)
        setModalMsg(succMsg);
      else if (code == 1)
        setModalMsg(noUser);
      else if (code == 2)
        setModalMsg(intError);
      else if (code == 3)
        setModalMsg(noBank)
      else if (code == 4)
        setModalMsg(noFunds)
      else if (code == 5)
        setModalMsg(tranError)
      else if (code == 6)
        setModalMsg(noMarket)

      setModalOpen(true);
    }

    const valStart = () =>{
      setBtnDis(true);
      if (!frontCheck()){
        setModalOpen(true);
        return;
      }
      else{
        
        if (putPM)
          valUsers();
        else
          valPays("");
      }
    }

    const valUsers = () => {

      var code;

      fetch(bAPIUH+"0"+payType[selectedType]+payBank[selectedBank]+"-"+savedDNI+"-"+usrAcc, {method: 'GET'})
      .then((response) => {
        code = response.status;
        response.json().then()
        .then( (data) => {
          if(code == 200) valPays(data.token); 
          else if (code == 404) modalRaise(modalTypes['NOUSER']);
          else if (code == 400) modalRaise(modalTypes['IERROR'])
          else modalRaise(modalTypes['NOBANK']);});
      })
      .catch((error) => {
        //Esto es que no se puede conectar al banco
        //console.error('Error:', error);
        modalRaise(modalTypes['NOBANK']);
      });

    }

    const valPays = (token) => {

      var code;
      
      var url = bAPIPH+(savedMark - 1)+payType[selectedType]+payBank[selectedBank]+"-"+token+"-"+savedPrice;

      if(!putPM && savedpays.length > 0)
        url = bAPIPH+(savedMark - 1)+savedpays[selPay]['type']+savedpays[selPay]['bid']+"-"+savedpays[selPay]['token']+"-"+savedPrice;

      fetch(url, {method: 'POST'})
      .then((response) => {
        code = response.status;
        response.json().then()
        .then( (data) => {
          if(code == 200) valBill(); 
          else if (code == 404) {
            if (data.code == 1) modalRaise(modalTypes['NOFUNDS']);
            else if (data.code == 2) modalRaise(modalTypes['NOUSER']);
            else modalRaise(modalTypes['TERROR']);
          }
          else if (code == 400) modalRaise(modalTypes['IERROR']);
          else modalRaise(modalTypes['NOBANK']);});
      })
      .catch((error) => {
        //Esto es que no se puede conectar al banco
        //console.error('Error:', error);
        modalRaise(modalTypes['NOBANK']);
      });

    }

    const valBill = () => {

      const billNum = rndBill()
      //var code;
      var url= mAPIBH + "total="+savedPrice+"&fecha=2021-09-14&metodo_pago=Electronico&cuenta_idcuenta=1&supermercado_idsupermercado=" + savedMark +"&cliente_idcliente="+savedID+"&idfactura="+billNum;

      var request = new XMLHttpRequest();
      request.onreadystatechange = (e) => {
        if (request.readyState !== 4) {
          return;
        }

        if (request.status === 200) {
          //console.log('success');
          //modalRaise(modalTypes['OK']);
          valDispatch(billNum);
        } else {
          console.log('error');
          modalRaise(modalTypes['NOMARKET']);
        }
      };

      request.open('POST', url);
      request.send();
      
      //modalRaise(modalTypes['OK']);

    }

    const valDispatch = (billid) => {

      //console.log(proList[0]['idProducto'])
      var valid = true

      for (var i = 0; i < proList.length; i++){
        const quan = proList[i]['count'];
        const cost = proList[i]['precio'];
        const pid = proList[i]['idProducto'];

        var url = mAPIDH +"cantidad="+quan+"&valor="+cost+"&producto_idproducto="+pid+"&factura_idfactura="+billid+"&iddetalle=6"
     
        //console.log(url);

        var request = new XMLHttpRequest();
        request.onreadystatechange = (e) => {
          if (request.readyState !== 4) {
            return;
          }

          if (request.status === 200) {
            //continue;
          } else {
            valid = false;
            //break;
          }
        };

        request.open('POST', url);
        request.send();

      }

      if(valid) modalRaise(modalTypes['OK']);
      else modalRaise(modalTypes['NOMARKET']);

    }

    const modalAction = () => {
      setModalOpen(!modalOpen); 
      if (modalMsg === succMsg)
        navigation.navigate('Market', {login: navigation.state.params.login});
      else{
        setModalMsg(defaultmsg);
        setBtnDis(!btnDis);
      }
    }

    //La página en sí
    return (
        <SafeAreaView style={{backgroundColor: "#FFFFFF", flex:1, padding:10}}>
        
            <Modal animationType="fade" transparent={true} visible={modalOpen} onRequestClose={() => { setModalOpen(!modalOpen); }}> 
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{color: "#FFFFFF"}}>{modalMsg}</Text>
                        <Text></Text> 
                        <TouchableOpacity style={styles.modalbtn_style} onPress={() => {modalAction()}} >
                            <Text style= {styles.modaltxt_style}>Entendido</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            
            <Text style={styles.labeltxt_style}>Nombre del cliente:</Text>
            <TextInput value = {savedName} editable = {false} />
            <Text />
            <Text style={styles.labeltxt_style}>Dirección:</Text>
            <TextInput editable = {!btnDis} onChangeText={(value) => setUsrAddr(value)} maxLength={100} placeholder="Escriba aquí la dirección para la factura"/>
            <Text />

            <Text style={styles.labeltxt_style}>Valor a pagar:</Text>
            <TextInput value = {"$" + savedPrice} editable = {false} />
            <Text />

            {savedPM()}


            {newPM()}


            <TouchableOpacity style={!btnDis ? styles.paybtn_style : styles.paybtn_dis_style} disabled = {btnDis} onPress={() => {valStart();}} >
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
      backgroundColor: "#FF6666",
      width: '45%',
      height: 50,
    },
    paybtn_dis_style: {
      marginHorizontal: '27.5%',
      marginVertical: 5,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FF666622",
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
      backgroundColor: "#FF6666",
      width: 100,
      height: 45,
    },
    modaltxt_style: {
      fontSize: 15,
      color: "#FFFFFF"
    },
    labeltxt_style: {
      fontSize: 18,
      fontWeight: 'bold',
      color: "#000000"
    },
    centeredView: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: '50%'
    },
    modalView: {
      margin: 30,
      backgroundColor: "#000000DD",
      borderRadius: 25,
      padding: 35,
      alignItems: "center",
    },
});


export default PayPage;
