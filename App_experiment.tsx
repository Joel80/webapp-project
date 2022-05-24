import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from './components/Home';
import TrainMap from './components/train/TrainMap';
import Station from './components/station/Station';
import Auth from './components/auth/Auth';
import { useState, useEffect } from 'react';
import authModel from './models/auth';
import FlashMessage from 'react-native-flash-message';
import { DefaultTheme, Provider as PaperProvider, Appbar } from 'react-native-paper';
import TrainViewHeader from './components/TrainViewHeader';

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
            /* tabBarLabelStyle: {fontSize: 30} */
           /*  headerTitle: "Försenade tåg",
            headerTitleAlign: "left",
            headerTitleStyle: {fontSize: 30} */
          })}
          >
            <Tab.Screen name="Tåg" component={Home} 
                options={ 
                    {
                        headerStyle: {},
                        headerTitle: "Tågförseningar", 
                        headerShown: true,
                        //headerTitleAlign: "left",
                        headerTitleStyle: {fontSize: 18, fontWeight: 'bold'},
                        /* headerTitleContainerStyle: {margin: 10, padding: 15, paddingBottom: 15, height: 100}, */
                        
                        headerRight: () => 
                            <View>
                                <Ionicons style={{justifyContent: 'flex-start'}} name="navigate" color={"#217cff"} size={25}/>
                                <Ionicons style={{justifyContent: 'flex-end'}} name="list" color={"#217cff"} size={25}/>
                            </View>
                        ,
                        headerRightContainerStyle: {margin: 1, padding: 15, paddingBottom: 15},

                        headerLeft: () => 
                            <View>
                                <Ionicons name="heart" color={"#217cff"} size={25}/>
                            </View>
                        ,
                        headerLeftContainerStyle: {margin: 1, paddingLeft: 15, paddingBottom: 15},
                             
                    }                    
                }
                
            />
            
            <Tab.Screen name="Karta" component={TrainMap}
                options={{headerShown: false,}}
            />
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
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
