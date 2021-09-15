import React, { useEffect, useState} from 'react';
import { StyleSheet, Text, ScrollView, Image} from 'react-native';
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
            <Image style={styles.cardImage} source={{uri: item.imagen_supermercado}}></Image>
            <Button
                icon={<Icon name='store' color='#ffffff' />}
                buttonStyle={{borderRadius: 10, marginLeft: 10, marginRight: 10, marginBottom: 10, backgroundColor:'#000000', width: 320, height: 40, alignSelf:'center'}}
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
      width: 320,
      height: 290,
      alignSelf: 'center'
    },

  });

  export default Market;