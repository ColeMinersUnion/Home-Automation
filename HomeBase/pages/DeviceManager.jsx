// DeviceManager.js
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform, 
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DeviceManager({ navigation, deletedID }) {
  const [devices, setDevices] = useState([]);
  const [newDeviceName, setNewDeviceName] = useState('');
  const [newDeviceAddress, setNewDeviceAddress] = useState('');

  useEffect(() => {
    loadDevices();
  }, []);

  const loadDevices = async () => {
    let ids = JSON.parse(await AsyncStorage.getItem('device_ids') || '[]');
    const validDevices = [];
    const validIds = [];

    for (const id of ids) {
      const json = await AsyncStorage.getItem(`device_${id}`);
      try {
        const parsed = JSON.parse(json);
        if (parsed && parsed.id && parsed.address) {
          validDevices.push(parsed);
          validIds.push(id);
        } else {
          console.warn(`Deleting invalid device with ID: ${id}`);
          await AsyncStorage.removeItem(`device_${id}`);
        }
      } catch (e) {
        console.error(`Error parsing device with ID ${id}:`, e);
        await AsyncStorage.removeItem(`device_${id}`);
      }
    }

    await AsyncStorage.setItem('device_ids', JSON.stringify(validIds));
    setDevices(validDevices);
  };

  const addDevice = async () => {
    const id = `device-${Date.now()}`;
    const device = { id, name: newDeviceName, address: newDeviceAddress, type: 'LightBulb' };

    await AsyncStorage.setItem(`device_${id}`, JSON.stringify(device));

    const ids = JSON.parse(await AsyncStorage.getItem('device_ids') || '[]');
    ids.push(id);
    await AsyncStorage.setItem('device_ids', JSON.stringify(ids));

    setNewDeviceName('');
    setNewDeviceAddress('');
    loadDevices();
  };

  const navigateToDevice = (device) => {
    console.log('Navigating to device:', device);
    console.log('Device ID:', device.id);
    navigation.navigate('Device Template', { device, id: device.id, name: device.name, addr: device.address, dtype: device.type });
  };

  if(deletedID !== undefined) {
    const updatedDevices = devices.filter(device => device.id !== deletedID);
    setDevices(updatedDevices);
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
        <View>
          <Text style={styles.header}>Devices</Text>

          <FlatList
            data={devices.filter((item) => item != null)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigateToDevice(item)}>
                <Text style={styles.deviceItem}>{item.name} ({item.address})</Text>
              </TouchableOpacity>
            )}
          />

          <Text style={styles.subHeader}>Add New Device</Text>
          <TextInput
            placeholder="Device Name"
            value={newDeviceName}
            onChangeText={setNewDeviceName}
            style={styles.input}
          />
          <TextInput
            placeholder="Device Address"
            value={newDeviceAddress}
            onChangeText={setNewDeviceAddress}
            style={styles.input}
          />
          <Button title="Add Device" onPress={addDevice} />
        </View>
      
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12
  },
  subHeader: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: '600'
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginVertical: 6
  },
  deviceItem: {
    paddingVertical: 10,
    fontSize: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1
  }
});
