import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Platform, ScrollView, Linking } from 'react-native';
import { Button, Title, Paragraph, List, IconButton } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { findNearbyUsers } from '../../services/api';
import ErrorMessage from '../../components/ErrorMessage';

const { width, height } = Dimensions.get('window');

const FindNearbyUsersScreen = () => {
  const [region, setRegion] = useState(null);
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const [error, setError] = useState('');
  const [radius, setRadius] = useState(100); // Default radius in km

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      setError('Error getting current location');
    }
  };

  const searchNearbyUsers = async () => {
    if (!region) return;

    try {
      const response = await findNearbyUsers(region.latitude, region.longitude, radius);
      const users = response.data[0]; // Get the first array which contains the user data
      setNearbyUsers(users);
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  const openInGoogleMaps = (latitude, longitude) => {
    const url = Platform.select({
      ios: `maps://app?saddr=${region.latitude},${region.longitude}&daddr=${latitude},${longitude}`,
      android: `google.navigation:q=${latitude},${longitude}`,
      default: `https://www.google.com/maps/dir/?api=1&origin=${region.latitude},${region.longitude}&destination=${latitude},${longitude}`
    });

    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>Find Nearby Users</Title>
      {region ? (
        Platform.OS === 'web' ? (
          <Paragraph>Map view is not supported on web</Paragraph>
        ) : (
          <MapView style={styles.map} region={region}>
            <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
            {nearbyUsers.map((user, index) => (
              <Marker
                key={index}
                coordinate={{ latitude: user.latitude, longitude: user.longitude }}
                title={user.name_of_student}
                description={user.address}
              />
            ))}
          </MapView>
        )
      ) : (
        <Paragraph>Loading map...</Paragraph>
      )}
      <Button mode="contained" onPress={searchNearbyUsers} style={styles.button}>
        Search Nearby Users
      </Button>
      <ErrorMessage error={error} />
      
      {nearbyUsers.length > 0 && (
        <ScrollView style={styles.listContainer}>
          <Title style={styles.listTitle}>Nearby Users:</Title>
          {nearbyUsers.map((user, index) => (
            <List.Item
              key={index}
              title={user.name_of_student}
              description={`Guardian: ${user.name_of_guardian}\nAddress: ${user.address}\nPhone: ${user.phone_number1} ,${user.phone_number2}`}
              left={props => <List.Icon {...props} icon="account" />}
              right={props => (
                <IconButton
                  {...props}
                  icon="map-marker"
                  onPress={() => openInGoogleMaps(user.latitude, user.longitude)}
                />
              )}
              descriptionNumberOfLines={10} // Increase the number of lines to prevent truncation
              descriptionStyle={styles.description}
            />
          ))}
        </ScrollView>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  map: {
    width: width * 0.9,
    height: height * 0.3,
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    marginBottom: 20,
  },
  listContainer: {
    width: '100%',
    maxHeight: height * 0.4, // Limit the height of the scrollable list to avoid overlapping with other content
  },
  listTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  description: {
    color: 'black', // Ensure the text is visible, customize as needed
  },
});

export default FindNearbyUsersScreen;
