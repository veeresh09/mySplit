import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { RootStackParamList } from '../path/to/NavigationTypes';
import { RouteProp } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
// Define types for the form data and navigation props
type ExpenseFormData = {
  description: string;
  amount: string; // Using string for input handling
};

type AddExpenseScreenProps = {
    route: RouteProp<RootStackParamList, 'AddExpense'>;
    navigation: any; // Replace 'any' with your navigation type if using a type system like @react-navigation/native
};

const AddExpenseScreen: React.FC<AddExpenseScreenProps> = ({ route, navigation }) => {
  const { groupId } = route.params;
  const [formData, setFormData] = useState<ExpenseFormData>({ description: '', amount: '' });
  const dispatch = useDispatch();
  //const reduxUserGroups = useSelector((state: RootState) => state.user.groups);
  const userId = useSelector((state: RootState) => state.user.id);
  const handleSubmit = async () => {
    if (!formData.description || !formData.amount) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Construct the expense data
    const expenseData = {
      GroupID: groupId,
      PaidBy: '',
      Amount: parseFloat(formData.amount),
      Description: formData.description,
      Split: [], // Add logic for handling ExpenseSplit
    };

    // API call
    try {
      const response = await fetch('http://10.0.2.2:8080/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expenseData),
      });

      if (response.ok) {
        Alert.alert('Success', 'Expense added successfully');
        navigation.goBack();
      } else {
        const errorText = await response.text();
        Alert.alert('Error', `Failed to add expense: ${errorText}`);
      }
    } catch (error) {
      Alert.alert('Error', `Network error: ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={formData.description}
        onChangeText={(text) => setFormData({ ...formData, description: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={formData.amount}
        keyboardType="numeric"
        onChangeText={(text) => setFormData({ ...formData, amount: text })}
      />
      <Button title="Submit Expense" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }
});

export default AddExpenseScreen;
