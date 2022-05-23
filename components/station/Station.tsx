import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StationFavoritesFancyList from './StationFavoritesFancyList';
import TrainsAtStation from '../train/TrainsAtStation';
import StationForm from './StationForm';
import StationNonFavoriteList from './StationNonFavoriteList';
import StationFavoriteList from './StationFavoriteList';
import { Button, View } from 'react-native';
import authModel from '../../models/auth';


const Stack = createNativeStackNavigator();

export default function Station(props) {
    return (
        <Stack.Navigator initialRouteName="List" >
            <Stack.Screen name="List"  
                options={ ({navigation}) =>({

                    headerTitle: "Favoritstationer", 
                    headerShown: true,
                    //headerTitleAlign: "left",
                    //headerTitleStyle: {fontSize: 18, fontWeight: 'bold'},
                    
                    headerRight: () =>
                    <View> 
                        
                        <Button title="Ändra" onPress={(screenProps) => navigation.navigate('Form', { navigation: {navigation} })}/>

                    </View>,

                    headerLeft: () =>
                    <View> 
                        
                        <Button title="Logga ut" onPress={ () => {
                                authModel.logout();
                                props.setIsLoggedIn(false);
                            }}
                        />

                    </View>
                    


                })}
            >
                {(screenProps) => <StationFavoritesFancyList {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
                
            </Stack.Screen>
            <Stack.Screen name="StationDetails"
                options={ 
                    ({route, navigation}) => ({ 
                        title: route.params.station.AdvertisedLocationName,  
                        headerLeft: () => 
                        <View> 
                            
                            <Button title="Tillbaka" onPress={(screenProps) => navigation.navigate('List')}/>
    
                        </View>
                    })
                }
            >
                {(screenProps) => <TrainsAtStation  {...screenProps}/>}
            </Stack.Screen>

            <Stack.Screen name="Form" 
                options={ ({navigation}) =>({
                    presentation: "modal",
                    headerTitle: "Ändra favoritstationer", 
                    headerShown: true,
                    //headerTitleAlign: "left",
                    //headerTitleStyle: {fontSize: 18, fontWeight: 'bold'},
                    
                    headerLeft: () =>
                    <View> 
                        
                        <Button title="Avbryt" onPress={(screenProps) => navigation.navigate('List')}/>

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
                    //headerTitleAlign: "left",
                    //headerTitleStyle: {fontSize: 18, fontWeight: 'bold'},
                    
                    headerRight: () =>
                    <View> 
                        
                        <Button title="Avbryt" onPress={(screenProps) => navigation.navigate('List')}/>

                    </View>
                })}
            />
            <Stack.Screen name="StationFavoriteModal" component={StationFavoriteList}
                options={ ({navigation}) =>({
                presentation: "modal",
                headerTitle: "Favoritstationer", 
                headerShown: true,
                //headerTitleAlign: "left",
                //headerTitleStyle: {fontSize: 18, fontWeight: 'bold'},
                
                headerRight: () =>
                <View> 
                    
                    <Button title="Avbryt" onPress={(screenProps) => navigation.navigate('List')}/>

                </View>
            })}
            />
        </Stack.Navigator>  
    );
}