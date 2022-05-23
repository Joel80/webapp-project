import { View } from 'react-native';
import delayedTrain from '../../interfaces/delayedTrain';
import { DataTable } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { TrainTableStyle } from '../../styles/index';

/** Returns a view with a table with station data from the array passed to the component */

function zeroPad(number: number): string {
    if (number < 10) {
        return "0" + number;
    }

    return "" + number;
}

export default function TrainTable({trains}) {

   

        const list = trains.map(function (train: delayedTrain, index: number)  {
            const advertisedTime = 
                zeroPad(new Date(train.AdvertisedTimeAtLocation).getHours()) + ':' +
                zeroPad(new Date(train.AdvertisedTimeAtLocation).getMinutes());
            const estimatedTime =
                zeroPad(new Date(train.EstimatedTimeAtLocation).getHours()) + ':' +
                zeroPad(new Date(train.EstimatedTimeAtLocation).getMinutes());

        return (
            <View key={index}>
                    <DataTable.Row style={TrainTableStyle.trainTableRow}>
                        <DataTable.Cell style={TrainTableStyle.trainTableCellNr} textStyle={TrainTableStyle.trainTableCellTextContent}>
                            {train.AdvertisedTrainIdent}  {train.FromLocationName}
                        </DataTable.Cell>
                        <DataTable.Cell style={TrainTableStyle.trainTableCellText} textStyle={TrainTableStyle.trainTableCellTextContent}>
                        </DataTable.Cell>
                        <DataTable.Cell style={TrainTableStyle.trainTableCellNr} textStyle={TrainTableStyle.trainTableCellAdvertisedTimeText} numeric>
                            {advertisedTime}
                        </DataTable.Cell>
                        <DataTable.Cell style={TrainTableStyle.trainTableCellNr} textStyle={TrainTableStyle.trainTableCellEstimatedTimeText} numeric>
                            {estimatedTime}
                        </DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row style={TrainTableStyle.trainTableIconRow}>
                        <DataTable.Cell ><Ionicons name="train" color={"#217cff"} size={14}/> Tåg </DataTable.Cell>
                    </DataTable.Row>
                </View> 
        )
    });

    return (
        <View>
            {list}
        </View>
        
    )
}