import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';

// Define types for your expense items
type Expense = {
  ID: string;
  description: string;
  Amount: number;
  // Add other fields as per your expense structure
};

type GroupHomeProps = {
  route: {
    params: {
      groupName: string;
      groupId : string;
      // Include other route parameters if necessary
    }
  }
};

const GroupHome: React.FC<GroupHomeProps> = ({ route }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]); // State to store expenses
  const { groupId } = route.params;
  useEffect(() => {
    // Fetch expenses for the group when the component mounts
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    if (!groupId) return; // Ensure groupId is available

    const apiUrl = `http://10.0.2.2:8080/api/groups/${groupId}/expenses`; // Construct the URL with groupId
    try {
      const response = await fetch(apiUrl);
      const data: Expense[] = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const renderExpense = ({ item }: { item: Expense }) => (
    <View style={styles.expenseItem}>
      <Text>{item.description}</Text>
      <Text>{`Amount: ${item.Amount}`}</Text>
      {/* Add more details as needed */}
    </View>
  );

  const addExpense = () => {
    // Navigate to Add Expense screen or handle addition
  };

  const addUser = () => {
    // Navigate to Add User screen or handle user addition
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{route.params.groupName}</Text>
      <FlatList
        data={expenses}
        renderItem={renderExpense}
        keyExtractor={(item) => item.ID}
      />
      <Button title="Add Expense" onPress={addExpense} />
      <Button title="Add User" onPress={addUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 20 },
  expenseItem: { margin: 10, padding: 10, borderWidth: 1, borderColor: '#ddd' }
});

export default GroupHome;
