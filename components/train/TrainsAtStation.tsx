import { Text, View, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import delayedTrainsModel from '../../models/delayedTrains';
import delayedTrain from '../../interfaces/delayedTrain';
import { DataTable } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { TrainTableStyle } from '../../styles/index';
import TrainTable from './TrainTable';
import { useRoute } from '@react-navigation/native';

/** Renders a list with all delayed trains at a certain station*/

function TrainsAtStationList({route}) {
    //console.log(route);
    const { station } = route.params;

    //console.log(station);

    const [delayedTrainsAtStation, setDelayedTrainsAtStation] = useState<delayedTrain[]>([]);

    useEffect(() => {
        (async () => {
            setDelayedTrainsAtStation(await delayedTrainsModel.getDelayedTrains());
        })();
    }, []);

    const trains = delayedTrainsAtStation.filter(train => train.FromLocationName === station.AdvertisedLocationName);

    //console.log(trains);

    return (
        <View>
            <TrainTable trains={trains} />
        </View>

    );
}

export default function TrainsAtStation({route}) {
    return (
        <ScrollView style={{backgroundColor: "#fff"}}>
            <TrainsAtStationList route={route}/>
        </ScrollView>
    )
}

        