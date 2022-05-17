import { Appbar } from 'react-native-paper';
import { Text, View, Button } from 'react-native';

export default function TrainViewHeader() {
    return (
        <Appbar>
            <Appbar.Header> 
                <Appbar.Action color='#217cff' icon="menu"  />
                <Appbar.Content title="Tågföreseningar" />
                <Appbar.Action color='#217cff' icon="menu"  />
                <Appbar.Action color='#217cff' icon="menu"  />
            </Appbar.Header>
        </Appbar>
      
    );
  }