import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { AuthContext } from '../../context/AuthContext';
import { register } from '../../services/api';
import ErrorMessage from '../../components/ErrorMessage';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameOfGuardian, setNameOfGuardian] = useState('');
  const [nameOfStudent, setNameOfStudent] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleRegister = async () => {
    try {
      const response = await register({ email, password, name_of_guardian: nameOfGuardian, name_of_student: nameOfStudent });
      login(response.data.token);
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Welcome to Carpool2School</Title>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Name of Guardian"
        value={nameOfGuardian}
        onChangeText={setNameOfGuardian}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Name of Student"
        value={nameOfStudent}
        onChangeText={setNameOfStudent}
        mode="outlined"
        style={styles.input}
      />
      <ErrorMessage error={error} />
      <Button mode="contained" onPress={handleRegister} style={styles.button}>
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
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default RegisterScreen;