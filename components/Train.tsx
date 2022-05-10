import { useEffect, useState } from 'react';
import { Text, ScrollView, StyleSheet, View } from 'react-native';
import Train from '../interfaces/train';
import trainModel from '../models/trains';
import delayedTrainsModel from '../models/delayedTrains';
import DelayedTrain from '../interfaces/delayedTrain';



function TrainList() {
    
    const [trains, setTrains] = useState<DelayedTrain[]>([]);
    
    useEffect( () => {
        (async () => {
            setTrains(await delayedTrainsModel.getDelayedTrains());
            /* console.log(trains);
            for (const train of trains) {
                if (train.FromLocation !== undefined) {
                    console.log(train.FromLocation[0]?.LocationName);
                }
            	
            } */
        })();

        
    }, []);
   

    const list = trains.map((train, index) => 
    <Text key={index}>
        {train.AdvertisedTrainIdent} - {train.FromLocationName} : {train.FromLocation ? train.FromLocation[0] : ""}, {train.FromLocation ? train.FromLocation[1] : ""} till  {train.ToLocationName} : {train.ToLocation ? train.ToLocation[0] : ""}, {train.ToLocation ? train.ToLocation[1] : ""}
    </Text>
    
    );
    //const list = trains.map((train, index) => <Text key={index}>{ train.advertisedTrainIdent}</Text>);
    //console.log(`Lista: ${list}`);
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