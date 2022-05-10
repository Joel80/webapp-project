import config from '../config/config.json';

const trains = {
    getStations: async function getStations() {
        console.log("Calling getStations");
        const response = await fetch(`${config.base_url}/stations`);
        //console.log(response);
        const result = await response.json();

        //console.log(result.data);

        return result.data;
    },
};

export default trains;