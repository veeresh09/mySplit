import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';

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
        <SafeAreaView style={styles.container}>
            <View style={styles.profileSection}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/150' }}
                    style={styles.profilePic}
                />
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.email}>{user.email}</Text>
                <Text style={styles.bio}>Bio or tagline here</Text>
            </View>
            <View style={styles.balanceSection}>
                <Text style={styles.balanceTitle}>Balance</Text>
                <Text style={styles.balance}>$120.00</Text>
            </View>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        padding: 16,
    },
    backButton: {
        marginRight: 10,
        // Add styles for back button if needed
    },
    backButtonText: {
        fontSize: 18,
        // Add styles for back button text if needed
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        // Add other styles for header title if needed
    },
    profileSection: {
        alignItems: 'center',
        padding: 20,
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        // Add a placeholder background color or actual image
        backgroundColor: '#E1E1E1',
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 8,
        marginBottom: 4,
    },
    email: {
        fontSize: 16,
        color: '#686868',
        marginBottom: 8,
    },
    bio: {
        fontSize: 14,
        color: '#A0A0A0',
        marginBottom: 16,
    },
    balanceSection: {
        alignItems: 'center',
        marginBottom: 16,
    },
    balanceTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    balance: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
    },
    logoutButton: {
        backgroundColor: '#2563EB', // A shade of blue
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 30,
        elevation: 3, // Only works on Android for shadow
        // iOS shadow styles if needed
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    logoutButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '500',
    },
});



export default ProfileScreen;
