import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
//import * as Location from 'expo-location';
import delayedTrainsModel from '../models/delayedTrains';
import DelayedTrain from '../interfaces/delayedTrain';

export default function TrainMap() {
    const defaultLatitude = 60.128161 //59.3293235;
    const defaultLongitude = 18.643501 //18.0685808;
    const defaultLatitudeDelta = 25;
    const defaultLongitudeDelta = 20;
    
    // Ref to MapViev, initialize mapRef.current to null
    const mapRef  = useRef<MapView>(null);
    
     const [trains, setTrains] = useState<DelayedTrain[]>([]);
    
    useEffect( () => {
        (async () => {
            setTrains(await delayedTrainsModel.getDelayedTrains());
        })();
    }, []);


    const markers = trains.map((train, index) => 
              <Marker
                  key={index}
                  coordinate={{ latitude: train.FromLat, longitude: train.FromLong }}
                  title={train.FromLocationName}
                  identifier={train.FromLocationName}
                  opacity={1.0}
                  flat={true}
                  rotation={1.0}
              />
            );
    console.log(markers);

/*     let train = trains[0];

    const markers = [<Marker
      key={1}
      coordinate={{ latitude: 16.391720410683643, longitude:  61.349484744524425 }}
      title={"Bollnäs"}
      identifier={"Bollnäs"}
  />]

  console.log(markers) */


 /*    const markers = [<Marker
                  coordinate={{ latitude: 60.0, longitude: 15.0}}
                  title={"Pin"}
                  identifier={"Pin"}
                />, <Marker
                coordinate={{ latitude: NaN, longitude: 15.0}}
                title={"Pin"}
                identifier={"Pin"}
              />]; */

          

    /* useEffect ( () => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !=='granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});

            setLocationMarker(<Marker 
                    coordinate= {{
                        latitude: currentLocation.coords.latitude,
                        longitude: currentLocation.coords.longitude
                    }}
                    title="Min plats"
                    pinColor="blue"
                    identifier="userMarker"
                />);
            // Add marker identifier to markers array
            setMarkers(markers => [...markers, "userMarker"]);
            console.log("User location loaded");
            console.log(markers);
        }) ();
    }, []); */

    // UseEffect for markers, run when markers array changes
 /*    useEffect ( () => {
        console.log("Checking markers update");
        // If both identifiers are in the array
        if (markers.includes("deliveryMarker" && "userMarker")) {
            // Call fitToMarkers with markers array to fit map
            // to markers
            fitToMarkers(markers);
        }
        
    }, [markers]) */

 /*      
    function fitToMarkers (markers: string[]) {
        console.log("Fitting to markers");
        
        // If mapRef.current is not null
        // call method fitToSuppliedMarkers with markers array 
        if (mapRef.current !== null) {
            mapRef.current.fitToSuppliedMarkers(markers);
        }
       
    } */


       
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
                   {markers}
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
