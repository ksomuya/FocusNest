import { supabase } from './supabaseClient';

export const fetchCourses = async () => {
  const { data, error } = await supabase
    .from('courses')
    .select('*');
  if (error) throw error;
  return data;
};

export const fetchLessons = async (courseId) => {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('course_id', courseId)
    .order('order_in_course', { ascending: true });
  if (error) throw error;
  return data;
};

export const updateUserProgress = async (userId, lessonId, completed) => {
  const { data, error } = await supabase
    .from('user_progress')
    .upsert({ user_id: userId, lesson_id: lessonId, completed })
    .select();
  if (error) throw error;
  return data;
};

export const fetchUserProgress = async (userId, courseId) => {
  const { data, error } = await supabase
    .from('user_progress')
    .select('lesson_id, completed')
    .eq('user_id', userId)
    .eq('lesson_id.course_id', courseId);
  if (error) throw error;
  return data;
};

export const submitQuizResult = async (userId, quizId, score) => {
  const { data, error } = await supabase
    .from('user_quiz_results')
    .insert({ user_id: userId, quiz_id: quizId, score })
    .select();
  if (error) throw error;
  return data;
};