import { Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import delayedTrainsModel from '../../models/delayedTrains';
import delayedTrain from '../../interfaces/delayedTrain';
import { DataTable } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { TrainTable } from '../../styles/index';

function zeroPad(number: number): string {
    if (number < 10) {
        return "0" + number;
    }

    return "" + number;
}
export default function StationDetails({route}) {
    //console.log(route);
    const { station } = route.params;

    //console.log(station);

    const [delayedTrainsAtStation, setDelayedTrainsAtStation] = useState<delayedTrain[]>([]);

    useEffect(() => {
        (async () => {
            setDelayedTrainsAtStation(await delayedTrainsModel.getDelayedTrains());
        })();
    }, []);

 // TODO: change to ToLocationName?? check assignment again
 const trains = delayedTrainsAtStation.filter(train => train.FromLocationName === station.AdvertisedLocationName)
 .map(function (train, index)  {
     const advertisedTime = 
         zeroPad(new Date(train.AdvertisedTimeAtLocation).getHours()) + ':' +
         zeroPad(new Date(train.AdvertisedTimeAtLocation).getMinutes());
     const estimatedTime =
         zeroPad(new Date(train.EstimatedTimeAtLocation).getHours()) + ':' +
         zeroPad(new Date(train.EstimatedTimeAtLocation).getMinutes());

     return (
         
     <View key={index}>
         <DataTable.Row style={TrainTable.trainTableRow}>
             <DataTable.Cell style={TrainTable.trainTableCellNr} textStyle={TrainTable.trainTableCellTextContent}>
                 {train.AdvertisedTrainIdent}  {train.FromLocationName}
             </DataTable.Cell>
             <DataTable.Cell style={TrainTable.trainTableCellText} textStyle={TrainTable.trainTableCellTextContent}>
             </DataTable.Cell>
             <DataTable.Cell style={TrainTable.trainTableCellNr} textStyle={TrainTable.trainTableCellAdvertisedTimeText} numeric>
                {advertisedTime}
             </DataTable.Cell>
             <DataTable.Cell style={TrainTable.trainTableCellNr} textStyle={TrainTable.trainTableCellEstimatedTimeText} numeric>
                  {estimatedTime}
             </DataTable.Cell>
         </DataTable.Row >
         <DataTable.Row style={TrainTable.trainTableIconRow}>
             <DataTable.Cell ><Ionicons name="train" color={"#217cff"} size={14}/> Tåg </DataTable.Cell>
         </DataTable.Row>
     </View> )
 
 });

 //console.log(trains);

 return (
     <View>
         {trains}
     </View>

 );
}