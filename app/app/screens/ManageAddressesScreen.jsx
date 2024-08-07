import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Title, List, Button, Dialog, Portal, Paragraph } from 'react-native-paper';
import { getUserDetails, deleteAddress } from '../../services/api';
import ErrorMessage from '../../components/ErrorMessage';

const ManageAddressesScreen = ({ navigation }) => {
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState('');
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await getUserDetails();
      setAddresses(response.data.addresses || []);
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  const showDeleteDialog = (address) => {
    setAddressToDelete(address);
    setDeleteDialogVisible(true);
  };

  const hideDeleteDialog = () => {
    setDeleteDialogVisible(false);
    setAddressToDelete(null);
  };

  const handleDeleteAddress = async () => {
    try {
      await deleteAddress(addressToDelete.id);
      fetchAddresses(); // Refresh the list
      hideDeleteDialog();
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>Manage Addresses</Title>
      <ErrorMessage error={error} />
      {addresses.map((address, index) => (
        <List.Item
          key={index}
          title={address.address}
          description={`${address.phone_number1}, ${address.phone_number2 || 'N/A'}`}
          right={() => <Button onPress={() => showDeleteDialog(address)}>Delete</Button>}
        />
      ))}
      <Button 
        mode="contained" 
        onPress={() => navigation.navigate('AddAddress')} 
        style={styles.button}
      >
        Add New Address
      </Button>

      <Portal>
        <Dialog visible={deleteDialogVisible} onDismiss={hideDeleteDialog}>
          <Dialog.Title>Delete Address</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to delete this address?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDeleteDialog}>Cancel</Button>
            <Button onPress={handleDeleteAddress}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
});

export default ManageAddressesScreen;