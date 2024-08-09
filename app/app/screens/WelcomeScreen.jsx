import { Colors } from '@/constants/Colors';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Title, useTheme } from 'react-native-paper';

const WelcomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Title style={[styles.title, { color: colors.text }]}>Welcome to Carpool2School</Title>
      <Button mode="contained" onPress={() => navigation.navigate('Login')} style={styles.button}>
        Login
      </Button>
      <Button mode="contained" onPress={() => navigation.navigate('Register')} style={styles.button}>
        Register
      </Button>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    marginVertical: 10,
    backgroundColor: Colors.dark.red
  },
});

export default WelcomeScreen;