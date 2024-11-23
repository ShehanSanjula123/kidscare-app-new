'use client'
import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'
import api from './axiosConfig'

const { width, height } = Dimensions.get('window')

const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString(undefined, options)
}

interface KidProfile {
  id: string
  fullName: string
  gender: string
  birthDate: string
  birthPlace: string
  vaccinesGiven: string
  vaccinesToBeGiven: string
}

const KidProf: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [parentName, setParentName] = useState('')
  const [kidProfiles, setKidProfiles] = useState<KidProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const scale = useSharedValue(0.8)

  useEffect(() => {
    scale.value = withSpring(1)
    const fetchData = async () => {
      try {
        const parentResponse = await api.get('/auth/parent-name')
        const profilesResponse = await api.get('/auth/parent-child-profiles')

        setParentName(parentResponse.data.fullName)
        setKidProfiles(profilesResponse.data.childProfiles)
      } catch (error) {
        setError('Error fetching data.')
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    }
  })


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <LinearGradient colors={['#ffffff', '#f0f8ff']} style={styles.background} />
        <ParentTop parentName={parentName} />
        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" style={styles.loadingIndicator} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <Animated.View style={[styles.profilesContainer, animatedStyle]}>
  {kidProfiles.map((profile) => (
    <KidProfileBox key={profile.id} profile={profile} navigation={navigation} />
  ))}
</Animated.View>
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('parentHome')}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  )
}

const ParentTop = ({ parentName }: { parentName: string }) => {
  const currentDate = formatDate(new Date().toISOString())
  return (
    <View style={styles.topContainer}>
      <Image style={styles.profileImage} source={require('../assets/img/parent.jpg')} />
      <View style={styles.textContainer}>
        <Text style={styles.greeting}>Hello, {parentName}</Text>
        <Text style={styles.date}>{currentDate}</Text>
      </View>
    </View>
  )
}

const KidProfileBox: React.FC<{ profile: KidProfile; navigation: any }> = ({ profile, navigation }) => {
  const [selectedChildName, setSelectedChildName] = useState("");
  const handlePress = () => {
    navigation.navigate('ChildHome', { childName: selectedChildName });
 // Pass the profile data to ChildHome
  };
  return (
    <TouchableOpacity style={styles.kidProfileBox}onPress={handlePress}>
      <LinearGradient
        colors={['#4CAF50', '#2196F3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.kidProfileGradient}
      >
        
        <Image style={styles.image} source={require('../assets/img/profile.png')} />
        <Text style={styles.kidProfileName}>{profile.fullName}</Text>
        <Text style={styles.kidProfileAge}>
          Gender: {profile.gender} | Born: {formatDate(profile.birthDate)}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  background: {
    position: 'absolute',
    left: 0,  
    right: 0,
    top: 0,
    height: height,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  image:{
    width: 80,
    height: 80,
    marginBottom:10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#4CAF50',
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  title:{
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  date: {
    fontSize: 16,
    color: '#4CAF50',
    marginTop: 5,
  },
  profilesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
    marginTop: 20,
  },
  kidProfileBox: {
    width: width * 0.49,
    aspectRatio: 0.9,
    margin: 10,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
  },
  kidProfileGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  kidProfileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  kidProfileName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  kidProfileAge: {
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center',
  },
  loadingIndicator: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(33, 150, 243, 0.8)',
    borderRadius: 20,
    padding: 8,
  },
})

export default KidProf