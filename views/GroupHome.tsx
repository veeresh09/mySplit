import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GroupHome: React.FC<{ route: any }> = ({ route }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{route.params.groupName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 20 }
});

export default GroupHome;
