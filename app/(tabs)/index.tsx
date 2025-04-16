// app/(tabs)/index.tsx
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';

export default function IndexScreen() {
  const navigation = useNavigation();

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenue dans le Journal des Rêves</Text>
        <Text style={styles.description}>
          Notez, explorez et analysez vos rêves dans un espace dédié.
          Découvrez leurs significations et suivez leur évolution au fil du temps.
        </Text>

        {/*<Image source={require('@/assets/dream.png')} style={styles.image} />*/}

        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('two')}
        >
          <Text style={styles.buttonText}>Commencer</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
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
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#BB86FC',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});