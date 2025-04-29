import Devices from "../devices.json"
import LightSwitch from "./LightSwitch";
//import {Outlet} from "./Outlet";
import { Text, Button, View} from "react-native";
 


export default function DeviceList({navigation}) {
    return (
        <>
            <View>
                <Text>Device List</Text>
                <Text>Devices</Text>
                    <Button
                        title="Light Switch"
                        onPress={() => navigation.navigate('Light Switch')}
                    />    
                
                <Text>Back To Home</Text>
                <Button 
                    title = "Back to Home"
                    onClick={() => navigation.navigate('Home')}/>
                    
                
            </View>
        </>
    );
}
