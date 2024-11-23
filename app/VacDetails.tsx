import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, Dimensions, RefreshControl, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { StatusBar } from 'expo-status-bar';
import api from './axiosConfig'; // Import the configured axios instance

const { width, height } = Dimensions.get('window');

interface Vaccine {
  id: string;
  name: string;
  details: string;
  dose: string;
  route: string;
  date: string;
}

const VacDetails: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [vaccineData, setVaccineData] = useState<Vaccine[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [fullName, setUserName] = useState(''); // To hold the parent's name
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    fetchUserData();
    fetchVaccineData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const response = await api.get('/auth/parent-name'); // Adjust this endpoint based on your backend
        if (response.data && response.data.fullName) {
          setUserName(response.data.fullName); // Set the parent's name from the backend response
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchVaccineData = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const response = await api.get('/auth/vaccines'); // Your endpoint to fetch vaccine data
        setVaccineData(response.data);
      }
    } catch (error) {
      console.error('Error fetching vaccine details:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchVaccineData().then(() => setRefreshing(false));
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <LinearGradient
        colors={['#2196F3', '#64B5F6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <Image
          style={styles.profileImage}
          source={require('../assets/img/parent.jpg')}
        />
        <View style={styles.headerText}>
          <Text style={styles.greeting}>Hello, {fullName}</Text>
          <Text style={styles.subGreeting}>Here are your vaccine details</Text>
        </View>
      </LinearGradient>
    </View>
  );

  const renderVaccineItem = (vaccine: Vaccine) => (
    <View style={styles.vaccineItem}>
      <Text style={styles.vaccineName}>{vaccine.name}</Text>
      <Text style={styles.vaccineDetails}>{vaccine.details}</Text>
      <Text style={styles.vaccineInfo}>Dose: {vaccine.dose}</Text>
      <Text style={styles.vaccineInfo}>Route: {vaccine.route}</Text>
      <Text style={styles.vaccineDate}>Date: {vaccine.date}</Text>
    </View>
  );

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {renderHeader()}
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#4CAF50" />
          }
        >
          {vaccineData.map((vaccine) => renderVaccineItem(vaccine))}
        </ScrollView>
      )}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#4CAF50" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  headerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#FFFFFF',
  },
  subGreeting: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#E3F2FD',
    marginTop: 5,
  },
  scrollContent: {
    padding: 15,
  },
  vaccineItem: {
    marginBottom: 15,
    borderRadius: 15,
    padding: 15,
    backgroundColor: '#f0f8ff',
  },
  vaccineName: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  vaccineDetails: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
    marginBottom: 10,
  },
  vaccineInfo: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#4CAF50',
  },
  vaccineDate: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#888',
    marginTop: 5,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 20,
  },
});

export default VacDetails;
