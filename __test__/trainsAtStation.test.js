/**
 * I komponenten <TrainsAtStation> bör en tabell med tåginformation över tåg från en viss station ritas ut.
 */
import { render } from '@testing-library/react-native';
import TrainsAtStation from '../components/train/TrainsAtStation';
import delayedTrainModel from '../models/delayedTrains';
 
jest.useFakeTimers();
 
// Mock the delayed trains model
jest.mock('../models/delayedTrains');
 
 
const route = {params: {
    station: {
    AdvertisedLocationName: "Stockholm Central",
    } 
}};

// Silence warning Animated: `useNativeDriver` is not supported because the native animated module is missing.
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

const resp = [
    {
        FromLocationName: "Stockholm Central",
        ToLocationName: "Stockholm Central",
        AdvertisedTimeAtLocation: "2021-03-11T13:03:00.000+01:00",
        AdvertisedTrainIdent: "735",
        Canceled: false,
        EstimatedTimeAtLocation: "2021-03-11T13:15:00.000+01:00",
    },

    {
        FromLocationName: "Astrid Lindgrens värld",
        ToLocationName: "Astrid Lindgrens värld",
        AdvertisedTimeAtLocation: "2021-03-11T13:03:00.000+01:00",
        AdvertisedTrainIdent: "800",
        Canceled: false,
        EstimatedTimeAtLocation: "2021-03-11T13:15:00.000+01:00",
    }
]



 // Set return value of mock for trainModel.getDelayedTrains() to resp
 delayedTrainModel.getDelayedTrains.mockReturnValue(resp);
 
 
 test('Table of trains from the param station are rendered', async () => {
     
    const {findAllByText, getByText, queryByText} =  render(<TrainsAtStation route={route} />);
    
    // Wait for the text Stockholm Central to be displayed  
    const station = await findAllByText('Stockholm Central', { exact: false });

    expect(station).toBeDefined();
    
    // Use getBy here to avoid warning you get with several findBy:s
    const advertisedTime = await getByText('13:03', { exact: false });

    expect(advertisedTime).toBeDefined();

    const estimatedTime = await getByText('13:15', { exact: false });

    expect(estimatedTime).toBeDefined();

    expect(await queryByText('Astrid Lindgrens värld')).toBeNull(); 
});