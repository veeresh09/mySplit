import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../path/to/NavigationTypes'; // Adjust the import path as necessary

type Props = {
  route: RouteProp<RootStackParamList, 'AddUserToGroup'>;
};

const AddUserToGroupScreen: React.FC<Props> = ({ route }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const { groupId } = route.params;
  const navigation = useNavigation<any>();

  const checkUserExists = async () => {
    try {
      const encodedPhoneNumber = encodeURIComponent(phoneNumber);
      const response = await fetch(`http://10.0.2.2:8080/api/users/phoneNumber?number=${encodedPhoneNumber}`);
      const data = await response.json();
      if (data.exists) {
        // Assuming 'data' contains the user's details if they exist
        await addUserToGroup(data.userId); // Call function to add user to group
      } else {
        Alert.alert("User Not Found", "No user registered with this phone number.");
      }
    } catch (error) {
      console.error('Error checking user:', error);
      Alert.alert("Error", "Failed to check user existence.");
    }
  };

  const addUserToGroup = async (userId: string) => {
    try {
      const response = await fetch(`YOUR_API_ENDPOINT/groups/${groupId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
        }),
      });
      if (response.ok) {
        Alert.alert('Success', 'User added to the group successfully');
        navigation.goBack();
      } else {
        throw new Error('Failed to add user to the group');
      }
    } catch (error) {
      console.error('Error adding user to group:', error);
      Alert.alert("Error", "Failed to add user to the group.");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Enter User's Phone Number</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="User's Phone Number"
        keyboardType="numeric"
      />
      <Button title="Check User and Add to Group" onPress={checkUserExists} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '100%',
  },
});

export default AddUserToGroupScreen;
