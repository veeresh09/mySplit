import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TextInputChangeEventData, NativeSyntheticEvent } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define types for your navigation and form data
type NavigationType = {
  navigate: (screen: string) => void;
};

type FormData = {
  username: string;
  password: string;
};

// Define the props type
type SignUpPageProps = {
  navigation: NativeStackNavigationProp<NavigationType>;
};

const SignUpPage: React.FC<SignUpPageProps> = ({ navigation }) => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });

  const handleInputChange = (text: string, fieldName: keyof FormData) => {
    setFormData({
      ...formData,
      [fieldName]: text,
    });
  };

  const handleSignUp = async () => {
    try {
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error during sign-up:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      <View style={styles.form}>
        <Text>Username</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleInputChange(text, 'username')}
          value={formData.username}
          placeholder="Username"
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
          title="Sign Up"
          onPress={handleSignUp}
        />
      </View>
    </View>
  );
};

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

export default SignUpPage;
