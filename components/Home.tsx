import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View } from 'react-native';
import Trains from './Trains';
import { Appbar } from 'react-native-paper';

export default function Home() {
    return (
        <ScrollView>
            <View style={{backgroundColor:'#fff'}}> 
                <Trains/>  
            </View>
        </ScrollView>
    );
}