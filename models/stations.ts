import config from '../config/config.json';
import authConfig from '../config/authConfig.json';
import storage from "./storage";

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
        console.log("Getting invoices");
        const tokenAndData = await storage.readToken();
        const token = tokenAndData.token;
        console.log(`token: ${token}`)
        const response = await fetch(`${authConfig.base_url}/invoices?api_key=${authConfig.api_key}`, {
            headers: {
                'x-access-token': token
            }
        });
        const result = await response.json();

        console.log(`data: ${result.data}`);
        return result.data;
    }
};

export default trains;