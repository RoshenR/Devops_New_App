// app/(tabs)/three.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DreamList from '@/components/DreamList';

export default function DreamListScreen() {
    const [selectedDream, setSelectedDream] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [dreams, setDreams] = useState([]);
    const [updatedDream, setUpdatedDream] = useState({});

    useEffect(() => {
        const fetchDreams = async () => {
            const data = await AsyncStorage.getItem('dreamFormDataArray');
            setDreams(data ? JSON.parse(data) : []);
        };
        fetchDreams();
    }, []);

    const handleDreamPress = (dream) => {
        setSelectedDream(dream);
        setUpdatedDream(dream);
        setModalVisible(true);
        setEditMode(false);
    };

    const handleDelete = async () => {
        Alert.alert('Supprimer ce rêve ?', 'Cette action est irréversible.', [
            { text: 'Annuler', style: 'cancel' },
            {
                text: 'Supprimer',
                onPress: async () => {
                    const updatedDreams = dreams.filter(d => d !== selectedDream);
                    await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(updatedDreams));
                    setDreams(updatedDreams);
                    setModalVisible(false);
                },
            },
        ]);
    };

    const handleUpdate = async () => {
        const updatedDreams = dreams.map(d => (d === selectedDream ? updatedDream : d));
        await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(updatedDreams));
        setDreams(updatedDreams);
        setSelectedDream(updatedDream);
        setEditMode(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mes Rêves</Text>
            <ScrollView>
                <DreamList onDreamPress={handleDreamPress} />
            </ScrollView>

            {/* Modale pour afficher ou modifier un rêve */}
            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {selectedDream && (
                            <>
                                {editMode ? (
                                    <>
                                        <TextInput
                                            style={styles.input}
                                            value={updatedDream.dreamText}
                                            onChangeText={(text) => setUpdatedDream({ ...updatedDream, dreamText: text })}
                                        />
                                        <TextInput
                                            style={styles.input}
                                            value={updatedDream.tags}
                                            onChangeText={(text) => setUpdatedDream({ ...updatedDream, tags: text })}
                                        />
                                        <TouchableOpacity onPress={handleUpdate} style={styles.saveButton}>
                                            <Text style={styles.buttonText}>Enregistrer</Text>
                                        </TouchableOpacity>
                                    </>
                                ) : (
                                    <>
                                        <Text style={styles.modalTitle}>{selectedDream.dreamText}</Text>
                                        <Text style={styles.modalText}>Tags: {selectedDream.tags}</Text>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#BB86FC',
        textAlign: 'center',
        marginBottom: 10,
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
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        color: 'white',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#333',
        color: 'white',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    editButton: {
        backgroundColor: '#BB86FC',
        padding: 10,
        borderRadius: 5,
    },
    deleteButton: {
        backgroundColor: '#CF6679',
        padding: 10,
        borderRadius: 5,
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    closeButton: {
        marginTop: 15,
        backgroundColor: '#BB86FC',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});