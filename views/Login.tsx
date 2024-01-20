import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SignInPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (text:string, fieldName:string) => {
    setFormData({
      ...formData,
      [fieldName]: text,
    });
  };
  const navigation = useNavigation();
  const handleLogin = async () => {
      try {
      // Replace this with your API call in React Native
      // You'll need to use a library like Axios or fetch for network requests
      // Example: const response = await fetch('http://localhost:3002/api/login', {
      //            method: 'POST',
      //            body: JSON.stringify(formData),
      //            headers: {
      //              'Content-Type': 'application/json',
      //            },
      //          });

      // Check the response from the server
      // Example: const data = await response.json();
      //          if (data.message === 'OK') {
      //            // Redirect to another page upon successful login
      //            // Use navigation for navigation actions
      //          } else {
      //            // Handle error (e.g., display an error message)
      //            alert('Invalid username or password');
      //            console.error('Invalid username or password');
      //          }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign In</Text>
      <View style={styles.form}>
        <Text>Username or email address</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleInputChange(text, 'username')}
          value={formData.username}
          placeholder="Username or email"
        />
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleInputChange(text, 'password')}
          value={formData.password}
          secureTextEntry={true}
          placeholder="Password"
        />
        <Button
          title="Login"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});
