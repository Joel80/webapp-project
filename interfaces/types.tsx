import stationInterface from './station';
import favoriteStationInterface from './favoriteStation';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { ReactNode } from 'react';

type TrainStackParamList = {
    List: {
        name: string,
    };

    StationModal: {
        name: string,
    };

    TrainsAtStation: {
        station: stationInterface,
        name: string
    };

}

type StationModalProps = NativeStackScreenProps<TrainStackParamList, 'StationModal'>;
type TrainsAtStationProps = NativeStackScreenProps<TrainStackParamList, 'TrainsAtStation'>;
type TrainsAtStationRouteProp = RouteProp<TrainStackParamList, 'TrainsAtStation'>;

type StationStackParamList = {
    List: {
        reload: boolean
    };

    StationDetails: {
        station: favoriteStationInterface,

    };

    Form: {
        name: string
    };

    StationModal: {
       /*  name: string, */
        /* reload: boolean */
    };

    StationFavoriteModal: {
        /* name: string, */
    };

}

type StationFavoriteFancyListProps = NativeStackScreenProps<StationStackParamList, 'List'>;
type StationDetailsProps = NativeStackScreenProps<StationStackParamList, 'StationDetails'>;
type StationFormProps = NativeStackScreenProps<StationStackParamList, 'Form'>;
type StationNonFavoriteList = NativeStackScreenProps<StationStackParamList, 'StationModal'>;
type StationFavoriteListProps = NativeStackScreenProps<StationStackParamList, 'StationFavoriteModal'>;

export {
    TrainStackParamList,
    TrainsAtStationProps,
    TrainsAtStationRouteProp,
    StationModalProps,
    StationStackParamList,
    StationFavoriteFancyListProps,
    StationDetailsProps,
    StationFormProps,
    StationNonFavoriteList,
    StationFavoriteListProps
}
