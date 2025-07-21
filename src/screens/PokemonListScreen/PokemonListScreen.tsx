import * as React from 'react';
import { SearchBar } from 'react-native-elements';
import { Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function PokemonStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PokemonList" component={PokemonListScreen} options={{ title: 'Pokemon List' }} />
      <Stack.Screen name="PokemonDetail" component={PokemonDetailScreen} options={{ title: 'Pokemon Detail' }} />
    </Stack.Navigator>
  );
}

const PokemonListScreen = ({navigation}: any) => {
  type Pokemon = { name: string; url: string; };
  const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<null | Error>(null);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
      .then((response) => response.json())
      .then((json) => setPokemons(json.results))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{flex: 1}} />;
  if (error) return <Text>Error loading pokemons.</Text>;

  const filteredPokemons = pokemons.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: { item: Pokemon }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('PokemonDetail', { name: item.name, url: item.url })}
      style={{ paddingVertical: 16, paddingHorizontal: 20 }}
    >
      <Text style={{ fontSize: 18 }}>{item.name}</Text>
    </TouchableOpacity>
  );

  const ItemSeparator = () => (
    <View style={{ height: 1, backgroundColor: '#e0e0e0', marginHorizontal: 10 }} />
  );

  return (
    <>
      <SearchBar
        placeholder="Search Pokémon..."
        onChangeText={setSearch as any}
        value={search}
        lightTheme
        round
        platform="default"
        containerStyle={{ backgroundColor: 'white' }}
        inputContainerStyle={{ backgroundColor: '#eee' }}
      />
      <FlatList<Pokemon>
        data={filteredPokemons}
        keyExtractor={item => item.name}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={{ backgroundColor: '#fff', paddingVertical: 8 }}
      />
    </>
  );
};

const PokemonDetailScreen = ({ route }: any) => {
  const { name, url } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 12 }}>{name}</Text>
      <Text style={{ fontSize: 16, color: '#888' }}>{url}</Text>
    </View>
  );
};
