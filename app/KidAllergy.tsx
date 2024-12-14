import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import api from './axiosConfig';

const KidAllergy: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
  const { childId } = route.params; // Retrieve childId from route params
  const [data, setData] = useState({ allergies: '', bornDiseases: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await api.get(`/auth/child-profile/${childId}`);
        const childProfile = response.data;

        if (childProfile) {
          setData({
            allergies: childProfile.alergies || 'No allergies specified',
            bornDiseases: childProfile.bornDiseases || 'No diseases specified',
          });
        } else {
          console.error('Child profile not found.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [childId]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <LinearGradient colors={['#E3F2FD', '#FFFFFF']} style={styles.gradient}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <StatusBar style="light" />
         <LinearGradient
                colors={['#2196F3', '#64B5F6']}
                style={styles.header}
              >
                <Text style={styles.headerText}>Child Allergies</Text>
              </LinearGradient>
        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />
        ) : (
          <>
            <Text style={styles.sectionTitle}>Allergies</Text>
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{data.allergies}</Text>
            </View>
            <Text style={styles.sectionTitle}>Born Diseases</Text>
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{data.bornDiseases}</Text>
            </View>
          </>
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  gradient: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 30,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#388E3C',
    marginTop: 20,
    marginBottom: 10,
  },
  loader: {
    marginTop: 40,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderRadius:15,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: '#F1F8E9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4CAF50',
  },
});

export default KidAllergy;
