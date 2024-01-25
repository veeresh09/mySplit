import React, { useState, useEffect }  from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Footer from '../components/Footer';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {Group} from '../interfaces'

const HomeScreen: React.FC<{ route: any }> = ({ route }) => {
    const navigation = useNavigation();
    const reduxUserGroups = useSelector((state: RootState) => state.user.groups);
    var initialGroups: Group[] = [
        { id: 1, name: 'Group 1', description: 'Description for Group 1' },
        { id: 2, name: 'Group 2', description: 'Description for Group 2' },
        { id: 3, name: 'Group 3', description: 'Description for Group 3' },
      ];
    
    if (reduxUserGroups.length > 0) {
      initialGroups = reduxUserGroups
    }       
    const [groups, setGroups] = useState<Group[]>(initialGroups);
    const addNewGroup = (): void => {
        const newGroup: Group = {
          id: groups.length + 1,
          name: `Group ${groups.length + 1}`,
          description: `Description for Group ${groups.length + 1}`,
        };
        setGroups([...groups, newGroup]);
      };
      const GroupCard: React.FC<{ name: string; description: string }> = ({ name, description }) => (
        <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('GroupHome', { groupName: name })}>
            <Text style={styles.title}>{name}</Text>
          <Text>{description}</Text>
        </TouchableOpacity>
      );
        
    return (
      <ScrollView>
        <View style={styles.container}>
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
        <Footer/>
        </ScrollView>
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
