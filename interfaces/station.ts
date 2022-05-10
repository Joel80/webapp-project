export default interface Station {
    LocationSignature: string,
    AdvertisedLocationName: string,
    Geometry: {WSG84: string}
    PlatformLine: string[]
}