import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Footer from '../components/Footer';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { Group } from '../interfaces'
import { addGroup } from '../models/userSlice'; // Import the action creator
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const HomeScreen: React.FC<{ route: any }> = ({ route }) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const reduxUserGroups = useSelector((state: RootState) => state.user.groups);
  const userEmail = useSelector((state: RootState) => state.user.email);

  const [modalVisible, setModalVisible] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');

  const addNewGroup = async (): Promise<void> => {
    const newGroup: Group = {
      id: reduxUserGroups.length + 1,
      name: newGroupName,
      description: newGroupDescription,
      creator: "onechance@2024.com"
    };
    const createdGroup = await createGroupApiCall(newGroup);

    setModalVisible(false);
    setNewGroupName('');
    setNewGroupDescription('');
    if (createdGroup) {
      dispatch(addGroup(newGroup));
    } else {
      Alert.alert('Error', 'Failed to create a new group.');
    }
  };

  const createGroupApiCall = async (group: Group): Promise<Group | null> => {
    try {
      const response = await fetch('http://10.0.2.2:8080/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(group),
      });
      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to create group');
      }

      return await response.json();
    } catch (error) {
      console.error('Error during API call:', error);
      return null;
    }
  };

  const GroupCard: React.FC<{ name: string; description: string }> = ({ name, description }) => (
    <View style={styles.groupCard}>
      <Icon name="users" size={24} color="black" style={{ marginRight: 10 }} />
      <View style={{ flex: 1 }}>
        <Text style={styles.groupName}>{name}</Text>
        <Text style={styles.groupDescription}>{description}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('GroupHome', { groupName: name })} style={styles.goButton}>
        <Text style={styles.goButtonText}>Go</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addNewGroupButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addNewGroupButtonText}>+ Add New Group</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
        {reduxUserGroups.map(group => (
          <GroupCard key={group.id} name={group.name} description={group.description} />
        ))}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              placeholder="Group Name"
              style={styles.input}
              onChangeText={setNewGroupName}
              value={newGroupName}
            />
            <TextInput
              placeholder="Group Description"
              style={[styles.input, styles.descriptionInput]}
              onChangeText={setNewGroupDescription}
              value={newGroupDescription}
            />
            <View style={styles.buttonRow}>
              <Button title="Create Group" onPress={addNewGroup} />
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  addNewGroupButton: {
    backgroundColor: '#3498DB', // A blue shade for the button
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
  },
  addNewGroupButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  container: {
    flex: 1,
    backgroundColor: '#ECF0F1', // Lighter background color for the whole screen
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '90%', // Set the width of the modal
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '80%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  input: {
    backgroundColor: '#f2f2f2', // Light grey background
    borderRadius: 10, // Curved corners
    width: '80%', // Default width
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  descriptionInput: {
    height: 80, // Make the height larger for description
  },
  groupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#DADFE1',
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  groupDescription: {
    color: '#666',
  },
  goButton: {
    backgroundColor: '#2ECC71', // A green shade for the button
    padding: 10,
    borderRadius: 5,
  },
  goButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },

});

export default HomeScreen;
