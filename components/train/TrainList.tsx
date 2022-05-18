import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import delayedTrainsModel from '../../models/delayedTrains';
import delayedTrain from '../../interfaces/delayedTrain';
import { DataTable } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

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
            <DataTable.Row style={{height: 50, marginTop: 0, marginBottom: 0, borderBottomWidth: 0, paddingBottom: 0}}>
                <DataTable.Cell style={{flex: 0}} textStyle={{fontWeight: 'bold', fontSize: 17}}>
                    {train.AdvertisedTrainIdent}  {train.FromLocationName}
                </DataTable.Cell>
                <DataTable.Cell style={{flex: 1}} textStyle={{fontWeight: 'bold', fontSize: 17}}>
                </DataTable.Cell>
                <DataTable.Cell style={{flex: 0}} textStyle={{color: "#959595", textDecorationLine: 'line-through', fontWeight: 'bold', fontSize: 17,  padding:10}} numeric>
                   {advertisedTime}
                </DataTable.Cell >
                <DataTable.Cell style={{flex: 0}} textStyle={{color: 'red', fontWeight: 'bold', fontSize: 17}} numeric>
                     {estimatedTime}
                </DataTable.Cell>
            </DataTable.Row >
            <DataTable.Row style={{borderBottomWidth: 1, borderBottomColor: "#ececed", minHeight:0, paddingBottom: 10, paddingTop: 0, marginTop: 0}}>
                <DataTable.Cell ><Ionicons name="train" color={"#217cff"} size={14}/> Tåg </DataTable.Cell>
            </DataTable.Row>
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