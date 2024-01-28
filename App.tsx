/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Provider } from 'react-redux';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import HomeScreen from './views/HomeScreen';
import SignInPage from './views/Login'
import SignUpPage from './views/SignUp'
import { NavigationContainer } from '@react-navigation/native';
import Footer from './components/Footer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GroupHome from './views/GroupHome';
import { store } from './store/store';
import ProfileScreen from './views/ProfileScreen';


const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={SignInPage} />
          <Stack.Screen name="SignUp" component={SignUpPage} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="GroupHome" component={GroupHome} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },

});

export default App;
