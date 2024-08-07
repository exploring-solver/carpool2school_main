import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Title, Paragraph } from 'react-native-paper';
import * as Location from 'expo-location';
import { addAddress } from '../../services/api';
import ErrorMessage from '../../components/ErrorMessage';

const AddAddressScreen = ({ navigation }) => {
  const [address, setAddress] = useState('');
  const [phoneNumber1, setPhoneNumber1] = useState('');
  const [phoneNumber2, setPhoneNumber2] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    })();
  }, []);

  const handleAddAddress = async () => {
    try {
      await addAddress({ address, phone_number1: phoneNumber1, phone_number2: phoneNumber2, latitude, longitude });
      Alert.alert('Success', 'Address added successfully', [{ text: 'OK', onPress: () => navigation.navigate('AddAddress') }]);
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>Add Address</Title>
      <Paragraph style={styles.subtitle}>Please write your address and we'll fetch your location coordinates.</Paragraph>
      
      <TextInput
        label="Address"
        value={address}
        onChangeText={setAddress}
        mode="outlined"
        style={styles.input}
        multiline
      />
      <TextInput
        label="Phone Number 1"
        value={phoneNumber1}
        onChangeText={setPhoneNumber1}
        mode="outlined"
        style={styles.input}
        keyboardType="phone-pad"
      />
      <TextInput
        label="Phone Number 2 (Optional)"
        value={phoneNumber2}
        onChangeText={setPhoneNumber2}
        mode="outlined"
        style={styles.input}
        keyboardType="phone-pad"
      />
      
      {latitude && longitude && (
        <Paragraph style={styles.coordinates}>
          Location: {latitude.toFixed(6)}, {longitude.toFixed(6)}
        </Paragraph>
      )}
      
      <ErrorMessage error={error} />
      
      <Button 
        mode="contained" 
        onPress={handleAddAddress} 
        style={styles.button}
        disabled={!address || !phoneNumber1 || !latitude || !longitude}
      >
        Add Address
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  coordinates: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
  },
});

export default AddAddressScreen;