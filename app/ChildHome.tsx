import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Animated, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

const ChildHome: React.FC<{ navigation: any; route:any }> = ({ navigation, route }) => {
  const {parentNic} = route.params;
  const {childName} = route.params;
  const {childId} = route.params;
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
    try {
      navigation.navigate('KidProf'); // Ensure 'KidProf' is correctly registered
    } catch (error) {
      console.error("Error navigating to 'KidProf':");
    }
  };

  const menuItems = [
    { title: 'Allergies & Congenital Diseases', icon: 'medical', screen: 'KidAllergy', color: '#4CAF50' },
    { title: 'Vaccination Schedule', icon: 'calendar', screen: 'VacShedule', color: '#4CAF50' },
    { title: 'Medical Records', icon: 'document-text', screen: 'KidRecords', color: '#4CAF50' },
    { title: 'BMI Chart', icon: 'stats-chart', screen: 'BMI', color: '#4CAF50' },
  ];

  const handlePress = (screen: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate(screen,  { childId ,parentNic});
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
          <KidTop name={childName} />
          <ScrollView contentContainerStyle={styles.buttonContainer}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.button}
                activeOpacity={0.8}
                onPress={() => handlePress(item.screen)}
              >
                <LinearGradient
                  colors={[item.color, item.color + 'CC']}
                  start={[0, 0]}
                  end={[1, 1]}
                  style={styles.buttonGradient}
                >
                  <Ionicons name={item.icon as any} size={36} color="#FFFFFF" />
                  <Text style={styles.buttonText}>{item.title}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

const KidTop: React.FC <{name:string}> = ({name}) => {
  const currentDate = formatDate(new Date());
  return (
    <View style={styles.topContainer}>
      <LinearGradient
        colors={['#2196F3', '#64B5F6']}
        style={styles.greetingGradient}
      >
        <Image
          style={styles.profileImage}
          source={require('../assets/img/ellipse-52.png')}
        />
        <View style={styles.textContainer}>
          <Text style={styles.greeting}>Hello,{name}</Text>
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
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  button: {
    width: width * 0.43,
    aspectRatio: 1,
    marginVertical: 10,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  buttonText: {
    marginTop: 15,
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
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

export default ChildHome;
