import { useEffect, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import delayedTrainsModel from '../../models/delayedTrains';
import delayedTrain from '../../interfaces/delayedTrain';
import TrainTable from './TrainTable';

/** Renders a list with all delayed trains */
function TrainList() {
    
    const [trains, setTrains] = useState<delayedTrain[]>([]);
    
    useEffect( () => {
        (async () => {
            setTrains(await delayedTrainsModel.getDelayedTrains());
            
        })();        
    }, []);
   
    

    return (

        <View>
            <Text style={{fontSize: 30, fontWeight: "bold", borderBottomColor: "#000", borderBottomWidth: 5, padding: 5}}>Tågförseningar</Text>            
            <TrainTable trains={trains} />
        </View>

    
    
);   
}

export default function Trains() {
    return (
        <ScrollView style={{backgroundColor: "#ffff"}}>
            <TrainList />
        </ScrollView>
    )
}

