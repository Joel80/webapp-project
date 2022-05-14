import { Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import delayedTrainsModel from '../../models/delayedTrains';
import DelayedTrain from '../../interfaces/delayedTrain';

export default function StationDetails({route}) {
    //console.log(route);
    const { station } = route.params;

    //console.log(station);

    const [delayedTrainsAtStation, setDelayedTrainsAtStation] = useState<DelayedTrain[]>([]);


    useEffect(() => {
        (async () => {
            setDelayedTrainsAtStation(await delayedTrainsModel.getDelayedTrainsFromStation(station));
        })();
    }, []);

    const trains = delayedTrainsAtStation.map((train, index) => 
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