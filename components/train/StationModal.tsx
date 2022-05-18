import { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, Button } from "react-native";
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

    const stationList = stations.sort((a, b) => (a.AdvertisedLocationName > b.AdvertisedLocationName) ? 1 : -1)


    const Item = ( {item, onPress }) => (
        <TouchableOpacity onPress={onPress}>
            <View style={{ padding: 5, borderBottomWidth: 1, borderBottomColor: "#ececed" }}><Text style={{fontSize: 18}}>{item.AdvertisedLocationName}</Text></View>
        </TouchableOpacity>
    )

    const renderItem = ({item}) => {
        return (
            <Item
                item={item}
                onPress= { () => {
                    navigation.goBack();
                    navigation.navigate('TrainsAtStation', {
                        station: item
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