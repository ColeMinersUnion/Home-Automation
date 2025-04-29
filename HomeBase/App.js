import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './pages/Home';
import DeviceList from './pages/DeviceList';
import Device from './components/Device';
import Devices from "./devices.json";
import LightSwitch from './pages/LightSwitch';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Devices" component={DeviceList} />
        <Stack.Screen name={"Light Switch"} component={LightSwitch} />

        
      </Stack.Navigator>
    </NavigationContainer>
  );
}


