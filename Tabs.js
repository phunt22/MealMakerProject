// TODO figure out how to customize the styling of the tabs
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, Image, Button, Keyboard, Alert, FlatList, Dimensions, TouchableOpacity } from 'react-native';

import Fridge from '../screens/Fridge.js';
import Maker from '../screens/Maker.js';
import Profile from '../screens/Profile.js';

import IngredientsContext from '../context/ingredientsContext.js';
import RestrictionsContext from '../context/RestrictionsContext.js';


const Tab = createBottomTabNavigator();

const Tabs = () => {
    const [ingredients, setIngredients] = useState([]);
    const [restrictions, setRestrictions] = useState([]);

    return (
        <IngredientsContext.Provider value={{ ingredients, setIngredients }}>
            <RestrictionsContext.Provider value={{ restrictions, setRestrictions }}>


                <Tab.Navigator
                    // TODO Figure out how to customize the tabs
                    screenOptions={{
                        "tabBarStyle": [
                            {
                                "display": "flex"
                            },
                            null
                        ]
                    }}
                >
                    <Tab.Screen name="Fridge" component={Fridge} />
                    <Tab.Screen name="Maker" component={Maker} />
                    <Tab.Screen name="Profile" component={Profile} />

                </Tab.Navigator>
            </RestrictionsContext.Provider>
        </IngredientsContext.Provider >

    )
}

export default Tabs;