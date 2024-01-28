import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../store/store'; // Import RootState type
import { logoutUser } from '../models/userSlice';
import { User } from '../interfaces'; // Import your User interface
import { RootStackParamList } from '../path/to/NavigationTypes';
const ProfileScreen: React.FC = () => {
    const user = useSelector((state: RootState) => state.user as User);
    const dispatch = useDispatch();
    const navigation = useNavigation<any>(); // Specify the type if you have a custom type for navigation

    const handleLogout = () => {
        dispatch(logoutUser());
        navigation.navigate('SignInPage'); // Replace with your login screen name
    };

    return (
        <View style={styles.container}>
            <Text style={styles.userInfo}>Email: {user.email}</Text>
            <Text style={styles.userInfo}>Name: {user.name}</Text>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    userInfo: {
        fontSize: 18,
        marginBottom: 10
    }
});

export default ProfileScreen;
