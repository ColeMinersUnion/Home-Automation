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
        <Stack.Screen name="Add Devices" component={AddDevices} />
        <Stack.Screen name="Devices" component={DeviceList} />
        {
          //Map each device to a screen
          // <Stack.Screen name="Device" component={Device} />
          Devices.map((device, index) => (
              <Stack.Screen key={index} name={device.name} component={Device} />
          ))
          
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}


