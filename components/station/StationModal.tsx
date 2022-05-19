import { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, Button } from "react-native";
import { FlatList } from "react-native";
import stationModel from '../../models/stations';
import station from '../../interfaces/station';


export default function StationModal({navigation}) {
    
    const [stations, setStations] = useState<station[]>([]);
    const [favoriteStations, setFavoriteStations] = useState<station[]>([]);
    useEffect( () => {
        (async () => {
            
            setStations(await stationModel.getStations());
            setFavoriteStations(await stationModel.getFavoriteStationsData());
        })();
    }, []);

    const stationList = stations
    .filter(station => favoriteStations.every(favoriteStation => 
        favoriteStation.LocationSignature !== station.LocationSignature))
    .sort((a, b) => (a.AdvertisedLocationName > b.AdvertisedLocationName) ? 1 : -1);



    const Item = ( {item, onPress }) => (
        <TouchableOpacity onPress={onPress}>
            <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#ececed" }}><Text style={{fontSize: 18, fontWeight: "500"}}>{item.AdvertisedLocationName}</Text></View>
        </TouchableOpacity>
    )

    const renderItem = ({item}) => {
        return (
            <Item
                item={item}
                onPress= { () => {
                    stationModel.createFavoriteStationsData(item);
                    navigation.goBack();
                    navigation.navigate('List', {
                        reload: true
                    });
                }}
            />
        )
              
    };

    
    return (
        <View>
            <View  style={{ paddingLeft: 250 }}>
                <Button title= "Avbryt" onPress={() => navigation.goBack()} />
            </View>
            <FlatList 
            
                data={stationList}
                renderItem={renderItem}
                contentContainerStyle={{flexGrow: 1, justifyContent: 'center', padding: 15,}}
            />
        </View>
            
                
    )
}