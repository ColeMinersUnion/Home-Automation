// DeviceManager.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DeviceManager({ navigation }) {
  const [devices, setDevices] = useState([]);
  const [newDeviceName, setNewDeviceName] = useState('');
  const [newDeviceAddress, setNewDeviceAddress] = useState('');

  useEffect(() => {
    loadDevices();
  }, []);

  const loadDevices = async () => {
    const ids = JSON.parse(await AsyncStorage.getItem('device_ids') || '[]');
    const loaded = await Promise.all(
      ids.map(async (id) => {
        const json = await AsyncStorage.getItem(`device_${id}`);
        return JSON.parse(json);
      })
    );
    setDevices(loaded);
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
    navigation.navigate('LightSwitch', { device });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Devices</Text>

      <FlatList
        data={devices}
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
