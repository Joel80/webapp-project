import { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, ListRenderItem } from "react-native";
import { FlatList } from "react-native";
import stationModel from '../../models/stations';
import favoriteStation from '../../interfaces/favoriteStation';
import { StationListStyle } from '../../styles'
import { StationDeleteFavoriteProps } from "../../types/types";

/** Component that displays a FlatList with favorite stations, each item has an onPress property that sends a delete call to the auth service */


export default function StationFavoriteModal({navigation}: {navigation: StationDeleteFavoriteProps['navigation']}) {
    
    const [favoriteStations, setFavoriteStations] = useState<favoriteStation[]>([]);
        
    useEffect( () => {
        (async () => {
            
            setFavoriteStations(await stationModel.getFavoriteStationsData());
        })();
    }, []);

    const stationList = favoriteStations
    .sort((a, b) => (a.AdvertisedLocationName > b.AdvertisedLocationName) ? 1 : -1);

    //console.log({stationList})


    const Item = ( {item, onPress }: {item: favoriteStation, onPress(): void}) => (
        <TouchableOpacity onPress={onPress}>
            <View style={StationListStyle.viewStyle}>
                <Text style={StationListStyle.textStyle}>
                    {item.AdvertisedLocationName}
                </Text>
            </View>
        </TouchableOpacity>
    )

    const renderItem: ListRenderItem<favoriteStation> = ({item}) => {
        return (
            <Item
                item={item}
                onPress= { () => {
                    //console.log(`pressing id: ${item.id}`);
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