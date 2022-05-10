import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View } from 'react-native';
import Station from './Station';

export default function Home() {
  return (
      <ScrollView>
        <View>
          <Text>Stationer</Text>
          <Station/>  
        </View>
        
        <StatusBar style="auto" />
      </ScrollView>
  );
}