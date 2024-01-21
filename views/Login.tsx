import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: '',
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
        console.log(formData)
        const response = await fetch('http://10.0.2.2:8080/api/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });  
        console.log(response)
        // const data = await response.json();
        if (response.ok) {
          // Handle successful signIn, e.g., navigate to a different screen
          console.log('Signup successful');
          navigation.navigate('Home'); // Replace with your screen
        } else {
          // Handle errors, e.g., show error message
          console.log('Signup failed:');
          // Optionally update the UI to reflect the error
        }

    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign In</Text>
      <View style={styles.form}>
        <Text>email address</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleInputChange(text, 'email')}
          value={formData.email}
          placeholder="email or email"
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
          onPress={handleLogin}
        />
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>

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
  signupText: {
    marginTop: 20,
    color: 'blue',
    textAlign: 'center',
  },
});
