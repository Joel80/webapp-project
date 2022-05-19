import { useEffect, useState } from 'react';
import { Text, ScrollView, Pressable, Button } from 'react-native';
import station from '../../interfaces/station';
import stationModel from '../../models/stations';
import authModel from '../../models/auth';
import { useRoute } from '@react-navigation/native';



export default function StationList({setIsLoggedIn, navigation, route}) {
    
    const { reload } = route.params || false;

    console.log(route.params.reload);

    const [stations, setStations] = useState<station[]>([]);

    const [favoriteStations, setFavoriteStations] = useState<station[]>([]);
    
    useEffect( () => {
        (async () => {
            setStations(await stationModel.getStations());
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
   

    const favorites = favoriteStations.map((station, index) =>               
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
        
        
    );   
}
