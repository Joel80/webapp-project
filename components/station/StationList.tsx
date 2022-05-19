import { useEffect, useState } from 'react';
import { Text, ScrollView, View, Pressable, Button, TouchableOpacity, FlatList } from 'react-native';
import station from '../../interfaces/station';
import stationModel from '../../models/stations';
import authModel from '../../models/auth';
import { LinearGradient } from 'expo-linear-gradient';
import { FavoriteStationList } from '../../styles';
import { Ionicons } from '@expo/vector-icons';

// Blue #48b7e9 to #0675a2

// Green #25af4e to #00963d


export default function StationList({setIsLoggedIn, navigation, route}) {
    
    const { reload } = route.params || false;

    console.log(route?.params?.reload);


    const [favoriteStations, setFavoriteStations] = useState<station[]>([]);
    
    useEffect( () => {
        (async () => {
            setFavoriteStations(await stationModel.getFavoriteStationsData());

        })();

        
    }, []);

    if (reload) {
        console.log("Reloading favorite stations")
        reloadStations();
        route.params = false;
    }

    async function reloadStations() {
        setFavoriteStations(await stationModel.getFavoriteStationsData());
    }

    const Item = ( {item, onPress, index }) => (
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
                                Antal spår: {item.PlatformLine.length}
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

    const renderItem = ({item, index}) => {
        return (
            <Item
                item={item}
                index={index}
                onPress= { () => {
                    navigation.navigate('StationDetails', {
                        station: item
                    });
                }}

            />
        )
              
    };
   
    return (
        <View>
            <FlatList 
            
                data={favoriteStations}
                renderItem={renderItem}
            />

            <Button
                title={ 'Lägg till ny station' }
                onPress= { () => {
                    navigation.navigate('Form', {
                    });
                }}
            />

            <Button 
                title="Logga ut"
                onPress= { () => {
                    authModel.logout();
                    setIsLoggedIn(false);
                }}
            />
        </View>
            
)
    /* const favorites = favoriteStations.map((station, index) =>               
        <Button
            key={index}
            title={ station.AdvertisedLocationName }
            onPress= { () => {
                navigation.navigate('StationDetails', {
                    station: station
                });
            }}
        />
    );


     return (
        <ScrollView>
            {favorites}
            <Button
            title={ 'Lägg till ny station' }
            onPress= { () => {
                navigation.navigate('Form', {
                });
            }}
        />
            <Pressable style={() => [{}]}
                onPress= { () => {
                    authModel.logout();
                    setIsLoggedIn(false);
                }}>
                <Text>Logga ut</Text>
            </Pressable>
        </ScrollView>
        
        
    );  */  
}
