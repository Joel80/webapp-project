import { View, Pressable, Text } from 'react-native';
import { StationFormStyle } from '../../styles/';
import { StationEditProps } from "../../types/types";

/** Component that displays two buttons, one that navigates to StationAddFavorite and one that navigates to StationDeleteFavorite */

export default function StationForm({navigation}: {navigation: StationEditProps['navigation']}) {
    
    return (
        
        
        <View style={StationFormStyle.outerViewStyle}>
            <View style={StationFormStyle.innerViewStyle}>
                <Pressable
                    
                    onPress= { () => {
                        
                            navigation.navigate('StationAddFavorite');
                    }}

                    style={({ pressed }) => [
                        {
                          backgroundColor: pressed
                            ? 'grey'
                            : 'white',
                            borderRadius: 15,
                            borderColor: "#cacacc",
                            borderWidth: 1,
                            marginRight: 30
                            
                        }
                    ]}
                >
                    
                    <View style={StationFormStyle.buttonStyle}>
                        <Text style={StationFormStyle.buttonText1Style}>Lägg till</Text>
                        <Text style={StationFormStyle.buttonText2Style}>Välj...</Text>
                    </View>
                </Pressable>
                <Pressable
                    onPress= { () => {
                        navigation.navigate('StationDeleteFavorite');
                    }}

                    style={({ pressed }) => [
                        {
                          backgroundColor: pressed
                            ? 'grey'
                            : 'white',
                            borderRadius: 15,
                            borderColor: "#cacacc",
                            borderWidth: 1,
                            marginLeft: 30
                        }
                    ]}
                >
                    <View style={StationFormStyle.buttonStyle}>
                        <Text style={StationFormStyle.buttonText1Style}>Ta bort</Text>
                        <Text style={StationFormStyle.buttonText2Style}>Välj...</Text>
                    </View>
                </Pressable>
            </View>
                <Text style={StationFormStyle.text}>Välj station att lägga till eller ta bort.</Text>
        </View>
        
        

    );
}