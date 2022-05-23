import { View, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TrainList from './TrainList';
import TrainsAtStation from './TrainsAtStation';
import StationModal from './StationModal';
import { Ionicons } from '@expo/vector-icons';
import stationInterface from '../../interfaces/station';
import type { RouteProp } from '@react-navigation/native';

/**Navigator for train views */

// Type for paramlist for navigator
type StackParamList ={
    List: {
        name: string,
    };

    StationModal: {
        name: string,
    };

    TrainsAtStation: {
        station: stationInterface,
        name: string,
    };

}

type TrainsAtStationRouteProp = RouteProp<StackParamList, 'TrainsAtStation'>

const Stack = createNativeStackNavigator<StackParamList>();

export default function Train() {

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
                                <Ionicons name="navigate-outline" color={"#217cff"} size={25}/>
                            </View>

                            <View style={{marginLeft: 20}}>
                                <Ionicons  
                                    name="list-outline" 
                                    color={"#217cff"} 
                                    size={25} 
                                    onPress={(screenProps) => navigation.navigate('StationModal', {navigation: {navigation}})}
                                />
                            </View>
                        </View>,
                    
                        headerLeft: () => 
                        <View style={{flexDirection: 'row'}} >
                            <View>
                                <Ionicons name="heart-outline" color={"#217cff"} size={25}/>
                            </View>
                        </View>,
               

                    })
                }
            
            />         
            <Stack.Screen name="StationModal" component={StationModal}
                    
                    options={ ({navigation}) =>({
                        presentation: "modal",
                        headerTitle: "Stationer", 
                        headerShown: true,
                        
                        headerLeft: () =>
                        <View> 
                            
                            <Button title="Avbryt" onPress={(screenProps) => navigation.navigate('List')}/>
    
                        </View>
                    })}
            />
            <Stack.Screen name="TrainsAtStation" 
                component={TrainsAtStation}
                              
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