export class Location {
    public LocationId: string;
    public Name: string;
    public City: string;
    public Region: string;
    public Lat: number;
    public Long: number;
}

export class LocationHolder {
    public Location: Location;
    public PlaceholderId: string;
}

export class LocationCriteria {
    public term: string;
}