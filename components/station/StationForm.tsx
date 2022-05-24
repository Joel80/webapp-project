import { View, Pressable, Text } from 'react-native';
import { StationFormStyle } from '../../styles/';
import { StationFormProps } from "../../interfaces/types";



export default function StationForm({navigation}: {navigation: StationFormProps['navigation']}) {
    
    return (
        
        
        <View style={StationFormStyle.outerViewStyle}>
            <View style={StationFormStyle.innerViewStyle}>
                <Pressable
                    
                    onPress= { () => {
                        
                            navigation.navigate('StationModal', {
                                
                            });
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
                        navigation.navigate('StationFavoriteModal', {
                        });
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
        </View>
        
        

    );
}