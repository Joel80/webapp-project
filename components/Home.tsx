import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View } from 'react-native';
import Train from './Train';

export default function Home() {
  return (
      <ScrollView>
        <View>
          <Text>Tågförseningar</Text>
          <Train/>  
        </View>
        
        <StatusBar style="auto" />
      </ScrollView>
  );
}