import { Text, View, Modal, Pressable, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TrainList from './TrainList';
import TrainsAtStation from './TrainsAtStation';
import StationModal from './StationModal';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';


const Stack = createNativeStackNavigator();

export default function Train() {

    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={TrainList}
                options={ ({navigation}) =>({
                    
                    /* header: () => <TrainViewHeader />, */
                        headerStyle: {},
                        headerTitle: "Tågförseningar", 
                        headerShown: true,
                        //headerTitleAlign: "left",
                        //headerTitleStyle: {fontSize: 18, fontWeight: 'bold'},
                        
                        headerRight: () => 
                        <View style={{flexDirection: 'row'}} >
                            <View>
                                <Ionicons name="navigate-outline" color={"#217cff"} size={25}/>
                            </View>
  
                            <View style={{marginLeft: 20}}>
                                <Ionicons  name="list-outline" color={"#217cff"} size={25} onPress={(screenProps) => navigation.navigate('StationModal', {navigation: {navigation}})}/>
                            </View>
                        </View>
                        ,
                        //headerRightContainerStyle: {margin: 1, paddingRight: 15, paddingBottom: 15},
  
                        headerLeft: () => 
                        <View style={{flexDirection: 'row'}} >
                            <View>
                                <Ionicons name="heart-outline" color={"#217cff"} size={25}/>
                            </View>
                        </View>
                        ,
                        //headerLeftContainerStyle: {margin: 1, paddingLeft: 15, paddingBottom: 15},

                })}
            
            />         
            <Stack.Screen name="StationModal" component={StationModal}
                    
                    options={ ({navigation}) =>({
                        presentation: "modal",
                        headerTitle: "Favoritstationer", 
                        headerShown: true,
                        //headerTitleAlign: "left",
                        //headerTitleStyle: {fontSize: 18, fontWeight: 'bold'},
                        
                        headerLeft: () =>
                        <View> 
                            
                            <Button title="Avbryt" onPress={(screenProps) => navigation.navigate('List')}/>
    
                        </View>
                    })}
            />
            <Stack.Screen name="TrainsAtStation" component={TrainsAtStation}
                    
                    options={ ({route, navigation}) =>({ 
                        title: route?.params?.station.AdvertisedLocationName,
                        headerLeft: () =>
                        <View> 
                            
                            <Button title="Tillbaka" onPress={(screenProps) => navigation.navigate('List')}/>
    
                        </View>
                    
                    })}
            />
        </Stack.Navigator>  
    );
}