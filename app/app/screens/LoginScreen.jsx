import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title, IconButton } from 'react-native-paper';
import { AuthContext } from '../../context/AuthContext';
import { login } from '../../services/api';
import ErrorMessage from '../../components/ErrorMessage';
import { Colors } from '@/constants/Colors';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login: authLogin } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      authLogin(response.data.token);
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Welcome back to Carpool2School</Title>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        theme={{ colors: { text: Colors.light.text, primary: Colors.light.primary } }}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          mode="outlined"
          style={styles.input}
          theme={{ colors: { text: Colors.light.text, primary: Colors.light.primary } }}
        />
        <IconButton
          icon={showPassword ? 'eye-off' : 'eye'}
          size={24}
          onPress={() => setShowPassword(!showPassword)}
          style={styles.iconButton}
          color={Colors.light.red} // Set the icon color to accent (white)
          background={Colors.light.red} // Set the icon color to accent (white)
        />

      </View>
      <ErrorMessage error={error} />
      <Button
        mode="outlined"
        onPress={handleLogin}
        style={styles.button}
        theme={{ colors: { primary: Colors.light.accent, text: Colors.light.primary } }}
      >
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.light.primary,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.light.accent,
  },
  input: {
    marginBottom: 10,
    backgroundColor: Colors.light.accent,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    position: 'absolute',
    right: 0,
    top: 12,
  },
  button: {
    marginTop: 10,
    borderColor: Colors.light.accent,
  },
});

export default LoginScreen;
