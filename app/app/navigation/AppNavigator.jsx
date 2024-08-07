import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import AddAddressScreen from '../screens/AddAddressScreen';
import FindNearbyUsersScreen from '../screens/FindNearbyUsersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ManageAddressesScreen from '../screens/ManageAddressesScreen';
import { IconButton } from 'react-native-paper';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen 
      name="AddAddress" 
      component={AddAddressScreen} 
      options={{
        tabBarIcon: ({ color, size }) => (
          <IconButton icon="plus" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen 
      name="FindNearby" 
      component={FindNearbyUsersScreen} 
      options={{
        tabBarIcon: ({ color, size }) => (
          <IconButton icon="map-search" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen 
      name="Profile" 
      component={ProfileScreen} 
      options={{
        tabBarIcon: ({ color, size }) => (
          <IconButton icon="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator ind>
      {user ? (
        <>
          <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="ManageAddresses" component={ManageAddressesScreen} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;