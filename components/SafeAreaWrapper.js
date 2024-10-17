import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar, View } from 'react-native';

const SafeAreaWrapper = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={styles.content}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Or any color that matches your app's theme
  },
  content: {
    flex: 1,
    paddingTop: 20, // Add padding to the top
    // paddingHorizontal: 15, // Optional: add horizontal padding
  },
});

export default SafeAreaWrapper;