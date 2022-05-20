import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StationList from './StationList';
import StationDetails from './StationDetails';
import StationForm from './StationForm';
import StationModal from './StationModal';
import StationFavoriteModal from './StationFavoriteModal';
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
                {(screenProps) => <StationList {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
                
            </Stack.Screen>
            <Stack.Screen name="StationDetails"
                options={ ({route}) =>({ title: route.params.station.AdvertisedLocationName  })}
            >
                {(screenProps) => <StationDetails  {...screenProps}/>}
            </Stack.Screen>
            <Stack.Screen name="Form" options={ {headerShown: false, presentation: 'modal'}}>
                {(screenProps) => <StationForm  {...screenProps}/>}
            </Stack.Screen>
            <Stack.Screen name="StationModal" component={StationModal}
                    
                    options={ {headerShown: false, presentation: 'modal'}}
            />
            <Stack.Screen name="StationFavoriteModal" component={StationFavoriteModal}
                    
                    options={ {headerShown: false, presentation: 'modal'}}
            />
        </Stack.Navigator>  
    );
}