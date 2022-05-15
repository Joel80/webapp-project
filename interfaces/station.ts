export default interface station {
    LocationSignature: string,
    AdvertisedLocationName: string,
    Geometry: {WGS84: string},
    PlatformLine: string[],
    api_key: string
}