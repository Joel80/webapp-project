import { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, FlatList, ListRenderItem } from 'react-native';
import favoriteStation from '../../interfaces/favoriteStation';
import stationModel from '../../models/stations';
import { LinearGradient } from 'expo-linear-gradient';
import { FavoriteStationList } from '../../styles';
import { Ionicons } from '@expo/vector-icons';
import { StationFavoritesListProps } from "../../types/types";
import { TrainTableStyle } from '../../styles';

/**Renders a list with gradient backgrounds with favorite stations */

export default function StationList({ navigation, route}: StationFavoritesListProps) {
    
    let { reload } = route.params || false;

    //console.log(route?.params?.reload);


    const [favoriteStations, setFavoriteStations] = useState<favoriteStation[]>([]);
    
    useEffect( () => {
        (async () => {
            setFavoriteStations(await stationModel.getFavoriteStationsData());

        })();

        
    }, []);

    if (reload) {
        console.log("Reloading favorite stations")
        reloadStations();
        
    }

    async function reloadStations() {
        setFavoriteStations(await stationModel.getFavoriteStationsData());
        navigation.navigate("List", {reload: false})
    }

    const Item = ( {item, onPress, index }: {item: favoriteStation, onPress(): void, index: number} ) => (
        <TouchableOpacity onPress={onPress}>
            
            {index % 2 === 0 &&
                <LinearGradient colors = {["#48b7e9", "#0675a2"]}>
                    <View style={FavoriteStationList.item}>
                       
                        <View style={FavoriteStationList.nameView}>
                            <Ionicons name="train" color={"#fff"} size={22}/>
                            <Text style={FavoriteStationList.text}>
                                {item.AdvertisedLocationName}
                            </Text>
                            <Text style={FavoriteStationList.textRight}>
                                Antal spår: {item.PlatformLine?.length}
                            </Text>
                        </View>
                        <View style={FavoriteStationList.smallTextView}>
                            <Text style={FavoriteStationList.smallText}>
                                Tågstation
                            </Text>
                        </View>
                    </View>
                    
                </LinearGradient>
            }
            {index % 2 !== 0 && 
                <LinearGradient colors = {["#25af4e",  "#00963d"]}>
                    <View style={FavoriteStationList.item}>
                        <View style={FavoriteStationList.nameView}>
                            <Ionicons name="train" color={"#fff"} size={22}/>
                            <Text style={FavoriteStationList.text}>
                                {item.AdvertisedLocationName}
                            </Text>
                            <Text style={FavoriteStationList.textRight}>
                                Antal spår: {item.PlatformLine?.length}
                            </Text>
                        </View>
                        <View style={FavoriteStationList.smallTextView}>
                            <Text style={FavoriteStationList.smallText}>
                                Tågstation
                            </Text>
                        </View>
                    </View>
                </LinearGradient>
            }
            
                
           
        </TouchableOpacity>
    )

    const renderItem: ListRenderItem<favoriteStation> = ({item, index}) => {
        return (
            <Item
                item={item}
                index={index}
                onPress= { () => {
                    navigation.navigate('TrainsAtStation', {
                        station: item
                    });
                }}

            />
        )
              
    };
   
    return (
        <View style={{backgroundColor: "#fff"}}>
            <FlatList 
                ListHeaderComponent={<Text style={TrainTableStyle.trainTableHeading}>Favoritstationer</Text>}
            
                data={favoriteStations}
                renderItem={renderItem}
            />
        </View> 
)
}
