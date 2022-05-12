import config from '../config/config.json';
import stationModel from './stations';
import delayedTrainInterface from '../interfaces/delayedTrain';
import Train from '../interfaces/train';
import Station from '../interfaces/station';


//Usable regex:  /(-\d+|\d+)(,\d+)*(\.\d+)*/g or (/(\d+)(\.\d+)/g)

const trains = {
    getDelayedTrains: async function getDelayedTrains() {
        console.log("Calling getDelayedTrains");
        const delayedTrainsArray: delayedTrainInterface[] = [];

        const response = await fetch(`${config.base_url}/delayed`);
        //console.log(response);
        const result = await response.json();

        const trains: Train[] = result.data;

        const stations: Station[] = await stationModel.getStations();

        const markedTrains: string[] = [];

        for (const train of trains) {
            
            // Skip trains that are already accounted for (a train can appear several times
            // because the data in the API contains the same train with delay info for different
            // stations between fromLocation and toLocation, in this solution we are only counting the 
            // "first" ecountered delay)
            if (markedTrains.includes(train.AdvertisedTrainIdent)) {
                continue;
            }

            markedTrains.push(train.AdvertisedTrainIdent);

            //console.log(train.AdvertisedTrainIdent);

            let trainFromLocationName: string = "";

            let trainToLocationName: string = "";

            let trainFromCoords: RegExpMatchArray | null = [];

            let trainFromLat: number  = -0.0;

            let trainFromLong: number  = -0.0;
            
            let trainToCoords: RegExpMatchArray | null = [];

            let trainToLat: number  = -0.0;

            let trainToLong: number  = -0.0;

            let trainDelayedBy: number = 0;

            let walkingDistance: number = 0;

           
            for (const station of stations) {
                if (train.FromLocation !== undefined) {
                    if (station.LocationSignature === train.FromLocation[0].LocationName) {
                        //console.log(station.LocationSignature, train.AdvertisedTrainIdent);
                        trainFromLocationName = station.AdvertisedLocationName;
                        trainFromCoords = station.Geometry.WGS84.match((/(\d+)(\.\d+)/g));

                        if (trainFromCoords && parseFloat(trainFromCoords[0]) !== NaN && parseFloat(trainFromCoords[1]) != NaN) {
                            trainFromLong = parseFloat(trainFromCoords[0]);
                            trainFromLat = parseFloat(trainFromCoords[1]);
                            
                        } else {
                            trainFromLat = -0.0;
                            trainFromLong = -0.0;
                        }
                    }
                    
                    let dateEstimated = new Date(train.EstimatedTimeAtLocation);
                    
                    let dateAdvertised = new Date(train.AdvertisedTimeAtLocation);

                    trainDelayedBy = (dateEstimated.valueOf() - dateAdvertised.valueOf()) / 60000;

                }

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
                delayedTrainsArray.push(delayedTrain);
            }
           
            
        }

        return delayedTrainsArray;
    },
};

export default trains;