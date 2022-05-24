import { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, ListRenderItem } from "react-native";
import { FlatList } from "react-native";
import stationModel from '../../models/stations';
import station from '../../interfaces/station';
import { StationListStyle } from "../../styles";
import { StationNonFavoriteList } from "../../interfaces/types";

export default function StationModal({navigation}: {navigation: StationNonFavoriteList['navigation']}) {
    
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



    const Item = ( {item, onPress }: {item: station, onPress(): void}) => (
        <TouchableOpacity onPress={onPress}>
            <View style={StationListStyle.viewStyle}>
                <Text style={StationListStyle.textStyle}>
                    {item.AdvertisedLocationName}
                </Text>
            </View>
        </TouchableOpacity>
    )

    const renderItem: ListRenderItem<station> = ({item}) => {
        return (
            <Item
                item={item}
                onPress= { () => {
                    (async () => {
                        await stationModel.createFavoriteStationsData(item);
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