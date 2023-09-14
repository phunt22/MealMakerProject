import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Keyboard, KeyboardAvoidingView, TextInput, TouchableOpacity, Platform } from 'react-native';

import FridgeCard from '../assets/components/FridgeCard.js';
import IngredientsContext from '../context/ingredientsContext.js';


const Fridge = () => {
    const [ingredient, setIngredient] = useState();
    const { ingredients, setIngredients } = useContext(IngredientsContext);

    // Removes an item from the fridge at a given index
    // PARAM: index (number) - the index (in the ingredients array) of the item being removed
    const removeItem = (index) => {
        let copy = [...ingredients];
        copy.splice(index, 1);
        setIngredients(copy)
    }

    // Handles the user adding something. Updates the neccessary states
    // If the input field is empty, nothing will happen 
    const handleAdd = () => {
        console.log(ingredients);
        Keyboard.dismiss();
        if (ingredient) {
            setIngredients([...ingredients, ingredient]);
            setIngredient(null);
        }
    }

    return (
        <IngredientsContext.Provider value={ingredients}>
            <View style={styles.pageContainer}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.topBar}>
                    {/* TEXT INPUT */}
                    <TextInput style={styles.input}
                        placeholder={'Add something to your fridge'}
                        value={ingredient}
                        onChangeText={text => setIngredient(text)} />
                    {/* ADD BUTTON */}
                    <TouchableOpacity onPress={() => handleAdd()}>
                        <View style={styles.addWrapper}>
                            <Text style={styles.addText}>+</Text>
                        </View>
                    </TouchableOpacity>
                    {/* CLEAR BUTTON */}
                    <TouchableOpacity onPress={() => setIngredients([])}>
                        <View style={styles.addWrapper}>
                            <Text style={styles.addText}>-</Text>
                        </View>
                    </TouchableOpacity>
                </KeyboardAvoidingView>


                <View style={styles.itemsContainer}>
                    {ingredients.length === 0 && <Text>Your fridge is empty!</Text>}
                    {
                        ingredients.map((item, index) => {
                            return (
                                <FridgeCard key={index} text={item} onRemove={() => removeItem(index)} />
                            )
                        })
                    }
                </View>
            </View >
        </IngredientsContext.Provider>

    );
}
export default Fridge;

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#edf7ff',
        alignItems: 'center',
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: 250,
        height: 50,
    },
    addWrapper: {
        width: 50,
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    topBar: {
        backgroundColor: '#9c9086',
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        top: 0,
        position: 'absolute',
        width: '100%',
        marginBottom: 10,
    },
    itemsContainer: {
        marginTop: 70,
        width: '90%',
    },
})