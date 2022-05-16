import { useEffect, useState } from 'react';
import { Text, ScrollView, StyleSheet, View } from 'react-native';
import Train from '../interfaces/train';
import trainModel from '../models/trains';
import delayedTrainsModel from '../models/delayedTrains';
import delayedTrain from '../interfaces/delayedTrain';
import { DataTable } from 'react-native-paper';
import { Appbar } from 'react-native-paper';

function zeroPad(number: number): string {
    if (number < 10) {
        return "0" + number;
    }

    return "" + number;
}

function TrainList() {
    
    const [trains, setTrains] = useState<delayedTrain[]>([]);
    
    useEffect( () => {
        (async () => {
            setTrains(await delayedTrainsModel.getDelayedTrains());
        })();

        
    }, []);
   

    const list = trains.map(function (train, index)  {
        const advertisedTime = 
            zeroPad(new Date(train.AdvertisedTimeAtLocation).getHours()) + ':' +
            zeroPad(new Date(train.AdvertisedTimeAtLocation).getMinutes());
        const estimatedTime =
            zeroPad(new Date(train.EstimatedTimeAtLocation).getHours()) + ':' +
            zeroPad(new Date(train.EstimatedTimeAtLocation).getMinutes());

        return (
            
        <View key={index}>
            <DataTable.Row style={{height: 75}}>
                <DataTable.Cell style={{flex: 0}} textStyle={{fontWeight: 'bold', fontSize: 18}}>
                    {train.AdvertisedTrainIdent} {train.FromLocationName} 
                </DataTable.Cell>
                <DataTable.Cell style={{flex: 1}} textStyle={{fontWeight: 'bold', fontSize: 18}}>
                    
                </DataTable.Cell>
                <DataTable.Cell style={{flex: 0}} textStyle={{fontWeight: 'bold', fontSize: 18,  padding:10}} numeric>
                    {estimatedTime}
                </DataTable.Cell >
                <DataTable.Cell style={{flex: 0}} textStyle={{textDecorationLine: 'line-through', color: 'red', fontWeight: 'bold', fontSize: 18}} numeric>
                    {advertisedTime}
                </DataTable.Cell>
            </DataTable.Row>
            
            <DataTable.Cell>
                <Text>  </Text> 
            </DataTable.Cell>
        </View> )
    
    });

     return (
  
           <View>            
               {list}
            </View>

        
        
    );   
}

export default function Trains() {
    return (
        <ScrollView>
            <TrainList />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
  
    },
  });