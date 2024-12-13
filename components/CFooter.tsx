/*import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Import your screen components
import HomeScreen from '../app/ChildHome';
import KidAllergyScreen from '../app/KidAllergy';
import VacScheduleScreen from '../app/VaccineShedule';
import KidRecordsScreen from '../app/KidMedicalRec';
import BMIScreen from '../app/BMI';

const Tab = createBottomTabNavigator();

const CNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Allergies') {
              iconName = focused ? 'medical' : 'medical-outline';
            } else if (route.name === 'Vaccination') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Records') {
              iconName = focused ? 'document-text' : 'document-text-outline';
            } else if (route.name === 'BMI') {
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4CAF50',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            display: 'flex',
            backgroundColor: '#fff',
            borderTopWidth: 0,
            elevation: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          tabBarLabelStyle: {
            fontFamily: 'Poppins_400Regular',
            fontSize: 12,
          },
          headerShown: false,
        })}
      >
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default CNavigation;

*/


import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const CFooter: React.FC = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={[ '#2196F3','#0653B6']}
      style={styles.footer}
    >
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('ChildHome' as never)}
      >
        <Ionicons name="home-outline" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('KidAllergy' as never)}
      >
        <Ionicons name="medical-outline" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('VacShedule' as never)}
      >
        <Ionicons name="calendar-outline" size={24} color="white" />
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

export default CFooter;

