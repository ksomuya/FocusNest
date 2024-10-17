import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../utils/supabaseClient';
import CustomButton from '../components/CustomButton';
import ProgressBar from '../components/ProgressBar';
import VideoPlayer from '../components/VideoPlayer';  // Assuming we have a VideoPlayer component

const LessonScreen = ({ route, navigation }) => {
  const { courseId, lessonId } = route.params;
  const [lesson, setLesson] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchLesson();
    fetchProgress();
  }, []);

  const fetchLesson = async () => {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', lessonId)
        .single();
      if (error) throw error;
      setLesson(data);
    } catch (error) {
      console.error('Error fetching lesson:', error);
    }
  };

  const fetchProgress = async () => {
    // Implement logic to fetch user's progress for this lesson
    // This is a placeholder
    setProgress(0.5);
  };

  const handleComplete = async () => {
    try {
      const { error } = await supabase
        .from('user_lessons')
        .upsert({ user_id: supabase.auth.user().id, lesson_id: lessonId, completed: true });
      if (error) throw error;
      navigation.goBack();
    } catch (error) {
      console.error('Error marking lesson as complete:', error);
    }
  };

  if (!lesson) {
    return <View style={styles.container}><Text style={styles.loadingText}>Loading...</Text></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{lesson.title}</Text>
          <View style={{ width: 24 }} /> {/* Empty view for layout balance */}
        </View>

        <View style={styles.content}>
          {lesson.video_url && (
            <VideoPlayer videoUrl={lesson.video_url} style={styles.video} />
          )}

          <Text style={styles.lessonContent}>{lesson.content}</Text>

          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>Your Progress</Text>
            <ProgressBar progress={progress} style={styles.progressBar} />
            <Text style={styles.progressPercentage}>{Math.round(progress * 100)}%</Text>
          </View>

          <CustomButton
            title="Mark as Complete"
            onPress={handleComplete}
            style={styles.completeButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  video: {
    width: '100%',
    aspectRatio: 16 / 9,
    marginBottom: 20,
  },
  lessonContent: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  progressBar: {
    marginBottom: 5,
  },
  progressPercentage: {
    color: '#CCFF00',
    fontSize: 14,
    textAlign: 'right',
  },
  quizButton: {
    marginBottom: 10,
  },
  completeButton: {
    backgroundColor: '#CCFF00',
  },
});

export default LessonScreen;