import { Text, View, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import station from '../../interfaces/station';
import stationModel from '../../models/stations';

function StationDropDown(props) {
    console.log(props.selectedStation);
    const [stations, setStations] = useState<station[]>([]);
    const [favoriteStations, setFavoriteStations] = useState<station[]>([]);
    

    useEffect(() => {
            (async () => {
                setStations(await stationModel.getStations());
                setFavoriteStations(await stationModel.getFavoriteStationsData());
            })();
        
    }, []);

    
    const stationList = stations
    .filter(station => favoriteStations.every(favoriteStation => 
        favoriteStation.LocationSignature !== station.LocationSignature))
    .sort((a, b) => (a.AdvertisedLocationName > b.AdvertisedLocationName) ? 1 : -1)
    .map((station: station, index: number) => {
        const itemLabel = station.AdvertisedLocationName; 
        return <Picker.Item 
                    key={index} 
                    label= {itemLabel}
                    value={station.LocationSignature}
                />  
    });


    return (
        <Picker 
            selectedValue={props.selectedStation?.LocationSignature}
            onValueChange={(itemValue) => {
            const station = stations.find(station => station.LocationSignature === itemValue)
            props.setSelectedStation(station);
            }}>
            {stationList}
        </Picker>
    );
   
}

export default function StationForm({navigation}) {
    
    const [selectedStation, setSelectedStation] = useState<station>();
    console.log(selectedStation);

    return (
        <View>
            <Text>Lägg till favoritstation</Text>
            <StationDropDown
                selectedStation={selectedStation}
                setSelectedStation={setSelectedStation}
            />
            <Button
                title={ 'Lägg till station' }
                onPress= { () => {
                    if (selectedStation !== undefined) {
                        stationModel.createFavoriteStationsData(selectedStation);
                        navigation.navigate('List', {
                            
                        });
                    }
                    
                }}
            />
        </View>
        
        

    );
}