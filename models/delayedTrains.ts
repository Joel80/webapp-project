import config from '../config/config.json';
import stationModel from './stations';
import delayedTrainInterface from '../interfaces/delayedTrain';
import Train from '../interfaces/train';
import Station from '../interfaces/station';

const trains = {
    getDelayedTrains: async function getDelayedTrains() {
        console.log("Calling getDelayedTrains");
        
        const delayedTrainsArray: delayedTrainInterface[] = [];

        // Get delayed trains from the api
        const response = await fetch(`${config.base_url}/delayed`);
       
        const result = await response.json();

        const trains: Train[] = result.data;

        // Get stations from the api
        const stations: Station[] = await stationModel.getStations();

        // Array for ident for trains already found
        const markedTrains: string[] = [];

        // Loop through the trains
        for (const train of trains) {
            
            // Skip trains that are already accounted for (a train can appear several times
            // because the data in the API contains the same train with delay info for different
            // stations between fromLocation and toLocation, in this solution we are only counting the 
            // "first" ecountered delay)
            if (markedTrains.includes(train.AdvertisedTrainIdent)) {
                continue;
            }

            // Add the train ident to markedTrains
            markedTrains.push(train.AdvertisedTrainIdent);

            //console.log(train.AdvertisedTrainIdent);

            // Init vars
            let trainFromLocationName: string = "";

            let trainToLocationName: string = "";

            let trainFromCoords: RegExpMatchArray | null = [];

            let trainFromLat: number  = -0.0;

            let trainFromLong: number  = -0.0;
            
            let trainToCoords: RegExpMatchArray | null = [];

            let trainToLat: number  = -0.0;

            let trainToLong: number  = -0.0;

            let trainDelayedBy: number = 0;


           // Loop through stations
            for (const station of stations) {
                // Check if train has a FromLocation
                if (train.FromLocation !== undefined) {
                    // Match a station LocationSignature with the FromLocation
                    if (station.LocationSignature === train.FromLocation[0].LocationName) {
                        //console.log(station.LocationSignature, train.AdvertisedTrainIdent);
                        trainFromLocationName = station.AdvertisedLocationName;
                        
                        // Use regex to get the coordinates
                        trainFromCoords = station.Geometry.WGS84.match((/(\d+)(\.\d+)/g));
                  
                        // Check that the coords can be parsed as floats
                        if (trainFromCoords && parseFloat(trainFromCoords[0]) !== NaN && parseFloat(trainFromCoords[1]) !== NaN) {
                 
                            trainFromLong = parseFloat(trainFromCoords[0]);
                            trainFromLat = parseFloat(trainFromCoords[1]);

                            
                            
                        } else {
                            trainFromLat = -0.0;
                            trainFromLong = -0.0;
                        }
                    }
                    
                    let dateEstimated = new Date(train.EstimatedTimeAtLocation);
                    
                    let dateAdvertised = new Date(train.AdvertisedTimeAtLocation);
                    
                    // Calculate the delay in mins.
                    trainDelayedBy = (dateEstimated.valueOf() - dateAdvertised.valueOf()) / 60000;

                }

                // Same as above for ToLocation
                if (train.ToLocation !== undefined) {
                    if (station.LocationSignature === train.ToLocation[0].LocationName) {
                        trainToLocationName = station.AdvertisedLocationName;
                        trainToCoords = station.Geometry.WGS84.match((/(\d+)(\.\d+)/g));
                        if (trainToCoords && parseFloat(trainToCoords[0]) !== NaN && parseFloat(trainToCoords[1]) != NaN) {
                            trainToLong = parseFloat(trainToCoords[0]);
                            trainToLat = parseFloat(trainToCoords[1]);
                        } else {
                            trainToLat = -0.0;
                            trainToLong = -0.0;
                        }
                    }
                }               
            }

            // Build the train object
            let delayedTrain: delayedTrainInterface = {
                ActivityId: train.ActivityId,
                ActivityType: train.ActivityType,
                AdvertisedTimeAtLocation: train.AdvertisedTimeAtLocation,
                AdvertisedTrainIdent: train.AdvertisedTrainIdent,
                Canceled: train.Canceled,
                EstimatedTimeAtLocation: train.EstimatedTimeAtLocation,
                FromLocationName: trainFromLocationName,
                ToLocationName: trainToLocationName,
                FromLocation: trainFromCoords,
                ToLocation: trainToCoords,
                FromLat: trainFromLat,
                FromLong: trainFromLong,
                ToLat: trainToLat,
                ToLong: trainToLong,
                DelayedBy: trainDelayedBy,
            };
            // Only push delayed trains with a from latitude to array
            if (delayedTrain.FromLat !== -0.0) {

                // Check if there are overlapping coords, if so slightly change them
                // so that two trains dont overlap in the map
                let counter = 0;

                for (const train of delayedTrainsArray) {
                    // Check if position is already taken by another train
                    if (delayedTrain.FromLat === train.FromLat && delayedTrain.FromLong === train.FromLong) {
                        if (counter % 2 === 0 ) {
                            // Move trainpos by latitude
                            delayedTrain.FromLat += 2/111111
                        } else {
                            //Move trainpos by longitude
                            delayedTrain.FromLong += 2 / (111111*Math.cos(10))
                        }
                        

                        counter ++;
                    }
                }

                //console.log(`${delayedTrain.FromLocation}: long: ${delayedTrain.FromLong} lat: ${delayedTrain.FromLat} `)

                delayedTrainsArray.push(delayedTrain);
            }
           
            
        }
        //console.log(`Model array: ${delayedTrainsArray}`);

        return delayedTrainsArray;
    },
};

export default trains;
