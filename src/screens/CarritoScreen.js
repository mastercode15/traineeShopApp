import React, { useEffect, useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, Button, View} from 'react-native';

const Producto = ({ navigation }) => {
    let {cardText, card, cardImage} = styles
    const producto1 = uselistaProductos();
    const [count, setCount] = useState(0);
    const [total_pro, setTotal_pro] = useState(0);
    function uselistaProductos(){
        const idsuper = navigation.state.params.idSuper;
        const [producto, setProducto] = useState([])
        useEffect(() => {
            fetch("https://api-producto5.herokuapp.com/?idSupermercado="+idsuper)
                .then(response => response.json())
                .then(datos =>{
                    setProducto(datos)
                })
        },[])
        return producto
    }

    useEffect(() => {
        // Actualiza el título del documento usando la API del navegador
        document.title = `You clicked ${count} times`;
      });
      
    return (
        <div className="container mt-12" align="center">
            <h2>Lista de Productos</h2>
            <div className="row">
                <div className="col-md-12">
                    {producto1.map(item => (
                        <View style={styles.espacio}>
                            <View style={styles.fixToText}>
                                <Image style={cardImage} source={{uri: item.imagen_producto}}/>
                                    <View>
                                    <Text style={cardText}>{item.nombre_producto}</Text>
                                    <Text style={cardText}>${item.precio}</Text>
                                    <Text style={cardText}><h3>No: {count}</h3></Text>
                                    <Text style={cardText}><h3>Total:{item.precio * count}</h3></Text>
                                    
                                    </View>
                            </View>
                        <View style={styles.fixToText}>
                        
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() =>setCount(count * 0)}
                            >Resetear</TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() =>setCount(count + 1)}
                            >+</TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() =>setCount(count - 1)}
                            >-</TouchableOpacity>
                        </View>
                        </View>
                    

                    ))}
            
                    
                </div>
                
            </div>
        </div>

    )
}

function comprar(id, nombre , precio) {
    alert('id: '+id+" nombre: "+nombre+" precio: "+precio);
    //onPressIn={() =>comprar(item.idProducto,item.nombre_producto,item.precio)}
}

const styles = StyleSheet.create({
    cardText:{
        fontSize: 15,
        padding: 10
    },
    card: {
        backgroundColor: '#FF6D4D',
        marginBottom: 15,
        marginLeft: '2%',
        width: '96%',
        shadowColor: '#F337C2',
        shadowOpacity: 1,
        shadowOffset: {
            width: 3,
            height: 3
        }
    },
    cardImage: {
        width: '50%',
        height: 200,
        resizeMode: 'cover'
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom:15,
      },
      espacio: {
        marginBottom:15,
      },
      button: {
        width:"30%",
        alignItems: "center",
        backgroundColor: "#FF6D4D",
        borderRadius: 20,
        padding: 5
      },
    buttonPress: {
        borderColor: "#000066",
        backgroundColor: "#000066",
        borderWidth: 1,
        borderRadius: 10
    },
    container: {
        flex: 1,
        padding: 24,
        alignItems: "center"
      },
      title: {
        marginTop: 16,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "#61dafb",
        color: "#20232a",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold"
      },
    
    

});

export default Producto;