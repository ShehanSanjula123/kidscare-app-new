import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CFooter from '@/components/CFooter';

const { width } = Dimensions.get('window');

interface Vaccine {
  id: string;
  name: string;
  date: string;
  details: string;
}

const AccordionItem: React.FC<{ title: string; data: Vaccine[] }> = ({ title, data }) => {
  const [expanded, setExpanded] = useState(false);
  const animationHeight = React.useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    setExpanded(!expanded);
    Animated.timing(animationHeight, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity style={styles.accordionHeader} onPress={toggleExpand}>
        <Text style={styles.accordionTitle}>{title}</Text>
        <MaterialCommunityIcons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          color="#2196F3"
        />
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.accordionContent,
          {
            maxHeight: animationHeight.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 500],
            }),
          },
        ]}
      >
        {data.map((item) => (
          <View key={item.id} style={styles.vaccineItem}>
            <Text style={styles.vaccineName}>{item.name}</Text>
            <Text style={styles.vaccineDate}>{item.date}</Text>
            <Text style={styles.vaccineDetails}>{item.details}</Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

const VaccineSchedule: React.FC = () => {
  const [upcomingVaccines] = useState<Vaccine[]>([
    { id: '1', name: 'MMR', date: '2023-07-15', details: 'Measles, Mumps, Rubella vaccine. Given in two doses.' },
    { id: '2', name: 'DTaP', date: '2023-08-01', details: 'Diphtheria, Tetanus, Pertussis vaccine. Booster shot.' },
    { id: '3', name: 'Hepatitis B', date: '2023-09-10', details: 'Third dose of Hepatitis B vaccine series.' },
  ]);

  const [completedVaccines] = useState<Vaccine[]>([
    { id: '4', name: 'BCG', date: '2023-01-05', details: 'Bacille Calmette-Guérin vaccine for tuberculosis.' },
    { id: '5', name: 'Polio', date: '2023-03-20', details: 'Inactivated Poliovirus vaccine. Part of routine immunization.' },
    { id: '6', name: 'Rotavirus', date: '2023-05-12', details: 'Protects against rotavirus infections. Oral vaccine.' },
  ]);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

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
        <Text style={styles.headerText}>Vaccine Schedule</Text>
      </LinearGradient>
      <ScrollView style={styles.content}>
        <AccordionItem title="Vaccines to be Given" data={upcomingVaccines} />
        <AccordionItem title="Vaccines Given" data={completedVaccines} />
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
  headerText: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  accordionContainer: {
    backgroundColor: '#fff',
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
    backgroundColor: '#f8f8f8',
  },
  accordionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
  },
  accordionContent: {
    overflow: 'hidden',
  },
  vaccineItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  vaccineName: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
  },
  vaccineDate: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
    marginTop: 5,
  },
  vaccineDetails: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
    marginTop: 5,
  },
});

export default VaccineSchedule;

