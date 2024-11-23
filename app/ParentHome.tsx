'use client'

import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Dimensions, Platform, ActivityIndicator } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'
import { BlurView } from 'expo-blur'
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins'
import api from './axiosConfig'

const { width, height } = Dimensions.get('window')

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString(undefined, options)
}

const ParentHome: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [parentName, setParentName] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scale = useSharedValue(0.8)

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  })

  useEffect(() => {
    scale.value = withSpring(1)

    const fetchUserData = async () => {
      try {
        const response = await api.get('/auth/parent-name');
        setParentName(response.data.fullName);
      } catch (error) {
        setError("Error fetching user data.");
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    } 

    fetchUserData()
  }, [])

  const animatedStyle = useAnimatedStyle(() => {
    return { transform: [{ scale: scale.value }] }
  })

  const handleLogout = async () => {
    navigation.replace('Login'); // Redirect to login screen
  };

  const handleChangePassword = () => {
    navigation.navigate('ChangeP');
  };

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <ParentTop parentName={parentName} onMenuPress={() => setIsMenuOpen(!isMenuOpen)} />
        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" style={styles.loadingIndicator} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <Animated.View style={[styles.buttonContainer, animatedStyle]}>
            {[
              { name: 'Profiles', icon: 'person', route: 'KidProf' },
              { name: 'Announcements', icon: 'megaphone', route: 'Announcements' },
              { name: 'Vaccine Details', icon: 'medical', route: 'vacDetails' },
              { name: 'BMI Calculator', icon: 'calculator', route: 'BMI' },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.button}
                activeOpacity={0.7}
                onPress={() => navigation.navigate(item.route)}
              >
                <BlurView intensity={80} tint="light" style={styles.buttonBlur}>
                  <LinearGradient
                    colors={['rgba(76, 175, 80, 0.8)', 'rgba(33, 150, 243, 0.8)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.buttonGradient}
                  >
                    <Ionicons name={item.icon as any} size={32} color="#FFF" />
                    <Text style={styles.buttonText}>{item.name}</Text>
                  </LinearGradient>
                </BlurView>
              </TouchableOpacity>
            ))}
          </Animated.View>
        )}
      </ScrollView>
      {isMenuOpen && (
        <BlurView intensity={80} tint="light" style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={handleChangePassword}>
            <Ionicons name="key-outline" size={24} color="#4CAF50" />
            <Text style={styles.menuText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#4CAF50" />
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>
        </BlurView>
      )}
    </View>
  )
}

const ParentTop = ({ parentName, onMenuPress }: { parentName: string; onMenuPress: () => void }) => {
  const currentDate = formatDate(new Date())

  return (
    <LinearGradient colors={['#2196F3', '#64B5F6']} style={styles.topContainer}>
      <Image style={styles.profileImage} source={require('../assets/img/parent.jpg')} />
      <View style={styles.textContainer}>
        <Text style={styles.greeting}>Hello, {parentName}</Text>
        <Text style={styles.date}>{currentDate}</Text>
      </View>
      <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
        <Ionicons name="menu" size={32} color="#FFFFFF" />
      </TouchableOpacity>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#FFFFFF',
  },
  date: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#FFFFFF',
    marginTop: 5,
  },
  menuButton: {
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
    paddingTop:45,
   
  },
  button: {
    width: width * 0.43,
    aspectRatio: 1,
    marginVertical: 10,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonBlur: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    marginTop: 10,
    textAlign: 'center',
  },
  loadingIndicator: {
    marginTop: 20,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    marginTop: 20,
  },
  menuContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 110 : 80,
    right: 20,
    borderRadius: 10,
    padding: 10,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#4CAF50',
  },
})

export default ParentHome

