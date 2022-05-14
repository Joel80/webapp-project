import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from './components/Home';
import TrainMap from './components/TrainMap';
import Station from './components/station/Station';
import Auth from './components/auth/Auth';
import { useState, useEffect } from 'react';
import authModel from './models/auth';
import FlashMessage from 'react-native-flash-message';

const Tab = createBottomTabNavigator();

const routeIcons = {
  "Tåg": "train",
  "Karta": "map",
  "Stationer": "heart",
  "Logga in": "lock-closed"
}


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  useEffect(() => {
    (async () => {
      setIsLoggedIn(await authModel.loggedIn())
    })();   
  }, []);

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
          {isLoggedIn ?
            <Tab.Screen name="Stationer">
               { () => <Station setIsLoggedIn={setIsLoggedIn}/>}
            </Tab.Screen> :
            <Tab.Screen name="Logga in">
              { () => <Auth setIsLoggedIn={setIsLoggedIn}/>}
            </Tab.Screen>
          }
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
      <FlashMessage position="top" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});
