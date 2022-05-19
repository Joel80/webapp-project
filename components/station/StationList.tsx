import { useEffect, useState } from 'react';
import { Text, ScrollView, View, Pressable, Button, TouchableOpacity, FlatList } from 'react-native';
import station from '../../interfaces/station';
import stationModel from '../../models/stations';
import authModel from '../../models/auth';



export default function StationList({setIsLoggedIn, navigation, route}) {
    
    const { reload } = route.params || false;

    console.log(route?.params?.reload);


    const [favoriteStations, setFavoriteStations] = useState<station[]>([]);
    
    useEffect( () => {
        (async () => {
            setFavoriteStations(await stationModel.getFavoriteStationsData());

        })();

        
    }, []);

    if (reload) {
        console.log("Reloading favorite stations")
        reloadStations();
        route.params = false;
    }

    async function reloadStations() {
        setFavoriteStations(await stationModel.getFavoriteStationsData());
    }

    const Item = ( {item, onPress, index }) => (
        <TouchableOpacity onPress={onPress}>
            
            {index % 2 === 0 && 
                <Text style={{backgroundColor: "blue"}}>
                    {item.AdvertisedLocationName}
                </Text>
            }
            {index % 2 !== 0 && 
                <Text style={{backgroundColor: "red"}}>
                    {item.AdvertisedLocationName}
                </Text>
            }
            
                
           
        </TouchableOpacity>
    )

    const renderItem = ({item, index}) => {
        return (
            <Item
                item={item}
                index={index}
                onPress= { () => {
                    navigation.navigate('StationDetails', {
                        station: item
                    });
                }}

            />
        )
              
    };
   
    return (
        <View>
            <FlatList 
            
                data={favoriteStations}
                renderItem={renderItem}
            />

            <Button 
                title="Logga ut"
                onPress= { () => {
                    authModel.logout();
                    setIsLoggedIn(false);
                }}
            />
        </View>
            
)
    /* const favorites = favoriteStations.map((station, index) =>               
        <Button
            key={index}
            title={ station.AdvertisedLocationName }
            onPress= { () => {
                navigation.navigate('StationDetails', {
                    station: station
                });
            }}
        />
    );


     return (
        <ScrollView>
            {favorites}
            <Button
            title={ 'Lägg till ny station' }
            onPress= { () => {
                navigation.navigate('Form', {
                });
            }}
        />
            <Pressable style={() => [{}]}
                onPress= { () => {
                    authModel.logout();
                    setIsLoggedIn(false);
                }}>
                <Text>Logga ut</Text>
            </Pressable>
        </ScrollView>
        
        
    );  */  
}
