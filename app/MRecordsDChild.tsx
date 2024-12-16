import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, Platform, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import api from './axiosConfig';
import DFooter from '@/components/DFooter';

const MRecordsDChild: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
  const { childId } = route.params;
  const [data, setData] = useState({ records: '' });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecords, setEditedRecords] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.patch(`/auth/child-profile-fields/${childId}`);
        const childProfile = response.data;

        if (childProfile) {
          setData({
            records: childProfile.medicalRecords || 'No records specified',
          });
          setEditedRecords(childProfile.medicalRecords || 'No records specified');
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

  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleSavePress = async () => {
    try {
      setLoading(true);
      const response = await api.patch(`/auth/child-profile-fields/${childId}`, {
        medicalRecords: editedRecords,
      });

      if (response.status === 200) {
        setData({ records: editedRecords });
        setIsEditing(false);
        Alert.alert('Success', 'Medical records updated successfully');
      } else {
        Alert.alert('Error', 'Failed to update medical records');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      Alert.alert('Error', 'An error occurred while saving the medical records');
    } finally {
      setLoading(false);
    }
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
          <Text style={styles.headerText}>Child Medical Records</Text>
        </LinearGradient>
        <ScrollView>
        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />
        ) : (
          <>
            <Text style={styles.sectionTitle}>Medical Records</Text>
            <View style={styles.itemContainer}>
              {isEditing ? (
                <TextInput
                  style={[styles.itemText, styles.input]}
                  value={editedRecords}
                  onChangeText={setEditedRecords}
                  multiline
                />
              ) : (
                <Text style={styles.itemText}>{data.records}</Text>
              )}
            </View>
            {isEditing ? (
              <TouchableOpacity style={styles.editButton} onPress={handleSavePress}>
                <Text style={styles.editButtonText}>Save</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            )}
          </>
        )}
        </ScrollView>
      </LinearGradient>
      
      <DFooter />
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
    backgroundColor: 'rgba(225, 44, 44, 0.8)',
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
    color: 'rgb(66, 102, 179)',
    marginTop: 45,
    marginBottom: 30,
  },
  loader: {
    marginTop: 40,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 40,
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
    color: 'rgb(92, 140, 246)',
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgb(92, 140, 246)',
    borderRadius: 5,
    padding: 10,
  },
  editButton: {
    backgroundColor: 'rgb(66, 102, 179)',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MRecordsDChild;

