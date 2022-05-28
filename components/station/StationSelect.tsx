import { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, ListRenderItem } from "react-native";
import { FlatList } from "react-native";
import stationModel from '../../models/stations';
import station from '../../interfaces/station';
import { StationListStyle } from "../../styles";
import { StationSelectProps } from "../../types/types";

/** Component that renders a list of stations each item has an onPress property that sends
 * the station to the TrainsAtStation screen
 */

export default function StationModal({navigation}: StationSelectProps) {
    
    const [stations, setStations] = useState<station[]>([]);

    useEffect( () => {
        (async () => {
            
            setStations(await stationModel.getStations());
    
        })();
    }, []);

   
    const stationList = stations.sort((a, b) => (a.AdvertisedLocationName > b.AdvertisedLocationName) ? 1 : -1)


    const Item = ( {item, onPress }: {item: station, onPress(): void }) => (
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
            <FlatList 
            
                data={stationList}
                renderItem={renderItem}
                contentContainerStyle={StationListStyle.contentContainerStyle}
            />
        </View>
            
                
    )
}