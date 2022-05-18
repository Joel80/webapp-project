import { useEffect, useState } from 'react';
import { Text, ScrollView, StyleSheet, View, Pressable, Button } from 'react-native';
import station from '../../interfaces/station';
import stationModel from '../../models/stations';
import authModel from '../../models/auth';



export default function StationList({setIsLoggedIn, navigation}) {
    
    const [stations, setStations] = useState<station[]>([]);

    const [favoriteStations, setFavoriteStations] = useState<station[]>([]);
    
    useEffect( () => {
        (async () => {
            setStations(await stationModel.getStations());
            setFavoriteStations(await stationModel.getFavoriteStationsData());

        })();

        
    }, []);
   

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
