# PokemonRN

A simple React Native app to browse and search Pokémon using the [PokeAPI](https://pokeapi.co/). Built with React Native CLI and TypeScript.

## Features

- Browse a list of all Pokémon (fetched from PokeAPI)
- Search Pokémon by name
- Tap a Pokémon to view detailed stats and sprite

## Getting Started

### Prerequisites
- Node.js
- [Get Started Without a Framework](https://reactnative.dev/docs/getting-started-without-a-framework) (This project doesn’t use Expo.)
- [CocoaPods](https://cocoapods.org/) (required for iOS development)

## Environments

- **Node.js**: v20.18.0
- **npm**: v11.4.2
- **Cocoapods**: v1.16.2
- **Xcode**: v16.3.0

### Installation

1. Clone the repository:
   ```sh
   git clone git@github.com:Szuyun-3SC/PokemonRN.git
   cd PokemonRN
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Install CocoaPods:
   ```sh
   cd ios && bundle install && bundle exec pod install && cd ..
   ```

### Running the App

#### Android
```sh
npm run android
```

#### iOS
```sh
npm run ios
```
or
```sh
npm run ios -- --simulator="iPhone 16 (18.4)"
```
to specify a simulator.

If everything is set up correctly, the app will launch in your emulator or device.

## Project Structure

```
src/
  App.tsx                # App entry point
  screens/
    RootView.tsx         # Tab navigation
    PokemonListScreen/   # Pokémon list & stack navigation
      PokemonListScreen.tsx
    PokemonDetailsScreen/
      PokemonDetailsScreen.tsx
    ReactNativeScreen/
      ReactNativeScreen.tsx
```


## API
- [PokeAPI](https://pokeapi.co/)

## Learning Resources
- [react-native-community-map](https://github.com/kelset/react-native-community-map)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React Navigation Docs](https://reactnavigation.org/docs/getting-started)
- [React Native Best Practices](https://dev.to/hellonehha/react-native-code-practices-6dl)

