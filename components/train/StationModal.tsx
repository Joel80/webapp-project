import { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native";
import stationModel from '../../models/stations';
import station from '../../interfaces/station';
import { StationListStyle } from "../../styles";

export default function StationModal({navigation}) {
    
    const [stations, setStations] = useState<station[]>([]);

    useEffect( () => {
        (async () => {
            
            setStations(await stationModel.getStations());
    
        })();
    }, []);

    const stationList = stations.sort((a, b) => (a.AdvertisedLocationName > b.AdvertisedLocationName) ? 1 : -1)


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