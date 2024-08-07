import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Title, Paragraph, Button, List } from 'react-native-paper';
import { getUserDetails } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import ErrorMessage from '../../components/ErrorMessage';

const ProfileScreen = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState('');
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await getUserDetails();
      setUserDetails(response.data);
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  if (!userDetails) {
    return <Paragraph>Loading profile...</Paragraph>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>Profile</Title>
      <List.Section>
        <List.Item title="Email" description={userDetails.email} />
        <List.Item title="Guardian Name" description={userDetails.name_of_guardian} />
        <List.Item title="Student Name" description={userDetails.name_of_student} />
        <List.Item title="Address" description={userDetails.address} />
        <List.Item title="Phone Number 1" description={userDetails.phone_number1} />
        <List.Item title="Phone Number 2" description={userDetails.phone_number2 || 'N/A'} />
      </List.Section>
      <ErrorMessage error={error} />
      <Button 
        mode="contained" 
        onPress={() => navigation.navigate('ManageAddresses')} 
        style={styles.button}
      >
        Manage Addresses
      </Button>
      <Button 
        mode="outlined" 
        onPress={handleLogout} 
        style={styles.button}
      >
        Logout
      </Button>
      <Button 
        mode="text" 
        onPress={fetchUserDetails} 
        style={styles.reloadButton}
      >
        Reload
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
  },
  reloadButton: {
    marginTop: 20,
  },
});

export default ProfileScreen;
