import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { Circle } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import delayedTrainsModel from '../../models/delayedTrains';
import DelayedTrain from '../../interfaces/delayedTrain';
import utils from '../../utils/utils';
import { Ionicons } from '@expo/vector-icons';

/** Renders a map with markers for delayed trains */

export default function TrainMap() {
    const defaultLatitude = 60.128161 //59.3293235;
    const defaultLongitude = 18.643501 //18.0685808;
    const defaultLatitudeDelta = 25;
    const defaultLongitudeDelta = 20;
    
    // Ref to MapViev, initialize mapRef.current to null
    const mapRef  = useRef<MapView>(null);
    
    const [trains, setTrains] = useState<DelayedTrain[]>([]);

    const [userMarker, setUserMarker] = useState(
        <Marker
            coordinate={{ latitude: defaultLatitude, longitude: defaultLongitude }}
            title="Förvald användarmarkör"
        />
    );

    // Used to show or hide information about the map
    const [showInformation, setShowInformation] = useState<Boolean>(false);

    const [errorMessage, setErrorMessage] = useState('');
    
    // Sets the circle component in the MapView
    const [circle, setCircle] = useState(
        <Circle 
            center={{latitude: defaultLatitude, longitude: defaultLongitude}}
            radius={0}
            fillColor={'rgba(255,0,0, 0.2)'}
            strokeColor={'rgba(255,0,0, 0.5)'}
        />
    );


    
    useEffect( () => {
        (async () => {
            setTrains(await delayedTrainsModel.getDelayedTrains());
        })();
    }, []);


    // Array with markers, each train gets a marker, when pressing a marker a circle element is created
    const markers = trains.map((train, index) => 
        <Marker
            key={index}
            coordinate={{ latitude: train.FromLat,  longitude: train.FromLong  }}
            title={train.FromLocationName}
            identifier={train.FromLocationName}
            description={`Tåg ${train.AdvertisedTrainIdent} Försenat ${train.DelayedBy} min.`}
            onPress={() => {
                console.log("Pressing the marker");
                let reach = utils.calculateReach(train.DelayedBy);
                if (reach < 0) {
                    reach = 0;
                }

                console.log(reach);
                const walkingCircle = 
                <Circle 
                    center={{latitude: train.FromLat, longitude: train.FromLong  }}
                    radius={reach}
                    fillColor={'rgba(255,0,0, 0.2)'}
                    strokeColor={'rgba(255,0,0, 0.5)'}
                />
                //console.log(walkingCircle);
                setCircle(walkingCircle);

            }}
            testID= {`Marker: ${index}`}
        />
    );
    
    //console.log(markers);

    
    // Get user position and display a marker
    useEffect ( () => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !=='granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});

            setUserMarker(<Marker 
                    coordinate= {{
                        latitude: currentLocation.coords.latitude,
                        longitude: currentLocation.coords.longitude
                    }}
                    title="Min plats"
                    pinColor="blue"
                    identifier="userMarker"
                />);
        }) ();
    }, []);

       
    return (

        <View style={{flex: 1}}>
            <View style={styles.container}>
                <MapView
                    key={markers.length}                   
                    style={styles.map}
                    initialRegion={{
                        latitude: defaultLatitude,
                        longitude:defaultLongitude,
                        latitudeDelta: defaultLatitudeDelta,
                        longitudeDelta: defaultLongitudeDelta,
                    }}
                    ref={mapRef}
                    
                >
                    {circle}
                    {markers}
                    {userMarker}
                </MapView>
            
            <Ionicons 
                style = {{marginBottom: 25, marginLeft: 325}}
                name="information-circle" 
                size={50} 
                color={"#217cff"}
                onPress={() => setShowInformation(!showInformation)}
            />
         
            </View>

            <View>
                {
                    showInformation &&
                    <Text style={{margin: 20}}> 
                        Kartan visar tågförseningar. Genom att trycka på en försening
                        får du fram information om förseningen. Om förseningen är mer 
                        än 5 minuter ritas också ett område som motsvarar hur långt 
                        du hinner gå utan att missa tåget ut på kartan. Flera förseningar
                        kan finnas vid samma station, zooma in för att se dessa. Den blå markören
                        visar din position.
                    </Text>
                }
                
            </View>
        </View>
        
    );   
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        /* marginBottom: 10,
        marginTop: 10, */
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        
    },
});
