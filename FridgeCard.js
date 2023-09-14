import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const FridgeCard = (props) => {

    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                {/* <TouchableOpacity style={styles.square}></TouchableOpacity> */}
                <Text style={styles.itemTextLeft}>{props.text}</Text>
            </View>
            <View>
                <TouchableOpacity onPress={props.onRemove}>
                    <Text>TRASH</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default FridgeCard;

const styles = StyleSheet.create({
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
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
});
