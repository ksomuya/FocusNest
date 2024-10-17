import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressBar = ({ progress, style }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.bar, { width: `${progress * 100}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: '#CCFF00',
  },
});

export default ProgressBar;