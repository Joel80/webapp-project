import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Train from './components/train/Train';
import TrainMap from './components/train/TrainMap';
import Station from './components/station/Station';
import Auth from './components/auth/Auth';
import { useState, useEffect } from 'react';
import authModel from './models/auth';
import FlashMessage, { Icon } from 'react-native-flash-message';


const Tab = createBottomTabNavigator();


const routeIcons = {
  "Tåg": "time",
  "Karta": "map",
  "Stationer": "heart",
  "Logga in": "lock-closed"
}

type routeIconsKey = keyof typeof routeIcons;


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  
  useEffect(() => {
    (async () => {
      setIsLoggedIn(await authModel.loggedIn());
    })();   
  }, []);


  console.log(isLoggedIn);
   return (

    <SafeAreaView style={styles.container}>
        <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName = routeIcons[route.name as routeIconsKey] || "alert";
                    return <Ionicons name={iconName as any} size={size} color={color} />
                    },
                    tabBarInactiveTintColor: "grey",
                    tabBarActiveTintColor: "#217cff",
                })}
            >
                <Tab.Screen name="Tåg" options={{headerShown: false}}>
                    { () => <Train isLoggedIn={isLoggedIn}/>}
                </Tab.Screen>
                
                <Tab.Screen name="Karta" component={TrainMap} options={{headerShown: false,}}/>
                {isLoggedIn ?
                    <Tab.Screen name="Stationer" options={{headerShown: false}}>
                        { () => <Station setIsLoggedIn={setIsLoggedIn}/>}
                    </Tab.Screen> :
                    <Tab.Screen name="Logga in" options={{headerShown: false}}>
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
