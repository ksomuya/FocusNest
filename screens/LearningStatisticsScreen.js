import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { supabase } from '../utils/supabaseClient';

const LearningStatisticsScreen = () => {
  const { user } = useContext(AuthContext);
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    // Implement your statistics fetching logic here
    // For now, we'll use dummy data
    setStatistics({
      totalHoursLearned: 25,
      coursesCompleted: 3,
      currentStreak: 7,
    });
  };

  if (!statistics) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading statistics...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Learning Statistics</Text>
        <View style={styles.statContainer}>
          <Text style={styles.statLabel}>Total Hours Learned:</Text>
          <Text style={styles.statValue}>{statistics.totalHoursLearned}</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.statLabel}>Courses Completed:</Text>
          <Text style={styles.statValue}>{statistics.coursesCompleted}</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.statLabel}>Current Streak:</Text>
          <Text style={styles.statValue}>{statistics.currentStreak} days</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  statContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statLabel: {
    color: 'white',
    fontSize: 16,
  },
  statValue: {
    color: '#CCFF00',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LearningStatisticsScreen;