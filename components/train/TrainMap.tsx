import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { Circle } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import delayedTrainsModel from '../../models/delayedTrains';
import DelayedTrain from '../../interfaces/delayedTrain';
import utils from '../../utils/utils';

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

    const [errorMessage, setErrorMessage] = useState('');
    
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

  /*   function calculateReach(delayTime: number): number {
        delayTime -= 5;
        return (delayTime*100/2);
    }  */    

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
