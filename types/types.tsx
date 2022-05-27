import stationInterface from '../interfaces/station';
import favoriteStationInterface from '../interfaces/favoriteStation';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';



type TrainStackParamList = {
    List: undefined;

    StationSelect: undefined;

    TrainsAtStation: {
        station: stationInterface,
    };

}

type StationSelectProps = NativeStackScreenProps<TrainStackParamList, 'StationSelect'>;
type TrainsAtStationProps = NativeStackScreenProps<TrainStackParamList, 'TrainsAtStation'>;

type StationStackParamList = {
    List: {
        reload: boolean
    };

    TrainsAtStation: {
        station: favoriteStationInterface,

    };

    Edit: undefined;

    StationAddFavorite: undefined;

    StationDeleteFavorite: undefined;
}



type StationFavoritesListProps = NativeStackScreenProps<StationStackParamList, 'List'>;
type StationEditProps = NativeStackScreenProps<StationStackParamList, 'Edit'>;
type StationAddFavoriteProps = NativeStackScreenProps<StationStackParamList, 'StationAddFavorite'>;
type StationDeleteFavoriteProps = NativeStackScreenProps<StationStackParamList, 'StationDeleteFavorite'>;


type AuthStackParamList = {
    Login: {

    };

    Register: {};

}

type AuthLoginProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;
type AuthRegisterProps = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export {
    TrainStackParamList,
    TrainsAtStationProps,
    StationSelectProps,
    StationStackParamList,
    StationFavoritesListProps,
    StationEditProps,
    StationAddFavoriteProps,
    StationDeleteFavoriteProps,
    AuthLoginProps,
    AuthRegisterProps
}
