import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const DFooter: React.FC = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.footer}
    >
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('KidProfDoc' as never)}
      >
        <Ionicons name="home-outline" size={24} color="white" />
        <Text style={styles.iconText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Allergies' as never)}
      >
        <Ionicons name="alert-circle-outline" size={24} color="white" />
        <Text style={styles.iconText}>Allergies</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('VaccineDetails' as never)}
      >
        <Ionicons name="medical-outline" size={24} color="white" />
        <Text style={styles.iconText}>Vaccine</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('MedicalRecord' as never)}
      >
        <Ionicons name="document-text-outline" size={24} color="white" />
        <Text style={styles.iconText}>Records</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('BMI' as never)}
      >
        <Ionicons name="calculator-outline" size={24} color="white" />
        <Text style={styles.iconText}>BMI</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 50,
  },
  iconText: {
    color: 'white',
    fontSize: 10,
    marginTop: 2,
  },
});

export default DFooter;

