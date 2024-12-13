import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

type RootStackParamList = {
  parentHome: { nicNo: string; userName: string; userType: string };
  docHome: { nicNo: string; userName: string; userType: string };
  ForgotPassword: undefined;
  ResetPassword: { email: string };
  ChangeP: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const buttonScale = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<LoginScreenNavigationProp>();

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(buttonScale, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true }).start();
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.39.100:3000/auth/login', {
        userName: username,
        password: password,
      });

      const { accessToken, nicNo, userName, userType } = response.data;

      if (accessToken && userType) {
        await AsyncStorage.setItem('accessToken', accessToken);

        if (userType === 'PARENT') {
          navigation.navigate('parentHome', { nicNo, userName, userType });
        } else if (userType === 'DOCTOR') {
          navigation.navigate('docHome', { nicNo, userName, userType });
        } else {
          Alert.alert('Error', 'Unknown user type');
        }
      } else {
        Alert.alert('Login Failed', 'Invalid credentials or user type');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Login Error', 'An error occurred during login. Please try again.');
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <StatusBar style="dark" />
        <LinearGradient colors={['#F0F4F8', '#E2E8F0', '#CBD5E0']} style={styles.gradient}>
          <Animated.View style={[styles.loginContainer, { opacity: fadeAnim }]}>
            <BlurView intensity={10} tint="light" style={styles.blurContainer}>
              <Text style={styles.title}>Welcome Back</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={24} color="#4299E1" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor="#A0AEC0"
                  value={username}
                  onChangeText={setUsername}
                />
              </View>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={24} color="#4299E1" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#A0AEC0"
                  secureTextEntry={!isPasswordVisible}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                  <Ionicons name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} size={24} color="#4A5568" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={handleLogin}
                activeOpacity={0.8}
              >
                <Animated.View style={[styles.button, { transform: [{ scale: buttonScale }] }]}>
                  <Text style={styles.buttonText}>Login</Text>
                </Animated.View>
              </TouchableOpacity>
              <View style={styles.linkContainer}>
                <TouchableOpacity onPress={handleForgotPassword}>
                  <Text style={styles.linkText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
            </BlurView>
          </Animated.View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  gradient: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  loginContainer: {
    width: width * 0.9,
    maxWidth: 400,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#91F391',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  blurContainer: {
    padding: 30,
    alignItems: 'center',
  },
  title: { 
    fontSize: width * 0.08, 
    color: '#4299E1', 
    marginBottom: height * 0.04, 
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 10,
    marginBottom: height * 0.02,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  icon: { 
    marginRight: 10 
  },
  input: { 
    flex: 1, 
    color: '#2D3748', 
    fontSize: width * 0.04, 
    paddingVertical: 15 
  },
  button: { 
    backgroundColor: '#4299E1', 
    paddingVertical: 15, 
    paddingHorizontal: 40, 
    borderRadius: 25, 
    marginTop: height * 0.02,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: { 
    color: 'white', 
    fontSize: width * 0.05, 
    fontWeight: 'bold', 
    textAlign: 'center' 
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: height * 0.03,
  },
  linkText: { 
    color: '#4299E1', 
    fontSize: width * 0.036, 
    textDecorationLine: 'underline' 
  },
});