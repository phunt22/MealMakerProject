import { React, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, ScrollView, Dimensions, Platform } from 'react-native';

const FoodCard = (props) => {
    const [modalVisible, setModalVisible] = useState(false);

    // props.url

    return (
        <View style={styles.cardContainer}>
            {/* Modal element, visible on press */}
            <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <ScrollView>
                        <View style={styles.modalView}>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.closeButton}>X</Text>
                            </TouchableOpacity>
                            <Text style={styles.title}>{props.title}</Text>
                            <Image style={styles.modalImage}
                                source={{
                                    uri: props.url,
                                }}
                            />
                            <Text style={styles.description}>{props.description}</Text>
                            <Text style={styles.headerText}>Ingredients</Text>
                            <Text style={styles.smallText}>{props.ingredients}</Text>
                            <Text style={styles.headerText}>Instructions</Text>
                            <Text style={styles.smallText}>{props.instructions}</Text>
                        </View>
                    </ScrollView>
                </View>
            </Modal>

            {/* Food card. OnPress, the modal is pulled up. */}
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.touchable}>
                <Text style={styles.header}>{props.title}</Text>
                <Image
                    style={styles.cardImage}
                    source={{
                        uri: props.url,
                    }}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.itemText}>{props.description}</Text>
                    <Text style={styles.smallText}>{props.ingredients}</Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}
export default FoodCard;

const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 2,

    },
    cardContainer: {
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
            },
            android: {
                elevation: 5,
            },
        }),
        backgroundColor: "white",
        width: 350,
        height: 575,
        borderRadius: 20,
        flex: 1,
        alignItems: 'center',
        marginRight: 40,
    },
    touchable: {
        flex: 1,
        alignItems: 'center',
    },
    textContainer: {
        width: '90%',
        flex: 1,
        alignItems: 'flex-start',
    },
    header: {
        fontWeight: 'bold',
        maxWidth: '90%',
    },
    modalView: {
        top: 20,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    modalImage: {
        width: 250,
        height: 250,
        alignSelf: 'center',
    },
    title: {
        fontSize: 26,
        backgroundColor: "#FFF",
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    description: {
        fontSize: 16,
        marginBottom: 16,
    },
    smallText: {
        marginTop: 0,
        fontSize: 10,
        marginBottom: 16,
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    cardImage: {
        width: 250,
        height: 250,
    },
});
