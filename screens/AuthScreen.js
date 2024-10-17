import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const { signIn, signUp } = useContext(AuthContext);

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signIn({ email, password });
        console.log('Login successful');
      } else {
        console.log('Attempting to sign up with:', email);
        const { user, session } = await signUp({ email, password });
        console.log('Sign up result:', { user, session });
        if (user && !session) {
          Alert.alert('Sign Up Successful', 'Please check your email for confirmation.');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      Alert.alert(
        'Authentication Error', 
        `${error.message || 'An unexpected error occurred'}\n\nPlease check console for more details.`
      );
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</Text>
      <CustomInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <CustomInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <CustomButton
        title={isLogin ? 'Login' : 'Sign Up'}
        onPress={handleAuth}
      />
      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.switchText}>
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  switchText: {
    color: '#CCFF00',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default AuthScreen;