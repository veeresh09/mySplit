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
import AddExpense from './views/AddExpense';

const Stack = createNativeStackNavigator();
type RootStackParamList = {
  HomeScreen: undefined; // If no parameters are passed to Home screen
  GroupHome: {
    groupName: string;
    groupId: string;
  };
  AddExpense:{
    groupId: string;
  };
  SignInPage: undefined;
  SignUpPage: undefined;
  ProfileScreen: undefined;
  // Define types for other screens as needed
};
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignInPage">
          <Stack.Screen name="SignInPage" component={SignInPage} />
          <Stack.Screen name="SignUpPage" component={SignUpPage} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="GroupHome" component={GroupHome} />
          <Stack.Screen name="AddExpense" component={AddExpense} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
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
