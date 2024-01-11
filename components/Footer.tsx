import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Footer: React.FC = () => {
    return (
        <View style={styles.footer}>
            <Text>
                This is the footer
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        height: 60,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
});

export default Footer;
