import { Text, View, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import delayedTrainsModel from '../../models/delayedTrains';
import delayedTrain from '../../interfaces/delayedTrain';
import TrainTable from './TrainTable';
import { TrainsAtStationProps } from '../../types/types';


/** Renders a list with all delayed trains at a certain station*/


function TrainsAtStationList({route}: {route: TrainsAtStationProps['route']}) {
    const { station } = route.params;


    const [delayedTrainsAtStation, setDelayedTrainsAtStation] = useState<delayedTrain[]>([]);

    useEffect(() => {
        (async () => {
            setDelayedTrainsAtStation(await delayedTrainsModel.getDelayedTrains());
        })();
    }, []);

    const trains = delayedTrainsAtStation.filter(train => train.FromLocationName === station.AdvertisedLocationName);


    return (
        <View>
            <TrainTable trains={trains} />
        </View>

    );
}

export default function TrainsAtStation({route}: {route: TrainsAtStationProps['route']}) {
    return (
        <ScrollView style={{backgroundColor: "#fff"}}>
            <TrainsAtStationList route={route}/>
        </ScrollView>
    )
}

        