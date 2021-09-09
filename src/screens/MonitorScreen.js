import React, { useEffect, useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, Image} from 'react-native';

function uselistaMonitor(){
    const [monitor, setMonitor] = useState([])
    useEffect(() => {
        fetch("https://api-supermercados.herokuapp.com/")
            .then(response => response.json())
            .then(datos =>{
                setMonitor(datos)
            })
    },[])
    return monitor
}

const Monitor = () => {
    let {cardText, card, cardImage} = styles
    const Monitor1 = uselistaMonitor()

    return (
        <div className="container mt-5" align="center">
            <h4>Monitoreo</h4>
            <div className="row">
                <div className="col-md-12">                                                
                    <div className="container mt-5" align="center">
                    <h4>Ventas por supermercado</h4>
                        <div className="row">
                            <div className="col-md-12">
                                <table className="table table-bordered">
                                    <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Imagen</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Cuenta</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {Monitor1.map(item => (
                                        <tr key={item.idSupermercado}>
                                            <td>{item.idSupermercado}</td>
                                            <td>{item.imagen_supermercado}</td>
                                            <td>{item.nombre_supermercado}</td>
                                            <td>{item.cuenta_bancaria}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
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

  export default Monitor;