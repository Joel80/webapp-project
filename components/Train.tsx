import { useEffect, useState } from 'react';
import { Text, ScrollView, StyleSheet, View } from 'react-native';
import Train from '../interfaces/train';
import trainModel from '../models/trains';



function TrainList() {
    
    const [trains, setTrains] = useState<Train[]>([]);
    
    useEffect( () => {
        (async () => {
            setTrains(await trainModel.getTrains());
            /* console.log(trains);
            for (const train of trains) {
                if (train.FromLocation !== undefined) {
                    console.log(train.FromLocation[0]?.LocationName);
                }
            	
            } */
        })();

        
    }, []);
   

    const list = trains.map((train, index) => 
    
    <View key={index}>
        
        <Text>
            { train.AdvertisedTrainIdent} 
            { train.FromLocation !== undefined && train.FromLocation[0].LocationName } - 
            { train.ToLocation !== undefined && train.ToLocation[0].LocationName } - 
            { train.EstimatedTimeAtLocation}
        </Text>

    </View>);
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