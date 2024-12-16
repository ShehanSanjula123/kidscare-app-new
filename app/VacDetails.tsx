import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

const vaccineData = [
  { name: 'OPV (Oral Polio Vaccine)', details: 'Prevents polio (poliomyelitis)', dose: '5 doses (0, 2, 4, 6, 18 months)', route: 'Oral' },
  { name: 'Pentavalent (DTP-HepB-Hib)', details: 'Combines protection against diphtheria, tetanus, pertussis, hepatitis B, and Haemophilus influenzae type b.', dose: '3 doses', route: 'Intramuscular' },
  { name: 'Rotavirus Vaccine', details: 'Prevents severe diarrhea caused by rotavirus', dose: '2 doses', route: 'Oral' },
  { name: 'PCV (Pneumococcal Conjugate Vaccine)', details: 'Prevents pneumococcal diseases like pneumonia, meningitis', dose: '3 doses', route: 'Intramuscular' },
  { name: 'Measles-Rubella (MR)', details: 'Protects against measles and rubella.', dose: '2 doses', route: 'Subcutaneous' },
  { name: 'Japanese Encephalitis (JE)', details: 'Protects against Japanese encephalitis virus.', dose: '2 doses', route: 'Subcutaneous' },
  { name: 'Td Vaccine', details: 'Protects against tetanus and diphtheria', dose: 'Single dose', route: 'Intramuscular' },
];

const VacDetails: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient colors={['#2196F3', '#64B5F6']} style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Vaccine Details</Text>
      </LinearGradient>
      <ScrollView style={styles.content}>
        <View style={styles.tableHeader}>
          <Text style={styles.columnHeader}>Vaccine</Text>
          <Text style={styles.columnHeader}>Details</Text>
          <Text style={styles.columnHeader}>Dose</Text>
          <Text style={styles.columnHeader}>Route</Text>
        </View>
        {vaccineData.map((vaccine, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.cellName}>{vaccine.name}</Text>
            <Text style={styles.cellDetails}>{vaccine.details}</Text>
            <Text style={styles.cellDose}>{vaccine.dose}</Text>
            <Text style={styles.cellRoute}>{vaccine.route}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 20,
    zIndex: 10,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#E3E8F0',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 1,
  },
  columnHeader: {
    flex: 1,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: '#3b5998',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 1,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cellName: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#3b5998',
    marginBottom: 5,
  },
  cellDetails: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  cellDose: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  cellRoute: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#666',
  },
});

export default VacDetails;

