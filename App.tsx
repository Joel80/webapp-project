import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Train from './components/train/Train';
import TrainMap from './components/TrainMap';
import Station from './components/station/Station';
import Auth from './components/auth/Auth';
import { useState, useEffect } from 'react';
import authModel from './models/auth';
import FlashMessage from 'react-native-flash-message';
import { DefaultTheme, Provider as PaperProvider, Appbar } from 'react-native-paper';


const Tab = createBottomTabNavigator();


const routeIcons = {
  "Tåg": "time",
  "Karta": "map",
  "Stationer": "heart",
  "Logga in": "lock-closed"
}

const theme = {
  ...DefaultTheme,
  roundness: 2,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#fff',
    accent: '#f1c40f',
  },
};

function appBarHeader() {
  return (
    <Appbar.Header>
      {/* <Appbar.Content title="Tåg" /> */}
      <Appbar.Action color='#217cff' icon="menu"  />
    </Appbar.Header>
  );
}



export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  useEffect(() => {
    (async () => {
      setIsLoggedIn(await authModel.loggedIn())
    })();   
  }, []);

   return (
    <PaperProvider theme={theme}>
        <SafeAreaView style={styles.container}>
            <NavigationContainer>
                <Tab.Navigator screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName = routeIcons[route.name] || "alert";
                        return <Ionicons name={iconName} size={size} color={color} />
                        },
                        tabBarInactiveTintColor: "grey",
                        tabBarActiveTintColor: "#217cff",
                    })}
                >
                    <Tab.Screen name="Tåg" component={Train}  options={{headerShown: false}}/>
                    
                    <Tab.Screen name="Karta" component={TrainMap} options={{headerShown: false,}}/>
                    {isLoggedIn ?
                        <Tab.Screen name="Stationer" options={{headerShown: false}}>
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
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
