import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';

export default function DreamList() {
    const [dreams, setDreams] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDream, setSelectedDream] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [updatedDream, setUpdatedDream] = useState({});

    useEffect(() => {
        fetchDreams();
    }, []);

    const fetchDreams = async () => {
        try {
            const data = await AsyncStorage.getItem('dreamFormDataArray');
            const dreamList = data ? JSON.parse(data) : [];
            setDreams(dreamList);
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    };

    const handleDelete = async () => {
        Alert.alert(
            'Supprimer ce rêve ?',
            'Cette action est irréversible.',
            [
                { text: 'Annuler', style: 'cancel' },
                {
                    text: 'Supprimer',
                    onPress: async () => {
                        try {
                            const updatedDreams = dreams.filter(d => d !== selectedDream);
                            await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(updatedDreams));
                            setDreams(updatedDreams);
                            setModalVisible(false);
                        } catch (error) {
                            console.error('Erreur lors de la suppression:', error);
                        }
                    },
                },
            ]
        );
    };

    const handleUpdate = async () => {
        const updatedDreams = dreams.map(d => (d === selectedDream ? updatedDream : d));
        await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(updatedDreams));
        setDreams(updatedDreams);
        setSelectedDream(updatedDream);
        setEditMode(false);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Liste des Rêves :</Text>
            {dreams.map((dream, index) => (
                <TouchableOpacity key={index} style={styles.dreamContainer} onPress={() => { setSelectedDream(dream); setUpdatedDream(dream); setModalVisible(true); }}>
                    <Text style={styles.dreamTitle}>{dream.dreamName}</Text>
                    <Text style={styles.dreamDate}>{dream.dreamDate}</Text>
                </TouchableOpacity>
            ))}

            {/* Modale pour afficher/modifier un rêve */}
            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {selectedDream && (
                            <>
                                {editMode ? (
                                    <ScrollView>
                                        {Object.keys(updatedDream).map((key) => (
                                            <TextInput
                                                key={key}
                                                style={styles.input}
                                                value={updatedDream[key]?.toString()}
                                                onChangeText={(text) => setUpdatedDream({ ...updatedDream, [key]: text })}
                                                placeholder={key}
                                            />
                                        ))}
                                        <TouchableOpacity onPress={handleUpdate} style={styles.saveButton}>
                                            <Text style={styles.buttonText}>Enregistrer</Text>
                                        </TouchableOpacity>
                                    </ScrollView>
                                ) : (
                                    <>
                                        <Text style={styles.modalTitle}>Détails du Rêve</Text>
                                        {Object.entries(selectedDream).map(([key, value]) => (
                                            <Text key={key} style={styles.modalText}>{`${key}: ${value}`}</Text>
                                        ))}
                                        <View style={styles.buttonContainer}>
                                            <TouchableOpacity onPress={() => setEditMode(true)} style={styles.editButton}>
                                                <Text style={styles.buttonText}>Modifier</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                                                <Text style={styles.buttonText}>Supprimer</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                )}
                            </>
                        )}
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.buttonText}>Fermer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#121212',
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 12,
    },
    dreamContainer: {
        backgroundColor: '#1E1E1E',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
    },
    dreamTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#BB86FC',
    },
    dreamDate: {
        fontSize: 14,
        color: '#BBBBBB',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
        backgroundColor: '#1E1E1E',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalText: {
        fontSize: 16,
        color: 'white',
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    editButton: {
        backgroundColor: '#BB86FC',
        padding: 12,
        borderRadius: 8,
    },
    deleteButton: {
        backgroundColor: '#CF6679',
        padding: 12,
        borderRadius: 8,
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        padding: 12,
        borderRadius: 8,
        marginTop: 20,
    },
    closeButton: {
        backgroundColor: '#BB86FC',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
