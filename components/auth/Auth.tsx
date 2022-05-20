import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from './Login';
import Register from './Register';

const Stack = createNativeStackNavigator();

export default function Auth(props) {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" options={{headerShown: true, headerTitle: "Logga in"}}>
                { (screenProps) => <Login {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="Register" component={Register} options={{headerShown: true, headerTitle: "Registrera"}}/>
        </Stack.Navigator>
    );
};
 
