import { Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StationDetails from './station/StationDetails';
import TrainList from './TrainList';

const Stack = createNativeStackNavigator();

export default function Station(props) {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={TrainList}/>
            <Stack.Screen name="StationDetails">
                {(screenProps) => <StationDetails  {...screenProps}/>}
            </Stack.Screen>    
        </Stack.Navigator>  
    );
}