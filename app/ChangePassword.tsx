'use client'
import React, { useState, useRef } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import * as Animatable from 'react-native-animatable'
import { BlurView } from 'expo-blur'
import api from './axiosConfig'

const { width, height } = Dimensions.get('window')

const ChangePassword: React.FC = () => {
  const [userName, setName] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [saving, setSaving] = useState(false)
  const fadeAnim = useRef(null)

  const saveUser = async () => {
    if (!userName || !password || !newPassword) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }

    if (password === newPassword) {
      Alert.alert('Error', 'New password must be different from the current password')
      return
    }

    try {
      setSaving(true)
      // First, verify the current credentials
      
      // If login is successful, proceed with password change
      const response = await api.patch('/auth/change-password', {
        userName: userName,
        password: password,
        newPassword: newPassword,
      })
      Alert.alert('Success', 'Password updated successfully.')
    } catch (error) {
      Alert.alert('Error', 'Failed to update password. Please check your current credentials and try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LinearGradient
        colors={['#FFFFFF', '#FAFDFB']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Animatable.View 
          animation="fadeIn" 
          duration={1000} 
          style={styles.logoContainer}
          ref={fadeAnim}
        >
          <Ionicons name="lock-closed" size={80} color="#4299E1" />
        </Animatable.View>

        <Animatable.View animation="slideInUp" duration={1000} style={styles.formContainer} >
          <BlurView intensity={80} tint="light" style={styles.blurContainer} >
            <Text style={styles.title}>Reset Password</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={24} color="#4299E1" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#999"
                onChangeText={setName}
                value={userName}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={24} color="#4299E1" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Current Password"
                placeholderTextColor="#999"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
              />
            </View>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-open-outline" size={24} color="#4299E1" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="New Password"
                placeholderTextColor="#999"
                onChangeText={setNewPassword}
                value={newPassword}
                secureTextEntry
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={saveUser}
              disabled={saving}
              activeOpacity={0.7}
            >
              {saving ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.buttonText}>Update Password</Text>
              )}
            </TouchableOpacity>
          </BlurView>
        </Animatable.View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  formContainer: {
    width: width * 0.9,
    maxWidth: 400,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor:'#4BE865',
  },
  blurContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4299E1',
    marginBottom: 30,
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#333',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4299E1',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default ChangePassword