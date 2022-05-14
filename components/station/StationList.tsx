import { useEffect, useState } from 'react';
import { Text, ScrollView, StyleSheet, View, Pressable } from 'react-native';
import Station from '../../interfaces/station';
import stationModel from '../../models/stations';
import authModel from '../../models/auth';



function StationList() {
    
    const [stations, setStations] = useState<Station[]>([]);

    const [favoriteStations, setFavoriteStations] = useState<Station[]>([]);
    
    useEffect( () => {
        (async () => {
            setStations(await stationModel.getStations());
            setFavoriteStations(await stationModel.getStationsByLocationSignatures(["A"]));
        })();

        
    }, []);
   

   /*  const list = stations.map((station, index) => 
    
        <View key={index}>
            
            <Text>
                { station.AdvertisedLocationName}, { station.LocationSignature}, { station.Geometry.WGS84 }
            </Text>

        </View>
    ); */

    const favorites = favoriteStations.map((station, index) =>
        <View key={index}>
                
            <Text>
                { station.AdvertisedLocationName}, { station.LocationSignature}, { station.Geometry.WGS84 }
            </Text>

        </View>
    );


     return (
  
           <View>            
               {/* {list} */}
               {favorites}
            </View>

        
        
    );   
}

export default function Stations( {setIsLoggedIn} ) {
    return (
        <ScrollView>
            <StationList />
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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
  
    },
  });