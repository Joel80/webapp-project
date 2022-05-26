import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StationFavoritesList from './StationFavoritesList';
import TrainsAtStation from '../train/TrainsAtStation';
import StationEdit from './StationEdit';
import StationAddFavorite from './StationAddFavorite';
import StationDeleteFavorite from './StationDeleteFavorite';
import { Button, View } from 'react-native';
import authModel from '../../models/auth';
import { StationStackParamList } from '../../types/types';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator<StationStackParamList>();

export default function Station({setIsLoggedIn}: {setIsLoggedIn(params: Boolean): void} ) {
    return (
        <Stack.Navigator initialRouteName="List" >
            <Stack.Screen name="List" 
                component={StationFavoritesList} 
                options={ ({navigation}) =>({

                    headerTitle: "Favoritstationer", 
                    headerShown: true,
                    
                    headerRight: () =>
                    <View> 
                        
                        <Button title="Ändra" onPress={() => navigation.navigate('Edit')}/>

                    </View>,

                    headerLeft: () =>
                    <View style={{marginRight: 10}}> 
                        <Ionicons 
                            name={'log-out-outline'}
                            size={30}
                            color={"#217cff"}
                            onPress={ () => {
                                authModel.logout();
                                setIsLoggedIn(false);
                            }}
                        />
                    </View>
                    


                })}
            />
            <Stack.Screen name="TrainsAtStation"
                component={TrainsAtStation}
                options={ 
                    ({route, navigation}) => ({ 
                        title: route?.params?.station.AdvertisedLocationName,  
                        headerLeft: () => 
                        <View style={{marginRight: 10}}> 
                            
                            <Button title="Tillbaka" onPress={() => navigation.navigate('List')}/>
    
                        </View>
                    })
                }
            />

            <Stack.Screen name="Edit" 
                options={ ({navigation}) =>({
                    presentation: "modal",
                    headerTitle: "Ändra favoritstationer", 
                    headerShown: true,
                    
                    headerLeft: () =>
                    <View style={{marginRight: 10}}> 
                        
                        <Button title="Avbryt" onPress={() => navigation.navigate('List')}/>

                    </View>
                })}
            >
                {(screenProps) => <StationEdit  {...screenProps}/>}
            </Stack.Screen>
            <Stack.Screen name="StationAddFavorite" component={StationAddFavorite}
                    
                options={ ({navigation}) =>({
                    presentation: "modal",
                    headerTitle: "Stationer", 
                    headerShown: true,
                    
                    headerRight: () =>
                    <View style={{marginRight: 10}}> 
                        
                        <Button title="Avbryt" onPress={() => navigation.navigate('List')}/>

                    </View>
                })}
            />
            <Stack.Screen name="StationDeleteFavorite" component={StationDeleteFavorite}
                options={ ({navigation}) =>({
                presentation: "modal",
                headerTitle: "Favoritstationer", 
                headerShown: true,
                
                headerRight: () =>
                <View> 
                    
                    <Button title="Avbryt" onPress={() => navigation.navigate('List')}/>

                </View>
            })}
            />
        </Stack.Navigator>  
    );
}