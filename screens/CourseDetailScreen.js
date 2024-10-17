import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { fetchLessons, fetchUserProgress } from '../utils/supabaseUtils';
import LessonItem from '../components/LessonItem';

const CourseDetailScreen = ({ route, navigation }) => {
  const { courseId } = route.params;
  const { user } = useContext(AuthContext);
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLessonsAndProgress();
  }, []);

  const loadLessonsAndProgress = async () => {
    try {
      setLoading(true);
      const lessonsData = await fetchLessons(courseId);
      const progressData = await fetchUserProgress(user.id, courseId);
      
      const progressMap = {};
      progressData.forEach(item => {
        progressMap[item.lesson_id] = item.completed;
      });

      setLessons(lessonsData);
      setProgress(progressMap);
    } catch (error) {
      console.error('Error loading lessons and progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderLessonItem = ({ item }) => (
    <LessonItem
      lesson={item}
      completed={progress[item.id] || false}
      onPress={() => navigation.navigate('Lesson', { lessonId: item.id })}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Course Lessons</Text>
      {loading ? (
        <Text style={styles.loadingText}>Loading lessons...</Text>
      ) : (
        <FlatList
          data={lessons}
          renderItem={renderLessonItem}
          keyExtractor={(item) => item.id}
        />
      )}
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
});

export default CourseDetailScreen;