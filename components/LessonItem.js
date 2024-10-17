import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LessonItem = ({ lesson, completed, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.duration}>{lesson.duration} min</Text>
      </View>
      <View style={styles.statusContainer}>
        {completed ? (
          <Ionicons name="checkmark-circle" size={24} color="#CCFF00" />
        ) : (
          <Ionicons name="play-circle" size={24} color="#888" />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  duration: {
    color: '#888',
    fontSize: 14,
  },
  statusContainer: {
    marginLeft: 10,
  },
});

export default LessonItem;