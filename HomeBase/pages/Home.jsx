import * as React from 'react';
import { View, Text, Button } from 'react-native';


const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export default function Home({navigation}) {
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Add Devices"
                onPress={() => navigation.navigate('Add Devices')}
            />
        </View>
    );
}

