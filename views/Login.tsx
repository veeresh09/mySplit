import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setUser } from '../models/userSlice';
import { User ,Group} from '../interfaces';
import { RootState } from '../store/store';


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
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
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
          const userData: User = await getUserData();
          dispatch(setUser(userData));      
          navigation.navigate('Home'); 
        } else {
          // Handle errors, e.g., show error message
          console.log('Login failed');
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

async function getUserData(): Promise<User> {
  const initialGroups: Group[] = [
    { id: 1, name: 'Group 1', description: 'Redux for Group 1' },
    { id: 2, name: 'Group 2', description: 'Redux for Group 2' },
  ];

  // Fetch logic here
  return {
      name: 'Jane Doe',
      email: 'jane@example.com',
      phoneNumber: '123-456-7890',
      groups: initialGroups,
      friends: ['friend1', 'friend2']
  };
};

