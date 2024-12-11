import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Modal, SafeAreaView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../components/Footer';

type Announcement = {
  id: string;
  title: string;
  date: string;
  content: string;
};

const announcements: Announcement[] = [
  { id: '1', title: 'Important Update', date: '2023-06-15', content: 'We have updated our vaccination schedule. Please check the Vaccine Details page for more information.' },
  { id: '2', title: 'New Health Guidelines', date: '2023-06-10', content: 'New health guidelines have been released. Make sure to follow them for your safety and the safety of others.' },
  { id: '3', title: 'BMI Calculator Now Available', date: '2023-06-05', content: 'We have added a new BMI Calculator feature. Try it out to track your health progress!' },
  { id: '4', title: 'Upcoming Health Seminar', date: '2023-06-01', content: 'Join us for a health seminar next week. Topics include nutrition, exercise, and mental health.' },
];

const Announcement: React.FC = () => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  const renderAnnouncementItem = ({ item }: { item: Announcement }) => (
    <TouchableOpacity
      style={styles.announcementItem}
      onPress={() => setSelectedAnnouncement(item)}
    >
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.gradientBackground}
      >
        <Text style={styles.announcementTitle}>{item.title}</Text>
        <Text style={styles.announcementDate}>{item.date}</Text>
        <Ionicons name="chevron-forward" size={24} color="white" style={styles.icon} />
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Announcements</Text>
      </LinearGradient>
      <FlatList
        data={announcements}
        renderItem={renderAnnouncementItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <Modal
        visible={selectedAnnouncement !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedAnnouncement(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedAnnouncement?.title}</Text>
            <Text style={styles.modalDate}>{selectedAnnouncement?.date}</Text>
            <Text style={styles.modalText}>{selectedAnnouncement?.content}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedAnnouncement(null)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  listContainer: {
    padding: 16,
  },
  announcementItem: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gradientBackground: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  announcementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
  },
  announcementDate: {
    fontSize: 14,
    color: '#ddd',
    marginRight: 8,
  },
  icon: {
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  modalDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#3b5998',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Announcement;

