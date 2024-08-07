import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'authToken';

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem(KEY, token);
  } catch (error) {
    console.log('Error storing the auth token', error);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(KEY);
  } catch (error) {
    console.log('Error getting the auth token', error);
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch (error) {
    console.log('Error removing the auth token', error);
  }
};