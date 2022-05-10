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

        for (const train of trains) {

            let trainFromLocationName: string = "";

            let trainToLocationName: string = "";

            let trainFromCoords: RegExpMatchArray | null = [];

            let trainToCoords: RegExpMatchArray | null = [];


            for (const station of stations) {
                if (train.FromLocation !== undefined) {
                    if (station.LocationSignature === train.FromLocation[0].LocationName) {
                        trainFromLocationName = station.AdvertisedLocationName;
                        trainFromCoords = station.Geometry.WGS84.match((/(\d+)(\.\d+)/g));
                        
                    }
                }

                if (train.ToLocation !== undefined) {
                    if (station.LocationSignature === train.ToLocation[0].LocationName) {
                        trainToLocationName = station.AdvertisedLocationName;
                        trainToCoords = station.Geometry.WGS84.match((/(\d+)(\.\d+)/g));
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
                ToLocation: trainToCoords

            };

            delayedTrainsArray.push(delayedTrain);
            
        }

        return delayedTrainsArray;
    },
};

export default trains;