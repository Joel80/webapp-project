// Komponenten StationAddFavorite bör generera en lista med stationsnamn utan favoritstationer. När användaren
// trycker på en station ska funktionen stationModel.createFavoriteStationData anropas.

import { render, fireEvent } from '@testing-library/react-native';
import stationModel from '../models/stations';
import StationAddFavorite from '../components/station/StationAddFavorite';

jest.useFakeTimers();

const navigation = () => false;

stationModel.createFavoriteStationsData = jest.fn()

const resp1 = [
    {
        stationId: 1,
        AdvertisedLocationName: "Stockholm Central",
        LocationSignature: "Sth"
    }
]

const resp2 = [
    {
        stationId: 1,
        AdvertisedLocationName: "Stockholm Central",
        LocationSignature: "Sth"
    },

    {
        stationId: 2,
        AdvertisedLocationName: "Astrid Lindgrens värld",
        LocationSignature: "Alv"
    },


]


// Set return value of mock for stationModel.getFavoriteStationData to resp1
stationModel.getFavoriteStationsData = jest.fn().mockReturnValue(resp1);

// Set return value of mock for stationModel.getStations to resp2
stationModel.getStations = jest.fn().mockReturnValue(resp2);


test('Table of stations are rendered, favorite stations are not rendered, ', async () => {

const {findByText, queryByText} =  render(<StationAddFavorite navigation={navigation} />);

// Wait for the station not set to favorite to be displayed  
const station = await findByText('Astrid Lindgrens värld', { exact: false });

// Expect the favorite station to not be displayed
expect(await queryByText('Stockholm Central')).toBeNull(); 


fireEvent.press(station);

expect(stationModel.createFavoriteStationsData).toHaveBeenCalled();
 
 });