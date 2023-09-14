import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native';

import RestrictionCard from "../assets/components/RestrictionCard.js";

import RestrictionsContext from '../context/RestrictionsContext.js';


const Profile = () => {
    const [restriction, setRestriction] = useState('');
    const { restrictions, setRestrictions } = useContext(RestrictionsContext);

    // This handles the user adding something. Adds the restriction from the input field to the restrictions array
    // and updates the neccessary states. 
    const handleAdd = () => {
        Keyboard.dismiss();
        if (restriction) {
            setRestrictions([...restrictions, restriction]);
        }
        setRestriction();
    }

    // This handles the user removing something. Adds the restriction from the input field to the restrictions array
    // and updates the neccessary states. 
    // @PARAM: index, the index of the item (in the restrictions array) that is to be removed
    const handleRemove = (index) => {
        let updatedRestrictions = [...restrictions];
        updatedRestrictions.splice(index, 1);
        setRestrictions(updatedRestrictions);
    }

    return (
        <View style={styles.container}>
            {/* Input bar */}
            <KeyboardAvoidingView style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={'Any dietary restrictions?'}
                    value={restriction}
                    onChangeText={text => setRestriction(text)} />
                <TouchableOpacity onPress={() => handleAdd()}>
                    <View style={styles.addWrapper}>
                        <Text>+</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>


            {/* Restrictions container  */}
            <View style={styles.drContainer}>
                {restrictions.length === 0 && <Text>No dietary restrictions have been added</Text>}

                {
                    restrictions.map((restriction, index) => {
                        return (
                            <RestrictionCard key={index} text={restriction}
                                onRemove={() => handleRemove(index)}
                            />
                        )
                    })
                }

            </View>
        </View >
    );
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#edf7ff',
        width: '100%',
    },
    drContainer: {
        flex: 1,
        alignItems: 'flex-start',
        width: "90%",
        top: 65,
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
    inputContainer: {
        backgroundColor: '#9c9086',
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        top: 0,
        position: 'absolute',
        width: '100%',
        marginBottom: 10,
    },
})