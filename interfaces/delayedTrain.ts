export default interface delayedTrains {
    ActivityId: string,
    ActivityType: string,
    AdvertisedTimeAtLocation: string,
    AdvertisedTrainIdent: string,
    Canceled: boolean,
    EstimatedTimeAtLocation: string,
    FromLocationName: string,
    ToLocationName: string
    FromLocation: string[] | null,
    ToLocation: string[] | null,
    FromLat: number,
    FromLong: number ,
    ToLat: number,
    ToLong: number,
    DelayedBy: number,
}