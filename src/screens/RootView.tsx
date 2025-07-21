import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ReactNativeAppScreen from './ReactNativeScreen/ReactNativeScreen';
import PokemonStackScreen from './PokemonListScreen/PokemonListScreen';

const Tab = createBottomTabNavigator();

export default function AppRoot() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="RootScreen" component={PokemonStackScreen} options={{ title: 'Pokemon List', headerShown: false }} />
      <Tab.Screen name="NewAppScreen" component={ReactNativeAppScreen} options={{ title: 'New App Screen!' }} />
    </Tab.Navigator>
  );
}