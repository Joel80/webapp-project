import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View } from 'react-native';

export default function Home() {
  return (
      <ScrollView>
        <View>
          <Text>Karta</Text>
          <StatusBar style="auto" />
        </View>
      </ScrollView>
  );
}