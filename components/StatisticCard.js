import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StatisticCard = ({ icon, value, label }) => {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={24} color="#CCFF00" />
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  value: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  label: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default StatisticCard;