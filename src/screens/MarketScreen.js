import React, { useEffect, useState} from 'react';
import { StyleSheet, Text, ScrollView} from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

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
          <Card key={item.idSupermercado}>
            <Card.Title>{item.nombre_supermercado}</Card.Title>
            <Card.Divider/>
            <Card.Image source={{uri: item.imagen_supermercado}}></Card.Image>
            <Button
                icon={<Icon name='star' color='#ffffff' />}
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor:'#000000'}}
                title={item.nombre_supermercado}
                onPressIn={() => navigation.navigate('CarritoScreen', { idSuper: item.idSupermercado, login: navigation.state.params.login })}/>
          </Card>
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

/*<TouchableOpacity style={card} key={item.idSupermercado} onPressIn={() => navigation.navigate('CarritoScreen', { idSuper: item.idSupermercado, login: navigation.state.params.login })}>
<Image style={cardImage} source={{uri: item.imagen_supermercado}}/>
<Text style={cardText}>{item.nombre_supermercado}</Text>
</TouchableOpacity> */