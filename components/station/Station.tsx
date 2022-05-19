import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StationList from './StationList';
import StationDetails from './StationDetails';
import StationForm from './StationForm';
import StationModal from './StationModal';


const Stack = createNativeStackNavigator();

export default function Station(props) {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List">
                {(screenProps) => <StationList {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="StationDetails"
                options={ ({route}) =>({ title: route.params.station.AdvertisedLocationName  })}
            >
                {(screenProps) => <StationDetails  {...screenProps}/>}
            </Stack.Screen>
            <Stack.Screen name="Form" >
                {(screenProps) => <StationForm  {...screenProps}/>}
            </Stack.Screen>
            <Stack.Screen name="StationModal" component={StationModal}
                    
                    options={ {headerShown: false, presentation: 'modal'}}
            />
        </Stack.Navigator>  
    );
}