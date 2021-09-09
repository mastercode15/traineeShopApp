import React, { useEffect, useState} from 'react';
import { render } from 'react-dom';
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

const Market = ({ navigation }) => {
    let {cardText, card, cardImage} = styles
    const market1 = uselistaMarket()

    return (
        <div className="container mt-5" align="center">
            <h4>SuperMercados con los que trabajamos</h4>
            <div className="row">
                <div className="col-md-12">
                {market1.map(item => (                                                       
                    <TouchableOpacity style={card} key={item.idSupermercado} onPressIn={() => navigation.navigate('CarritoScreen', { idSuper: item.idSupermercado })}>
                        <Image style={cardImage} source={{uri: item.idSupermercado}}/>
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
      backgroundColor: '#F337C2',
    },
    card: {
      backgroundColor: '#fff',
      marginBottom: 10,
      marginLeft: '10%',
      marginRight: '10%',
      width: '80%',
      shadowColor: '#FF6D4D',
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

  export default Market;