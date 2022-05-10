import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from './components/Home';
import TrainMap from './components/TrainMap';


const Tab = createBottomTabNavigator();

const routeIcons = {
  "Tåg": "train",
  "Karta": "map"
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = routeIcons[route.name] || "alert";
            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarInactiveTintColor: "grey",
          tabBarActiveTintColor: "blue",
        })}
        >
          <Tab.Screen name="Tåg" component={Home}/>
          <Tab.Screen name="Karta" component={TrainMap}/>
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});
