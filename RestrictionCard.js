import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Touchable } from 'react-native';


// Props: title and userInfo
// title is the title of the card (i.e. Name, Email, etc.)
// userInfo is the info from the user. This will be passed in from a database
// answers the title. (i.e. title: Name, userInfo: William Hunt)
const RestrictionCard = (props) => {
    return (
        <View style={styles.item}>
            <Text style={styles.itemTextLeft}> {props.text} </Text>
            <TouchableOpacity onPress={props.onRemove}>
                <Text>REMOVE</Text>
            </TouchableOpacity>
        </View>
    )
}

export default RestrictionCard;

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        width: "100%",
    },
    itemTextLeft: {
        maxWidth: '100%',
        color: "#000000",
        fontWeight: 'bold',
    },
    itemTextRight: {
        maxWidth: '100%',
        color: '#706f6f',
    },
});
