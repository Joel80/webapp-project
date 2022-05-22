import { View, Button, Pressable, Text } from 'react-native';




export default function StationForm({navigation}) {
    
    return (
        
        
        <View style={{flex: 1, alignItems: "center", marginTop: 40}}>
            <View style={{flexDirection: "row"}}>
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
                    
                    <View style={{paddingRight: 35, paddingLeft: 35, paddingTop: 12, paddingBottom: 12}}>
                        <Text style={{fontWeight: "100"}}>Lägg till</Text>
                        <Text style={{fontWeight: '400', fontSize: 20}}>Välj...</Text>
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
                    <View style={{paddingRight: 35, paddingLeft: 35, paddingTop: 12, paddingBottom: 12}}>
                        <Text style={{fontWeight: "100"}}>Ta bort</Text>
                        <Text style={{fontWeight: '400', fontSize: 20}}>Välj...</Text>
                    </View>
                </Pressable>
            </View>
        </View>
        
        

    );
}