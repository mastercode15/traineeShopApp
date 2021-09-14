import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text} from 'react-native';
import { Card, Button, Icon, ButtonGroup } from 'react-native-elements';

export default function Producto({navigation}) {
    let { cardText, card, cardImage } = styles
    const [producto, setProducto] = useState([])
    const [total, setTotal] = useState(0);
    const [sum, setSum] = useState(0);
    const [res, setRes] = useState(0);
    const [result, setResult] = useState();
    const idsuper = navigation.state.params.idSuper;
    const login = navigation.state.params.login;
    console.log(idsuper)
    console.log(login)

    useEffect(() => {
        fetch("https://api-producto5.herokuapp.com/?idSupermercado="+idsuper)
            .then(response => response.json())
            .then(datos => {
                datos.map((item, i) => {
                    datos[i] = { ...datos[i], count: 0, total: 0 }
                })
                setProducto(datos)

            })

        fetch('http://54.221.130.211:8888/venta/supermercado/1', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then((respuestaJson) => {
                setResult(respuestaJson);

            });
        console.log(result)
    }, [])



    const handleUpdatemore = (id) => {
        const updateTask = producto.map((item) => {
            if (item.idProducto === id && item.count < item.stock) {
                setTotal(total + parseFloat(item.precio))
                return {
                    ...item,
                    count: item.count + 1,
                    total: item.precio * (item.count + 1)
                }
            }

            return item;
        });
        setProducto(updateTask);

    }

    const handleUpdateless = (id) => {
        const updateTask = producto.map((item) => {
            if (item.idProducto === id && item.count > 0) {
                setTotal(total - parseFloat(item.precio))
                return {
                    ...item,
                    count: item.count - 1,
                    total: item.precio * (item.count - 1)
                }
            }
            return item;
        });
        setProducto(updateTask);

    }

    const handleUpdatezero = (id) => {
        const updateTask = producto.map((item) => {
            if (item.idProducto === id) {
                setTotal(total - parseFloat(item.precio) * item.count)
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


    const handleSubmite = () => {
        const resultado = producto.filter((prod) =>prod.total != 0)
        navigation.navigate("Pagos",{resultado:resultado,total:total, idSuper: navigation.state.params.idSuper , login: navigation.state.params.login})
    }
    
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
        <ScrollView>
            {producto.map(item => (
            <Card key={item.idProducto}>
            <Card.Title>{item.nombre_producto}</Card.Title>
            <Card.Divider/>
            <Card.Image source={{uri: item.imagen_producto}}></Card.Image>
            <Card.Divider/>
            <Text style={{marginBottom: 10}}>
                ${item.precio}         Cantidad: {item.count}         Total: ${item.total.toFixed(2)}
            </Text>
            <Button
                icon={<Icon name='delete' color='#ffffff' />}
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor:'#000000'}}
                onPress={() => handleUpdatezero(item.idProducto)}/>
            <Button
                icon={<Icon name='add' color='#ffffff' />}
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor:'#000000'}}
                onPress={() => handleUpdatemore(item.idProducto)}/>
            <Button
                icon={<Icon name='remove' color='#ffffff' />}
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor:'#000000'}}
                onPress={() => handleUpdateless(item.idProducto)}
                />
          </Card>
        ))}
        <Button
                icon={<Icon name='money' color='#ffffff' />}
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor:'#000000'}}
                title=" PAGAR"
                onPress={handleSubmite}/>
        </ScrollView>
        
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