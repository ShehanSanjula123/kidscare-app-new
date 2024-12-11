import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const Footer: React.FC = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={[ '#2196F3','#0653B6']}
      style={styles.footer}
    >
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('parentHome' as never)}
      >
        <Ionicons name="home-outline" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Announcements' as never)}
      >
        <Ionicons name="megaphone-outline" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('vacDetails' as never)}
      >
        <Ionicons name="medical-outline" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('BMI' as never)}
      >
        <Ionicons name="calculator-outline" size={24} color="white" />
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
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
});

export default Footer;

