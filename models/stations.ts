import config from '../config/config.json';
import authConfig from '../config/authConfig.json';
import storage from "./storage";
import station from "../interfaces/station";

const trains = {
    getStations: async function getStations() {
        console.log("Calling getStations");
        const response = await fetch(`${config.base_url}/stations`);
        //console.log(response);
        const result = await response.json();

        return result.data;
    },
    getStationsByLocationSignatures: async function getStationsByLocationSignatures(signatures: string[]) {
        console.log("Calling getStationsByLocationSignatures");
        console.log(signatures);
        const response = await fetch(`${config.base_url}/stations`);

        const result = await response.json();

        //console.log(result);

        const stations = result.data;

        const matchingStations = [];


        for (const signature of signatures) {
            for (const station of stations) {
                if (station.LocationSignature === signature) {

                    console.log(station);
                    matchingStations.push(station);
                }
            }
        }

        //console.log(stations);

        return matchingStations;

    },
    getFavoriteStationsData: async function getFavoriteStationsData() {
        console.log("Getting user data");
        const tokenAndData = await storage.readToken();
        const token = tokenAndData.token;
        console.log(`token: ${token}`)
        const response = await fetch(`${authConfig.base_url}/data?api_key=${authConfig.api_key}`, {
            headers: {
                'x-access-token': token
            }
        });
    
        const result = await response.json();

        //console.log(result.data);

        const stationArray = [];

        for (const obj of  result.data) {
            const stationData = JSON.parse(obj.artefact);

            //console.log(stationData);

            stationArray.push(stationData);

           /*  for (const station of stationData) {
                console.log(station);
                stationArray.push(stationData);
            }
            */
            

        }

        //console.log(`data: ${result.data}`);
        return stationArray;
    },
    createFavoriteStationsData: async function createFavoriteStationsData(station: station) {
        console.log("Creating user data");
        station.api_key = authConfig.api_key;
        const artefact = JSON.stringify(station);
        const tokenAndData = await storage.readToken();
        const token = tokenAndData.token;
        console.log(`token: ${token}`);

        try {
            const response = await fetch(`${authConfig.base_url}/data`, {
                body: artefact,
                headers: {
                    'x-access-token': token,
                    'content-type': 'application/json'
                },
                method: 'POST'
            });

            const result = await response.json();

            console.log(`data: ${result.data}`);
            return result.data;

        } catch (error) {
            console.log("Could not create station data");
            console.log(error);
        }
        
        
        

    }
};

export default trains;