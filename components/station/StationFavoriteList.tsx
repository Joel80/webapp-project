import { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, Button } from "react-native";
import { FlatList } from "react-native";
import stationModel from '../../models/stations';
import station from '../../interfaces/station';
import { StationListStyle } from '../../styles/'


export default function StationFavoriteModal({navigation}) {
    
    const [favoriteStations, setFavoriteStations] = useState<station[]>([]);
        
    useEffect( () => {
        (async () => {
            
            setFavoriteStations(await stationModel.getFavoriteStationsData());
        })();
    }, []);

    const stationList = favoriteStations
    .sort((a, b) => (a.AdvertisedLocationName > b.AdvertisedLocationName) ? 1 : -1);

    console.log({stationList})


    const Item = ( {item, onPress }) => (
        <TouchableOpacity onPress={onPress}>
            <View style={StationListStyle.viewStyle}>
                <Text style={StationListStyle.textStyle}>
                    {item.AdvertisedLocationName}
                </Text>
            </View>
        </TouchableOpacity>
    )

    const renderItem = ({item}) => {
        return (
            <Item
                item={item}
                onPress= { () => {
                    console.log(`pressing id: ${item.id}`);
                    (async () => {
                        await stationModel.deleteFavoriteStationData(item.id);
                        navigation.goBack();
                        navigation.navigate('List', {
                            reload: true
                        });
                    
                    })();
                }}
            />
        )
              
    };

    
    return (
        <View>

            <FlatList 
            
                data={stationList}
                renderItem={renderItem}
                contentContainerStyle={StationListStyle.contentContainerStyle}
            />
        </View>
            
                
    )
}