import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Text, Button, View, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Devices from "../devices.json"; // Only used on initial load

export default function LightSwitch({ navigation }) {
    // 1️⃣ Load address ONCE and treat it as constant
    const [deviceAddress] = useState(() => Devices.Devices[0].LightBulb.Address); // immutable
    const storageKey = `lightbulb_title_${deviceAddress}`;

    // 2️⃣ Load title from storage (or fallback to JSON)
    const [title, setTitle] = useState(null); // null until loaded
    const [newTitle, setNewTitle] = useState('');
    const [isEditing, setEditing] = useState(false);

    const [status, setStatus] = useState(false);

    useEffect(() => {
        const loadTitle = async () => {
            try {
                const savedTitle = await AsyncStorage.getItem(storageKey);
                if (savedTitle !== null) {
                    setTitle(savedTitle);
                    setNewTitle(savedTitle);
                } else {
                    const defaultTitle = Devices.Devices[0].LightBulb.Name;
                    setTitle(defaultTitle);
                    setNewTitle(defaultTitle);
                }
            } catch (error) {
                console.error('Failed to load title:', error);
            }
        };
        loadTitle();
    }, []);

    const handleSetTitle = async () => {
        try {
            await AsyncStorage.setItem(storageKey, newTitle);
            setTitle(newTitle);
            setEditing(false);
        } catch (error) {
            console.error('Failed to save title:', error);
        }
    };

    const handleToggle = () => {
        fetch(`http://${deviceAddress}/led`, {
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
                    <Button title={status ? "Turn Light Off" : "Turn Light On"} onPress={handleToggle} />
                    <Text style={styles.statusText}>
                        Light is {status ? "On" : "Off"}
                    </Text>
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
