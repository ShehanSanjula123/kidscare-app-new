import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

const { width } = Dimensions.get('window');

const vaccineData = [
  { name: 'BCG', details: 'Protects against severe tuberculosis (TB)', dose: 'Single dose', route: 'Intradermal' },
  { name: 'OPV (Oral Polio Vaccine)', details: 'Prevents polio (poliomyelitis)', dose: '5 doses (0, 2, 4, 6, 18 months)', route: 'Oral' },
  { name: 'Pentavalent (DTP-HepB-Hib)', details: 'Combines protection against diphtheria, tetanus, pertussis, hepatitis B, and Haemophilus influenzae type b.', dose: '3 doses', route: 'Intramuscular' },
  { name: 'Rotavirus Vaccine', details: 'Prevents severe diarrhea caused by rotavirus', dose: '2 doses', route: 'Oral' },
  { name: 'PCV (Pneumococcal Conjugate Vaccine)', details: 'Prevents pneumococcal diseases like pneumonia, meningitis', dose: '3 doses', route: 'Intramuscular' },
  { name: 'Measles-Rubella (MR)', details: 'Protects against measles and rubella.', dose: '2 doses', route: 'Subcutaneous' },
  { name: 'Japanese Encephalitis (JE)', details: 'Protects against Japanese encephalitis virus.', dose: '2 doses', route: 'Subcutaneous' },
  { name: 'Td Vaccine', details: 'Protects against tetanus and diphtheria', dose: 'Single dose', route: 'Intramuscular' },
];

export default function VaccineDetail() {
  const [searchQuery, setSearchQuery] = useState('');
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const filteredVaccines = vaccineData.filter(vaccine =>
    vaccine.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fadeAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2196F3', '#64B5F6']}
        style={styles.header}
      >
        <Text style={styles.headerText}>Vaccine Details</Text>
      </LinearGradient>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search vaccines..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <ScrollView horizontal style={styles.tableContainer}>
        <View>
          <View style={styles.row}>
            <Text style={styles.headerCell}>Vaccine</Text>
            <Text style={styles.headerCell}>Details</Text>
            <Text style={styles.headerCell}>Dose</Text>
            <Text style={styles.headerCell}>Route</Text>
          </View>
          <ScrollView>
            {filteredVaccines.map((vaccine, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.row,
                  {
                    opacity: fadeAnim,
                    transform: [
                      {
                        translateY: fadeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [50, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <TouchableOpacity style={styles.card}>
                  <Text style={styles.cell}>{vaccine.name}</Text>
                  <Text style={styles.cell}>{vaccine.details}</Text>
                  <Text style={styles.cell}>{vaccine.dose}</Text>
                  <Text style={styles.cell}>{vaccine.route}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    margin: 10,
    paddingHorizontal: 15,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontFamily: 'Poppins_400Regular',
  },
  tableContainer: {
    flex: 1,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerCell: {
    width: width * 0.4,
    padding: 15,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    backgroundColor: '#e7e7e7',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 5,
    elevation: 2,
  },
  cell: {
    width: width * 0.4,
    padding: 15,
    fontFamily: 'Poppins_400Regular',
  },
});

