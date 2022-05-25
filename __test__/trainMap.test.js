// Komponenten TrainMapp bör generera markörer för de tåg som hämtas med delayedTrainModel.getDelayedTrains()
// När användaren trycker på en markör bör funktionen utils.calculateReach() anropas.

import { render, fireEvent } from '@testing-library/react-native';
import TrainMap from '../components/train/TrainMap';
import delayedTrainModel from '../models/delayedTrains';
import utils from '../utils/utils';

// Mock the delayed trains model
jest.mock('../models/delayedTrains');

jest.mock('../utils/utils');

utils.calculateReach = jest.fn().mockReturnValue(100);

const resp = [
    {
        FromLocationName: "Astrid Lindgrens värld",
        ToLocationName: "Stockholm Central",
        AdvertisedTimeAtLocation: "2021-03-11T13:03:00.000+01:00",
        AdvertisedTrainIdent: "735",
        Canceled: false,
        EstimatedTimeAtLocation: "2021-03-11T13:15:00.000+01:00",
        FromLat: 57.67270729523255,
        FromLong: 15.840063951305682,
        DelayedBy: 12
    },

    {
        FromLocationName: "Stockholm central",
        ToLocationName: "Astrid Lindgrens värld",
        AdvertisedTimeAtLocation: "2021-03-11T13:03:00.000+01:00",
        AdvertisedTrainIdent: "835",
        Canceled: false,
        EstimatedTimeAtLocation: "2021-03-11T13:15:00.000+01:00",
        FromLat: 59.33258,
        FromLong: 18.0649,
        DelayedBy: 12
    },
]


// Set return value of mock for stationModel.getFavoriteStationData to resp1
delayedTrainModel.getDelayedTrains= jest.fn().mockReturnValue(resp);

test('Map markers for trains are rendered, when pressing a marker utils.calculateReach is called  ', async () => {

const {findAllByTestId} =  render(<TrainMap />);

// Wait for the marker with test id "Marker 0"  
const trainMarker = await findAllByTestId("Marker: ", {exact: false});

// Check that there are 2 markers
expect(trainMarker).toHaveLength(2);

fireEvent.press(trainMarker[0]);

expect(utils.calculateReach).toHaveBeenCalled();
 
});
