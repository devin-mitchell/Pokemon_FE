import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';



export default function Pokemon() {
    const [text, setText] = useState('')
    const [pokemon, setPokemon] = useState({})
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/pikachu`)
            .then(res => {
                setPokemon(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const fetchPokemon = () => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${text}`)
            .then(res => {
                console.log(res.data)
                setPokemon(res.data)
                setText('')
            })
            .catch(err => {
                console.log(err)
                setText('')
            })
    }
    // const currImage = pokemon.sprites.other['official-artwork'].front_default
    console.log(pokemon)
    return (
        <View style={styles.screenWrapper}>
            <View>
                
                {/* <Image  source={pokemon.sprites.other['official-artwork'].front_default}/> */}
            </View>
            <View style={styles.searchWrapper}>
                <TextInput 
                    style={styles.textInput} 
                    placeholder={'enter a pokemon name or ID'} 
                    value={text}
                    onChangeText={text => setText(text.toLowerCase())}
                />
                {text !== '' &&
                    <TouchableOpacity  onPress={() => fetchPokemon()} style={styles.button}>
                        <Text style={styles.buttonText}>Go</Text>
                    </TouchableOpacity>
                }       
            </View>
        </View>
    )
}

const CurrPokemon = ({pokemon}) => {
    return (
        <View>
            <ImageBackground />
            <Text style={styles.text}>{pokemon.name} 
                    <Text>{pokemon.id}</Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screenWrapper: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: 'black',
        justifyContent: 'space-between',
    },
    searchWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: '#a88220',
        paddingVertical: 10,
    },
    textInput: {
        width: '65%',
        height: 50,
        textAlign: 'center',
        fontSize: 14,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 50,
    },
    button: {
        width: '25%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 50,
    },
    buttonText: {
        textAlign:'center',
        padding: 10,
        fontSize: 18,
    },
    text: {
        color: 'white'
    },
    img: {
        width: 200,
        height: 300,
    }
})