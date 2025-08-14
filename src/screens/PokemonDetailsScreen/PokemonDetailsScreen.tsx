import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { Overlay } from 'react-native-elements';
import { Pokemon } from '../../types/Pokemon';
import { EncounterLocation } from '../../types/EncounterLocation';

export default function PokemonDetailsScreen({ route, navigation }: any) {
  return <PokemonDetailScreen route={route} navigation={navigation} />;
}

const PokemonDetailScreen = ({ route, navigation }: any) => {
  const { name, url } = route.params;
  const [pokemon, setPokemon] = React.useState<Pokemon | null>(null);
  const [locations, setLocations] = React.useState<EncounterLocation[] | null>(
    null,
  );
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<null | Error>(null);
  const [isLoadingLocations, setIsLoadingLocations] = React.useState(true);
  // const toggleOverlay = () => {
  //   setVisible(!visible);
  // };

  const fetchPokemonDetail = async (url: string): Promise<Pokemon> => {
    return fetch(url).then(response => response.json());
  };

  const fetchLocations = async (url: string): Promise<EncounterLocation[]> => {
    return fetch(url).then(response => response.json());
  };

  React.useEffect(() => {
    navigation.setOptions({ title: name });

    const fetchData = async (url: String) => {
      try {
        const pokemonDetail = await fetchPokemonDetail(url);
        setPokemon(pokemonDetail);

        if (pokemonDetail.location_area_encounters) {
          setIsLoadingLocations(true);
          try {
            const locationsResponse = await fetchLocations(
              pokemonDetail.location_area_encounters,
            );
            setLocations(locationsResponse);
          } catch (error) {
            setError(error as Error);
          } finally {
            setIsLoadingLocations(false);
          }
        }
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(url);
  }, [url]);

  return loading ? (
    <ActivityIndicator size="large" style={{ flex: 1 }} />
  ) : (
    error ? (
      <Text style={styles.errorText}>
        Error loading Pokémon details. Error: {error?.message} Pokémon:{' '}
        {pokemon?.name || 'Unknown'}
      </Text>
    ) : (
      pokemon && (
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
        <Text style={styles.sectionTitle}>Locations</Text>
        <ActivityIndicator size="large" animating={isLoadingLocations} />
        {locations &&
          (locations.length === 0 ? (
            <Text style={styles.errorText}>
              No locations found for this Pokémon.
            </Text>
          ) : (
            locations.map((location: EncounterLocation) => (
              <View style={styles.statRow} key={location.location_area.name}>
                <Text style={styles.statName}>
                  {location.location_area.name}
                </Text>
              </View>
            ))
          ))}
        <Overlay isVisible={loading}>
          <ActivityIndicator size="large" />
        </Overlay>
      </ScrollView>
    )
  ));
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
  errorText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
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
