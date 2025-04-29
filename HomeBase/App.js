import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './pages/Home';
import Device from './pages/Device';
import DeviceManager from './pages/DeviceManager';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Device Manager" component={DeviceManager}/>
        <Stack.Screen name="Device Template" component={Device} />

        
      </Stack.Navigator>
    </NavigationContainer>
  );
}


