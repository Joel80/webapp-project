import { View, Button } from 'react-native';



export default function StationForm({navigation}) {
    
    return (
        <View>
            <Button
                title={ 'Välj station att lägga till' }
                onPress= { () => {
                    
                        navigation.navigate('StationModal', {
                            
                        });
                   
                    
                }}
            />

            <Button
                title={ 'Välj station att ta bort' }
                onPress= { () => {
                    
                        navigation.navigate('StationFavoriteModal', {
                            
                        });
                   
                    
                }}
            />
        </View>
        
        

    );
}