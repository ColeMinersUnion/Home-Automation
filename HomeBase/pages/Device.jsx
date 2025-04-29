import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, TextInput, Text, Button, View, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Devices from "../devices.json"; // Only used on initial load

//I don't think type will really be used
export default function Device({navigation, route}){
    const deviceAddress = route.params.addr; // immutable
    const storageKey = `device_${route.params.id}`;

    // Load title from storage (or fallback to JSON)
    const [title, setTitle] = useState(null); // null until loaded
    const [newTitle, setNewTitle] = useState('');
    const [isEditing, setEditing] = useState(false);

    const [status, setStatus] = useState(false);

    useEffect(() => {
        const loadTitle = async () => {
            try {
                console.log('Device_ID:', route.params.id);
                const device = await AsyncStorage.getItem(storageKey);
                console.log('Device:', device);
                const savedTitle = device ? JSON.parse(device).name : null;
                if (savedTitle !== null) {
                    setTitle(savedTitle);
                    setNewTitle(savedTitle);
                } else {
                    const defaultTitle = route.params.name;
                    setTitle(defaultTitle);
                    setNewTitle(defaultTitle);
                }
                console.log('Saved title:', savedTitle);
            } catch (error) {
                console.error('Failed to load title:', error);
            }
        };
        loadTitle();
    }, []);

    const handleSetTitle = async () => {
        try {
            const deviceJson = await AsyncStorage.getItem(storageKey);
            if (deviceJson) {
            const device = JSON.parse(deviceJson);
            device.name = newTitle; // Update only the name
            await AsyncStorage.setItem(storageKey, JSON.stringify(device));
            setTitle(newTitle);
            setEditing(false);
            } else {
            console.error('Device not found in storage.');
            }
        } catch (error) {
            console.error('Failed to save title:', error);
        }
    };

    const handleToggle = () => {
        fetch(`http://${deviceAddress}:8000/led`, {
            method: 'GET',
        })
        .then((response) => {
            if (response.ok) {
                console.log('Device toggled successfully');
            } else {
                console.error('Failed to toggle device');
            }
            setStatus(prev => !prev);
        })
        .catch((error) => {
            console.error('Error toggling device:', error);
        });
    };

    if (title === null) {
        return (
            <SafeAreaProvider>
                <SafeAreaView><Text>Loading...</Text></SafeAreaView>
            </SafeAreaProvider>
        );
    }

    return (
        <SafeAreaProvider>

            <SafeAreaView style={styles.container}>
                <View style={styles.titleContainer}>
                    {!isEditing ? (
                        <>
                            <Text style={styles.title}>{title}</Text>
                            <TouchableOpacity onPress={() => setEditing(true)}>
                                <MaterialIcons name="edit" size={24} color="black" />
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <TextInput
                                value={newTitle}
                                onChangeText={setNewTitle}
                                onSubmitEditing={handleSetTitle}
                                style={styles.input}
                                autoFocus
                            />
                            <TouchableOpacity onPress={handleSetTitle}>
                                <MaterialIcons name="check" size={24} color="green" />
                            </TouchableOpacity>
                        </>
                    )}
                </View>

                <View style={styles.section}>
                    <Button title={status ? `Turn ${route.params.dtype} Off` : `Turn ${route.params.dtype} On`} onPress={handleToggle} />
                    <Text style={styles.statusText}>
                        {title} is {status ? "On" : "Off"}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Button title="Delete Device" onPress={() => {
                        AsyncStorage.removeItem(storageKey)
                            .then(() => {
                                console.log('Device deleted successfully');
                                
                                navigation.navigate('Device Manager', {storageKey});
                            })
                            .catch((error) => {
                                console.error('Error deleting device:', error);
                            });
                    }} />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 8,
    },
    input: {
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        flex: 1,
    },
    section: {
        marginTop: 30,
    },
    statusText: {
        marginTop: 10,
        fontSize: 18,
    }
});