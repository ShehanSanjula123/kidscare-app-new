import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Animated, Dimensions, Platform, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

const KidAllergy: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const { childName } = route.params;
  const [allergies, setAllergies] = useState('');
  const [diseases, setDiseases] = useState('');

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  if (!fontsLoaded) {
    return null;
  }

  const handleBackPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  const handleSave = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    // Here you would typically save the data to your backend or local storage
    console.log('Allergies:', allergies);
    console.log('Diseases:', diseases);
    // You can add a confirmation message or navigate back
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <LinearGradient
        colors={['#E3F2FD', '#FFFFFF']}
        style={styles.gradient}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
        >
          <Ionicons name="arrow-back" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <KidTop name={childName} />
            <View style={styles.contentContainer}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Allergies</Text>
                <TextInput
                  style={styles.input}
                  multiline
                  numberOfLines={4}
                  value={allergies}
                  onChangeText={setAllergies}
                  placeholder="Enter any allergies here..."
                  placeholderTextColor="#A0A0A0"
                />
              </View>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Congenital Diseases</Text>
                <TextInput
                  style={styles.input}
                  multiline
                  numberOfLines={4}
                  value={diseases}
                  onChangeText={setDiseases}
                  placeholder="Enter any congenital diseases here..."
                  placeholderTextColor="#A0A0A0"
                />
              </View>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <LinearGradient
                  colors={['#4CAF50', '#45a049']}
                  style={styles.saveButtonGradient}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

const KidTop: React.FC<{ name: string }> = ({ name }) => {
  const currentDate = formatDate(new Date());
  return (
    <View style={styles.topContainer}>
      <LinearGradient
        colors={['#2196F3', '#64B5F6']}
        style={styles.greetingGradient}
      >
        <Ionicons name="medical" size={40} color="#FFFFFF" />
        <View style={styles.textContainer}>
          <Text style={styles.greeting}>{name}'s Health Info</Text>
          <Text style={styles.date}>{currentDate}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  gradient: {
    flex: 1,
    paddingTop: 60,
  },
  scrollContent: {
    flexGrow: 1,
  },
  topContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
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
  textContainer: {
    marginLeft: 20,
  },
  greeting: {
    fontSize: 19,
    fontFamily: 'Poppins_700Bold',
    color: '#FFFFFF',
  },
  date: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#FFFFFF',
    opacity: 0.8,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#333',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 30,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 8,
  },
});

export default KidAllergy;

