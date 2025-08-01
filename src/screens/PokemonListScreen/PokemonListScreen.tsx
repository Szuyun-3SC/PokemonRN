import * as React from 'react';
import { SearchBar } from 'react-native-elements';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PokemonDetailsScreen from '../PokemonDetailsScreen/PokemonDetailsScreen';

const Stack = createNativeStackNavigator();

export default function PokemonStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PokemonList"
        component={PokemonListScreen}
        options={{ title: 'Pokemon List' }}
      />
      <Stack.Screen
        name="PokemonDetail"
        component={PokemonDetailsScreen}
        options={{ title: 'Pokemon Detail' }}
      />
    </Stack.Navigator>
  );
}

const PokemonListScreen = ({ navigation }: any) => {
  type Pokemon = { name: string; url: string };
  const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<null | Error>(null);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
      .then(response => response.json())
      .then(json => setPokemons(json.results))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  if (error) return <Text>Error loading pokemons.</Text>;

  const filteredPokemons = pokemons.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const renderItem = ({ item }: { item: Pokemon }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('PokemonDetail', { name: item.name, url: item.url })
      }
    >
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  const separator = () => (
    <View
      style={styles.separator}
    />
  );

  return (
    <View>
      <SearchBar
        placeholder="Search Pokémon..."
        onChangeText={setSearch as any}
        value={search}
        lightTheme
        round
        platform="default"
        containerStyle={styles.container}
        inputContainerStyle={styles.searchBar}
        showLoading={false}
      />
      <FlatList<Pokemon>
        data={filteredPokemons}
        keyExtractor={item => item.name}
        renderItem={renderItem}
        ItemSeparatorComponent={separator}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  searchBar: {
    backgroundColor: '#eee',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    margin: 15,
  },
});