import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const Footer: React.FC = () => {
    const navigation = useNavigation<any>();

    const showComingSoonAlert = () => {
        Alert.alert("Coming Soon", "This feature is coming soon!");
    };

    return (
        <View style={styles.footer}>
            <TouchableOpacity style={styles.button} onPress={showComingSoonAlert}>
                <Text style={styles.buttonText}>Random</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomeScreen')}>
                <Icon name="home" size={30} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProfileScreen')}>
                <Icon name="user" size={30} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        height: 60,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    button: {
        // Add styles for your buttons here if needed
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    }
});

export default Footer;
