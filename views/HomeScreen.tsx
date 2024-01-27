import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Footer from '../components/Footer';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { Group } from '../interfaces'
import { addGroup } from '../models/userSlice'; // Import the action creator

const HomeScreen: React.FC<{ route: any }> = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const reduxUserGroups = useSelector((state: RootState) => state.user.groups);
  const [groups, setGroups] = useState<Group[]>(reduxUserGroups);
  const addNewGroup = (): void => {
    const newGroup: Group = {
      id: groups.length + 1,
      name: `Group ${groups.length + 1}`,
      description: `Description for Group ${groups.length + 1}`,
    };
    setGroups([...groups, newGroup]);
    dispatch(addGroup(newGroup));
  };
  const GroupCard: React.FC<{ name: string; description: string }> = ({ name, description }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('GroupHome', { groupName: name, groupId: '65a5b97758f2ceb52b944296' })}>
      <Text style={styles.title}>{name}</Text>
      <Text>{description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <View>
            <Text>Welcome to SplitWise Clone!</Text>
            {/* Additional components like buttons or links */}
            <ScrollView>
              {groups.map(group => (
                <GroupCard key={group.id} name={group.name} description={group.description} />
              ))}
            </ScrollView>
            <Button title="Add New Group" onPress={addNewGroup} />
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
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
});

export default HomeScreen;
