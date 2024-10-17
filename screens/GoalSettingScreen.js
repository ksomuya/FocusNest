import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { supabase } from '../utils/supabaseClient';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const GoalSettingScreen = () => {
  const { user } = useContext(AuthContext);
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.id);
      if (error) throw error;
      setGoals(data || []);
    } catch (error) {
      console.error('Error fetching goals:', error.message);
    }
  };

  const addGoal = async () => {
    if (newGoal.trim()) {
      try {
        const { data, error } = await supabase
          .from('goals')
          .insert({ user_id: user.id, text: newGoal.trim(), completed: false })
          .select();
        if (error) throw error;
        setGoals([...goals, data[0]]);
        setNewGoal('');
      } catch (error) {
        console.error('Error adding goal:', error.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Learning Goals</Text>
      <View style={styles.inputContainer}>
        <CustomInput
          value={newGoal}
          onChangeText={setNewGoal}
          placeholder="Enter a new goal"
        />
        <CustomButton title="Add" onPress={addGoal} />
      </View>
      <FlatList
        data={goals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.goalItem}>
            <Text style={styles.goalText}>{item.text}</Text>
          </View>
        )}
      />
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
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  goalItem: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  goalText: {
    color: 'white',
  },
});

export default GoalSettingScreen;