import React, { useEffect, useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, Image} from 'react-native';

function uselistaMarket(){
    const [market, setMarket] = useState([])
    useEffect(() => {
        fetch("https://api-supermercados.herokuapp.com/")
            .then(response => response.json())
            .then(datos =>{
                setMarket(datos)
            })
    },[])
    return market
}

export default function Market(){
    let {cardText, card, cardImage} = styles
    const market1 = uselistaMarket()
    const onPress = () => {
        {market1.map(item => (
            alert(item.nombre_supermercado)
        ))}
    }
    return (
        <div className="container mt-5" align="center">
            <h4>SuperMercados con los que trabajamos</h4>
            <div className="row">
                <div className="col-md-12">
                {market1.map(item => (
                    <TouchableOpacity style={card} onPress={onPress}>
                        <Image style={cardImage} source={{uri: 'https://img.freepik.com/vector-gratis/plantilla-logotipo-supermercado-carrito-compras_23-2148470295.jpg'}}/>
                        <Text style={cardText}>{item.nombre_supermercado}</Text>
                    </TouchableOpacity>
                ))}
                </div>
            </div>
        </div>

    )
}

const styles = StyleSheet.create({
    cardText:{
      fontSize: 20,
      padding: 10,

    },
    card: {
      backgroundColor: '#fff',
      marginBottom: 10,
      marginLeft: '10%',
      marginRight: '10%',
      width: '80%',
      shadowColor: '#000',
      shadowOpacity: 1,
      shadowOffset: {
        width: 3,
        height: 3
      }
    },
    cardImage: {
      width: '100%',
      height: 200,
      resizeMode: 'cover'
    },

  });
  