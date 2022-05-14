import { Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StationList from './StationList';
import StationDetails from './StationDetails';

const Stack = createNativeStackNavigator();

export default function Station(props) {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List">
                {(screenProps) => <StationList {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="Details">
                {(screenProps) => <StationDetails  {...screenProps}/>}
            </Stack.Screen>
        </Stack.Navigator>  
    );
}