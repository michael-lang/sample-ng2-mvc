export class Trip {
    public TripId: string;
    public DepartureLocationId: string;
    public ArrivalLocationId: string;
    public DriverId: string;
    public SeatCount: number;
    public DepartDate: string; //date
    public IncludesReturn: boolean;
    public ReturnDate: string; //date
}

export class TripHolder {
    public Trip: Trip;
    public PlaceholderId: string;
}

export class TripCriteria {
    public NearDepartureLocationId: string;
    public NearArrivalLocationId: string;
    public NearMiles: number;
    public DriverId: string;
    public DepartureDate: string; //date
    public ReturnDate: string; //date
}