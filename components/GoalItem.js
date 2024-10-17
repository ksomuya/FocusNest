import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GoalItem = ({ goal, onToggle }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onToggle(goal.id)}>
      <View style={[styles.checkbox, goal.completed && styles.checked]}>
        {goal.completed && <Ionicons name="checkmark" size={18} color="#000" />}
      </View>
      <Text style={[styles.text, goal.completed && styles.completedText]}>{goal.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CCFF00',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#CCFF00',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
});

export default GoalItem;