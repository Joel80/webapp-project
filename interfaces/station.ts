export default interface Station {
    LocationSignature: string,
    AdvertisedLocationName: string,
    Geometry: {WGS84: string}
    PlatformLine: string[]
}