import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StationFavoritesFancyList from './StationFavoritesFancyList';
import TrainsAtStation from '../train/TrainsAtStation';
import StationForm from './StationForm';
import StationNonFavoriteList from './StationNonFavoriteList';
import StationFavoriteList from './StationFavoriteList';
import { Button, View } from 'react-native';
import authModel from '../../models/auth';
import { StationStackParamList } from '../../interfaces/types';

const Stack = createNativeStackNavigator<StationStackParamList>();

export default function Station({setIsLoggedIn}: {setIsLoggedIn(params: Boolean): void} ) {
    return (
        <Stack.Navigator initialRouteName="List" >
            <Stack.Screen name="List" 
                component={StationFavoritesFancyList} 
                options={ ({navigation}) =>({

                    headerTitle: "Favoritstationer", 
                    headerShown: true,
                    
                    headerRight: () =>
                    <View> 
                        
                        <Button title="Ändra" onPress={() => navigation.navigate('Form')}/>

                    </View>,

                    headerLeft: () =>
                    <View style={{marginRight: 10}}> 
                        
                        <Button title="Logga ut" onPress={ () => {
                                authModel.logout();
                                setIsLoggedIn(false);
                            }}
                        />

                    </View>
                    


                })}
            />
            <Stack.Screen name="StationDetails"
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

            <Stack.Screen name="Form" 
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
                {(screenProps) => <StationForm  {...screenProps}/>}
            </Stack.Screen>
            <Stack.Screen name="StationModal" component={StationNonFavoriteList}
                    
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
            <Stack.Screen name="StationFavoriteModal" component={StationFavoriteList}
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