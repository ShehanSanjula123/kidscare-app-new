import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart } from 'react-native-chart-kit';
import DFooter from '@/components/DFooter';

const BMIChart: React.FC<{ navigation: any }> = ({ navigation }) => {
  const handleBackPress = () => {
    navigation.goBack();
  };

  // Sample BMI data
  const bmiData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [18.5, 19.2, 20.1, 20.8, 21.3, 21.7],
        color: (opacity = 1) => `rgba(66, 102, 179, ${opacity})`,
        strokeWidth: 2
      }
    ]
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(66, 102, 179, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient colors={['#E3F2FD', '#FFFFFF']} style={styles.gradient}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.header}
        >
          <Text style={styles.headerText}>BMI Chart</Text>
        </LinearGradient>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.sectionTitle}>Your BMI Over Time</Text>
          <View style={styles.chartContainer}>
            <LineChart
              data={bmiData}
              width={screenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          </View>
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: 'rgb(66, 102, 179)' }]} />
              <Text style={styles.legendText}>BMI</Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>BMI Categories:</Text>
            <Text style={styles.infoText}>Underweight: Less than 18.5</Text>
            <Text style={styles.infoText}>Normal weight: 18.5 - 24.9</Text>
            <Text style={styles.infoText}>Overweight: 25 - 29.9</Text>
            <Text style={styles.infoText}>Obesity: 30 or greater</Text>
          </View>
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>Tips for a Healthy BMI:</Text>
            <Text style={styles.tipsText}>• Maintain a balanced diet</Text>
            <Text style={styles.tipsText}>• Exercise regularly</Text>
            <Text style={styles.tipsText}>• Stay hydrated</Text>
            <Text style={styles.tipsText}>• Get adequate sleep</Text>
          </View>
        </ScrollView>
      </LinearGradient>
      <DFooter />
    </View>
  );
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
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 30,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(76, 175, 80, 0.8)',
    borderRadius: 20,
    padding: 8,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgb(66, 102, 179)',
    marginTop: 20,
    marginBottom: 15,
  },
  chartContainer: {
    backgroundColor: '#F1F8E9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: 'rgb(66, 102, 179)',
  },
  infoContainer: {
    backgroundColor: '#F1F8E9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgb(66, 102, 179)',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: 'rgb(92, 140, 246)',
    marginBottom: 5,
  },
  tipsContainer: {
    backgroundColor: '#E3F2FD',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgb(66, 102, 179)',
    marginBottom: 10,
  },
  tipsText: {
    fontSize: 14,
    color: 'rgb(92, 140, 246)',
    marginBottom: 5,
  },
});

export default BMIChart;

