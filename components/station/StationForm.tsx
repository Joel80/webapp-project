import { View, Button, Pressable, Text } from 'react-native';




export default function StationForm({navigation}) {
    
    return (
        
        
        <View style={{flex: 1, alignItems: "center", marginTop: 15}}>
            <View style={{flexDirection: "row", marginTop: 10}}>
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
                            padding: 25,
                            marginRight: 35
                            
                        }
                    ]}
                >
                    
                        <Text style={{fontWeight: "100", paddingRight: 15}}>Lägg till</Text>
                        <Text style={{fontWeight: '400', fontSize: 18}}>Välj...</Text>
                    
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
                            borderRadius: 7,
                            borderColor: "#cacacc",
                            borderWidth: 1,
                            padding: 25,
                            marginLeft: 50
                        }
                    ]}
                >
                    <Text style={{fontWeight: "100", paddingRight: 15}}>Ta bort</Text>
                    <Text style={{fontWeight: '400', fontSize: 18}}>Välj...</Text>
                </Pressable>
            </View>
        </View>
        
        

    );
}