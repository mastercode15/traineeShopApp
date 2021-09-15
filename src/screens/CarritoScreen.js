import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, Button, Image,PricingCard} from 'react-native-elements';

export default function Producto({navigation}) {
    let { cardText, card, cardImage } = styles
    const [producto, setProducto] = useState([])
    const [total, setTotal] = useState(0);
    const [sum, setSum] = useState(0);
    const [res, setRes] = useState(0);
    const [result, setResult] = useState();
    const idsuper = navigation.state.params.idSuper;
    const login = navigation.state.params.login;
    const nombre_cli = navigation.state.params.login['nombreCliente'];
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
        console.log(resultado, total.toFixed(2));
        navigation.navigate("Pagos",{resultado:resultado,total:total.toFixed(2), idSuper: navigation.state.params.idSuper , login: navigation.state.params.login})
    }
    
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
        <ScrollView>
            
            {producto.map(item => (
            <Card key={item.idProducto}>
            <Card.Title>{item.nombre_producto}</Card.Title>
            <Card.Divider/>
            <View style={styles.clip1}>
            <Text>Total: $ {item.total.toFixed(2)}</Text>
            </View>
            <Image style={styles.cardImage} source={{uri: item.imagen_producto}}></Image>
            <Card.Divider/>
            <View style={styles.clip2}>
            <Text>Precio U: $ {item.precio}</Text>
            
            
            </View>
            <View style={styles.clip2}>
            <Text>Cantidad: {item.count}</Text>
            </View>
            
            <Card.Divider/>
            
            <View style={styles.fixToText}>
            <Card.Divider/>
            <Button
                icon={<Icon name='trash' color='#ffffff' />}
                title=" Vaciar"
                buttonStyle={{borderRadius: 10, marginLeft: 10, marginRight: 10, marginBottom: 15, backgroundColor:'#000000', width: 100,height: 30}}
                onPress={() => handleUpdatezero(item.idProducto)}/>
            <Button
                icon={<Icon name='cart-plus' color='#ffffff' />}
                title=" Añadir"
                buttonStyle={{borderRadius: 10, marginLeft: 10, marginRight: 10, marginBottom: 15, backgroundColor:'#000000', width: 100,height: 30}}
                onPress={() => handleUpdatemore(item.idProducto)}/>
            <Button
                icon={<Icon name='minus-circle' color='#ffffff' />}
                title=" Quitar"
                buttonStyle={{borderRadius: 10, marginLeft: 10, marginRight: 10, marginBottom: 15, backgroundColor:'#000000', width: 100,height: 30}}
                onPress={() => handleUpdateless(item.idProducto)}
                />
                </View>
          </Card>
        ))}

            <PricingCard
            color="#ff6666"
            title="Total"
            price={"$ "+ total.toFixed(2)}
            info={['Cliente: '+nombre_cli]}
            button={{ title: ' Comprar', icon: 'shopping-cart', onPress: handleSubmite }}
            />
        
        </ScrollView>
        
    )
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
        width: 320,
        height: 290,
        alignSelf: 'center',
    },
    fixToText: {
        flexDirection: 'row',
        alignSelf: "center",
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
    clip1: {
        alignItems: "center",
        marginBottom: 15,
        shadowColor: '#F337C2',
        
        
    },
    clip2: {
        
        marginBottom: 15,
        
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