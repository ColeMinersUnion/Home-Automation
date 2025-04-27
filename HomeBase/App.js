import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './pages/Home';
import AddDevices from './pages/AddDevices';
import DeviceList from './pages/DeviceList';
import Device from './components/Device';
import Devices from "./devices.json";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Devices" component={DeviceList} />
        <Stack.Screen key={0} name={"Light Switch"} component={Device} />

        
      </Stack.Navigator>
    </NavigationContainer>
  );
}


