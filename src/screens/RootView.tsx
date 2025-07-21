import { Button, Text, View, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SearchBar } from 'react-native-elements';
import { NewAppScreen } from '@react-native/new-app-screen';

const Tab = createBottomTabNavigator();

export default function AppRoot() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="RootScreen" component={PokemonListScreen} options={{ title: 'Pokemon List' }} />
      <Tab.Screen name="NewAppScreen" component={ReactNativeAppScreen} options={{ title: 'New App Screen' }} />
    </Tab.Navigator>
  );
}

const ReactNativeAppScreen = ({navigation}: any) => {
  return (
    <View>
      <NewAppScreen />
    </View>
  );
};

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
      onPress={() => Alert.alert('Pokemon Selected', item.name)}
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
        onChangeText={setSearch}
        value={search}
        lightTheme
        round
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

const ProfileScreen = ({navigation, route}: any) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};