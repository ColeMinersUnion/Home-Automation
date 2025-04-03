import * as React from 'react';
import { View, Text, Button } from 'react-native';


const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
}

export default function AddDevices({navigation}) {

    return(
        <View style={styles.container}>
            <Text>Add Devices Screen</Text>
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    )

}