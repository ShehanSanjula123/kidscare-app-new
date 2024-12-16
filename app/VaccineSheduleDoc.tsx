import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, Platform, Image, Animated, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import api from './axiosConfig';
import DFooter from '@/components/DFooter';

interface AccordionItemProps {
  title: string;
  content: string;
  isEditing: boolean;
  onChangeText: (text: string) => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, isEditing, onChangeText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const animatedHeight = useState(new Animated.Value(0))[0];

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    Animated.timing(animatedHeight, {
      toValue: isOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.accordionItem}>
      <TouchableOpacity onPress={toggleAccordion} style={styles.accordionHeader}>
        <Text style={styles.accordionTitle}>{title}</Text>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={24}
          color="#3b5998"
        />
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.accordionContent,
          {
            maxHeight: animatedHeight.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 500],
            }),
          },
        ]}
      >
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={content}
            onChangeText={onChangeText}
            multiline
          />
        ) : (
          <Text style={styles.accordionText}>{content}</Text>
        )}
      </Animated.View>
    </View>
  );
};

const VaccineScheduleDoc: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const { childId, childName } = route.params;
  const [data, setData] = useState({ vaccinesGiven: '', vaccinesToBeGiven: '' });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
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
        vaccinesGiven: data.vaccinesGiven.trim(),
        vaccinesToBeGiven: data.vaccinesToBeGiven.trim(),
      };
      const response = await api.patch(`/auth/child-profile-fields/${childId}`, newData);
      if (response.status === 200) {
        setData(newData);
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
      <StatusBar style="light" />
      <LinearGradient colors={['#E3F2FD', '#FFFFFF']} style={styles.gradient}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <KidTop name={childName} />
        <ScrollView>
        {loading ? (
          <ActivityIndicator size="large" color="#3b5998" style={styles.loader} />
        ) : (
          <View style={styles.contentContainer}>
            <AccordionItem
              title="Vaccines Given"
              content={data.vaccinesGiven}
              isEditing={isEditing}
              onChangeText={(text) => setData({ ...data, vaccinesGiven: text })}
            />
            <AccordionItem
              title="Vaccines To Be Given"
              content={data.vaccinesToBeGiven}
              isEditing={isEditing}
              onChangeText={(text) => setData({ ...data, vaccinesToBeGiven: text })}
            />
            <TouchableOpacity
              style={styles.editButton}
              onPress={isEditing ? handleSave : () => setIsEditing(true)}
            >
              <Text style={styles.editButtonText}>
                {isEditing ? 'Save' : 'Edit'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        </ScrollView>
      </LinearGradient>
      <DFooter />
    </View>
  );
};

const KidTop: React.FC<{ name: string }> = ({ name }) => {
  return (
    <View style={styles.topContainer}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.greetingGradient}
      >
        <Image
          style={styles.profileImage}
          source={require('../assets/img/ellipse-52.png')}
        />
        <View style={styles.textContainer}>
          <Text style={styles.greeting}>Hello, {name}</Text>
          <Text style={styles.date}>Vaccine Schedule</Text>
        </View>
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
    paddingTop: Platform.OS === 'ios' ? 60 : 30,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 30,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(59, 89, 152, 0.8)',
    borderRadius: 20,
    padding: 8,
  },
  loader: {
    marginTop: 40,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  topContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  greetingGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  textContainer: {
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
    opacity: 0.8,
  },
  accordionItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#F1F8E9',
  },
  accordionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3b5998',
  },
  accordionContent: {
    overflow: 'hidden',
  },
  accordionText: {
    fontSize: 16,
    color: '#333',
    padding: 15,
  },
  input: {
    fontSize: 16,
    color: '#333',
    padding: 15,
    textAlignVertical: 'top',
  },
  editButton: {
    backgroundColor: '#3b5998',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VaccineScheduleDoc;

