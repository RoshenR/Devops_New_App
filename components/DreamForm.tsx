import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { TextInput, Button, Checkbox } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DreamForm() {
    const [dreamName, setDreamName] = useState('');
    const [dreamText, setDreamText] = useState('');
    const [isLucidDream, setIsLucidDream] = useState(false);
    const [dreamDate, setDreamDate] = useState(new Date());
    const [dreamTime, setDreamTime] = useState(new Date());
    const [dreamType, setDreamType] = useState('');
    const [emotionBefore, setEmotionBefore] = useState('');
    const [emotionAfter, setEmotionAfter] = useState('');
    const [characters, setCharacters] = useState('');
    const [dreamLocation, setDreamLocation] = useState('');
    const [intensity, setIntensity] = useState(0);
    const [clarity, setClarity] = useState(0);
    const [tags, setTags] = useState('');
    const [sleepQuality, setSleepQuality] = useState(0);
    const [personalMeaning, setPersonalMeaning] = useState('');
    const [tone, setTone] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const handleDreamSubmission = async () => {
        try {
            const existingData = await AsyncStorage.getItem('dreamFormDataArray');
            const formDataArray = existingData ? JSON.parse(existingData) : [];

            formDataArray.push({
                dreamName,
                dreamText,
                isLucidDream,
                dreamDate: dreamDate.toLocaleDateString(),
                dreamTime: formatTime(dreamTime),
                dreamType,
                emotionBefore,
                emotionAfter,
                characters,
                dreamLocation,
                intensity,
                clarity,
                tags,
                sleepQuality,
                personalMeaning,
                tone,
            });

            await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(formDataArray));

            setDreamName('');
            setDreamText('');
            setIsLucidDream(false);
            setDreamDate(new Date());
            setDreamTime(new Date());
            setDreamType('');
            setEmotionBefore('');
            setEmotionAfter('');
            setCharacters('');
            setDreamLocation('');
            setIntensity(0);
            setClarity(0);
            setTags('');
            setSleepQuality(0);
            setPersonalMeaning('');
            setTone('');
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des données:', error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <TextInput label="Nom de votre rêve" value={dreamName} onChangeText={setDreamName} mode="outlined" style={styles.input} />
            <TextInput label="Votre rêve" value={dreamText} onChangeText={setDreamText} mode="outlined" style={styles.input} />

            <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(!showDatePicker)}>
                <Text style={styles.dateButtonText}>Sélectionner la date: {dreamDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={dreamDate}
                    mode="date"
                    display="spinner"
                    onChange={(event, date) => {
                        if (date) setDreamDate(date);
                    }}
                />
            )}

            <TouchableOpacity style={styles.dateButton} onPress={() => setShowTimePicker(!showTimePicker)}>
                <Text style={styles.dateButtonText}>Sélectionner l'heure: {formatTime(dreamTime)}</Text>
            </TouchableOpacity>
            {showTimePicker && (
                <DateTimePicker
                    value={dreamTime}
                    mode="time"
                    display="spinner"
                    onChange={(event, time) => {
                        if (time) setDreamTime(time);
                    }}
                />
            )}


            <TextInput label="Type de Rêve" value={dreamType} onChangeText={setDreamType} mode="outlined" style={styles.input} />
            <TextInput label="Émotion avant le Rêve" value={emotionBefore} onChangeText={setEmotionBefore} mode="outlined" style={styles.input} />
            <TextInput label="Émotion après le Rêve" value={emotionAfter} onChangeText={setEmotionAfter} mode="outlined" style={styles.input} />
            <TextInput label="Personnes présentes dans le Rêve" value={characters} onChangeText={setCharacters} mode="outlined" style={styles.input} />
            <TextInput label="Lieux du Rêve" value={dreamLocation} onChangeText={setDreamLocation} mode="outlined" style={styles.input} />

            <TextInput label="Intensité émotionnelle (1-10)" keyboardType="numeric" value={intensity.toString()} onChangeText={(val) => setIntensity(Math.min(Math.max(parseInt(val) || 0, 0), 10))} mode="outlined" style={styles.input} />
            <TextInput label="Clarté du Rêve (1-10)" keyboardType="numeric" value={clarity.toString()} onChangeText={(val) => setClarity(Math.min(Math.max(parseInt(val) || 0, 0), 10))} mode="outlined" style={styles.input} />
            <TextInput label="Qualité de Sommeil (1-10)" keyboardType="numeric" value={sleepQuality.toString()} onChangeText={(val) => setSleepQuality(Math.min(Math.max(parseInt(val) || 0, 0), 10))} mode="outlined" style={styles.input} />

            <TextInput label="Signification Personnelle" value={personalMeaning} onChangeText={setPersonalMeaning} mode="outlined" style={styles.input} />
            <TextInput label="Tonalité du Rêve (Négative ou Positive)" value={tone} onChangeText={setTone} mode="outlined" style={styles.input} />

            <Checkbox.Item label="Rêve Lucide (appuyez pour valider)" status={isLucidDream ? 'checked' : 'unchecked'} onPress={() => setIsLucidDream(!isLucidDream)} />

            <Button mode="contained" onPress={handleDreamSubmission} style={styles.button}>Soumettre</Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#121212',
        padding: 16,
        flex: 1,
    },
    input: {
        marginBottom: 16,
        backgroundColor: '#1E1E1E',
        color: 'white',
    },
    button: {
        marginTop: 8,
        backgroundColor: '#BB86FC',
    },
    dateButton: {
        backgroundColor: '#BB86FC',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 16,
    },
    dateButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
