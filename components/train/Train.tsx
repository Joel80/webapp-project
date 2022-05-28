import { View, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TrainList from './TrainList';
import TrainsAtStation from './TrainsAtStation';
import StationSelect from '../station/StationSelect';
import { Ionicons } from '@expo/vector-icons';
import { TrainStackParamList } from '../../types/types';

/** Navigation stack for the train screens */

const Stack = createNativeStackNavigator<TrainStackParamList>();

export default function Train({isLoggedIn}: {isLoggedIn: Boolean}) {

    console.log(isLoggedIn);

    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={TrainList}
                options={ ({navigation}) =>
                    ({
                    
                        headerTitle: "Tågförseningar", 
                        headerShown: true,
                                        
                        headerRight: () => 
                        <View style={{flexDirection: 'row'}} >
                            <View>
                                <Ionicons name="navigate-outline" color={"#217cff"} size={22} 
                                    onPress={() => navigation.navigate('Karta')}
                                />
                                
                            </View>

                            <View style={{marginLeft: 20}}>
                                <Ionicons  
                                    name="list-outline" 
                                    color={"#217cff"} 
                                    size={28} 
                                    onPress={() => navigation.navigate('StationSelect')}
                                />
                            </View>
                        </View>,
                    
                        headerLeft: () =>
                        
                        <View style={{flexDirection: 'row'}} >
                           
                            <View style={{marginRight: 10}}>
                                {isLoggedIn &&
                                    <Ionicons name="heart-outline" color={"#217cff"} size={22} onPress={() => navigation.navigate('Stationer')}/>
                                }
                            </View>


                            
                            
                        </View>
               

                    })
                }
            
            />         
            <Stack.Screen name="StationSelect" component={StationSelect}
                    
                    options={ ({navigation}) =>({
                        presentation: "modal",
                        headerTitle: "Stationer", 
                        headerShown: true,
                        
                        headerRight: () =>
                        <View> 
                            
                            <Button title="Avbryt" onPress={() => navigation.navigate('List')}/>
    
                        </View>
                    })}
            />
            <Stack.Screen name="TrainsAtStation" 
                component={TrainsAtStation}
                              
                options={ ({route, navigation}) =>({ 
                    title: route?.params?.station.AdvertisedLocationName,
                    headerLeft: () =>
                    <View> 
                        
                        <Button title="Tillbaka" onPress={() => navigation.navigate('List')}/>

                    </View>
                
                })}
            />

        </Stack.Navigator>  
    );
}