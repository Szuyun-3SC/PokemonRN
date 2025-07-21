import React from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';

export default function PokemonDetailsScreen({ route, navigation }: any) {
  return (
    <PokemonDetailScreen route={route} navigation={navigation} />
  );
}

const PokemonDetailScreen = ({ route, navigation }: any) => {
  const { name, url } = route.params;
  const [pokemon, setPokemon] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<null | Error>(null);

  React.useEffect(() => {
    navigation.setOptions({ title: name });
    fetch(url)
      .then((response) => response.json())
      .then((data) => setPokemon(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [url]);

  if (loading) return <ActivityIndicator size="large" style={{flex: 1}} />;
  if (error || !pokemon) return <Text>Error loading Pokémon details.</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {pokemon.sprites?.front_default && (
        <Image
          source={{ uri: pokemon.sprites.front_default }}
          style={styles.sprite}
          resizeMode="contain"
        />
      )}
      <Text style={styles.sectionTitle}>Statistics</Text>
      {pokemon.stats?.map((stat: any) => (
        <View key={stat.stat.name} style={styles.statRow}>
          <Text style={styles.statName}>{stat.stat.name}</Text>
          <Text style={styles.statValue}>{stat.base_stat}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 24,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textTransform: 'capitalize',
  },
  sprite: {
    width: 150,
    height: 150,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  statName: {
    fontSize: 16,
    color: '#333',
    textTransform: 'capitalize',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});
