import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from './Login';
import Register from './Register';

/**Navigation stack for the auth screens */

const Stack = createNativeStackNavigator();

export default function Auth({setIsLoggedIn}: {setIsLoggedIn(param: boolean): void}) {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" options={{headerShown: true, headerTitle: "Logga in"}}>
                { (screenProps) => <Login {...screenProps} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="Register" component={Register} options={{headerShown: true, headerTitle: "Registrera"}}/>
        </Stack.Navigator>
    );
};
 
