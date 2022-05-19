import { View, Button, Pressable, Text } from 'react-native';




export default function StationForm({navigation}) {
    
    return (
        <View>
            <Button title= "Avbryt" onPress={() => navigation.goBack()} />
            <View style={{flexDirection: "row"}}>
            <View style={{borderColor: "#000", borderWidth: 1, borderRadius: 7, marginLeft: 15, padding:2}}>
                <Pressable
                    
                    onPress= { () => {
                        
                            navigation.navigate('StationModal', {
                                
                            });
                    
                        
                    }}

                    style={({ pressed }) => [
                        {
                          backgroundColor: pressed
                            ? 'grey'
                            : 'white'
                        }
                    ]}
                >
                    
                        <Text>Lägg till</Text>
                        <Text>Välj...</Text>
                    
                </Pressable>
                </View>
                <Pressable
                    onPress= { () => {
                        
                            navigation.navigate('StationFavoriteModal', {
                                
                            });
                    
                        
                    }}
                >
                    <Text>Ta bort</Text>
                    <Text>Välj...</Text>
                </Pressable>
            </View>
        </View>
        
        

    );
}