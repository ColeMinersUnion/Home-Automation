import * as React from 'react';
import { View, Text, Button } from 'react-native';


const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 8,
    },
};

export default function Home({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home Screen</Text>
                
            
            <Button
                title="Go to Device Manager"
                onPress={() => navigation.navigate('Device Manager')}
            />
        </View>
    );
}

