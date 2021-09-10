import React, { useEffect, useState} from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, TouchableOpacity, ScrollView, Image} from 'react-native';

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
    console.log(navigation.state.params.login)

    return (
        <ScrollView>
            {market1.map(item => (                                                       
            <TouchableOpacity style={card} key={item.idSupermercado} onPressIn={() => navigation.navigate('CarritoScreen', { idSuper: item.idSupermercado, login: navigation.state.params.login })}>
                <Image style={cardImage} source={{uri: item.imagen_supermercado}}/>
                <Text style={cardText}>{item.nombre_supermercado}</Text>
            </TouchableOpacity>
            ))}
        </ScrollView>
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
