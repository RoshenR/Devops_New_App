// app/(tabs)/two.tsx
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import DreamForm from '@/components/DreamForm';

export default function DreamFormScreen() {
  return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Ajouter un Rêve</Text>
        <Text style={styles.description}>
          Remplissez le formulaire ci-dessous pour enregistrer un rêve et suivre son évolution.
        </Text>
        <DreamForm />
      </ScrollView>
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
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
});
