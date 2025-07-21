/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import RootScreen from './screens/RootView'

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  // return (
  //   <View style={styles.container}>
  //     <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
  //     <NewAppScreen></NewAppScreen>

  //   </View>
  // );
  return (
    <NavigationContainer>
      <RootScreen/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
