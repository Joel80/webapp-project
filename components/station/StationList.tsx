import { useEffect, useState } from 'react';
import { Text, ScrollView, StyleSheet, View, Pressable, Button } from 'react-native';
import Station from '../../interfaces/station';
import stationModel from '../../models/stations';
import authModel from '../../models/auth';



export default function StationList({setIsLoggedIn, navigation}) {
    
    const [stations, setStations] = useState<Station[]>([]);

    const [favoriteStations, setFavoriteStations] = useState<Station[]>([]);
    
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
                navigation.navigate('Details', {
                    station: station
                });
            }}
        />
    );


     return (
        <ScrollView>
            {favorites}
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

/* export default function Stations( {setIsLoggedIn, navigation} ) {
    return (
        <ScrollView>
            <StationList navigation={navigation}/>
            <Pressable style={() => [{}]}
                    onPress= { () => {
                        authModel.logout();
                        setIsLoggedIn(false);
                    }}>
                    <Text>Logga ut</Text>
                </Pressable>
        </ScrollView>
    )
}
 */