import React, { useState, useEffect, ReactNode } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
  StatusBar,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import axios from './axiosConfig';
import * as SecureStore from 'expo-secure-store';

const { width } = Dimensions.get('window');

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

interface Patient {
  birthDate: ReactNode;
  id: string;
  name: string;
  index: string;
  lastVisit: string;
  condition: string;
}

const DocHome: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [doctorInfo, setDoctorInfo] = useState({
    name: '',
    credentials: [],
  });
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    fetchDoctorInfo();
    fetchPatients();
  }, []);

  const fetchDoctorInfo = async () => {
    try {
      const response = await axios.get('/auth/doctor-name');
      const data = response.data;
      setDoctorInfo({
        name: data.fullName,
        credentials: data.credentials || [],
      });
    } catch (error) {
      console.error('Error fetching doctor info:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get('/auth/doctor-child-profiles');
      const data = response.data;
      const formattedPatients = data.map((child: { id: any; fullName: any; birthDate: any; }) => ({
        id: child.id,
        name: child.fullName,
        birthDate: child.birthDate,
      }));
      setPatients(formattedPatients);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderPatientItem = ({ item }: { item: Patient }) => (
    <TouchableOpacity
      style={styles.patientCard}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('KidProfDoc', { patientId: item.id, patientName: item.name,childId:item.id})}
    >
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.patientCardGradient}
      >
        <Image
          style={styles.patientImage}
          source={require('../assets/img/profile.png')}
        />
        <View style={styles.patientInfo}>
          <Text style={styles.patientName}>{item.name}</Text>
          <Text style={styles.patientIndex}>Birth Date{item.birthDate}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const handleLogout = async () => {
    // Implement logout logic here
    await SecureStore.deleteItemAsync('jwtToken');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.headerGradient}>
        <View style={styles.header}>
          <Image
            style={styles.doctorImage}
            source={require('../assets/img/parent.jpg')}
          />
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>{doctorInfo.name}</Text>
            <Text style={styles.currentDate}>{formatDate(new Date())}</Text>
          </View>
          <TouchableOpacity onPress={() => setIsMenuVisible(true)} style={styles.menuButton}>
            <Icon name="menu" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={24} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search patients..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <MaterialCommunityIcons name="account-group" size={24} color="#4c669f" />
            <Text style={styles.statNumber}>{patients.length}</Text>
            <Text style={styles.statLabel}>Total Children</Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Child Profiles</Text>
        <TouchableOpacity>
        {loading ? (
          <ActivityIndicator size="large" color="#4c669f" style={styles.loader} />
        ) : (
          <FlatList
            data={filteredPatients}
            renderItem={renderPatientItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.patientList}
          />
        )}
        </TouchableOpacity>
      </View>
      <Modal
        visible={isMenuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsMenuVisible(false)}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <Icon name="log-out-outline" size={24} color="#4c669f" />
              <Text style={styles.menuItemText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}  onPress={() => navigation.navigate('ChangeP')}>
              <Icon name="log-out-outline" size={24} color="#4c669f" />
              <Text style={styles.menuItemText}>Change Password</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerGradient: {
    paddingTop: 50,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
    borderWidth: 3,
    borderColor: '#fff',
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  doctorCredentials: {
    fontSize: 14,
    color: '#ddd',
  },
  currentDate: {
    fontSize: 14,
    color: '#ddd',
    marginTop: 5,
  },
  menuButton: {
    padding: 10,
  },
  content: {
    flex: 1,
    marginTop: -20,
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    elevation: 3,
    width: (width - 60) / 3,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 20,
    marginBottom: 10,
  },
  patientList: {
    paddingHorizontal: 10,
  },
  patientCard: {
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
  },
  patientCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    padding: 15,
  },
  patientImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#fff',
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  patientIndex: {
    fontSize: 14,
    color: '#ddd',
    marginBottom: 5,
  },
  patientLastVisit: {
    fontSize: 12,
    color: '#ddd',
    marginBottom: 5,
  },
  patientConditionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
  },
  patientCondition: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuItemText: {
    fontSize: 18,
    marginLeft: 15,
    color: '#333',
  },
});

export default DocHome;

