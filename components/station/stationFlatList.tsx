import { useState, useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import { FlatList } from "react-native";
import stationModel from '../../models/stations';
import station from '../../interfaces/station';


export default function StationFlatList({navigation}) {
    
    const [stations, setStations] = useState<station[]>([]);

    useEffect( () => {
        (async () => {
            
            setStations(await stationModel.getStations());
    
        })();
    }, []);


    const Item = ( {item, onPress }) => (
        <TouchableOpacity onPress={onPress}>
            <Text>{item.AdvertisedLocationName}</Text>
        </TouchableOpacity>
    )

    const renderItem = ({item}) => {
        return (
            <Item
                item={item}
                onPress= { () => {
                    navigation.navigate('StationDetails', {
                        station: item
                    });
                }}
            />
        )
              
    };

    
    return (
            <FlatList 
            
                data={stations}
                renderItem={renderItem}
            />
                
    )
}

