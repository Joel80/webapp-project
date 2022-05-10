import { useEffect, useState } from 'react';
import { Text, ScrollView, StyleSheet, View } from 'react-native';
import Station from '../interfaces/station';
import stationModel from '../models/stations';



function StationList() {
    
    const [stations, setStations] = useState<Station[]>([]);
    
    useEffect( () => {
        (async () => {
            setStations(await stationModel.getStations());
            
            for (const station of stations) {
               
                    console.log(station.Geometry.WGS84 );
                
            	
            } 
        })();

        
    }, []);
   

    const list = stations.map((station, index) => 
    
    <View key={index}>
        
        <Text>
            { station.AdvertisedLocationName}, { station.LocationSignature}, { station.Geometry.WGS84 }
        </Text>

    </View>);
    //const list = trains.map((train, index) => <Text key={index}>{ train.advertisedTrainIdent}</Text>);
    //console.log(`Lista: ${list}`);
     return (
  
           <View>            
               {list}
            </View>

        
        
    );   
}

export default function Stations() {
    return (
        <ScrollView>
            <StationList />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
  
    },
  });