import { Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import delayedTrainsModel from '../../models/delayedTrains';
import delayedTrain from '../../interfaces/delayedTrain';

export default function StationDetails({route}) {
    //console.log(route);
    const { station } = route.params;

    console.log(station);

    const [delayedTrainsAtStation, setDelayedTrainsAtStation] = useState<delayedTrain[]>([]);

    useEffect(() => {
        (async () => {
            setDelayedTrainsAtStation(await delayedTrainsModel.getDelayedTrains());
        })();
    }, []);

    // TODO: change to ToLocationName?? check assignment again
    const trains = delayedTrainsAtStation.filter(train => train.FromLocationName === station.AdvertisedLocationName)
        .map((train, index) => 
        <Text key={index}>{train.AdvertisedTrainIdent}</Text>
    );

    //console.log(trains);

    return (
        <View>
            <Text>Detaljer</Text>
            {trains}
        </View>
        
        

    );
}