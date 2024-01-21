import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TextInputChangeEventData, NativeSyntheticEvent } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define types for your navigation and form data
type NavigationType = {
  navigate: (screen: string) => void;
};

interface FormData {
    name: string;
    mobileNumber: string;
    email: string;
    password: string;
}
  
interface FormErrors {
    name?: string;
    mobileNumber?: string;
    email?: string;
    password?: string;
}
  
// Define the props type
type SignUpPageProps = {
  navigation: NativeStackNavigationProp<NavigationType>;
};

const SignUpPage: React.FC<SignUpPageProps> = ({ navigation }) => {

    const [formData, setFormData] = useState<FormData>({
        name: '',
        mobileNumber: '',
        email: '',
        password: '',
      });
    
    const handleInputChange = (text: string, fieldName: keyof FormData) => {
        setFormData({
          ...formData,
          [fieldName]: text,
        });
        if (formErrors[fieldName]) {
            setFormErrors({
              ...formErrors,
              [fieldName]: undefined,
            });
          }
      
    };
    const [formErrors, setFormErrors] = useState<FormErrors>({});

    const validateForm = (): boolean => {
        let errors: FormErrors = {};
    
        // Add your validation logic here
        if (!formData.name) errors.name = 'Name is required';
        if (!formData.mobileNumber) errors.mobileNumber = 'Mobile number is required';
        if (!formData.email.includes('@')) errors.email = 'Email is invalid';
        if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
    
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
      };    
        
    const handleSignUp = async () => {
        try {
          if (validateForm())  {
            const response = await fetch('http://10.0.2.2:8080/api/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });  
            const data = await response.json();

            // Check the response status
            if (response.ok) {
              // Handle successful signup, e.g., navigate to a different screen
              console.log('Signup successful', data);
              navigation.navigate('Login'); // Replace with your screen
            } else {
              // Handle errors, e.g., show error message
              console.log('Signup failed:', data);
              // Optionally update the UI to reflect the error
            }
          }
        } catch (error) {
          console.log('Error during sign-up:', error);
        }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      <View style={styles.form}>
        <Text>Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleInputChange(text, 'name')}
          value={formData.name}
          placeholder="Enter your name"
        />
        <Text>Mobile Number</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleInputChange(text, 'mobileNumber')}
          value={formData.mobileNumber}
          placeholder="Enter your mobile number"
        />
        {/* Email Input */}
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleInputChange(text, 'email')}
          value={formData.email}
          placeholder="Enter your email"
        />
        {/* Password Input */}
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
