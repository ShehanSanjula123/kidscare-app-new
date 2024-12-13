import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CFooter from '@/components/CFooter';

const { width } = Dimensions.get('window');

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

const currentDate = formatDate(new Date());

// Mock API call
const fetchHealthData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        allergies: ['Peanuts', 'Dust mites', 'Penicillin'],
        diseases: ['Asthma', 'Eczema']
      });
    }, 1000);
  });
};

const KidAllergy: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [healthData, setHealthData] = useState({ allergies: [], diseases: [] });
  const [loading, setLoading] = useState(true);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchHealthData();
        setHealthData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching health data:', error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#2196F3', '#64B5F6']}
        style={styles.header}
      >
        <View style={styles.profileContainer}>
          <Image
            style={styles.profileImage}
            source={require('../assets/img/ellipse-52.png')}
          />
          <View>
            <Text style={styles.greeting}>Hello, baby</Text>
            <Text style={styles.date}>{currentDate}</Text>
          </View>
        </View>
      </LinearGradient>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          {loading ? (
            <Text style={styles.loadingText}>Loading health data...</Text>
          ) : (
            <>
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Allergies of the child</Text>
                  <MaterialCommunityIcons name="allergy" size={24} color='#2196F3'/>
                </View>
                <View style={styles.infoContainer}>
                  {healthData.allergies.map((allergy, index) => (
                    <Text key={index} style={styles.infoText}>• {allergy}</Text>
                  ))}
                </View>
              </View>
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Congenital diseases of the child</Text>
                  <MaterialCommunityIcons name="dna" size={24} color="#2196F3" />
                </View>
                <View style={styles.infoContainer}>
                  {healthData.diseases.map((disease, index) => (
                    <Text key={index} style={styles.infoText}>• {disease}</Text>
                  ))}
                </View>
              </View>
            </>
          )}
        </Animated.View>
      </ScrollView>
      <CFooter/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 15,
  },
  greeting: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#fff',
  },
  date: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#fff',
    opacity: 0.8,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#333',
    marginBottom: 5,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
    textAlign: 'center',
  },
});

export default KidAllergy;

