import { View, Button, Pressable, Text } from 'react-native';




export default function StationForm({navigation}) {
    
    return (
        <View>
            <Button title= "Avbryt" onPress={() => navigation.goBack()} />
            <View style={{flexDirection: "row"}}>
            <View style={{ marginLeft: 15, padding:2}}>
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
                            borderRadius: 7,
                            borderColor: "#cacacc",
                            borderWidth: 1,
                            padding: 15
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

                    style={({ pressed }) => [
                        {
                          backgroundColor: pressed
                            ? 'grey'
                            : 'white',
                            borderRadius: 7,
                            borderColor: "#cacacc",
                            borderWidth: 1,
                            padding: 15
                        }
                    ]}
                >
                    <Text>Ta bort</Text>
                    <Text>Välj...</Text>
                </Pressable>
            </View>
        </View>
        
        

    );
}