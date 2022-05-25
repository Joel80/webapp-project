// Komponenten StationEdit bör generera två knappar med texten, "Ta bort" respektive
// "Lägg till"

import { render } from '@testing-library/react-native';
import StationEdit from '../components/station/StationEdit';

const navigation = () => false;

test('Two buttons with correct text is rendered, ', async () => {

const {findByText, getByText} =  render(<StationEdit navigation={navigation} />);

// Wait for the text "Ta bort" to be displayed
const button1 = await findByText('Ta bort', { exact: false });

// Get the text "Lägg till"
const button2 = await getByText('Lägg till', { exact: false });

expect(button1).toBeDefined();

expect(button2).toBeDefined();
 
});