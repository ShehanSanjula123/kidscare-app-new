import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, Button, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import api from './axiosConfig';
import DFooter from '@/components/DFooter';

const VaccineScheduleDoc: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
  const { childId } = route.params; // Retrieve childId from route params
  const [data, setData] = useState({ vaccinesGiven: '', vaccinesToBeGiven: '' });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await api.patch(`/auth/child-profile-fields/${childId}`);
        const childProfile = response.data;
        if (childProfile) {
          setData({
            vaccinesGiven: childProfile.vaccinesGiven || 'No vaccines given yet',
            vaccinesToBeGiven: childProfile.vaccinesToBeGiven || 'No upcoming vaccines',
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

  const handleSave = async () => {
    try {
      const newData = {
        vaccinesGiven: data.vaccinesGiven.trim(), // Ensures no leading/trailing spaces
        vaccinesToBeGiven: data.vaccinesToBeGiven.trim(),
      };
      // Send PATCH request to update the backend with only the new data
      const response = await api.patch(`/auth/child-profile-fields/${childId}`, data);
      if (response.status === 200) {
        setData(data); // Update local state with the new data
        setIsEditing(false);
      } else {
        console.error('Failed to update data. Please try again.');
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

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
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.header}
        >
          <Text style={styles.headerText}>Vaccine Schedule</Text>
        </LinearGradient>
        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />
        ) : (
          <>
            <Text style={styles.sectionTitle}>Vaccines Given</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={data.vaccinesGiven}
                onChangeText={(text) => setData({ ...data, vaccinesGiven: text })}
              />
            ) : (
              <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{data.vaccinesGiven}</Text>
              </View>
            )}

            <Text style={styles.sectionTitle}>Vaccines To Be Given</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={data.vaccinesToBeGiven}
                onChangeText={(text) => setData({ ...data, vaccinesToBeGiven: text })}
              />
            ) : (
              <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{data.vaccinesToBeGiven}</Text>
              </View>
            )}

            {isEditing ? (
              <Button title="Save" onPress={handleSave} color='rgba(20, 92, 248, 0.8)' />
            ) : (
              <Button title="Edit" onPress={() => setIsEditing(true)} color='rgba(21, 87, 229, 0.8)' />
            )}
          </>
        )}
      </LinearGradient>
      <DFooter/>
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
    color: '#4c669f',
    marginTop: 35,
    marginBottom: 10,
  },
  loader: {
    marginTop: 40,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderRadius: 15,
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
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#192f6a',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#388E3C',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
});

export default VaccineScheduleDoc;
