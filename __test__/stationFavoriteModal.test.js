// Komponenten StationFavoriteModal bör generera en lista med stationsnamn. När användaren
// trycker på en station ska funktionen stationModel.deleteFavoriteStationData anropas.

import { render, fireEvent } from '@testing-library/react-native';
import stationModel from '../models/stations';
import StationFavoriteModal from '../components/station/StationFavoriteModal';

jest.useFakeTimers();

const navigation = () => false;

stationModel.deleteFavoriteStationData = jest.fn()

// Silence warning Animated: `useNativeDriver` is not supported because the native animated module is missing.
//jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

const resp = [
    {
        stationId: 1,
        AdvertisedLocationName: "Stockholm Central"
    }
]



 // Set return value of mock for trainModel.getDelayedTrains() to resp
 stationModel.getFavoriteStationsData = jest.fn().mockReturnValue(resp);

 /* productModel.getAllProducts = jest.fn().mockReturnValue(fakeProducts).mockName('getAllProducts');;

deliveryModel.addDelivery = jest.fn().mockName('addDelivery');
  */
 
 test('Table of favorite stations are rendered, pressing a station calls stationModel.deleteFavoriteStationData ', async () => {
    
    const {findByText} =  render(<StationFavoriteModal navigation={navigation} />);
    
    // Wait for the text Stockholm Central to be displayed  
    const station = await findByText('Stockholm Central', { exact: false });


    fireEvent.press(station);

    expect(stationModel.deleteFavoriteStationData).toHaveBeenCalled();
 
 });