import config from '../config/config.json';

const trains = {
    getTrains: async function getTrains() {
        console.log("Calling getTrains");
        const response = await fetch(`${config.base_url}/delayed`);
        //console.log(response);
        const result = await response.json();

        //console.log(result.data);

        return result.data;
    },
};

export default trains;