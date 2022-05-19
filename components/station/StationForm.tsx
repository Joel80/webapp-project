import { View, Button } from 'react-native';



export default function StationForm({navigation}) {
    
    return (
        <View>
            <Button
                title={ 'Välj...' }
                onPress= { () => {
                    
                        navigation.navigate('StationModal', {
                            
                        });
                   
                    
                }}
            />
        </View>
        
        

    );
}