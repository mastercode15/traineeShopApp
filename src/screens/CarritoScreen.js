import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, Button, View, } from 'react-native';


export default function Producto() {
    let { cardText, card, cardImage } = styles
    const [producto, setProducto] = useState([])
    const [total, setTotal] = useState(0);
    const [sum, setSum] = useState(0);
    const [res, setRes] = useState(0);

    useEffect(() => {
        fetch("https://api-producto5.herokuapp.com/")
            .then(response => response.json())
            .then(datos => {
                datos.map((item, i) => {
                    datos[i] = { ...datos[i], count: 0, total: 0 }
                })
                setProducto(datos)

            })
    }, [])

    useEffect(() => {
        const newtotal = producto.filter((pord) => pord.total != 0)
        newtotal.map(item => {
            setTotal(total + parseFloat(item.precio*item.count))
        })
    }, [sum])

    useEffect(() => {
        const newtotal = producto.filter((pord) => pord.count != 0)
        newtotal.map(item => {
            setTotal(total - parseFloat(item.precio * item.count))
        })
    }, [res])


    const handleUpdatemore = (id) => {
        const updateTask = producto.map((item) => {
            if (item.idProducto === id && item.count < item.stock) {
                return {
                    ...item,
                    count: item.count + 1,
                    total: item.precio * (item.count + 1)
                }
            }
            return item;
        });
        setProducto(updateTask);
        setSum(sum + 1);
    }

    const handleUpdateless = (id) => {
        const updateTask = producto.map((item) => {
            if (item.idProducto === id && item.count > 0) {
                return {
                    ...item,
                    count: item.count - 1,
                    total: item.precio * (item.count - 1)
                }
            }
            return item;
        });
        setProducto(updateTask);
        setRes(res + 1);
    }

    const handleUpdatezero = (id) => {
        const updateTask = producto.map((item) => {
            if (item.idProducto === id) {
                return {
                    ...item,
                    count: item.count * 0,
                    total: item.precio * (item.count * 0)
                }
            }
            return item;
        });
        setProducto(updateTask);
    }

    return (

        <div className="container mt-12" align="center">

            <h2>Lista de Productos</h2>

            <h2>Total:{total.toFixed(2)}</h2>
            <div className="row">
                <div className="col-md-12">
                    {producto.map(item => (
                        <View style={styles.espacio}>
                            <View style={styles.fixToText}>
                                <Image style={cardImage} source={{ uri: item.imagen_producto }} />
                                <View>
                                    <Text style={cardText}>{item.nombre_producto}</Text>
                                    <Text style={cardText}>${item.precio}</Text>
                                    <Text style={cardText}><h3>Cantidad: {item.count}</h3></Text>
                                    <Text style={cardText}><h3>Total: ${item.total}</h3></Text>
                                </View>
                            </View>
                            <View style={styles.fixToText}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => handleUpdatezero(item.idProducto)}
                                >Vaciar</TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => handleUpdatemore(item.idProducto)}
                                >+</TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => handleUpdateless(item.idProducto)}
                                >-</TouchableOpacity>
                            </View>
                        </View>


                    ))}


                </div>

            </div>
        </div>

    )
}

function comprar(id, nombre, precio) {
    alert('id: ' + id + " nombre: " + nombre + " precio: " + precio);
    //onPressIn={() =>comprar(item.idProducto,item.nombre_producto,item.precio)}
}

const styles = StyleSheet.create({
    cardText: {
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
        marginBottom: 15,
    },
    espacio: {
        marginBottom: 15,
    },
    button: {
        width: "30%",
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